-- DWARF controller -- V1.0

library IEEE;
use IEEE.std_logic_1164.all;
use IEEE.std_logic_unsigned.all;

entity dwarf2 is
	PORT
	(
		clock: in STD_LOGIC;
		reset: in STD_LOGIC;		-- zeroes the internal state
		ir: in STD_LOGIC_VECTOR (7 downto 3);	-- instruction register (IR)
		carry: in STD_LOGIC;		-- carry flag (C)
		zero: in STD_LOGIC;			-- zero flag (Z)
		intrpt: in STD_LOGIC;		-- interrupt
		iflag: in STD_LOGIC;		-- set when processing interrupt-handling code
		read: out STD_LOGIC;		-- 1 when reading RAM
		write: out STD_LOGIC;		-- 1 when writing RAM
		addr_sel: out STD_LOGIC_VECTOR (1 downto 0); -- 2=PROG;1=DATA;0=STACK
		inc_pc: out STD_LOGIC;		-- 1 when incrementing PC
		ld_pc: out STD_LOGIC;		-- 1 when changing PC
		clr_pc: out STD_LOGIC;		-- 1 when clearing PC to zero
		inc_sp: out STD_LOGIC;		-- 0=--sp; 1=sp++
		ld_sp: out STD_LOGIC;		-- 1 when changing stack pointer
		ld_ir: out STD_LOGIC;		-- 1 when loading IR
		ld_port: out STD_LOGIC;		-- 1 when loading I/O port
		drv_d_data: out STD_LOGIC;	-- 1 when D bus driven by data bus
		drv_d_acc: out STD_LOGIC;	-- 1 when D bus driven by accumulator
		drv_d_pc: out STD_LOGIC;	-- 1 when D bus driven by PC
		drv_d_port: out STD_LOGIC;	-- 1 when D bus is driven by I/O port
		drv_d_reg: out STD_LOGIC;	-- 1 when D bus driven by register
		ld_reg: out STD_LOGIC;		-- 1 when loading a register
		R0A: out STD_LOGIC;			-- 1 forces A reg address to 0
		R0B: out STD_LOGIC;			-- 1 forces B reg address to 0
		set_cry: out STD_LOGIC;		-- 0=reset carry; 1=set carry
		alu_cry: out STD_LOGIC;		-- 1 when ALU operation updates carry
		ld_cry: out STD_LOGIC;		-- 1 when changing carry flag
		ld_z: out STD_LOGIC;		-- 1 when changing zero flag
		add: out STD_LOGIC;			-- 0=XOR; 1=ADD
		pass: out STD_LOGIC;		-- 0=adder output; 1=operand passes thru
		ld_acc: out STD_LOGIC;		-- 1 when changing accumulator
		set_iflag: out STD_LOGIC;	-- 1 when setting interrupt flag
		clr_iflag: out STD_LOGIC;	-- 1 when clearing interrupt flag
		clr_intrpt: out STD_LOGIC	-- 1 when clearing interrupt flip-flop
	);
end dwarf2;


ARCHITECTURE dwarf_arch of dwarf2 is

SIGNAL curr_st, next_st: STD_LOGIC_VECTOR (2 downto 0);	-- DWARF internal state

-- DWARF control section states -----
constant R0: STD_LOGIC_VECTOR (2 downto 0) := "000";	-- reset state 0
constant R1: STD_LOGIC_VECTOR (2 downto 0) := "001";	-- reset state 1
constant T0: STD_LOGIC_VECTOR (2 downto 0) := "011";	-- normal instruction state 0
constant T1: STD_LOGIC_VECTOR (2 downto 0) := "010";	-- normal instruction state 1 
constant T2: STD_LOGIC_VECTOR (2 downto 0) := "110";	-- normal instruction state 2 
constant T3: STD_LOGIC_VECTOR (2 downto 0) := "100";	-- normal instruction state 3 
constant I1: STD_LOGIC_VECTOR (2 downto 0) := "111";	-- interrupt handling state 1

-- memory regions -----
constant PROGRAM: STD_LOGIC_VECTOR (1 downto 0) := "11"; -- program memory region
constant DATA:    STD_LOGIC_VECTOR (1 downto 0) := "00"; -- data memory region
constant STACK:   STD_LOGIC_VECTOR (1 downto 0) := "01"; -- stack memory region

-- DWARF instruction opcodes -----
constant STORE_REG: STD_LOGIC_VECTOR (4 downto 0) := "00000";
constant STORE_INX: STD_LOGIC_VECTOR (4 downto 0) := "00001";
constant STORE_DIR: STD_LOGIC_VECTOR (4 downto 0) := "00010";
constant STORE_IND: STD_LOGIC_VECTOR (4 downto 0) := "00011";
constant LOAD_REG: STD_LOGIC_VECTOR (4 downto 0)  := "00100";
constant LOAD_INX: STD_LOGIC_VECTOR (4 downto 0)  := "00101"; 
constant LOAD_DIR: STD_LOGIC_VECTOR (4 downto 0)  := "00110"; 
constant LOAD_IND: STD_LOGIC_VECTOR (4 downto 0)  := "00111";
constant LOAD_IMM: STD_LOGIC_VECTOR (4 downto 0)  := "01000";
constant IN_REG: STD_LOGIC_VECTOR (4 downto 0)    := "01100";
constant OUT_OP: STD_LOGIC_VECTOR (4 downto 0)    := "01101";
constant XOR_OP: STD_LOGIC_VECTOR (4 downto 0)    := "10000";
constant ADD_OP: STD_LOGIC_VECTOR (4 downto 0)    := "10001";
constant TEST: STD_LOGIC_VECTOR (4 downto 0)      := "10010";
constant CLEAR_C: STD_LOGIC_VECTOR (4 downto 0)   := "10100";
constant SET_C: STD_LOGIC_VECTOR (4 downto 0)     := "10101";
constant JC: STD_LOGIC_VECTOR (4 downto 0)        := "11000";
constant JZ: STD_LOGIC_VECTOR (4 downto 0)        := "11001";
constant JUMP: STD_LOGIC_VECTOR (4 downto 0)      := "11010";
constant JSR: STD_LOGIC_VECTOR (4 downto 0)       := "11011";
constant RET: STD_LOGIC_VECTOR (4 downto 0)       := "11100";
constant RETI: STD_LOGIC_VECTOR (4 downto 0)      := "11101";

BEGIN

process(clock,next_st,reset)
begin
	if reset='1' then	-- async reset to reset state
		curr_st <= R0;
	elsif (clock'event and clock='1') then
		curr_st <= next_st;	-- go to next controller state on rising clock edge
	end if;
end process;

process(curr_st,ir,carry,zero,iflag,intrpt)
begin
  -- set defaults of all control outputs to prevent latch synthesis
  read<='0';
  write <= '0';
  addr_sel <= PROGRAM;
  inc_pc <= '0';
  ld_pc <= '0';
  clr_pc <= '0';
  inc_sp <= '0';
  ld_sp <= '0';
  ld_ir <= '0';
  ld_port <= '0';
  drv_d_data <= '0';
  drv_d_acc <= '0';
  drv_d_pc <= '0';
  drv_d_port <= '0';
  drv_d_reg <= '0';
  ld_reg <= '0';
  R0A <= '0';
  R0B <= '0';
  set_cry <= '0';
  alu_cry <= '0';
  ld_cry <= '0';
  ld_z <= '0';
  add <= '0';
  pass <= '0';
  ld_acc <= '0';
  set_iflag <= '0';
  clr_iflag <= '0';
  clr_intrpt <= '0';
  next_st <= R0;
  case curr_st is
	when R0 =>	-- handles reset by incrementing PC to 0x02
		inc_pc <= '1';	-- increments PC to 0x01
		next_st <= R1;
	when R1 =>	-- finishes incrementing PC to 0x02
		inc_pc <= '1';	-- increments PC to 0x02
		next_st <= T0;	-- start fetching and executing instructions
	when T0 =>	-- handles interrupts or normal instruction flow
		if (intrpt='1' and iflag='0') then	-- handle interrupt: store PC on stack
			clr_intrpt <= '1';	-- clear current interrupt
			set_iflag <= '1';	-- and indicate that it is being processed
			drv_d_pc<='1'; addr_sel<=STACK; write<='1';	-- store PC on stack
			ld_sp<='1'; inc_sp<='1';					-- increment the stack pointer
			next_st <= I1;	-- go to interrupt handling state
		else -- handle normal instruction flow: fetch opcode
			addr_sel<=PROGRAM; read<='1';	-- read from program memory
			drv_d_data<='1'; ld_ir<='1';	-- load opcode into instruction register
			inc_pc<='1';					-- increment program counter
			next_st <= T1;					-- execute instruction
		end if;
	when I1 =>	-- handles interrupts
		drv_d_acc<='1'; addr_sel<=STACK; write<='1';  -- store ACC on stack    
		ld_sp<='1'; inc_sp<='1';	-- increment the stack pointer
		clr_pc<='1';		-- reset PC to start of interrupt-handling code
		next_st <= T0;		-- start processing interrupt code instructions
	when T1 =>	-- instruction processing
		case ir(7 downto 3) is
			when IN_REG =>
				drv_d_port<='1'; ld_reg<='1';	-- register gets value on input port
				next_st <= T0;	-- done with this instruction; get another				
			when OUT_OP =>
				drv_d_acc<='1'; ld_port<='1';	-- output register gets value from ACC
				next_st <= T0;	-- done with this instruction; get another				
			when JSR =>	-- get subroutine address and increment PC to next instr.
				addr_sel<=PROGRAM; read<='1';	-- read subr. address from RAM
				drv_d_data<='1'; ld_reg<='1'; R0A<='1';	-- load address into R0
				inc_pc<='1';	-- increment PC past address        
				next_st <= T2;	-- not done with this instruction; keep going				
			when RET =>	-- decrement stack pointer to point at return address
				ld_sp<='1'; inc_sp<='0';	-- decrement stack pointer
				next_st <= T2;	-- not done with this instruction; keep going				
			when RETI =>	-- decrement the stack pointer to point at the stored ACC
				ld_sp<='1'; inc_sp<='0';	-- decrement stack pointer
				next_st <= T2;	-- not done with this instruction; keep going				
			when JUMP =>
				addr_sel<=PROGRAM; read<='1';	-- read jump address from RAM
				drv_d_data<='1'; ld_pc<='1';	-- load it into program counter
				next_st <= T0;	-- done with this instruction; get another				
			when JC =>
				if carry='1' THEN	-- if carry then load PC with the jump address
					addr_sel<=PROGRAM; read<='1';	-- read jump address from RAM
					drv_d_data<='1'; ld_pc<='1';	-- load it into program counter
				ELSE	-- otherwise, step over the jump address to the next instr.
					inc_pc<='1';	-- increment PC past address
				end if;
				next_st <= T0;	-- done with this instruction; get another				
			when JZ =>
				if zero='1' THEN	-- if zero then load PC with the jump address
					addr_sel<=PROGRAM; read<='1';	-- read jump address from RAM
					drv_d_data<='1'; ld_pc<='1';	-- load it into program counter
				ELSE	-- otherwise, step over the jump address to the next instr.
					inc_pc<='1';	-- increment PC past address
				end if;
				next_st <= T0;	-- done with this instruction; get another				
			when LOAD_REG =>	-- load ACC with data from a register
				pass<='1'; ld_acc<='1'; drv_d_reg<='1';
				next_st <= T0;	-- done with this instruction; get another				
			when LOAD_INX =>	-- load ACC with data whose memory address is in register
				addr_sel<=DATA; read<='1';	-- address memory with register value
				drv_d_data<='1'; pass<='1'; ld_acc<='1';	-- store RAM data into ACC
				next_st <= T0;	-- done with this instruction; get another
			when LOAD_IMM =>	-- load ACC with data from program memory
				addr_sel<=PROGRAM; read<='1'; drv_d_data<='1';	-- read data from RAM
				pass<='1'; ld_acc<='1';		-- pass it thru the ALU and into the ACC
				inc_pc<='1';	-- increment the PC to the next instr.
				next_st <= T0;	-- done with this instruction; get another
			when LOAD_DIR =>	-- load R0 with the address of the data
				addr_sel<=PROGRAM; read<='1'; drv_d_data<='1'; -- get address from RAM
				R0A<='1'; ld_reg<='1';		-- store address in R0
				inc_pc<='1';	-- increment PC to the next instruction
				next_st <= T2;	-- not done with this instruction; keep going				
			when LOAD_IND =>	-- load R0 with the address of the address of the data
				addr_sel<=PROGRAM; read<='1'; drv_d_data<='1';	-- get address from RAM
				R0A<='1'; ld_reg<='1';		-- store address in R0
				inc_pc<='1';	-- increment PC to the next instruction
				next_st <= T2;	-- not done with this instruction; keep going				
			when STORE_REG =>	-- store ACC into a register
				drv_d_acc<='1'; ld_reg<='1'; 
				next_st <= T0;	-- done with this instruction; get another
			when STORE_INX =>	-- store ACC into memory whose address is in a register
				addr_sel<=DATA;	-- address RAM with the contents of a register
				drv_d_acc<='1'; write<='1';	-- output ACC value on data bus
				next_st <= T0;	-- done with this instruction; get another
			when STORE_DIR =>	-- get address at which to store accumulator
				addr_sel<=PROGRAM; read<='1'; drv_d_data<='1';	-- get address from RAM
				R0A<='1'; ld_reg<='1';		-- store address in R0
				inc_pc<='1';	-- increment PC to the next instruction
				next_st <= T2;	-- not done with this instruction; keep going				
			when STORE_IND =>	-- get address containing address at which to store ACC
				addr_sel<=PROGRAM; read<='1'; drv_d_data<='1';	-- get address from RAM
				R0A<='1'; ld_reg<='1';		-- store address in R0
				inc_pc<='1';	--increment PC to the next instruction
				next_st <= T2;	-- not done with this instruction; keep going				
			when ADD_OP =>	-- ACC <- ACC + Register
				pass<='0'; add<='1'; ld_acc<='1'; drv_d_acc <= '1';
				ld_cry<='1'; alu_cry<='1';	-- update carry flag with ALU carry out
				next_st <= T0;	-- done with this instruction; get another
			when XOR_OP =>	-- ACC <- ACC $ Register
				pass<='0'; add<='0'; ld_acc<='1'; drv_d_acc <= '1';
				next_st <= T0;	-- done with this instruction; get another
			when TEST =>	-- bitwise-AND test of ACC against a register
				ld_z <= '1'; drv_d_acc<='1';	-- zero flag is set if the result is 0
				next_st <= T0;	-- done with this instruction; get another
			when SET_C =>	-- set carry flag
				ld_cry<='1'; set_cry<='1';
				next_st <= T0;	-- done with this instruction; get another
			when CLEAR_C =>	-- clear carry flag
				ld_cry<='1'; set_cry<='0';
				next_st <= T0;	-- done with this instruction; get another
			when others =>
		end case;
	when T2 =>	-- instruction processing
		case ir(7 downto 3) is
			when JSR =>	-- store program counter on the stack and increment SP
				drv_d_pc<='1'; addr_sel<=STACK; write<='1';	--store PC onto stack
				ld_sp<='1'; inc_sp<='1';	--increment stack pointer
				next_st <= T3;	-- not done with this instruction; keep going				
			when RET =>	-- load return address into program counter
				addr_sel<=STACK; read<='1';	--read return address from stack
				drv_d_data<='1'; ld_pc<='1';	--load address into PC
				next_st <= T0;	-- done with this instruction; get another
			when RETI =>	-- restore ACC from the stack and decrement SP again
				addr_sel<=STACK; read<='1';	--read ACC value from the stack
				drv_d_data<='1'; pass<='1'; ld_acc<='1';	--load it into ACC
				ld_sp<='1'; inc_sp<='0';	--decrement stack pointer
				next_st <= T3;	-- not done with this instruction; keep going				
			when LOAD_DIR =>	-- load ACC with the data whose address is in R0
				R0B<='1'; addr_sel<=DATA; read<='1';	--read value at RAM address in R0
				drv_d_data<='1'; pass<='1'; ld_acc<='1';	--load value into ACC
				next_st <= T0;	-- done with this instruction; get another
			when LOAD_IND =>	-- load R0 with the address (pointed-to by R0) of the data
				R0B<='1'; addr_sel<=DATA; read<='1';	--get address from RAM
				drv_d_data<='1'; R0A<='1'; ld_reg<='1';	--store address in R0
				next_st <= T3;	-- not done with this instruction; keep going				
			when STORE_DIR =>	-- store ACC in RAM at address stored in R0
				R0B<='1'; addr_sel<=DATA; write<='1';	--RAM address is value in R0
				drv_d_acc<='1'; write<='1';	--output ACC value into RAM  
				next_st <= T0;	-- done with this instruction; get another
			when STORE_IND =>	-- get address at which to store ACC
				R0B<='1'; addr_sel<=DATA; read<='1';	--RAM address is stored in R0
				drv_d_data<='1'; R0A<='1'; ld_reg<='1';	--store new address in R0
				next_st <= T3;	-- not done with this instruction; keep going
			when others =>
		end case;			
	when T3 =>	-- finish instruction processing
		case ir(7 downto 3) is
			when JSR =>	-- load subroutine address into program counter
				drv_d_reg<='1'; R0B<='1';	--read subroutine address from R0
				ld_pc<='1';					--and load it into the PC
				next_st <= T0;	-- done with this instruction; get another
			when RETI =>	-- PC gets return address and interrupt flag is cleared
				addr_sel<=STACK; read<='1';		--read return address from stack
				drv_d_data<='1'; ld_pc<='1';	--load address into PC
				clr_iflag<='1';	--indicate interrupt processing is done
				next_st <= T0;	-- done with this instruction; get another
			when LOAD_IND =>	-- finally, load ACC with the data whose address is in R0
				R0B<='1'; addr_sel<=DATA; read<='1';	--read value at RAM address in R0
				drv_d_data<='1'; pass<='1'; ld_acc<='1';	--load value into ACC
				next_st <= T0;	-- done with this instruction; get another
			when STORE_IND =>	-- store ACC in RAM at address stored in R0
				R0B<='1'; addr_sel<=DATA; write<='1';	--RAM address is value in R0
				drv_d_acc<='1'; write<='1';		--output ACC value into RAM  
				next_st <= T0;	-- done with this instruction; get another
			when others =>
		end case;
	when others =>
  end case;
end process;

end dwarf_arch; 


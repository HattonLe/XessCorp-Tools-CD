setMode -bs
setMode -bs
setCable -port svf -file "C:/xesscorp/PRODUCTS/BITSTREAMS/XSA/3S1000/test_board_jtag/test_board_jtag.svf"
addDevice -p 1 -file "C:/xesscorp/PRODUCTS/BITSTREAMS/XSA/3S1000/test_board_jtag/test_board_jtag.bit"
Program -p 1 -defaultVersion 0 
setMode -bs
deleteDevice -position 1
setMode -ss
setMode -sm
setMode -hw140
setMode -spi
setMode -acecf
setMode -acempm
setMode -pff
setMode -bs

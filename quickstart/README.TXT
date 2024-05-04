XSTOOLs 4.0.6 README FILE - 3/29/2006
  GENERATING BITSTREAMS FOR THE XSA-3S1000 BOARD
    Before downloading a bitstream to the FPGA on your XSA-3S1000
    Board, you will use the XILINX development software to generate
    the .BIT file. Steps for doing this are given in the XILINX
    documentation, but there is one detail that is specific to your
    board. The Spartan3 FPGA has relatively low-impedance, internal
    pullup and pulldown resistors on its pins that become active after
    the FPGA is configured. These resistors can overpower the 4.7K
    external pullup and pulldown resistors on the board and prevent it
    from functioning correctly.

    Therefore, you have to set the bitstream generation options to
    disable these internal resistors. This is done by right-clicking
    on the Generate Programming File item in the Processes pane and
    selecting Properties... from the pop-up menu. Then select the
    Configuration Options tab in the Process Properties window and
    change all the pin setting values to float. Then click on the OK
    button. The internal pullup and pulldown resistors will now be
    disabled in the bitstream generated for the project.

  XSTOOLS DIFFICULTIES
    A small percentage of customers experience difficulties when
    running the XSTOOLS software utilities. In 99.9% of these cases,
    the problem is usually caused by the parallel port of the computer
    connected to your XS Board. Here are a few tips that may help you
    solve your problem before contacting us.

   Windows 95, 98, and ME Users
    The first thing you should do before connecting your XS Board is
    to remove any other devices from your parallel port. That includes
    all software dongles and pass-thru devices as well. You can try
    reconnecting these devices after you get your XS Board to work.

    Next, you should boot your PC, enter the BIOS, and then check the
    mode of your parallel port. Here are the various modes you can use
    ranked in order of their likelihood of working properly with your
    XS Board:

        Parallel
        Port Mode          Ranking
        --------------------------
        Output-only         High
        Normal              High
        Unidirectional      High
        SPP                 High
        AT                  High
        PS/2                Hight
        ECP                 Good
        EPP                 Low
        ECP+EPP             Low
        Bidirectional       Low

    Your PC may not have all these modes (or they may not go by these
    names), but you should be able to find something close. All the
    different PC motherboard hardware, BIOSes, OSes and everything
    else that customers have on their PCs makes it difficult to
    guarantee that any particular mode will work. If a particular mode
    doesn't work, then try another.

    While you are in the BIOS, take a look at the hardware address for
    your parallel port. It will probably be 0x378. It's OK if it has
    some other value because the XSTOOLS software will read the
    address from the BIOS. But if a problem arises and nothing else
    makes the XSTOOLS work, then try setting the parallel port
    hardware address to 0x378 in the BIOS.

    Now you can exit the BIOS (saving any changes you made) and try
    the XSTOOLS software. You will probably try GXSTEST first so you
    can verify the operation of your XS Board. If you are going to
    have a problem with the XSTOOLS, this is when you'll probably have
    it. If your XS Board fails GXSTEST, you will receive a list of
    things to check that may be causing a problem. If none of those is
    the problem, then try interrupting power to your XS Board (this
    will reset it) and then re-run GXSTEST. This may clear the
    problem.

    If your XS Board still fails GXSTEST, then reboot your PC, enter
    the BIOS and try another mode for your parallel port. Then try
    GXSTEST again. Repeat this process until the XS Board works or you
    run out of parallel port modes to try.

    It is possible that you will get an error message that asks you to
    check the hardware address of your parallel port. If so, this
    indicates that the XSTOOLS software is having difficulty getting
    the correct hardware address for your parallel port. You can solve
    this problem as follows:

    1.  Get the hardware address for your parallel port. You can find
        this in the BIOS or by highlighting the item

            Start -> Settings -> Control Panel -> System ->
                Device Manager -> Ports -> Printer Port

        then click on Properties and look in the Input/Output Range of
        the Resources tab.

    2.  Open (or create) the file XSPARAM.TXT in the C:\XSTOOLS folder
        (or the folder where you installed the XSTOOLS software) and
        add the following line at the top of the file:

            LPT1ADDRESS 0x378

        assuming you are using parallel port LPT1 and its address is
        0x378. Use LPT2ADDRESS or LPT3ADDRESS if you are using those
        parallel ports and use the appropriate address you found in
        the previous step.

    This procedure will force the XSTOOLS software to use the parallel
    port hardware address you listed in the XSPARAM.TXT file. That may
    fix the problem. If not, try disabling the parallel port address
    checking procedure by placing the following line into the
    XSPARAM.TXT file:

        LPT1CHECK NO

    Then try GXSTEST again and see if your XS Board passes the test.

    You can also use an alternate parallel port driver by placing one
    of the following lines into the XSPARAM.TXT file:

        LPTDRIVER TVICHW32

    or

        LPTDRIVER UNIIO

    or

        LPTDRIVER DRIVERLINX (If you are using WinNT, Win2K or WinXP,
        you will also have to run the port95nt.exe program found in
        the XSTOOLs folder to install the DriverLINX driver.)

    Then try GXSTEST again and see if your XS Board passes the test.

    If the XS Board still won't pass, then try to find another PC and
    test your XS Board on that one. Still won't work? Then it's time
    to contact us at help@xess.com. We test every XS Board before
    shipment, but you may have a bad one. If so, we will replace it or
    refund your money.

   Windows NT, 2K, XP
    If you are using these operating systems, you should try all the
    remedies listed in the previous section. You may also have a
    problem with the TVICHW32 driver that is installed so the XSTOOLS
    software can access the parallel port. The XSTOOLS software can't
    get to the parallel port unless this driver is running. You can
    check the state of the TVICHW32 driver under Windows 2K as
    follows:

    1.  Open the Device Manager as follows:

            Start -> Settings -> Control Panel ->
                System -> Hardware -> Device Manager

    2.  Select View -> Show hidden devices

    3.  Click on the Non-Plug and Play Drivers to expand the list.

    4.  Find TVICHW32 in the list of drivers and double-click it.

    5.  Click on the Driver tab. The TVICHW32 driver should be
        started. If not, click on the Start button. Also, the Startup
        Type field should be either Demand or Automatic. If not,
        change it to Automatic so the TVICHW32 driver will start
        automatically when you reboot. Then press OK.

    The previous procedure should start the TVICHW32 driver and allow
    the XSTOOLS software to access the parallel port hardware. You may
    also have to enable user write mode access on the XSPARAM.TXT file
    to fix a permission error when running in user mode. (You can also
    solve this problem by just changing permission on the whole
    XSTOOLS directory).

    Suppose you did not find the TVICHW32 driver in the list of
    drivers? In this case you will have to manually install the driver
    as follows:

    1.  Open a command-prompt window.

    2.  Go to the folder where you installed the XSTOOLS software
        (C:\Program Files\XSTOOLS by default) using the command
        sequence:

            > C:
            > CD \Program Files\XSTOOLS

    3.  Execute this command to make sure the uniio driver is
        unloaded:

            > UNLDRV UNIIO

    4.  Then execute this command to load the TVICHW32 driver:

            > LOADDRV2 TVICHW32 C:\WINNT\system32\drivers\TVicHW32.sys

    5.  Reboot your PC and check the list of drivers for the presence
        of the TVICHW32 driver.

    6.  Now try to run GXSTEST again and see if your XS Board passes
        the test.

    If the XS Board still won't pass, then try to find another PC and
    test your XS Board on that one. Still won't work? Then it's time
    to contact us at help@xess.com. We test every XS Board before
    shipment, but you may have a bad one. If so, we will replace it or
    refund your money.


setPreference -pref UserLevel:EXPERT
setPreference -pref MessageLevel:BRIEF
setPreference -pref ConcurrentMode:FALSE
setPreference -pref UseHighz:FALSE
setPreference -pref ConfigOnFailure:CONTINUE
setPreference -pref StartupCLock:INDICATE_ERROR
setPreference -pref AutoSignature:FALSE
setPreference -pref KeepSVF:FALSE
setPreference -pref svfUseTime:FALSE
setPreference -pref UserLevel:EXPERT
setPreference -pref MessageLevel:BRIEF
setPreference -pref ConcurrentMode:FALSE
setPreference -pref UseHighz:FALSE
setPreference -pref ConfigOnFailure:CONTINUE
setPreference -pref StartupCLock:INDICATE_ERROR
setPreference -pref AutoSignature:FALSE
setPreference -pref KeepSVF:FALSE
setPreference -pref svfUseTime:FALSE
setMode -bsfile
setCable -port svf -file "test_pport_cpld.svf"
addDevice -position 1 -file "test_pport_cpld.jed"
Program -p 1 -e 
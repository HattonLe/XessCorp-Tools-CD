objects := XSA XSB

all             : config
config          : $(objects:=.config)
exo             : $(objects:=.exo)
timing          : $(objects:=.timing)
clean           : $(objects:=.clean)
distclean       : $(objects:=.distclean)
maintainer-clean: $(objects:=.maintainer-clean)
nice            : $(objects:=.nice) XS_LIB.nice

$(objects:=.config):
	$(MAKE) -C $(subst .config,,$@) config

$(objects:=.exo):
	$(MAKE) -C $(subst .exo,,$@) exo

$(objects:=.timing):
	$(MAKE) -C $(subst .timing,,$@) timing

$(objects:=.clean):
	$(MAKE) -C $(subst .clean,,$@) clean

$(objects:=.distclean):
	$(MAKE) -C $(subst .distclean,,$@) distclean

$(objects:=.maintainer-clean):
	$(MAKE) -C $(subst .maintainer-clean,,$@) maintainer-clean

$(objects:=.nice) XS_LIB.nice:
	$(MAKE) -C $(subst .nice,,$@) nice

.PHONY: test_board.distribute test_dualport.distribute
test_board.distribute test_dualport.distribute:
	perl make_dist_files.pl $(subst .distribute,,$@) > files.txt
	tar -c -f tmp.tar -T files.txt
	erase files.txt
	-rmdir /s /q $@
	-mkdir $@
	tar -C $@ -x -f tmp.tar
	erase tmp.tar
	pod2text -l $(subst .distribute,.pod,$@) > $@\readme.txt
	pod2html $(subst .distribute,.pod,$@) > $@\readme.html 
	erase pod2htm*.tmp
	echo "*** Now run Winzip on the design_files directory ***"

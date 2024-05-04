use File::Find;

binmode(STDOUT); # so the linefeed is not expanded into a linefeed + carriage return

$proj = $ARGV[0];
@directories_to_search = ( 'XS_LIB', 'XSA/XSA_LIB', 'XSB/XSB_LIB',
                           "XSA/50/$proj", "XSA/100/$proj", "XSA/200/$proj", "XSA/3S1000/$proj",
                           "XSB/300E/$proj");
find(\&wanted, @directories_to_search);

sub wanted {
  $\ = "\x0a"; # separate file names with linefeeds since this is what tar wants
  my $f = $File::Find::name;;
  $f =~ s/\\/\//g;  
  /.*\.vhd$/ && print $f;
  /.*\.ucf$/ && print $f;
  /.*\.npl$/ && print $f;
  /.*\.bit$/ && print $f;
  /.*\.svf$/ && print $f;
  /.*\.xls$/ && print $f;
  return 0;
}


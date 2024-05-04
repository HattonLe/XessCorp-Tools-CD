function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID0\" class=\"headerLeftMenuInActive\"><a id=\"aID0\" href=\"#\" OnFocus=\"link('','index',this)\" class=\"leftMenuLinkHeadInActive\">XSTOOLs</a></div>\n");
document.write("<div class=\"paragraphLeftMenu\">Directories</div>\n");
document.write("<div id=\"divID2129\" class=\"leftMenuInActive\"><a id=\"aID2129\" href=\"#\" OnFocus=\"link('_dir','xstools/gxsload/gxsload0',this)\" class=\"leftMenuLinkInActive\">gxsload</a></div>\n");
document.write("<div id=\"divID2130\" class=\"leftMenuInActive\"><a id=\"aID2130\" href=\"#\" OnFocus=\"link('_dir','xstools/gxsport/gxsport0',this)\" class=\"leftMenuLinkInActive\">gxsport</a></div>\n");
document.write("<div id=\"divID2131\" class=\"leftMenuInActive\"><a id=\"aID2131\" href=\"#\" OnFocus=\"link('_dir','xstools/gxssetclk/gxssetclk0',this)\" class=\"leftMenuLinkInActive\">gxssetclk</a></div>\n");
document.write("<div id=\"divID2132\" class=\"leftMenuInActive\"><a id=\"aID2132\" href=\"#\" OnFocus=\"link('_dir','xstools/gxssetcodec/gxssetcodec0',this)\" class=\"leftMenuLinkInActive\">gxssetcodec</a></div>\n");
document.write("<div id=\"divID2133\" class=\"leftMenuInActive\"><a id=\"aID2133\" href=\"#\" OnFocus=\"link('_dir','xstools/gxstest/gxstest0',this)\" class=\"leftMenuLinkInActive\">gxstest</a></div>\n");
document.write("<div id=\"divID2134\" class=\"leftMenuInActive\"><a id=\"aID2134\" href=\"#\" OnFocus=\"link('_dir','xstools/gxstoolslib/gxstoolslib0',this)\" class=\"leftMenuLinkInActive\">gxstoolslib</a></div>\n");
document.write("<div id=\"divID2135\" class=\"leftMenuInActive\"><a id=\"aID2135\" href=\"#\" OnFocus=\"link('_dir','xstools/xsatapi/xsatapi0',this)\" class=\"leftMenuLinkInActive\">xsatapi</a></div>\n");
document.write("<div id=\"divID2136\" class=\"leftMenuInActive\"><a id=\"aID2136\" href=\"#\" OnFocus=\"link('_dir','xstools/xsether/xsether0',this)\" class=\"leftMenuLinkInActive\">xsether</a></div>\n");
document.write("<div id=\"divID2137\" class=\"leftMenuInActive\"><a id=\"aID2137\" href=\"#\" OnFocus=\"link('_dir','xstools/xsi2c/xsi2c0',this)\" class=\"leftMenuLinkInActive\">xsi2c</a></div>\n");
document.write("<div id=\"divID2138\" class=\"leftMenuInActive\"><a id=\"aID2138\" href=\"#\" OnFocus=\"link('_dir','xstools/xsload/xsload0',this)\" class=\"leftMenuLinkInActive\">xsload</a></div>\n");
document.write("<div id=\"divID2139\" class=\"leftMenuInActive\"><a id=\"aID2139\" href=\"#\" OnFocus=\"link('_dir','xstools/xsport/xsport0',this)\" class=\"leftMenuLinkInActive\">xsport</a></div>\n");
document.write("<div id=\"divID2140\" class=\"leftMenuInActive\"><a id=\"aID2140\" href=\"#\" OnFocus=\"link('_dir','xstools/xsramtest/xsramtest0',this)\" class=\"leftMenuLinkInActive\">xsramtest</a></div>\n");
document.write("<div id=\"divID2141\" class=\"leftMenuInActive\"><a id=\"aID2141\" href=\"#\" OnFocus=\"link('_dir','xstools/xsrw/xsrw0',this)\" class=\"leftMenuLinkInActive\">xsrw</a></div>\n");
document.write("<div id=\"divID2142\" class=\"leftMenuInActive\"><a id=\"aID2142\" href=\"#\" OnFocus=\"link('_dir','xstools/xssetclk/xssetclk0',this)\" class=\"leftMenuLinkInActive\">xssetclk</a></div>\n");
document.write("<div id=\"divID2143\" class=\"leftMenuInActive\"><a id=\"aID2143\" href=\"#\" OnFocus=\"link('_dir','xstools/xssetsaa711X/xssetsaa711X0',this)\" class=\"leftMenuLinkInActive\">xssetsaa711X</a></div>\n");
document.write("<div id=\"divID2144\" class=\"leftMenuInActive\"><a id=\"aID2144\" href=\"#\" OnFocus=\"link('_dir','xstools/xstest/xstest0',this)\" class=\"leftMenuLinkInActive\">xstest</a></div>\n");
document.write("<div id=\"divID2146\" class=\"leftMenuInActive\"><a id=\"aID2146\" href=\"#\" OnFocus=\"link('_dir','xstools/xstoolslib/xstoolslib0',this)\" class=\"leftMenuLinkInActive\">xstoolslib</a></div>\n");
document.write("<div id=\"divID2147\" class=\"leftMenuInActive\"><a id=\"aID2147\" href=\"#\" OnFocus=\"link('_dir','xstools/xsusb/xsusb0',this)\" class=\"leftMenuLinkInActive\">xsusb</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

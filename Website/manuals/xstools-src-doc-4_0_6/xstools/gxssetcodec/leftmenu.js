function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2132\" class=\"headerLeftMenuInActive\"><a id=\"aID2132\" href=\"#\" OnFocus=\"link('_dir','gxssetcodec0',this)\" class=\"leftMenuLinkHeadInActive\">gxssetcodec</a></div>\n");
document.write("<div class=\"paragraphLeftMenu\">Classes</div>\n");
document.write("<div id=\"divID482\" class=\"leftMenuInActive\"><a id=\"aID482\" href=\"#\" OnFocus=\"link('_class','CGxssetcodecApp0',this)\" class=\"leftMenuLinkInActive\">CGxssetcodecApp</a></div>\n");
document.write("<div id=\"divID483\" class=\"leftMenuInActive\"><a id=\"aID483\" href=\"#\" OnFocus=\"link('_class','CGxssetcodecDlg0',this)\" class=\"leftMenuLinkInActive\">CGxssetcodecDlg</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

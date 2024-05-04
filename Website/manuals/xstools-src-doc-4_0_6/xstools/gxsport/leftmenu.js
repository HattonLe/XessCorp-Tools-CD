function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2130\" class=\"headerLeftMenuInActive\"><a id=\"aID2130\" href=\"#\" OnFocus=\"link('_dir','gxsport0',this)\" class=\"leftMenuLinkHeadInActive\">gxsport</a></div>\n");
document.write("<div class=\"paragraphLeftMenu\">Classes</div>\n");
document.write("<div id=\"divID478\" class=\"leftMenuInActive\"><a id=\"aID478\" href=\"#\" OnFocus=\"link('_class','CGxsportApp0',this)\" class=\"leftMenuLinkInActive\">CGxsportApp</a></div>\n");
document.write("<div id=\"divID479\" class=\"leftMenuInActive\"><a id=\"aID479\" href=\"#\" OnFocus=\"link('_class','CGxsportDlg0',this)\" class=\"leftMenuLinkInActive\">CGxsportDlg</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

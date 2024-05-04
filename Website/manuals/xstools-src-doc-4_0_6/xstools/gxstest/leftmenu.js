function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2133\" class=\"headerLeftMenuInActive\"><a id=\"aID2133\" href=\"#\" OnFocus=\"link('_dir','gxstest0',this)\" class=\"leftMenuLinkHeadInActive\">gxstest</a></div>\n");
document.write("<div class=\"paragraphLeftMenu\">Classes</div>\n");
document.write("<div id=\"divID484\" class=\"leftMenuInActive\"><a id=\"aID484\" href=\"#\" OnFocus=\"link('_class','CGxstestApp0',this)\" class=\"leftMenuLinkInActive\">CGxstestApp</a></div>\n");
document.write("<div id=\"divID485\" class=\"leftMenuInActive\"><a id=\"aID485\" href=\"#\" OnFocus=\"link('_class','CGxstestDlg0',this)\" class=\"leftMenuLinkInActive\">CGxstestDlg</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

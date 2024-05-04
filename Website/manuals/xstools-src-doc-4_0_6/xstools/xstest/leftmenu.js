function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2144\" class=\"headerLeftMenuInActive\"><a id=\"aID2144\" href=\"#\" OnFocus=\"link('_dir','xstest0',this)\" class=\"leftMenuLinkHeadInActive\">xstest</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

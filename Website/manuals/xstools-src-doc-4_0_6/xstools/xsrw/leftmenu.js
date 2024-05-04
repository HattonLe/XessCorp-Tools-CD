function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2141\" class=\"headerLeftMenuInActive\"><a id=\"aID2141\" href=\"#\" OnFocus=\"link('_dir','xsrw0',this)\" class=\"leftMenuLinkHeadInActive\">xsrw</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

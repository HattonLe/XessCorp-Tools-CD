function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2140\" class=\"headerLeftMenuInActive\"><a id=\"aID2140\" href=\"#\" OnFocus=\"link('_dir','xsramtest0',this)\" class=\"leftMenuLinkHeadInActive\">xsramtest</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

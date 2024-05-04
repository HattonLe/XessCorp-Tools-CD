function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2135\" class=\"headerLeftMenuInActive\"><a id=\"aID2135\" href=\"#\" OnFocus=\"link('_dir','xsatapi0',this)\" class=\"leftMenuLinkHeadInActive\">xsatapi</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2143\" class=\"headerLeftMenuInActive\"><a id=\"aID2143\" href=\"#\" OnFocus=\"link('_dir','xssetsaa711X0',this)\" class=\"leftMenuLinkHeadInActive\">xssetsaa711X</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

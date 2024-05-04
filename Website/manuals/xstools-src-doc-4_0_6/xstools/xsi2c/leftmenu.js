function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2137\" class=\"headerLeftMenuInActive\"><a id=\"aID2137\" href=\"#\" OnFocus=\"link('_dir','xsi2c0',this)\" class=\"leftMenuLinkHeadInActive\">xsi2c</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

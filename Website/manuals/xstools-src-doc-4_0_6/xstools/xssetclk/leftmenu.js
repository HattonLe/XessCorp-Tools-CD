function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2142\" class=\"headerLeftMenuInActive\"><a id=\"aID2142\" href=\"#\" OnFocus=\"link('_dir','xssetclk0',this)\" class=\"leftMenuLinkHeadInActive\">xssetclk</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

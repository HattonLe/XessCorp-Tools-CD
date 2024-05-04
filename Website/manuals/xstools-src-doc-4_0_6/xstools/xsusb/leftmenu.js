function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2147\" class=\"headerLeftMenuInActive\"><a id=\"aID2147\" href=\"#\" OnFocus=\"link('_dir','xsusb0',this)\" class=\"leftMenuLinkHeadInActive\">xsusb</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

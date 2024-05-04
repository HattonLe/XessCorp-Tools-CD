function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2136\" class=\"headerLeftMenuInActive\"><a id=\"aID2136\" href=\"#\" OnFocus=\"link('_dir','xsether0',this)\" class=\"leftMenuLinkHeadInActive\">xsether</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

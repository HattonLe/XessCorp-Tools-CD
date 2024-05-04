function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2145\" class=\"headerLeftMenuInActive\"><a id=\"aID2145\" href=\"#\" OnFocus=\"link('_dir','xstools0',this)\" class=\"leftMenuLinkHeadInActive\">xstools</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

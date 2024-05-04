function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2138\" class=\"headerLeftMenuInActive\"><a id=\"aID2138\" href=\"#\" OnFocus=\"link('_dir','xsload0',this)\" class=\"leftMenuLinkHeadInActive\">xsload</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

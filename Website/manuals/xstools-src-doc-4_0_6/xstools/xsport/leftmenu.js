function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2139\" class=\"headerLeftMenuInActive\"><a id=\"aID2139\" href=\"#\" OnFocus=\"link('_dir','xsport0',this)\" class=\"leftMenuLinkHeadInActive\">xsport</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

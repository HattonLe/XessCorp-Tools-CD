function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2134\" class=\"headerLeftMenuInActive\"><a id=\"aID2134\" href=\"#\" OnFocus=\"link('_dir','gxstoolslib0',this)\" class=\"leftMenuLinkHeadInActive\">gxstoolslib</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

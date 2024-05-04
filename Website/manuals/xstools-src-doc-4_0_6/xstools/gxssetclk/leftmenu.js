function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2131\" class=\"headerLeftMenuInActive\"><a id=\"aID2131\" href=\"#\" OnFocus=\"link('_dir','gxssetclk0',this)\" class=\"leftMenuLinkHeadInActive\">gxssetclk</a></div>\n");
document.write("<div class=\"paragraphLeftMenu\">Classes</div>\n");
document.write("<div id=\"divID480\" class=\"leftMenuInActive\"><a id=\"aID480\" href=\"#\" OnFocus=\"link('_class','CGxssetclkApp0',this)\" class=\"leftMenuLinkInActive\">CGxssetclkApp</a></div>\n");
document.write("<div id=\"divID481\" class=\"leftMenuInActive\"><a id=\"aID481\" href=\"#\" OnFocus=\"link('_class','CGxssetclkDlg0',this)\" class=\"leftMenuLinkInActive\">CGxssetclkDlg</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

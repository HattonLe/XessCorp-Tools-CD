function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID2129\" class=\"headerLeftMenuInActive\"><a id=\"aID2129\" href=\"#\" OnFocus=\"link('_dir','gxsload0',this)\" class=\"leftMenuLinkHeadInActive\">gxsload</a></div>\n");
document.write("<div class=\"paragraphLeftMenu\">Classes</div>\n");
document.write("<div id=\"divID475\" class=\"leftMenuInActive\"><a id=\"aID475\" href=\"#\" OnFocus=\"link('_class','CAboutDlg0',this)\" class=\"leftMenuLinkInActive\">CAboutDlg</a></div>\n");
document.write("<div id=\"divID474\" class=\"leftMenuInActive\"><a id=\"aID474\" href=\"#\" OnFocus=\"link('_class','CGxsloadApp0',this)\" class=\"leftMenuLinkInActive\">CGxsloadApp</a></div>\n");
document.write("<div id=\"divID477\" class=\"leftMenuInActive\"><a id=\"aID477\" href=\"#\" OnFocus=\"link('_class','CGxsloadDlg0',this)\" class=\"leftMenuLinkInActive\">CGxsloadDlg</a></div>\n");
document.write("<div id=\"divID476\" class=\"leftMenuInActive\"><a id=\"aID476\" href=\"#\" OnFocus=\"link('_class','UploadDataSource0',this)\" class=\"leftMenuLinkInActive\">UploadDataSource</a></div>\n");
if(divID != "" && aID != "")
{
document.getElementById(divID).className = divClassName;
document.getElementById(aID).className = aClassName;
}
}

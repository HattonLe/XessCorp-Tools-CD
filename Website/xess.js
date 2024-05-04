/* 
	Javascript to style odd/even table rows
	Derived from 'Zebra Tables' by David F. Miller (http://www.alistapart.com/articles/zebratables/)
	
	Modified by Jop de Klein, february 2005
	jop at validweb.nl
	http://validweb.nl/artikelen/javascript/better-zebra-tables/
*/

var stripe_original = function() {
    var tbodies = document.getElementsByTagName("tbody");

    for (var h = 0; h < tbodies.length; h++) {

		var trs = tbodies[h].getElementsByTagName("tr");

        for (var i = 0; i < trs.length; i++) {
			var tr = trs[i];

            tr.onmouseover=function() {
                this.className += " ruled"; return false
            }

            tr.onmouseout=function() {
                this.className = this.className.replace("ruled", ""); return false
            }

            if(!(i % 2)) {
                tr.className += " even";
            }
		}
    }
}

var stripe_xess = function() {
	
	var tables = document.getElementsByTagName("table");
	
	for (var t = 0; t < tables.length; t++) {
	
		if (tables[t].className.search(/striped/gi) >= 0) {
		
			var tbodies = tables[t].getElementsByTagName("tbody");

		    for (var h = 0; h < tbodies.length; h++) {

				var trs = tbodies[h].getElementsByTagName("tr");

		        for (var i = 0; i < trs.length; i++) {
					var tr = trs[i];

		            tr.onmouseover=function() {
		                this.className += " ruled"; return false
		            }

		            tr.onmouseout=function() {
		                this.className = this.className.replace("ruled", ""); return false
		            }

		            if(!(i % 2)) {
		                tr.className += " even";
		            }
					else {
		                tr.className += " odd";
					}
				}
		    }
		}
	}
}

var startList = function(id) {
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById(id);
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}
}

var image_open = new Image();
image_open.src = "images/open.gif";
var image_closed = new Image();
image_closed.src = "images/closed.gif";

function toggle(image, section) {
	if(document.all) {
		if(document.all[section].style.display == "block") {
			document.all[section].style.display = "none";
			document.all[image].src = image_closed.src;
		}
		else{              
			document.all[section].style.display = "block";
			document.all[image].src = image_open.src;
		}
	}
	else
	{
		if(document.getElementById(section).style.display == "block") {
			document.getElementById(section).style.display = "none";
			document.getElementById(image).src = image_closed.src;
		}
		else{              
			document.getElementById(section).style.display = "block";
			document.getElementById(image).src = image_open.src;
		}
	}
}

function expandall() {
var divNodeList = document.getElementsByTagName('div'); 
	for (i = 0; i < divNodeList.length; i++) { 
		if(divNodeList[i].id) {
			divNodeList[i].style.display = "block";
			document.getElementById('trigger_' + divNodeList[i].id.substr(7)).src = "images/open.gif";
		}
	}
}

function collapseall() {
var divNodeList = document.getElementsByTagName('div'); 
	for (i = 0; i < divNodeList.length; i++) { 
		if(divNodeList[i].id) {
			divNodeList[i].style.display = "none";
			document.getElementById('trigger_' + divNodeList[i].id.substr(7)).src = "images/closed.gif";
		}
	}
}


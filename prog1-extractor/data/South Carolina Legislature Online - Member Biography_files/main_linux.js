//common.js

function create_xml_object()
{
	var newobj=false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	// JScript gives us Conditional compilation, we can cope with old IE versions.
	// and security blocked creation of the objects.
 	try
	{
  		newobj = new ActiveXObject("Msxml2.XMLHTTP");
 	}
	catch(e)
	{
  		try
		{
   			newobj = new ActiveXObject("Microsoft.XMLHTTP");
  		}
		catch(E)
		{
   			newobj = false;
  		}
 	}
	@end @*/
	if (!xmlhttp && typeof XMLHttpRequest!='undefined')
	{
  		newobj = new XMLHttpRequest();
	}

	return newobj;
}

function doRequest(xmlobj, method, url, async, callbackfunc, postdata)
{
	xmlobj.abort();

	if(async)
		xmlobj.onreadystatechange = callbackfunc;

	xmlobj.open(method, url, async);
	
	if(method.toUpperCase() == 'POST')
	{
		xmlobj.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlobj.send(postdata);
	}
	else
	{
		xmlobj.send(null);	
	}
	
	return false;
}

function ajax(url, async, method, postdata, run, handleResponseText, handleError)
{
 	this.url = url||false;
 	this.async = true;

	async = async||false;
 	if(async == false)
 		this.async = false;

 	this.method = "GET";
 	method = method||false;
 	if(method)
 	{
 		if(method.toUpperCase() == "HEAD" || method.toUpperCase() == "POST" )
 			this.method = method;
 	}

 	this.postdata = postdata||false;
	
 	var response = null;
	this.getResponse = function () { return response; }

	handleResponseText = handleResponseText||false;
	handleError = handleError||false;
 	var callback = function (text){ response = text;}  // this is run inside of the callback to handle successful requests...
 	if(handleResponseText)
 		callback = handleResponseText;

 	this.setSuccessHandler = function(func) { callback = func; };
 	errorHandler = false; // this is run inside of the callback to handle unsuccessful requests...
 	//errorHandler = function(status){ alert('returned status:'+status); };
 	if(handleError)
 		errorHandler = handleError;

	var create_xml_object = function()
	{
		var newobj=false;
		/*@cc_on @*/
		/*@if (@_jscript_version >= 5)
		// JScript gives us Conditional compilation, we can cope with old IE versions and security blocked creation of the objects.
	 	try
		{
	  		newobj = new ActiveXObject("Msxml2.XMLHTTP");
	 	}
		catch(e)
		{
	  		try
			{
	   			newobj = new ActiveXObject("Microsoft.XMLHTTP");
	  		}
			catch(E)
			{
	   			newobj = false;
	  		}
	 	}
		@end @*/
		if (!newobj && typeof XMLHttpRequest!='undefined')
		{
	  		newobj = new XMLHttpRequest();
		}

		return newobj;
	}

	var xmlhttp = create_xml_object();

	var synccallback = function ()
	{
		if (xmlhttp.status == 200)
		{
		 	if(callback)
         		callback(xmlhttp.responseText);
		}
		else
		{
			if(errorHandler)
				errorHandler(xmlhttp.status);
		}

		xmlhttp.abort();
	}

	var asynccallback = function ()
	{
		if(xmlhttp.readyState == 4)
		{
		 	if(xmlhttp.status == 200)
		 	{
				if(callback)
        			callback(xmlhttp.responseText);
         	}
         	else
			{
				if(errorHandler)
					errorHandler(xmlhttp.status);
			}

			xmlhttp.abort();
		}
	}

	this.reqcallback = synccallback;

	if(this.async)
		this.reqcallback = asynccallback;

	this.query = function ()
	{
		xmlhttp.abort();

		if(this.async)
		{
			xmlhttp.onreadystatechange = this.reqcallback;
		}

		xmlhttp.open(this.method, this.url, this.async);

		if(this.method.toUpperCase() == 'POST')
		{
			xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//			alert('before'+this.postdata);
			xmlhttp.send(this.postdata);
//			alert('after'+this.postdata);
		}
		else
		{
			xmlhttp.send(null);
		}

		return false;
	}

	run = run||false;
	if(run)
	{
		this.query();
	}

	//this.toString = function (){ alert("URL:     "+this.url+"\nASYNC:   "+this.async+"\nMETHOD:  "+this.method+"\nREQCALLBACK: "+this.reqcallback+"\nPOSTDATA:"+this.postdata); }
}

function isAlien(a) {
   return isObject(a) && typeof a.constructor != 'function';
}

function isArray(a) {
    return isObject(a) && a.constructor == Array;
}

function isBoolean(a) {
    return typeof a == 'boolean';
}

function isEmpty(o) {
    var i, v;
    if (isObject(o)) {
        for (i in o) {
            v = o[i];
            if (isUndefined(v) && isFunction(v)) {
                return false;
            }
        }
    }
    return true;
}

function isFunction(a) {
    return typeof a == 'function';
}

function isNull(a) {
    return typeof a == 'object' && !a;
}

function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}

function isObject(a) {
    return (a && typeof a == 'object') || isFunction(a);
}

function isString(a) {
    return typeof a == 'string';
}

function isUndefined(a) {
    return typeof a == 'undefined';
}

function Tag(closing, single, name, attributes, tag, text, open, close, length)
{
	this.closing = closing;		// boolean - if true, tag is a closing tag.
	this.single = single;		// boolean - if true, tag has no closing tag.
	this.name = name;		// String - tag identifier including the namespace.
	this.attributes = attributes;	// Object - attributes object, null if no attributes.
	this.tag = tag;			// String - the open tag text
	this.text = text;		// String - text between opening closing tags, or null if single tag
	this.open = open;		// numeric - the position in the source text where the tag starts
	this.close = close;		// numeric - the position in the source text where the tag ends
	this.length = length;		// numeric - the length of the tag
}

function Attribute(name, value)
{
	this.name = name;	// String - attribute identifier
	this.value = value;	// String - attribute value
}

function parseTag(tagstr)
{
	var newtag=null;
	var name = '';
	var attribute = '';
	var single = false;
	var closing = false;
	var namemode = true;
	var arr= new Array();
	var count=0;
	
	for(var i=0; i<tagstr.length; i++)
	{
		var curr = tagstr.charAt(i);

		if(curr == "<" || curr == ">") continue;

		if(curr == " ")
		{
			if(namemode)
				namemode = false;
			else
			{
				attribute = attribute.replace(/"/g, ""); 			// clear the quotes
				var pos = attribute.indexOf("=");				// find the equals sign

				if(pos > -1)
				{
					var attrname = attribute.substring(0,pos);		// Extract the name.
					var value = attribute.substring(pos+1);			// Extract the value.
					arr[count] = new Attribute(attrname, unescape(value));					
					count++;
				}
				attribute="";							//clear the string for the next attribute
			}
		}
		else if(curr == "/" && name == "")
			closing = true;
		else if(curr == "/" && name != "")
		{
			single = true;
			namemode = false;
		}
		else if(namemode)
			name += curr;
		else
			attribute += curr;
	}

	if(name != "")
	{
		// single, name, attributes, text, open, close, taglen
		newtag = new Tag(closing, single, name, arr, tagstr, '', 0, 0, tagstr.length);
	}

	return newtag;
}

function tagParser(source, debugflag)
{
	var open = 0;
	var close = 0;
	var str = source;
	var count = source.length;
	var loop = 0;
	var currpos = 0;
	var tags = new Array();
	var validate = false;  // to be implemented, validate while parsing file

//document.write("source length = " + source.length + "<br>\n");
	while(open > -1)
	{
		//Find Next Tag
		open = str.search("<");
  		close = str.search(">");
  		var currtag = str.substr(open, close-open+1);
  		
		if(debugflag)
			alert('open = '+open+'\nclose = '+close+'\ncurrtag = ' + currtag);

		if(open < 0) break;

		var ATag = parseTag(currtag);

		if(ATag.closing)
		{
			var i;

			if(debugflag)
				alert("close name = " + ATag.name);

			for(i=loop-1;i>-1;i--)
			{
				if(tags[i].name == ATag.name)
				{
					if(debugflag) 
						alert('close = '+(close+1)+'\ncurrpos = '+currpos+'\nclose pos = '+(currpos + close+1));

					tags[i].close = currpos + close+1;

					if(debugflag) 
						alert('text open pos = '+(tags[i].open + tags[i].length));
					if(debugflag) 
						alert('text close pos = '+(currpos + open));

					tags[i].text = source.substring(tags[i].open + tags[i].length, currpos + open);
					break;
				}
			}

			if(i == -1)
			{	
				break;
			}
		}
		else
		{
			if(debugflag)
				alert("open name = " + ATag.name);

			if(debugflag)
				alert('currpos = '+currpos);
			ATag.open = currpos + open;
			if(ATag.single)
				ATag.close = currpos + close+1;

			tags[loop] = ATag;
			loop++;
		}

  		str = str.substring(close+1, count+1);

		if(str)
		{
			if(debugflag)
				alert(str);
			currpos = source.indexOf(str, currpos);
			
		}
	}

	/*for(var i=0; i<loop; i++)
	{
		//alert(tags[i].name + "\nsingle = " + tags[i].single + "\n");
		//var text = source.substring(tags[i].open, tags[i].close);
		if(tags[i].single)
			alert(tags[i].name + "\n" + tags[i].tag);
		else
			alert(tags[i].name + "\n" + tags[i].text);
	}*/

	return tags;
}

function getTextBetweenTags(source, tagName)
{
	var openTagRE = new RegExp("<"+tagName+">", "gi");
	var closeTagRE = new RegExp("</"+tagName+">", "gi");
	var openpos = source.search(openTagRE);
	var closepos = source.search(closeTagRE);

	if (openpos == -1 || closepos == -1 || closepos <= openpos)
		return false;
		
	openpos += tagName.length+2;
	
	return source.substring(openpos, closepos);
}

function isParent(child, parent)
{
	if(child.open > parent.open && child.close < parent.close)
		return true;
}

function isChild(parent, child)
{
	return !isParent(child, parent);
}

function findTagsByName(tagarr, name)
{
	var arr=null;

	if(tagarr)
	{
		var j=0;
		arr = new Array();
		for(var i=0; i<tagarr.length; i++)
		{
			if(tagarr[i].name == name)
			{
				arr[j] = tagarr[i];
				j++;
			}
		}
	}

	return arr;
}

function findTagByName(tagarr, name, index)
{
	var arr=null;
	var start=0;

	if(isNumber(index))
		start=parseInt(index);

	if(tagarr)
	{
		if(tagarr.length > start)
		{
			var j=0;
			arr = new Array();
		
			for(var i=start; i<tagarr.length; i++)
			{
				if(tagarr[i].name == name)
				{
					arr = tagarr[i];
					break;
				}
			}
		}
	}

	return arr;
}

function findTagById(tagarr, ID)
{
	var retval=null;

	if(tagarr)
	{
		for(var i=0; i<tagarr.length; i++)
		{
			//alert("name = " + tagarr[i].name);
			if(tagarr[i].attributes)
			{
				if(tagarr[i].attributes.length > 0)
				{
					for(var j=0; j<tagarr[i].attributes.length; j++)
					{
						var name = tagarr[i].attributes[j].name;
						var value = tagarr[i].attributes[j].value;
						name = name.toLowerCase();
						//alert("name = " + name + "\nvalue = " + value);
						if(name == 'id' && value == ID)
						{
							retval = tagarr[i];
							break;
						}
					}
				}
			}
			if(retval != null) break;
		}
	}

	return retval;
}

function findTagByNameId(tagarr, name, ID)
{
	var retval=null;

	if(tagarr)
	{
		for(var i=0; i<tagarr.length; i++)
		{
			//alert("name = " + tagarr[i].name);
			if(tagarr[i].name == name && tagarr[i].attributes)
			{
				//alert("attr len = " + tagarr[i].attributes.length);
				if(tagarr[i].attributes.length > 0)
				{
					for(var j=0; j<tagarr[i].attributes.length; j++)
					{
						var name = tagarr[i].attributes[j].name;
						var value = tagarr[i].attributes[j].value;
						name = name.toLowerCase();
						//alert("name = " + name + "\nvalue = " + value);
						if(name == 'id' && value == ID)
						{
							retval = tagarr[i];
							break;
						}
					}
				}
			}
			if(retval != null) break;
		}
	}

	return retval;
}

function isNumber(n)
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function positionElement(ele, typex, typey, scroll) // (htmlelement reference)ele, (string) typex = 0, center or max, (string) typey = 0, center or max, (boolean)
{
	typex = typex||'0';
	typey = typey||'0';
	scroll = scroll||false;

	var dim = windowDimensions();
	var sdim = scrollDimensions();
	var width = ele.offsetWidth;
	var height = ele.offsetHeight;
	
	var posx = parseInt((dim[0]/2) - (width/2));
	var posy = parseInt((dim[1]/2) - (height/2));
	var maxx = parseInt(dim[0] - width);
	var maxy = parseInt(dim[1] - height);
	
	if (scroll)
	{
	 	ele.style.position='fixed';
/*	 	if (sdim[1] > 0)
	 	{
	 	 	posy += sdim[1];
	 	 	maxy += sdim[1];
	 	}
	 	if (sdim[0] > 0)
	 	{
	 	 	posx += sdim[0];
	 	 	maxx += sdim[0];
	 	}*/
	}

	if(typey == '0')
		ele.style.top = '0px';
	if(typex == '0')
		ele.style.top = '0px';
		
	if(typey == 'center')
		ele.style.top = posy+'px';
	if(typex == 'center')
		ele.style.left = posx+'px';
		
	if(typey == 'max')
		ele.style.top = maxy+'px';
	if(typex == 'max')
		ele.style.left = maxx+'px';
		
	if(isNumber(typey))
		ele.style.top = typey+'px';
	if(isNumber(typex))
		ele.style.left = typex+'px';		
}

function findPos(obj)
{
	var curleft = 0;
	var curtop  = 0;
	do
	{
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	}
	while(obj = obj.offsetParent);

	return [curleft, curtop];
}

function windowDimensions()
{
	var clientWidth = 0, clientHeight = 0;
	if( typeof( window.innerWidth ) == 'number' )
	{
		//Non-IE
		clientWidth = window.innerWidth;
		clientHeight = window.innerHeight;
	}
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
	{
		//IE 6+ in 'standards compliant mode'
		clientWidth = document.documentElement.clientWidth;
		clientHeight = document.documentElement.clientHeight;
	}
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) )
	{
		//IE 4 compatible
		clientWidth = document.body.clientWidth;
		clientHeight = document.body.clientHeight;
	}
	
	return [clientWidth, clientHeight];
}

function scrollDimensions()
{
	var scrollX = 0, scrollY = 0;
	if( typeof( window.pageYOffset ) == 'number' )
	{
		//Netscape compliant
		scrollY = window.pageYOffset;
		scrollX = window.pageXOffset;
	}
	else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
	{
		//DOM compliant
		scrollY = document.body.scrollTop;
		scrollX = document.body.scrollLeft;
	}
	else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
	{
		//IE6 standards compliant mode
		scrollY = document.documentElement.scrollTop;
		scrollX = document.documentElement.scrollLeft;
	}
	
	return [scrollX, scrollY];
}

function stopEvent(e)
{
	if (!e) var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation)
		e.stopPropagation();
		
	return false;
}

function build_submit_string(formobj)
{
	var submitstr = "";

	for(var i=0; i<formobj.elements.length; i++)
	{
		var type = formobj.elements[i].type;

		if(type == "text" || type == "textarea" || 
		   type == "password" || type == "hidden")
		{
			submitstr += handleText(formobj.elements[i]) + "&";
		}
		else if(type == "radio")
		{
			var value = handleRadio(formobj.elements[i]);
			if(value != "")
				submitstr += value + "&";
		}
		else if(type == "checkbox")
		{
			var value = handleCheckbox(formobj.elements[i]);
			if(value != "")
				submitstr += value + "&";
		}
		else if(type == "select-one" || type == "select-multiple")
		{
			var value = handleSelect(formobj.elements[i]);
			if(value != "")
				submitstr += value;
		}
	}
	
	if(submitstr.charAt(submitstr.length-1) == "&")
		submitstr = submitstr.substring(0,submitstr.length-1);

	return(submitstr);
}

//Handles textbox, textarea, password and hidden functions...
function handleText(element)
{
	return element.name + "=" + escape(element.value);
}

//Handles radio buttons
function handleRadio(element)
{
	if(element.checked)
		return element.name + "=" + escape(element.value); 
	else
		return "";
}

//Handles Checkboxes...
function handleCheckbox(element)
{
	if(element.checked)
		return element.name + "=" + escape(element.value); 
	else
		return "";
}

//Handles single and multiple select boxes
//
//if value is set then this function will submit the value
//else it will submit the text of the option

function handleSelect(element)
{
	var string = "";

	if(element.type == "select-multiple")
	{
		for(var j=0;j<element.options.length;j++)
		{
			if(element.options[j].selected)
			{
				string += element.name + "=";
				if(element.options[j].value == null || element.options[j].value == "undefined" || element.options[j].value == "")
					string += escape(element.options[j].text) + "&";
				else
					string += escape(element.options[j].value) + "&";
			}
		}
	}
	else
	{
		if(element.selectedIndex > -1)
		{
			if(element.options[element.selectedIndex].value == null || element.options[element.selectedIndex].value == "undefined" || element.options[element.selectedIndex].value == "")
				string += element.name + "=" +escape(element.options[element.selectedIndex].text) + "&";
			else
				string += element.name + "=" +escape(element.options[element.selectedIndex].value) + "&";
		}
	}
	
	return string;
}

function test(src)
{
	var emailReg = "^[\\w-_\.+]*[\\w-_\.]\@([\\w]+\\.)+[\\w]+[\\w]$";
	var regex = new RegExp(emailReg);
	return regex.test(src);
}

function checkEmail(inputvalue){
	var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	var chararray = [',', ';', ' ', '/'];
	
	inputvalue = inputvalue.trim();
	if(pattern.test(inputvalue)){      
	 	for (var i=0; i<chararray.length; i++)
		 {
		  	if (inputvalue.indexOf(chararray[i]) != -1)
		  		return false;
		 }   
		return true;   
	}else{   
		return false; 
 }
}

function check_change(statusmessageelementname, originalstring, applyelement, formobj)
{
 	var statusmessageelement = getElement(statusmessageelementname);
 	if (statusmessageelement)
	 	statusmessageelement.innerHTML = '';
 
	var submitstring = build_submit_string(formobj);
//	alert('submit='+submitstring+'  original='+originalstring+'  ele='+applyelement.id);
//	alert('display='+applyelement.style.display);
	if (submitstring == originalstring)
	{
		applyelement.style.display = 'none';
	}
	else
	{
	 	applyelement.style.display = '';
	}
}

function clearAllFields(formobj)
{
	for(var i=0; i<formobj.elements.length; i++)
	{
		var type = formobj.elements[i].type;
		if(type == "text" || type == "textarea" || type == "password")
		{
			formobj.elements[i].value = "";
		}
		else if(type == "radio" || type == "checkbox")
		{
			formobj.elements[i].checked = false;
		}
		else if(type == "select-one" || type == "select-multiple")
		{
			formobj.elements[i].selectedIndex = -1;
		}
	}
}

// utils.js

function launchLov(lovUrl, windowWidth, windowHeight)
{
  window.open(lovUrl, 'lovWindow', 
              'scrollbars=yes,resizable=yes,height='+windowHeight+',width='+windowWidth);
}

function lovOK(lovList, lovField)
{
  if (lovList.selectedIndex == -1)
  {
    alert("Please select a value");
    return;
  }
  lovField.value = lovList.options[lovList.selectedIndex].text;
  window.close();
}

function sizeLayer(layerName, width, height)
{
	var theLayer = document.getElementById(layerName);

	
	if(width > -1 && width != null && width != "undefined")
	{
		theLayer.style.width = width;
	}

	if(height > -1 && height != null && height != "undefined")
	{
		theLayer.style.height = height;
	}
}

// date.js

// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download. 
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================

// HISTORY
// ------------------------------------------------------------------
// May 17, 2003: Fixed bug in parseDate() for dates <1970
// March 11, 2003: Added parseDate() function
// March 11, 2003: Added "NNN" formatting option. Doesn't match up
//                 perfectly with SimpleDateFormat formats, but 
//                 backwards-compatability was required.

// ------------------------------------------------------------------
// These functions use the same 'format' strings as the 
// java.text.SimpleDateFormat class, with minor exceptions.
// The format string consists of the following abbreviations:
// 
// Field        | Full Form          | Short Form
// -------------+--------------------+-----------------------
// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// AM/PM        | a                  |
//
// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
// Examples:
//  "MMM d, y" matches: January 01, 2000
//                      Dec 1, 1900
//                      Nov 20, 00
//  "M/d/yy"   matches: 01/20/00
//                      9/2/00
//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
// ------------------------------------------------------------------

var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
function LZ(x) {return(x<0||x>9?"":"0")+x}

// ------------------------------------------------------------------
// isDate ( date_string, format_string )
// Returns true if date string matches format of format string and
// is a valid date. Else returns false.
// It is recommended that you trim whitespace around the value before
// passing it to this function, as whitespace is NOT ignored!
// ------------------------------------------------------------------
function isDate(val,format) {
	var date=getDateFromFormat(val,format);
	if (date==0) { return false; }
	return true;
	}

// -------------------------------------------------------------------
// compareDates(date1,date1format,date2,date2format)
//   Compare two date strings to see which is greater.
//   Returns:
//   1 if date1 is greater than date2
//   0 if date2 is greater than date1 of if they are the same
//  -1 if either of the dates is in an invalid format
// -------------------------------------------------------------------
function compareDates(date1,dateformat1,date2,dateformat2) {
	var d1=getDateFromFormat(date1,dateformat1);
	var d2=getDateFromFormat(date2,dateformat2);
	if (d1==0 || d2==0) {
		return -1;
		}
	else if (d1 > d2) {
		return 1;
		}
	return 0;
	}

// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date,format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
	}
	
// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
	}
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
	}
	
// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the 
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
function getDateFromFormat(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=1;
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	var ampm="";
	
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")    { x=2;y=4; }
			year=_getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { year=1900+(year-0); }
				else { year=2000+(year-0); }
				}
			}
		else if (token=="MMM"||token=="NNN"){
			month=0;
			for (var i=0; i<MONTH_NAMES.length; i++) {
				var month_name=MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					if (token=="MMM"||(token=="NNN"&&i>11)) {
						month=i+1;
						if (month>12) { month -= 12; }
						i_val += month_name.length;
						break;
						}
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="EE"||token=="E"){
			for (var i=0; i<DAY_NAMES.length; i++) {
				var day_name=DAY_NAMES[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
					}
				}
			}
		else if (token=="MM"||token=="M") {
			month=_getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=_getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=_getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=_getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { return 0; }
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return 0; }
			}
		else { if (date > 28) { return 0; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return 0; }
		}
	// Correct hours value
	if (hh<12 && ampm=="PM") { hh=hh-0+12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate.getTime();
	}

// ------------------------------------------------------------------
// parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d   MMM d, y   MMM d,y   y-MMM-d   d-MMM-y  MMM d
// M/d/y   M-d-y      M.d.y     MMM-d     M/d      M-d
// d/M/y   d-M-y      d.M.y     d-MMM     d/M      d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
function parseDate(val) {
	var preferEuro=(arguments.length==2)?arguments[1]:false;
	generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
	monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
	dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
	var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
	var d=null;
	for (var i=0; i<checkList.length; i++) {
		var l=window[checkList[i]];
		for (var j=0; j<l.length; j++) {
			d=getDateFromFormat(val,l[j]);
			if (d!=0) { return new Date(d); }
			}
		}
	return null;
	}

//lightbox.js

/*
	Lightbox JS: Fullsize Image Overlays 
	by Lokesh Dhakar - http://www.huddletogether.com

	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/

	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)
	
	Table of Contents
	-----------------
	Configuration
	
	Functions
	- getPageScroll()
	- getPageSize()
	- pause()
	- getKey()
	- listenKey()
	- showLightbox()
	- hideLightbox()
	- initLightbox()
	- addLoadEvent()
	
	Function Calls
	- addLoadEvent(initLightbox)

*/
var inclusionforms = new Array();

//
// getArgs()
// Return array with arguments from a string (SPLIT)
// 
function getArgs(str)
{
	var args = new Object();
	var pairs = str.split(";");			// Break at comma.

	for(var i = 1; i < pairs.length; i++)
	{
		var pos = pairs[i].indexOf('=');	// Look for "name=value".

		if (pos == -1) continue;		// If not found, skip.

		var argname = pairs[i].substring(0,pos);// Extract the name.
		var value = pairs[i].substring(pos+1);	// Extract the value.
		args[argname] = unescape(value);	// Store as a property.
   	}

   	return args;					// Return the object.
}


//
// getPageScroll()
// Returns array with x,y page scroll values.
// Core code from - quirksmode.org
//
function getPageScroll(){

	var yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}

	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}



//
// getPageSize()
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org
// Edit for Firefox by pHaez
//
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}


	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}


//
// pause(numberMillis)
// Pauses code execution for specified time. Uses busy code, not good.
// Code from http://www.faqts.com/knowledge_base/view.phtml/aid/1602
//
function pause(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

//
// getKey(key)
// Gets keycode. If 'x' is pressed then it hides the lightbox.
//

function getKey(e){
	if (e == null) { // ie
		keycode = event.keyCode;
	} else { // mozilla
		keycode = e.which;
	}
	key = String.fromCharCode(keycode).toLowerCase();
	
	if(key == 'x'){ hideLightbox(); }
}


//
// listenKey()
//
function listenKey () {	document.onkeypress = getKey; }
	

//
// showLightbox()
// Preloads images. Pleaces new image in lightbox then centers and displays.
//
function showLightbox(objLink, globaltop, globalleft, globalwidth, globalheight, event)
{
	// prep objects
	var objOverlay = document.getElementById('overlay');
	var objLightbox = document.getElementById('lightbox');
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	objOverlay.onclick = function () {hideLightbox(); return false;}
	objOverlay.oncontextmenu = function () {return false;}
	// set height of Overlay to take up whole page and show
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';

// if from modal code
	if(objLightbox)
	{
	 	if(xmlhttp)
	 	{
	 	 	var response = false;
			doRequest(xmlhttp, "GET", objLink.href, false, null, null);
//alert(xmlhttp.status);
			if (xmlhttp.status == 200)
			{
//alert('2');
	         	response = xmlhttp.responseText;
			}
	
			//alert(response);
		 	var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 75 - (arrayPageSize[3]/2)) / 2);
			var lightboxLeft = ((arrayPageSize[0] - 20 - (arrayPageSize[0]/2)) / 2);
					
			objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
			objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";
		 	if (globaltop)
			{
//				alert(globaltop);
				if(globaltop == 'mpos')
				{
					var posy=100;
					if(document.all)
					{
						posy=window.event.y;
					}
					else
					{
						posy=event.pageY;
					}
					objLightbox.style.top = posy+"px";
				}
				else
				{
		 	 		objLightbox.style.top = globaltop+"px";
				}
			}
		 	if (globalleft)
			{
//				alert(globalleft);
				if(globalleft == 'mpos')
				{
					var posx=100;
					if(document.all)
					{
						posx=window.event.x;
					}
					else
					{
						posx=event.pageX;
					}
					objLightbox.style.left = posx+"px";
				}
				else
				{
		 	 		objLightbox.style.left = globalleft+"px";
				}
		 	 	
			}
		 	if (globalwidth)
		 	 	objLightbox.style.width = globalwidth+"px";
		 	if (globalheight)
		 	 	objLightbox.style.height = globalheight+"px";

			objLightbox.innerHTML = response;
				
			selects = document.getElementsByTagName("select");
		        for (i = 0; i != selects.length; i++)
			{
		         	formname = selects[i].form.name;
		         	for (j=0; j<inclusionforms.length;j++)
		         	{
		         	 	if (formname == inclusionforms[j])
				            selects[i].style.visibility = "hidden";
				    }
		        }
		        
		        objLightbox.style.display = 'block';
	 	}
	}
}

	function positionLightbox(ele, typex, typey) // (htmlelement reference)ele, (string) typex = 0, center or max, (string) typey = 0, center or max
	{
		typex = typex||'0';
		typey = typey||'0';
	
		var dim = windowDim();
		var width = ele.offsetWidth;
		var height = ele.offsetHeight;
		
		var posx = parseInt((dim[0]/2) - (width/2));
		var posy = parseInt((dim[1]/2) - (height/2));
		var maxx = parseInt(dim[0] - width);
		var maxy = parseInt(dim[1] - height);
		
//		alert(dim);
//		alert([width, height]);
//		alert([posx, posy, maxx, maxy]);
		if(typey == '0')
			ele.style.top = '0px';
		if(typex == '0')
			ele.style.top = '0px';
			
		if(typey == 'center')
			ele.style.top = posy+'px';
		if(typex == 'center')
			ele.style.left = posx+'px';
			
		if(typey == 'max')
			ele.style.top = maxy+'px';
		if(typex == 'max')
			ele.style.left = maxx+'px';
			
		if(isNum(typey))
			ele.style.top = typey+'px';
		if(isNum(typex))
			ele.style.left = typex+'px';
	}
	
	function isNum(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
		
	function windowDim()
	{
		var clientWidth = 0, clientHeight = 0;
		if( typeof( window.innerWidth ) == 'number' )
		{
			//Non-IE
			clientWidth = window.innerWidth;
			clientHeight = window.innerHeight;
		}
		else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
		{
			//IE 6+ in 'standards compliant mode'
			clientWidth = document.documentElement.clientWidth;
			clientHeight = document.documentElement.clientHeight;
		}
		else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) )
		{
			//IE 4 compatible
			clientWidth = document.body.clientWidth;
			clientHeight = document.body.clientHeight;
		}
		
		return [clientWidth, clientHeight];
	}
	
//
// showLightbox()
// Preloads images. Pleaces new image in lightbox then centers and displays.
//
function showLightbox2(objLink, rel, event)
{
	var args = getArgs(rel);
	var globaltop = args['t'];
	var globalleft = args['l'];
	var globalwidth = args['w'];
	var globalheight = args['h'];
	var topdeviation = args['td'] || 0;

	// prep objects
	var objOverlay = document.getElementById('overlay');
	var objLightbox = document.getElementById('lightbox');
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	objOverlay.onclick = function () {hideLightbox(); return false;}
	objOverlay.oncontextmenu = function () {return false;}
	// set height of Overlay to take up whole page and show
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';

// if from modal code
	if(objLightbox)
	{
	 	if(xmlhttp)
	 	{
	 	 	var response = false;
			doRequest(xmlhttp, "GET", objLink.href, false, null, null);
//alert(xmlhttp.status);
			if (xmlhttp.status == 200)
			{
//alert('2');
	         	response = xmlhttp.responseText;
			}
	
			objLightbox.style.width = "600px";
			objLightbox.style.height = "600px";
			objLightbox.style.display = 'block';
	//		objLightbox.style.backgroundColor = '#eee';
			objLightbox.innerHTML = response;

			positionLightbox(objLightbox, 'center', 'center');
			
			selects = document.getElementsByTagName("select");
		        for (i = 0; i != selects.length; i++)
			{
		         	formname = selects[i].form.name;
		         	for (j=0; j<inclusionforms.length;j++)
		         	{
		         	 	if (formname == inclusionforms[j])
				            selects[i].style.visibility = "hidden";
				    }
		        }
		        
	 	}
	}
}


//
// showLightbox()
// Preloads images. Pleaces new image in lightbox then centers and displays.
//
function showModal(objLink, globaltop, globalleft, globalwidth, globalheight)
{
	// prep objects
	var objOverlay = document.getElementById('overlay');
	var objLightbox = document.getElementById('lightbox');
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	objOverlay.onclick = function () {return false;}
	// set height of Overlay to take up whole page and show
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';

	if(objLightbox)
	{
	 	if(xmlhttp)
	 	{
	 	 	var response = false;
			doRequest(xmlhttp, "GET", objLink.href, false, null, null);
			if (xmlhttp.status == 200)
			{
	         	response = xmlhttp.responseText;
			}
	
			//alert(response);
		 	var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - (arrayPageSize[3]/2)) / 2);
			var lightboxLeft = ((arrayPageSize[0] - 20 - (arrayPageSize[0]/2)) / 2);
				
			objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
			objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";
		 	if (globaltop)
		 	 	objLightbox.style.top = globaltop+"px";
		 	if (globalleft)
		 	 	objLightbox.style.left = globalleft+"px";
		 	if (globalwidth)
		 	 	objLightbox.style.width = globalwidth+"px";
		 	if (globalheight)
		 	 	objLightbox.style.height = globalheight+"px";

			objLightbox.style.width = "600px";
			objLightbox.style.height = "600px";
			objLightbox.style.display = 'block';
								  			 	
			objLightbox.innerHTML = response;
			
			positionLightbox(objLightbox, 'center', 'center');
				
			selects = document.getElementsByTagName("select");
		        for (i = 0; i != selects.length; i++)
			{
		         	formname = selects[i].form.name;
		         	for (j=0; j<inclusionforms.length;j++)
		         	{
		         	 	if (formname == inclusionforms[j])
				            selects[i].style.visibility = "hidden";
				    }
		        }
		        
		        objLightbox.style.display = 'block';
	 	}
	}
}

//
// hideLightbox()
//
function hideLightbox()
{
	// get objects
	objOverlay = document.getElementById('overlay');
	objLightbox = document.getElementById('lightbox');

	// hide lightbox and overlay
	objOverlay.style.display = 'none';
	objLightbox.style.display = 'none';
	//objLightbox.innerHTML = '';

	// make select boxes visible
	selects = document.getElementsByTagName("select");
    for (i = 0; i != selects.length; i++) {
		selects[i].style.visibility = "visible";
	}

	// disable keypress listener
	document.onkeypress = '';
}




//
// initLightbox()
// Function runs on window load, going through link tags looking for rel="lightbox".
// These links receive onclick events that enable the lightbox display for their targets.
// The function also inserts html markup at the top of the page which will be used as a
// container for the overlay pattern and the inline image.
//
function initLightbox(refreshanchorsonly)
{
//alert('1');	
	if (!document.getElementsByTagName){ return; }
	
	var anchors = document.getElementsByTagName("a");

	// loop through all anchor tags
	for (var i=0; i<anchors.length; i++){
		var anchor = anchors[i];
//alert('2');
//		if (anchor.getAttribute("href") && (anchor.getAttribute("rel") == "lightbox")){
//			anchor.onclick = function () {showLightbox(this, false, false, false, false); return false;}
//		}

		var rel = anchor.getAttribute("rel");
		if (rel)
		{
//alert('12');
			if (anchor.getAttribute("href") && (rel.search(/lightbox/) != -1)){
//alert('a');
			 	var args = getArgs(rel);
			 	//anchor.onclick = function (e) {showLightbox(this, args['t'], args['l'], args['w'], args['h'],e); return false;}
				anchor.onclick = function (e) {showLightbox2(this, this.getAttribute("rel"), e); return false;}
			}
			if (anchor.getAttribute("href") && (rel.search(/modal/) != -1)){
//alert('b');
			 	var args = getArgs(rel);
			 	anchor.onclick = function () {showModal(this, args['t'], args['l'], args['w'], args['h']); return false;}
			}
		}

		if (anchor.getAttribute("href") && (anchor.getAttribute("rel") == "modal")){
			anchor.onclick = function () {showModal(this, false, false, false, false); return false;}
		}
	}

	// the rest of this code inserts html at the top of the page that looks like this:
	//
	// <div id="overlay">
	//		<a href="#" onclick="hideLightbox(); return false;"><img id="loadingImage" /></a>
	//	</div>
	// <div id="lightbox">
	//		<a href="#" onclick="hideLightbox(); return false;" title="Click anywhere to close image">
	//			<img id="closeButton" />		
	//			<img id="lightboxImage" />
	//		</a>
	//		<div id="lightboxDetails">
	//			<div id="lightboxCaption"></div>
	//			<div id="keyboardMsg"></div>
	//		</div>
	// </div>
	
	if(refreshanchorsonly != true)
	{
	 //	alert("init");
		var objBody = document.getElementsByTagName("body").item(0);
		
		// create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
		var objOverlay = document.createElement("div");
		objOverlay.setAttribute('id','overlay');
		objOverlay.onclick = function () {hideLightbox(); return false;}
		objOverlay.style.display = 'none';
		objOverlay.style.position = 'absolute';
		objOverlay.style.top = '0';
		objOverlay.style.left = '0';
		objOverlay.style.zIndex = '90';
	 	objOverlay.style.width = '100%';
		objBody.insertBefore(objOverlay, objBody.firstChild);
		
		var arrayPageSize = getPageSize();
		var arrayPageScroll = getPageScroll();
	
		// create lightbox div, same note about styles as above
		var objLightbox = document.createElement("div");
		objLightbox.setAttribute('id','lightbox');
		objLightbox.style.display = 'none';
		objLightbox.style.position = 'absolute';
		objLightbox.style.zIndex = '100';	
		objBody.insertBefore(objLightbox, objOverlay.nextSibling);
	}
}



//
// addLoadEvent()
// Adds event to window.onload without overwriting currently assigned onload functions.
// Function found at Simon Willison's weblog - http://simon.incutio.com/
//
function addLoadEvent(func)
{	
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
    	window.onload = func;
	} else {
		window.onload = function(){
		oldonload();
		func();
		}
	}

}



addLoadEvent(initLightbox);	// run initLightbox onLoad

//legislation.js

var perform_acrobat_detection = function()
{ 
  //
  // The returned object
  // 
  var browser_info = {
    name: null,
    acrobat : null,
    acrobat_ver : null
  };
  
  if(navigator && (navigator.userAgent.toLowerCase()).indexOf("chrome") > -1) browser_info.name = "chrome";
  else if(navigator && ((navigator.userAgent.toLowerCase()).indexOf("msie") > -1 || (navigator.userAgent.toLowerCase()).indexOf("trident") > -1)) browser_info.name = "ie";
  else if(navigator && (navigator.userAgent.toLowerCase()).indexOf("firefox") > -1) browser_info.name = "firefox";
  else if(navigator && (navigator.userAgent.toLowerCase()).indexOf("msie") > -1) browser_info.name = "other";
	
	
 try
 {
  if(browser_info.name == "ie")
  {          
   var control = null;
   
   //
   // load the activeX control
   //                
   try
   {
    // AcroPDF.PDF is used by version 7 and later
    control = new ActiveXObject('AcroPDF.PDF');
   }
   catch (e){}
   
   if (!control)
   {
    try
    {
     // PDF.PdfCtrl is used by version 6 and earlier
     control = new ActiveXObject('PDF.PdfCtrl');
    }
    catch (e) {}
   }
   
   if(!control)
   {     
    browser_info.acrobat == null;
    return browser_info;  
   }
   
   version = control.GetVersions().split(',');
   version = version[0].split('=');
   browser_info.acrobat = "installed";
   browser_info.acrobat_ver = parseFloat(version[1]);                
  }
  else if(browser_info.name == "chrome")
  {
   for(key in navigator.plugins)
   {
    if(navigator.plugins[key].name == "Chrome PDF Viewer" || navigator.plugins[key].name == "Adobe Acrobat")
    {
     browser_info.acrobat = "installed";
     browser_info.acrobat_ver = parseInt(navigator.plugins[key].version) || "Chome PDF Viewer";
    }
   } 
  }
  //
  // NS3+, Opera3+, IE5+ Mac, Safari (support plugin array):  check for Acrobat plugin in plugin array
  //    
  else if(navigator.plugins != null)
  {  
   var acrobat = navigator.plugins['Adobe Acrobat'];
   if(acrobat == null)
   {           
       	var pluginstring = "";
		for(var i in navigator.plugins)
   		{
		 	pluginstring = navigator.plugins[i]['name']+"\n";
	 		if(navigator.plugins[i]['name'])
	 			if(navigator.plugins[i]['name'].substr(0, 13) == "Adobe Acrobat")
	 			{
					browser_info.acrobat = "installed";
					browser_info.acrobat_ver = navigator.plugins[i].name;
					break;
	 			}
		}
		if (browser_info.acrobat != "installed")
		{
	   		browser_info.acrobat = null;
	   		browser_info.acrobat_ver = null;
	   	}
   }
   else
   {
	   	browser_info.acrobat = "installed";
   		browser_info.acrobat_ver = parseInt(acrobat.version[0]);                   
   	}
  }
  
  
 }
 catch(e)
 {
  browser_info.acrobat_ver = null;
 }
   
  return browser_info;
}

function load_failed(ele, response)
{
//alert(response);
 	if (ele)
 	{
 		ele.innerHTML = "Results failed";
 	}
}

function load_success(ele, response)
{
// alert('success');
  	var result = getTextBetweenTags(response, 'RESULT');
 	if (ele)
 	{
 	 	if (result)
	 		ele.innerHTML = result;
	 	else
	 		ele.innerHTML = "No results found";
 	}
}


function load_member_pulldown_s_failed(response)
{
  	var ele = document.getElementById('Senators');
  	load_failed(ele, response);
}

function load_member_pulldown_h_failed(response)
{
  	var ele = document.getElementById('Representatives');
  	load_failed(ele, response);
}

function load_member_pulldown_s_success(response)
{
  	var ele = document.getElementById('Senators');
  	load_success(ele, response);
}

function load_member_pulldown_h_success(response)
{
  	var ele = document.getElementById('Representatives');
  	load_success(ele, response);
}

function load_member_pulldown(url, chamber, session, perm_sponsor_code, pagetype)
{
  	var savestring = 'GETMEMBERS='+chamber+'&SESSION='+session+'&PERM_SPONSOR_CODE='+perm_sponsor_code+'&PAGETYPE='+pagetype;
//  	alert(savestring);
	if (chamber == 'S')
	{	
	 	new ajax(url, true, "POST", savestring, true, load_member_pulldown_s_success, load_member_pulldown_s_failed);
	}
	else if (chamber == 'H')
	{
	 	new ajax(url, true, "POST", savestring, true, load_member_pulldown_h_success, load_member_pulldown_h_failed);
	}
	return;
}


function load_action_pulldown_failed(response)
{
  	var ele = document.getElementById('actions');
  	load_failed(ele, response);
}

function load_action_pulldown_success(response)
{
  	var ele = document.getElementById('actions');
  	load_success(ele, response);
}

function load_action_pulldown(url, session, actioncode, pagetype)
{
  	var savestring = 'GETACTIONS=Y&SESSION='+session+'&ACTIONCODE='+actioncode+'&PAGETYPE='+pagetype;
//  	alert(savestring);
 	new ajax(url, true, "POST", savestring, true, load_action_pulldown_success, load_action_pulldown_failed);
	return;
}


function load_index_pulldown_failed(response)
{
  	var ele = document.getElementById('index');
  	load_failed(ele, response);
}

function load_index_pulldown_success(response)
{
  	var ele = document.getElementById('index');
  	load_success(ele, response);
}

function load_index_pulldown(url, session, indexcode, indextext, aorb, pagetype)
{
  	var savestring = 'GETINDEX=Y&SESSION='+session+'&INDEXCODE='+indexcode+'&INDEXTEXT='+indextext+'&AORB='+aorb+'&PAGETYPE='+pagetype;
 	new ajax(url, true, "POST", savestring, true, load_index_pulldown_success, load_index_pulldown_failed);
	return;
}


// logon_lits.js

var screenSizeWidth = parseInt(screen.width);
var screenSizeHeight = parseInt(screen.height);
function litswindow(){
	if(screenSizeWidth >= 1024)
	{
		var thiswindow=window.open ('https://reports.scstatehouse.gov/lits/litsindex.html','litsWindow','left=0,top=0,width=1014,height=738,scrollbars=yes,menubar=no,status=no,resizable=no');
	}
	else
	{
		var thiswindow=window.open ('https://reports.scstatehouse.gov/lits/litsindex.html','litsWindow','left=0,top=0,width=790,height=565,scrollbars=yes,menubar=no,status=no,resizable=no');
	}
	thiswindow.focus();
}

function shnwindow(){
	if(screenSizeWidth >= 1024)
	{
		var thiswindow=window.open ('https://www1.scstatehouse.net/shn/shnindex.html','shnWindow','left=0,top=0,width=1014,height=738,scrollbars=yes,menubar=no');
	}
	else
	{
		var thiswindow=window.open ('https://www1.scstatehouse.net/shn/shnindex.html','shnWindow','left=0,top=0,width=790,height=565,scrollbars=yes,menubar=no');
	}
	thiswindow.focus();
}

function multisearchwindow(screen){
	if(screenSizeWidth >= 1024)
	{
		var thiswindow=window.open ('https://reports.scstatehouse.gov/cgi-bin/multi_search.exe?screen='+screen,'multisearchwindow','left=0,top=0,width=1020,height=640,scrollbars=yes,menubar=no');
	}
	else
	{
		var thiswindow=window.open ('https://reports.scstatehouse.gov/cgi-bin/multi_search.exe?screen='+screen,'multisearchwindow','left=0,top=0,width=790,height=470,scrollbars=yes,menubar=no');
	}
	thiswindow.focus();
}

function rsschoicewindow(){
	var thiswindow=window.open ('/rsschoice.html','rsschoiceWindow','left=0,top=0,width=610,height=400,scrollbars=yes,menubar=no');
	thiswindow.focus();
}

function rsswindow(){
	var thiswindow=window.open ('https://rss.scstatehouse.gov','rssWindow');
	thiswindow.focus();
}

// message2.js

if(!String.trim)
{
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,"");
	}
	String.prototype.ltrim = function() {
		return this.replace(/^\s+/,"");
	}
	String.prototype.rtrim = function() {
		return this.replace(/\s+$/,"");
	}
}

$(document).ready(function(){
 	$('a.attachlink').click(function(){
 	 
 	 	var ready = false;
 	 	if($("#attachlist").contents().length)
 	 	{
 	 	 	alert("A file has already been attached. If you wish to attach a different file, you must first remove the currently attached file.")
 	 	 	/*if(confirm("A file has already been attached. If you wish to attach a different file you must first remove the currently attached file.\n\nDo you wish to remove the currently attached file?"))
 	 	 	{
				$.get($('#attachlist a').attr('href'), function(response){
		 		 	alert(response);
				 	if(response == 'File deleted.')
				 	{
				 	 	$('#attachlist').empty().append('');
				 	 	ready = true;
				 	}
				});
 	 	 	}*/
 	 	}
 		else
 			ready = true;
 		
 		if(ready)
 		{
		 	configureLightbox(true);
			$("#dialoglayer").load($(this).attr('href'), function(){
			 	//alert($(this).html());
			 	$("#backlayer, #dialoglayer").fadeIn(300);
			 	
			 	$('a.close').click(function(){
				 	closeLightbox();
					return false;
				});
				
				$('#uploadform').find(':file').each(function (index, value){
				 	$(this).change(function(){
					  	$('.dialog #uploaderror').empty();  
					 	check_extension(value); 
						check_filename(value);
					});
				});
			});
		}
		
		return false;
	});
 	
 	$('#contactform').submit(function(e){
 	 	if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
 	 	
 	 	openLightbox('Sending...', {});
 	 	
 	 	submitContactForm();
 	 	return false;
 	});
 	
 	$('#contactform input[name=clear]').click(function(){
 	 	resetRequiredFields();
 	});
 	
 	$('#contactform input[name=cancel]').click(function(){
 	 	//alert($('a#backlink').attr('href'));
 	 	document.location.replace($('a#backlink').attr('href'));
 	});
 	
 	$('#contactform').find(':input').each(function (index, value){
 	 	if(value.type != 'hidden' && value.type != 'button' && value.type != 'reset' && value.type != 'submit')
 	 	{
 	 	 	$(this).select(function(){
	 	 	 	checkFields(value);
			});
			
	 	 	$(this).focus(function(){
	 	 	 	checkFields(value);
			});
			
			if(value.type == 'select-one' || value.type == 'select-multiple'){
			 	$(this).change(function(){
		 	 	 	checkFields(value);
				});
			}
			else{
				$(this).keyup(function(){
		 	 	 	checkFields(value);
				});
			}
			
			$(this).focusout(function(){
	 	 	 	checkFields(value);
			});
			
			checkFields(value);
			$('#statusmessage').empty().append('&nbsp;');
		}
 	});

 	setInterval(function(){
	 	$('#contactform').find(':input').each(function (index, value){
	 	 	if(value.type != 'hidden' && value.type != 'button' && value.type != 'reset' && value.type != 'submit'){
				checkFields_alt(value);
			}
	 	});
	}, 2000);
});

function loadRemoveScript()
{
 	$('#attachlist a').click(function(){
	 	if(confirm('Do you wish to delete this file?'))
	 	{
	 		$.get($(this).attr('href'), function(response){
	 		 	alert(response);
			 	if(response == 'File deleted.')
			 	{
			 	 	$('#attachlist').empty().append('');
			 	}
			});
	 	}
		
		return false;
	});
}

function submitContactForm()
{
	var form = document.contactform;
	if (form.FILEATTACHMENTS.value == ''){
	 	form.ATTACHMENTKEY.value = '';
	}
	
	checkRequiredFields();
	if($('.required').length == 0)
 	{
 	 	//form.submit();
		
		$.post($('#contactform').attr('action'), $('#contactform').serialize(), function(response){
		 	if(response == 'Message Sent')
		 	{
		 	 	$("#dialoglayer").empty().append(response);
		 	 	setTimeout(function(){
		 	 	 	closeLightbox();
		 	 	 	document.location.replace($('a#backlink').attr('href'));
		 	 	}, 3000);
		 	}
		 	else
		 	{
		 		$("#dialoglayer").empty().append(response);
		 		checkRequiredFields();
			 	document.getElementById('captcha').src = '/securimage/securimage_show.php';
		 		//$('#statusmessage').empty().append(response);
		 		setTimeout(function(){
		 	 	 	closeLightbox();
		 	 	}, 3000);
		 	 	//closeLightbox();
		 	 	//checkRequiredFields();
		 		//$('#statusmessage').empty().append(response);
		 		//document.getElementById('captcha').src = '/securimage/securimage_show.php';
		 	}
		});
	}
}

function resetRequiredFields()
{
 	$('#statusmessage').empty().append('&nbsp;');
	$('#contactform').find(':input').each(function (index, value){
 	 	if(value.type != 'hidden' && value.type != 'button' && value.type != 'reset' && value.type != 'submit')
 	 	{
			var required = ['FIRSTNAME','LASTNAME','ADDRESS1','CITY','STATE','ZIP','EMAIL','EMAIL2','MESSAGE','captcha_code'];
			
			var index=required.indexOf(value.name);
			if(index > -1)
			{
			 	if(!$('#contactform #'+value.id).hasClass('required'))
					$('#contactform #'+value.id).addClass('required');
			}
		}
	});
}

function checkRequiredFields()
{
 	$('#statusmessage').empty().append('&nbsp;');
	$('#contactform').find(':input').each(function (index, value){
 	 	if(value.type != 'hidden' && value.type != 'button' && value.type != 'reset' && value.type != 'submit')
 	 	{
			var required = ['FIRSTNAME','LASTNAME','ADDRESS1','CITY','STATE','ZIP','EMAIL','EMAIL2','MESSAGE','captcha_code'];
			
			var index=required.indexOf(value.name);
			if(index > -1)
			{
			 	checkFields(value);
			}
		}
	});
	
	if($('.required').length != 0)
	{
		alert('Please correct the fields marked in red and then attempt to send the form again.');
 	}
}

function configureLightbox(modal)
{
 	modal = modal || false;
 	
 	if(!$('#backlayer').length){
	 	var overlay = $("<div id=\"backlayer\">&nbsp;</div>");
		$("body").append(overlay);
	}
	
	if(!$('#dialoglayer').length){
		var lightbox = $("<div id=\"dialoglayer\"></div>");
		$("body").append(lightbox);
	}
	
	if(!modal)
	{
		$("#backlayer").click(function(){
	 	 	closeLightbox();
	 	});
	}
	else
	{
	 	$("#backlayer").click(function(){
	 	});	
	}
}

function openLightbox(text, options)
{
 	configureLightbox();
 	
 	$("#dialoglayer").css(options);
 	$("#dialoglayer").empty().append(text);
 	
	$("#backlayer, #dialoglayer").fadeIn(300);
		 	
	if($('#dialoglayer a.close').length)
	{
	 	$('#dialoglayer a.close').click(function(){
		 	closeLightbox();
			return false;
		});
	}
}

function closeLightbox()
{
	$("#backlayer, #dialoglayer").fadeOut(300);
}

function checkFields_alt(field)
{
 	var sendbutton = 'sendbutton';
 	var messagebox = 'statusmessage';
 	
 	var requiredstatus = {
 	 	'FIRSTNAME':'Enter your first name',
 	 	'LASTNAME':'Enter your last name',
 	 	'ADDRESS1':'Enter your address (first line)',
 	 	'CITY':'Enter your city',
 	 	'STATE':'Select a state',
 	 	'ZIP':'Enter your zip-code',
 	 	'ZIP-2':'Zip-code should be 5 or 9 digits',
 	 	'EMAIL':'Enter your email address',
 	 	'EMAIL-2':'Email address is not valid',
 	 	'EMAIL2':'Enter your email address again',
 	 	'EMAIL2-2':'Email addresses do not match',
 	 	'MESSAGE':'Enter your message',
 	 	'captcha_code':'Enter the text from the image'
 	};
 	
 	var optionalstatus = {
 	 	'ADDRESS2':'Enter your address (second line)',
 	 	'PHONE':'Enter your phone number',
 	 	'SUBJECT':'Enter your message subject',
 	 	'FIRSTNAME':'First name entered.',
 	 	'LASTNAME':'Last name entered.',
 	 	'ADDRESS1':'Address (first line) entered.',
 	 	'CITY':'City entered.',
 	 	'STATE':'State entered.',
 	 	'ZIP':'Zip-code entered.',
 	 	'EMAIL':'Email address entered.',
 	 	'EMAIL2':'Email address matches above',
 	 	'MESSAGE':'Message entered',
 	 	'captcha_code':'Verification text entered'
 	};

 	//alert(requiredstatus[field.name]);
 	switch(field.name)
 	{
 	 	case 'FIRSTNAME': case 'LASTNAME': case 'ADDRESS1': case 'CITY': case 'MESSAGE':
 	 		if(!handleFormField_alt(field, requiredstatus[field.name], optionalstatus[field.name]))
 	 			return;
 	 		break;
 	 	case 'STATE':
 	 		if(field.selectedIndex <= 0){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
 			}
 	 		break;
 	 	case 'ZIP':
 			if(field.value == ''){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else if(!checkZip(field.value)){
 			 	$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
 			}
 			break;
 		case 'EMAIL':
 			if(field.value == ''){
 			 	$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else if(!checkEmail(field.value))
 			{
 				$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
 			}
 			break;
 		case 'EMAIL2':
 			if(field.value == ''){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else if(field.value != $('[name=EMAIL]').val())
 			{
 			 	$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
 			}
 			break;
 		case 'captcha_code':
 			if(field.value == '' || field.value.length != 5){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
 			}
 			break;
 		default:
 			if(field.value == ''){
 				return;
 			}
 			//else{
			// 	$('#'+messagebox).empty().append(optionalstatus[field.name]);
			//}
 	}
 	if($('.required').length == 0)
 	{
	 	$('[name=sendbutton]').attr('disabled', false);
		$('#'+messagebox).empty().append('Click Send to send the message');
	}
}

function checkFields(field)
{
 	var sendbutton = 'sendbutton';
 	var messagebox = 'statusmessage';
 	
 	var requiredstatus = {
 	 	'FIRSTNAME':'Enter your first name',
 	 	'LASTNAME':'Enter your last name',
 	 	'ADDRESS1':'Enter your address (first line)',
 	 	'CITY':'Enter your city',
 	 	'STATE':'Select a state',
 	 	'ZIP':'Enter your zip-code',
 	 	'ZIP-2':'Zip-code should be 5 or 9 digits',
 	 	'EMAIL':'Enter your email address',
 	 	'EMAIL-2':'Email address is not valid',
 	 	'EMAIL2':'Enter your email address again',
 	 	'EMAIL2-2':'Email addresses do not match',
 	 	'MESSAGE':'Enter your message',
 	 	'captcha_code':'Enter the text from the image'
 	};
 	
 	var optionalstatus = {
 	 	'ADDRESS2':'Enter your address (second line)',
 	 	'PHONE':'Enter your phone number',
 	 	'SUBJECT':'Enter your message subject',
 	 	'FIRSTNAME':'First name entered.',
 	 	'LASTNAME':'Last name entered.',
 	 	'ADDRESS1':'Address (first line) entered.',
 	 	'CITY':'City entered.',
 	 	'STATE':'State entered.',
 	 	'ZIP':'Zip-code entered.',
 	 	'EMAIL':'Email address entered.',
 	 	'EMAIL2':'Email address matches above',
 	 	'MESSAGE':'Message entered',
 	 	'captcha_code':'Verification text entered'
 	};
 	//alert(requiredstatus[field.name]);
 	switch(field.name)
 	{
 	 	case 'FIRSTNAME': case 'LASTNAME': case 'ADDRESS1': case 'CITY': case 'MESSAGE':
 	 		if(!handleFormField(field, requiredstatus[field.name], optionalstatus[field.name]))
 	 			return;
 	 		break;
 	 	case 'STATE':
 	 		if(field.selectedIndex <= 0){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name]);
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
			 	$('#'+messagebox).empty().append(optionalstatus[field.name]);
 			}
 	 		break;
 	 	case 'ZIP':
 			if(field.value == ''){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name]);
 				return;
 			}
 			else if(!checkZip(field.value)){
 			 	$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name+'-2']);
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
			 	$('#'+messagebox).empty().append(optionalstatus[field.name]);
 			}
 			break;
 		case 'EMAIL':
 			if(field.value == ''){
 			 	$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name]);
 				return;
 			}
 			else if(!checkEmail(field.value))
 			{
 				$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name+'-2']);
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
			 	$('#'+messagebox).empty().append(optionalstatus[field.name]);
 			}
 			break;
 		case 'EMAIL2':
 			if(field.value == ''){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name]);
 				return;
 			}
 			else if(field.value != $('[name=EMAIL]').val())
 			{
 			 	$('[name=sendbutton]').attr('disabled', true);
 			 	if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name+'-2']);
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
			 	$('#'+messagebox).empty().append(optionalstatus[field.name]);
 			}
 			break;
 		case 'captcha_code':
 			if(field.value == '' || field.value.length != 5){
 				$('[name=sendbutton]').attr('disabled', true);
 				if(!$('#'+field.id).hasClass('required'))
					$('#'+field.id).addClass('required');
 				$('#'+messagebox).empty().append(requiredstatus[field.name]);
 				return;
 			}
 			else{
 			 	if($('#'+field.id).hasClass('required'))
	 				$('#'+field.id).removeClass('required');
			 	$('#'+messagebox).empty().append(optionalstatus[field.name]);
 			}
 			break;
 		default:
 			if(field.value == ''){
 				$('#'+messagebox).empty().append(optionalstatus[field.name]);
 				return;
 			}
 			else{
			 	$('#'+messagebox).empty().append(optionalstatus[field.name]);
			}
 	}
 	
 	if($('.required').length == 0)
 	{
	 	$('[name=sendbutton]').attr('disabled', false);
		$('#'+messagebox).empty().append('Click Send to send the message');
	}
}

function checkEmail(inputvalue){
	//var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	var pattern=/^([A-Za-z0-9_%\+\-\']+\.?)+[A-Za-z0-9_%\+\-\']{1}@([A-Za-z0-9\-]+\.{1})+[A-Za-z]{2,6}$/;
	
	var chararray = [',', ';', ' ', '/'];
	inputvalue = inputvalue.trim();
	if(pattern.test(inputvalue)){
		for (var i=0; i<chararray.length; i++){
			if (inputvalue.indexOf(chararray[i]) != -1)
				return false;
		}   
	return true;   
	}else{   
		return false; 
	}
}

function checkZip(inputvalue)
{
	var pattern=/^(?!0{5})(\d{5})(?!-?0{4})(-?\d{4})?$/;

	inputvalue = inputvalue.trim();
	if(pattern.test(inputvalue)){
		return true;   
	}else{   
		return false; 
	}
}

function handleFormField_alt(field, requiredstatus, optionalstatus)
{
 	var sendbutton = 'sendbutton';
 	var messagebox = 'statusmessage';
 	
	if(field.value == ''){
		$('[name=sendbutton]').attr('disabled', true);
		if(!$('#'+field.id).hasClass('required'))
			$('#'+field.id).addClass('required');
		return false;
	}
	else{
	 	if($('#'+field.id).hasClass('required'))
	 		$('#'+field.id).removeClass('required');
	 	return true;
	}
}

function handleFormField(field, requiredstatus, optionalstatus)
{
 	var sendbutton = 'sendbutton';
 	var messagebox = 'statusmessage';
 	
	if(field.value == ''){
		$('[name=sendbutton]').attr('disabled', true);
		if(!$('#'+field.id).hasClass('required'))
			$('#'+field.id).addClass('required');
		$('#'+messagebox).empty().append(requiredstatus);
		return false;
	}
	else{
	 	if($('#'+field.id).hasClass('required'))
	 		$('#'+field.id).removeClass('required');
	 	$('#'+messagebox).empty().append(optionalstatus);
	 	return true;
	}
}
/*
function buildpage(attachmentkey)
		{
			var updated = false, response = false, postdata = null;
		 	var url = "/uploadfile.php?ATTACHMENTKEY="+attachmentkey;
//		 	statusmessageelement.innerHTML = url + postdata;
//		 	return updated;
		 	
			doRequest(xmlhttp, "POST", url, false, null, postdata);
			if (xmlhttp.status == 200)
			{
	         	response = xmlhttp.responseText;
			}
			return response;		 	
		}

		function removefile(attachmentkey, filename)
		{
			var updated = false, response = false, postdata = null;
		 	var url = "/uploadfile.php?ATTACHMENTKEY="+attachmentkey+"&RemoveFile="+filename;
		 	
//		 	statusmessageelement.innerHTML = url + postdata;
//		 	return updated;
		 	
			doRequest(xmlhttp, "POST", url, false, null, postdata);
			if (xmlhttp.status == 200)
			{
	         	response = xmlhttp.responseText;
			}		 	
		}
		
		function combine_filenames(formobj)
		{
		 	var string = "";

		 	for(var j=0;j<formobj.options.length;j++)
			{
				if(formobj.options[j].value == null || formobj.options[j].value == "undefined" || formobj.options[j].value == "")
					string += formobj.options[j].text + ";";
				else
					string += formobj.options[j].value + ";";
			}
			return string;
		}
*/
		function check_extension(obj)
		{
			var ext=obj.value.slice(-4).toUpperCase();
			if ((ext != ".PDF") && (ext != ".RTF") && (ext != ".XLS") && (ext != "XLSX") && (ext != ".DOC") && (ext != "DOCX"))
			{
			 	obj.form.reset();
			 	alert("Invalid document type:\nAllowed filetypes are .pdf, .rtf, excel and word documents ONLY");
			}
		}

		function check_filename(obj)
		{
		 	if (obj.value != "")
		 	{
		 	 	var lastperiod = obj.value.lastIndexOf(".");
		 	 	if (lastperiod != -1)
		 	 	{
					var lastindex = obj.value.lastIndexOf("\\");
					
					var rootname = '';
					if(lastindex > -1 && lastindex < lastperiod)
						rootname=obj.value.slice(lastindex+1,lastperiod);
					else
						rootname=obj.value.slice(0,lastperiod);

					rootname = rootname.replace("C:\\fakepath\\", "");  //IE-8 implementation to HTML5 specifications
					var result=rootname.search(/[^A-Z^a-z^_^0-9^ ]/);

					if (result != -1)
					{
					 	obj.form.reset();
					 	alert("Invalid file name:\nPlease use a file with only alphanumeric characters in the filename");
					}
				}
				else
				{
				 	obj.form.reset();
				 	alert("Invalid file name:\nThere is no extension in the filename");
				}				
			}
		}
		
//comm_meeting.js

var flashinstalled = 0;
var flashversion = 0;
MSDetect = "false";
if (navigator.plugins && navigator.plugins.length)
{
  x = navigator.plugins["Shockwave Flash"];
  if (x)
  {
     flashinstalled = 2;
     if (x.description)
     {
        y = x.description;
        flashversion = y.charAt(y.indexOf('.')-1);
     }
  }
  else
     flashinstalled = 1;
  if (navigator.plugins["Shockwave Flash 2.0"])
  {
     flashinstalled = 2;
     flashversion = 2;
  }
}
else if (navigator.mimeTypes && navigator.mimeTypes.length)
{
  x = navigator.mimeTypes['application/x-shockwave-flash'];
  if (x && x.enabledPlugin)
     flashinstalled = 2;
  else
     flashinstalled = 1;
}
else
  MSDetect = "true";
	
function is_numeric(input){
    return typeof(input)=='number';
}

function toTitleCase(str)
{
	'use strict';
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// determine if feed has captions
function isCC(feed) {
	'use strict';
	// closed captioning is only currently available on House and Senate live feeds
	// using switch statement to facilitate addition of future feeds on a case by case basis
	switch (feed) {
		case 'SH-House':
		case 'SH-Senate':
			return '/LiveCC/_definst_/';
		default:
			return '/Live/_definst_/';
	}
}
// generate media server streaming URL from reference
function formatURL(scheme, address, reference, quality) {
	console.log({scheme, address, reference, quality});
	'use strict';
	var path = '',
		suffix = '',
		authority;

	// unencrypted port is 1935 and tls port is 4443
	authority = address + ':' + ((scheme.substr(-1) === 's') ? '4443' : '1935');
	// if reference contains '.mp4' then switch to VOD playback
	if (reference.indexOf('ETV') > -1)
	{
		return scheme + '://' + authority + '/ETV/_definst_/mp4:' + reference + '-' + quality + '/playlist.m3u8';
	}
	if (reference.indexOf('.mp3') > -1)
	{
		quality = null;
	}
	else if (reference.indexOf('.mp4') > -1)
	{
		quality = null;
	}
	else
	{
		// establish default quality if not specified
		quality = quality||'0';
	}
	// if scheme is http or https then format for HLS playlist delivery
	if (scheme.substr(0,4) === 'http') {suffix = '/playlist.m3u8';}

	// quality should be one of the following:
	// '3' = live 720p
	// '2' = live 360p
	// '1' = live 180p
	// '0' = live smil (adaptive)
	// 'A' = live audio only
	// 'E' = external (off-campus live feed)
	// null = video on demand (archive)

	switch (quality) {
		case null:
			if (reference.indexOf('.mp3') > -1)
			{
				path = '/VOD/_definst_/mp3:archive/' + reference;
			} else {
				path = '/VOD/_definst_/mp4:archive/' + reference;
			}
			break;
		case 'E':
			path = "/External/_definst_/mp4:" + reference;
			break;
		case '0':
			path = isCC(reference) + 'smil:' + reference + '.smil';
			break;
		default:
			path = isCC(reference) + 'mp4:' + reference + '-' + quality;
			break;
	}
	return scheme + '://' + authority + path + suffix;
}
// pull parameter value from request string and fill with default if not found
function getURLParam(sParam, defaultValue) {
	'use strict';
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return "undefined" === sParameterName[1] ? undefined : "false" === sParameterName[1] ? false : sParameterName[1];
		}
	}
	return defaultValue;
}

function archive_stream(key, part)
{
	'use strict';
	if (is_numeric(key))
	{
		var mywindow = window.open("/video/archives.php?key="+key+"&part="+part);
		mywindow.focus();
	}
	return;
}

function live_stream(keyval, ios, ismobile, audio, address)
{
 	'use strict';
	var response = '', ele, mywindow = false;
 	audio = audio||'0';
	address = address||'hamc.scstatehouse.gov';
	if (audio == '0') {ele = getElement('live'+keyval);}
	else {ele = getElement('liveaudio'+keyval);}
	if (is_numeric(keyval))
	{
		var postdata = 'livestreamkey='+keyval+'&audio='+audio;
		doRequest(xmlhttp, 'POST', '/meetings.php', false, null, postdata);
		if (xmlhttp.status === 200) {response = xmlhttp.responseText;}
	}
	if (is_numeric(keyval))
	{
		// = committee broadcast
		var reference = getTextBetweenTags(response, 'VIDEOFILE'),
			status = getTextBetweenTags(response, 'STATUS');

		// force ingest meeting to use video link only
		if (reference === 'ingest') audio = '0';

		if (status === 'EXPIRED')
		{
			alert("Meeting broadcast has expired");
			if (ele) {ele.style.display = 'none';}
		}
		else {mywindow = window.open("/video/stream.php?key="+keyval+'&audio='+audio);}
	}
	else
	{
		// = chamber broadcast
		mywindow = window.open("/video/chamber.php?chamber="+keyval+"&audio="+audio);
		mywindow.focus();
	}
	return;
}

var highlightColor = '#ffff99';
var trackrow = false;
var trackcell = false;
var current_highlight = false;
var oldcolor = -1;

function highlight_row(cancel)
{
	if (current_highlight)
		current_highlight.style.backgroundColor=oldcolor;
	if (!cancel)
	{
	 	if (trackrow)
	 	{
			current_highlight = trackrow;
			oldcolor = current_highlight.style.backgroundColor;
			current_highlight.style.backgroundColor=highlightColor;
		}
	}
	else
	{
		current_highlight = false;
	}
}

function meetingdiv()
{
 	var ele = getElement('clicktoopen');
 	var ele2 = getElement('meetingcontent');
 	if (ele && ele2)
 	{
	 	if (ele.innerHTML == "Scheduled Meetings")
	 	{
	 	 	ele.innerHTML = "Close Scheduled Meetings";
	 	 	ele2.style.display = 'block';
 		}
	 	else
	 	{
		 	if (ele.innerHTML == "Close Scheduled Meetings")
		 	{
		 	 	ele.innerHTML = "Scheduled Meetings";
		 	 	ele2.style.display = 'none';
	 		}
	 	}
	}
}

function archivediv()
{
 	var ele = getElement('clicktoopenarchive');
 	var ele2 = getElement('archivecontent');
 	var ele3 = getElement('databox');
 	var ele4 = getElement('archives');
 	if (ele && ele3 && ele4)
 	{
	 	if (ele.innerHTML == "Video Archives")
	 	{
	 	 	ele.innerHTML = "Close Video Archives";
	 	 	ele4.style.display = 'block';
	 	 	// ele3.style.display = 'none';
 		}
	 	else
	 	{
		 	if (ele.innerHTML == "Close Video Archives")
		 	{
		 	 	ele.innerHTML = "Video Archives";
	 	 		// ele3.style.display = 'block';
	 	 		ele4.style.display = 'none';
	 		}
	 	}
	}
	else
	{
	 	if (ele && ele2)
	 	{
		 	if (ele.innerHTML == "Video Archives")
		 	{
		 	 	ele.innerHTML = "Close Video Archives";
		 	 	ele2.style.display = 'block';
	 		}
		 	else
		 	{
			 	if (ele.innerHTML == "Close Video Archives")
			 	{
			 	 	ele.innerHTML = "Video Archives";
			 	 	ele2.style.display = 'none';
		 		}
		 	}
		}
	}
}

function matrixdiv()
{
 	var ele = getElement('clicktoopen');
 	var ele2 = getElement('matrixcontent');
 	if (ele && ele2)
 	{
	 	if (ele.innerHTML == "Regulations Tracking Matrix")
	 	{
	 	 	ele.innerHTML = "Close Matrix";
	 	 	ele2.style.display = 'block';
 		}
	 	else
	 	{
		 	if (ele.innerHTML == "Close Matrix")
		 	{
		 	 	ele.innerHTML = "Regulations Tracking Matrix";
		 	 	ele2.style.display = 'none';
	 		}
	 	}
	}
}


/*function live_stream(keyval, interval)
{
	var response = '';
	var postdata = 'livestreamkey='+keyval;
	doRequest(xmlhttp, 'POST', '/meetings.php', false, null, postdata);

	if (xmlhttp.status == 200)
	{
		response = xmlhttp.responseText;
	}

	var ele = getElement('live'+keyval);
	if (ele)
	{
		var result = getTextBetweenTags(response, 'RESULT');
		ele.innerHTML = result;
		var status = getTextBetweenTags(response, 'STATUS');
		if (status == 'EXPIRED')
		{
			clearInterval(interval);
			ele.style.display = 'none';
		}
	}
	return;
}	
*/
var intervals = new Array();
var livefeedarray = new Array();

function get_meetings(chamber, code, showmeetings)
{
 	showmeetings = showmeetings||false;
	var response = '';
	var postdata = 'chamber='+chamber+'&code='+code;

	doRequest(xmlhttp, 'POST', '/meetings.php', false, null, postdata);

	if (xmlhttp.status == 200)
	{
		response = xmlhttp.responseText;
	}
	
	var chambername = '';
	switch(chamber){
	 	case 'H':
	 		chambername = 'house';
	 		break;
	 	case 'S':
	 		chambername = 'senate';
	 		break;
	}

	var ele = getElement('meetings');
	if (ele)
	{
		var counter = getTextBetweenTags(response, 'COUNTER');
		if (counter > 0)
		{
			var result = getTextBetweenTags(response, 'RESULT');
			if (showmeetings == 1)
//				ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><div><span style=\"display:inline-block; width:30%\"><a id=\"clicktoopen\" href=\"javascript:void(0);\" onClick=\"meetingdiv();\">Close Scheduled Meetings</a></span><span class=\"scheduletwitter\" style=\"display:inline-block; width:70%; text-align:right; background: -webkit-linear-gradient(left, transparent , #26425f); /* For Safari */ background: -o-linear-gradient(right, transparent, #26425f); /* For Opera 11.1 to 12.0 */ background: -moz-linear-gradient(right, transparent, #26425f); /* For Firefox 3.6 to 15 */ background: linear-gradient(to right, transparent , #26425f); /* Standard syntax */\"><a style=\"margin-left:5px; color: #00adff;\" href=\"https://twitter.com/sc"+chambername+"\"><img border=0 title=\"Follow on Twitter\" src=\"/images/social-icon-twitter.png\" />&nbsp;&nbsp;&nbsp;Follow on Twitter</a></span></div><div id=\"meetingcontent\" style=\"display:block;\">"+result+"</div>";
				ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><div><span style=\"display:inline-block; width:30%\"><a id=\"clicktoopen\" href=\"javascript:void(0);\" onClick=\"meetingdiv();\">Close Scheduled Meetings</a></span><span class=\"scheduletwitter\" style=\"display:inline-block; width:70%; text-align:right; background-color:transparent;\"><a style=\"margin-left:5px; color: #00adff;\" href=\"https://twitter.com/sc"+chambername+"\" target=\"_blank\"><img border=0 title=\"Follow on Twitter\" src=\"/images/social-icon-twitter.png\" />&nbsp;&nbsp;&nbsp;Follow on Twitter</a></span></div><div id=\"meetingcontent\" style=\"display:block;\">"+result+"</div>";
			else
				ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><div><span style=\"display:inline-block; width:30%\"><a id=\"clicktoopen\" href=\"javascript:void(0);\" onClick=\"meetingdiv();\">Scheduled Meetings</a></span><span class=\"scheduletwitter\" style=\"display:inline-block; width:70%; text-align:right; background-color:transparent;\"><a style=\"margin-left:5px; color: #00adff;\" href=\"https://twitter.com/sc"+chambername+"\" target=\"_blank\"><img border=0 title=\"Follow on Twitter\" src=\"/images/social-icon-twitter.png\" />&nbsp;&nbsp;&nbsp;Follow on Twitter</a></span></div><div id=\"meetingcontent\" style=\"display:none;\">"+result+"</div>";
			ele.style.display = 'block';
		}
	}
	return;
}	

function get_archives(chamber, code, showarchives)
{
 	showarchives = showarchives||false;
	var response = '';
	var postdata = 'chamber='+chamber+'&code='+code+'&op=vid';
	doRequest(xmlhttp, 'POST', '/meetings.php', false, null, postdata);

	if (xmlhttp.status == 200)
	{
		response = xmlhttp.responseText;
	}

	var ele = getElement('archives');
	if (ele)
	{
		var counter = getTextBetweenTags(response, 'COUNTER');
		if (counter > 0)
		{
			var result = getTextBetweenTags(response, 'RESULT');
//			alert(result);
			if (code > 2)
			{
				if (showarchives == 1)
					ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><a id=\"clicktoopenarchive\" href=\"javascript:void(0);\" onClick=\"archivediv();\">Close Video Archives</a><div id=\"archivecontent\" style=\"display:block;\">"+result+"</div>";
				else
					ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><a id=\"clicktoopenarchive\" href=\"javascript:void(0);\" onClick=\"archivediv();\">Video Archives</a><div id=\"archivecontent\" style=\"display:none;\">"+result+"</div>";
				ele.style.display = 'block';
			}
			else
			{
			 	ele.innerHTML = "<div style=\"width:100%; margin: 0; text-align:center; font-size:16px; font-weight:bold;\">Video Archives<hr></div><div id=\"archivecontent\">"+result+"</div>";
			}
		}
		else
		{
			if (code == 1 || code == 2)
			 	ele.innerHTML = "<div style=\"width:100%; margin: 0; text-align:center; font-size:16px; font-weight:bold;\">Video Archives<hr></div><div id=\"archivecontent\">No Video Archives available</div>";
		}
	}

	return;
}

function get_matrix(showmatrix, params)
{
 	showmatrix = showmatrix||false;
 	params = params||false;
	var response = '';
	var postdata = 'op=INSERT';
	if (params)
		postdata = postdata+'&'+params;

	doRequest(xmlhttp, 'POST', '/regmatrix2.php', false, null, postdata);
	if (xmlhttp.status == 200)
	{
		response = xmlhttp.responseText;
	}

	var ele = getElement('matrix');
	if (ele)
	{
//		var counter = getTextBetweenTags(response, 'COUNTER');
//		if (counter > 0)
//		{
			var result = getTextBetweenTags(response, 'RESULT');
			if (showmatrix == 1)
				ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><div><span style=\"display:inline-block; width:30%\"><a id=\"clicktoopen\" href=\"javascript:void(0);\" onClick=\"matrixdiv();\">Close Matrix</a></span></div><div id=\"matrixcontent\" style=\"display:block;\">"+result+"</div>";
			else
				ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><div><span style=\"display:inline-block; width:30%\"><a id=\"clicktoopen\" href=\"javascript:void(0);\" onClick=\"matrixdiv();\">Regulations Tracking Matrix</a></span></div><div id=\"matrixcontent\" style=\"display:none;\">"+result+"</div>";
			ele.style.display = 'block';
//		}
//		else
//		{
//			ele.innerHTML = "<hr style=\"margin: 10px 0 0 0;\"><div><span style=\"display:inline-block; width:40%\">Regulations Tracking Matrix Not Available At This Time</span></div><div id=\"matrixcontent\" style=\"display:none;\">"+result+"</div>";
//			ele.style.display = 'block';
//		}
	}
	return;
}

// regs.js

function process_regnumber(regnumber)
{
    var pagelink = "/regs/";
    var fulllink = "";
    
    fulllink = pagelink + regnumber + ".docx";
    if (checkforfile(fulllink))
    {
        getfile(fulllink);
    } 
    else
    {
        fulllink = pagelink + regnumber + ".doc";
        if (checkforfile(fulllink))
        {
            getfile(fulllink);
        }
        else
            alert("Reg document not found.");
    }
}

function getfile(fulllink)
{
    var newwindow = window.open(fulllink, "REG");
        if (newwindow)
            newwindow.focus;
}

function getpagemoddate(link)
{
	if (checkforfile(link))
	{
//	    alert(xmlhttp.getAllResponseHeaders());
	    document.write("Last Updated: " + xmlhttp.getResponseHeader("Last-Modified"));
	}
	else
	{
        document.write("Last Updated: Unknown");
	}	
}

function checkforfile(link)
{
	doRequest(xmlhttp, "HEAD", link, false, null, null);
	if (xmlhttp.status == 200)
	{
	 	var responseheader = xmlhttp.getAllResponseHeaders();
	 	if (parseInt(xmlhttp.getResponseHeader("Content-Length")) != 0)
		    return true;
		else
			return false;
	}
	else
	{
        return false;
	}	
}

function tablesort(selector){
	if(window.jQuery){
		var tables = $(selector);
		if(tables.length>0){
			tables.each(function(index){
				var start =parseInt($(this).data('start')) || 0;
				$(this).find('th').each(function(hidx){
					$(this).find('i').remove();
					var text = $(this).html();
					if(hidx == start){
						$(this).html(text+'<i class="sort-asc"></i>');
						var tbl = $(this).closest('table');
						sortTable(tbl[0], hidx);
					}else{
						$(this).html(text+'<i class="sort-disabled"></i>');
					}
					$(this).on('click', function(){
						var table = $(this).closest('table');
						sortTable(table[0], hidx);
						changeIcon($(this)[0]);
					});
				})
			});
		}
	}

	function changeIcon(ele){
		var headers = ele.parentElement.getElementsByTagName("th");
		for( var i = 0; i < headers.length; i++){
			if(headers[i] === ele){
				var icon = ele.getElementsByTagName("i")[0];
				if(icon){
					var classname = icon.getAttribute("class");
					if(classname == 'sort-asc'){
						icon.setAttribute('class', 'sort-desc');
					}else{
						icon.setAttribute('class', 'sort-asc');
					}
				}else{
					ele.innerHTML += '<i class="sort-asc"></i>';
				}
			}else{
				var icon = headers[i].getElementsByTagName("i")[0];
				if(icon){
					icon.setAttribute('class', 'sort-disabled');
				}
			}
		}
	}

	function sortTable(table, n, s){
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		switching = true;
		dir = "asc";
		while(switching) {
			switching = false;
			rows = table.rows;
			for(i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("TD")[n];
				y = rows[i + 1].getElementsByTagName("TD")[n];
				if(s !== undefined){
					x2 = rows[i].getElementsByTagName("TD")[s];
					y2 = rows[i + 1].getElementsByTagName("TD")[s];
				}else{
					x2 = rows[i].getElementsByTagName("TD")[n];
					y2 = rows[i + 1].getElementsByTagName("TD")[n];
				}
				if(dir == "asc"){
					if (x.innerText.toLowerCase() > y.innerText.toLowerCase()){
						shouldSwitch = true;
						break;
					}else if(x.innerText.toLowerCase() == y.innerText.toLowerCase()){
						if (x2.innerText.toLowerCase() > y2.innerText.toLowerCase()){
							shouldSwitch = true;
							break;
						}
					}
				}else if (dir == "desc"){
					if(x.innerText.toLowerCase() < y.innerText.toLowerCase()){
						shouldSwitch = true;
						break;
					}else if(x.innerText.toLowerCase() == y.innerText.toLowerCase()){
						if(x2.innerText.toLowerCase() < y2.innerText.toLowerCase()){
							shouldSwitch = true;
							break;
						}
					}
				}
			}
			if(shouldSwitch){
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount ++;
			}else{
				if(switchcount == 0 && dir == "asc"){
					dir = "desc";
					switching = true;
				}
			}
		}
	}
}
javascript:
(function(){
	/*
	 * This file has been distributed via CristianoBetta.com
	 * (c) 2008 Cristiano Betta <code@cristianobetta.com>
	 *
	 * This code has been licensed under the GPL2.0 License
	 * http://creativecommons.org/licenses/GPL/2.0/
	 * 
	 * To convert this code into a true bookmarklet, use http://subsimple.com/bookmarklets/jsbuilder.htm
	 *
	 */
	
  // START OF CODE

	//Base64 class taken from http://www.webtoolkit.info/
	var Base64 = {

	         // private property
	         _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	         // public method for encoding
	         encode : function (input) {
	             var output = "";
	             var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	             var i = 0;

	             input = Base64._utf8_encode(input);

	             while (i < input.length) {

	                 chr1 = input.charCodeAt(i++);
	                 chr2 = input.charCodeAt(i++);
	                 chr3 = input.charCodeAt(i++);

	                 enc1 = chr1 >> 2;
	                 enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	                 enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	                 enc4 = chr3 & 63;

	                 if (isNaN(chr2)) {
	                     enc3 = enc4 = 64;
	                 } 
	 								 else { if (isNaN(chr3)) {
	                     enc4 = 64;
	                 } }

	                 output = output +
	                 this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	                 this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

	             }

	             return output;
	         },

	         // public method for decoding
	         decode : function (input) {
	             var output = "";
	             var chr1, chr2, chr3;
	             var enc1, enc2, enc3, enc4;
	             var i = 0;

	             input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	             while (i < input.length) {

	                 enc1 = this._keyStr.indexOf(input.charAt(i++));
	                 enc2 = this._keyStr.indexOf(input.charAt(i++));
	                 enc3 = this._keyStr.indexOf(input.charAt(i++));
	                 enc4 = this._keyStr.indexOf(input.charAt(i++));

	                 chr1 = (enc1 << 2) | (enc2 >> 4);
	                 chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	                 chr3 = ((enc3 & 3) << 6) | enc4;

	                 output = output + String.fromCharCode(chr1);

	                 if (enc3 != 64) {
	                     output = output + String.fromCharCode(chr2);
	                 }
	                 else { if (enc4 != 64) {
	                     output = output + String.fromCharCode(chr3);
	                 } }

	             }

	             output = Base64._utf8_decode(output);

	             return output;

	         },

		   	// private method for UTF-8 encoding
	         _utf8_encode : function (string) {
	             string = string.replace(/\r\n/g,"\n");
	             var utftext = "";

	             for (var n = 0; n < string.length; n++) {

	                 var c = string.charCodeAt(n);

	                 if (c < 128) {
	                     utftext += String.fromCharCode(c);
	                 }
	                 else { if((c > 127) && (c < 2048)) {
	                     utftext += String.fromCharCode((c >> 6) | 192);
	                     utftext += String.fromCharCode((c & 63) | 128);
	                 }
	                 else {
	                     utftext += String.fromCharCode((c >> 12) | 224);
	                     utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	                     utftext += String.fromCharCode((c & 63) | 128);
	                 } }

	             }

	             return utftext;
	         },

					 // private method for UTF-8 decoding
	         _utf8_decode : function (utftext) {
	             var string = "";
	             var i = 0;
	             var c = c1 = c2 = 0;

	             while ( i < utftext.length ) {

	                 c = utftext.charCodeAt(i);

	                 if (c < 128) {
	                     string += String.fromCharCode(c);
	                     i++;
	                 }
	                 else { if((c > 191) && (c < 224)) {
	                     c2 = utftext.charCodeAt(i+1);
	                     string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	                     i += 2;
	                 }
	                 else {
	                     c2 = utftext.charCodeAt(i+1);
	                     c3 = utftext.charCodeAt(i+2);
	                     string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	                     i += 3;
	                 } }

	             }

	         	 	return string;
				},	
	};

	//check if this app has a hidden fb comment		
	var detected = detected();
	//if so, show the comment
	if (detected) {
		//get the head element
		var head 					= document.getElementsByTagName('html')[0];
		//read out the content of the head
		var head_content 	= head.innerHTML;
		//find the start of the doc output by looking at the end of the help message by facebook
		var start					= head_content.search('underscores')+13;
		//find the end of the output by finding the end of the html content
		var end 					= head_content.search('-->');
		//cut out the content
		var output				=	head_content.substring(start, end);

		//additionally try to add the root url to all relative urls

		//find the start of the url that was called
		var url_start 		= head_content.search('http://');
		//then detect the end of that url
		var url_end				= head_content.indexOf('/', url_start+7)+1;
		//cut out the url
		var url						= head_content.substring(url_start, url_end);
		//replace all instances of a relative url with this url
		output						=	output.replace(/src='\//g, "src='"+url);
		output						=	output.replace(/href='\//g, "href='"+url);
		output						=	output.replace(/src="\//g, 'src="'+url);
		output						=	output.replace(/href="\//g, 'href="'+url);
	
		//encode the output
		var encoded_output = Base64.encode(output);

		//now load the window and show it
		var debug_window	= window.open("data:text/html;base64,"+encoded_output,"Facebook Debug");
	}
	
	//returns if this is a) a FB app, and b) has a hidden comment
	function detected() {
		//check if this page is a FB app
		var isapp = isApp();
		if (!isapp) return false;
		//check if this page has a hidden comment			
		var has_comment = hasComment(location);	
		//return the result		
		return has_comment;
	}

	//check if this page is on the facebook app domain
	function isApp() {		
		//get the document location
  	var location = window.location.href;
		//check if it is on the normal facebook app domain
		var isapp = location.substring(0,21) == 'http://apps.facebook.';
		//else chek if it's on the new domain
		if (!isapp) isapp = location.substring(0,25) == 'http://apps.new.facebook.';
		//return the result
		return isapp;
	}

	//detects if this page has a hidden comment in the header
	function hasComment() {
		//get the head element
		var head 					= document.getElementsByTagName('html')[0];
		//read out the content of the head
		var head_content 	= head.innerHTML;
		//check if there is a facebook hidden comment
		return head_content.indexOf('<!--Rendering') >= 0;
	}	

	// END OF CODE
})
()
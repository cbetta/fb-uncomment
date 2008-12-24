var FBHTMLUncomment = {
	
	//this function is called when a window is created
  init: function() {
    var appcontent = document.getElementById("appcontent"); 
		//if a page is found, bind the event listener
    if(appcontent)
			//this loads the detector for every page change
      appcontent.addEventListener("DOMContentLoaded", FBHTMLUncomment.handleDetect, true);

		//this makes sure the icon changes when a different tab is selected
		gBrowser.tabContainer.addEventListener("TabSelect", FBHTMLUncomment.handleDetect , false);

  },

  //detects if this is a) a facebook app pages and b) has any hidden html
  handleDetect: function(aEvent) {
		//check if a FB comment was detected
		var detected = FBHTMLUncomment.detected();
		//get the info icon
		var infopanel = document.getElementById('infopanel');
		//change the icon state
		if (detected) {
			//if found, set the state to detected
			infopanel.setAttribute('state', 'detected');
		}	else {
			//else set the state to undetected
			infopanel.setAttribute('state', 'undetected');
		}
  },

	//returns if this is a) a FB app, and b) has a hidden comment
	detected: function() {
		//check if this page is a FB app
		var isapp = FBHTMLUncomment.isApp();
		if (!isapp) return false;
		//check if this page has a hidden comment			
		var has_comment = FBHTMLUncomment.hasComment(location);	
		//return the result		
		return has_comment;
	},

	//check if this page is on the facebook app domain
	isApp: function() {		
		//get the document location
  	var location = window.content.location.href;
		//check if it is on the normal facebook app domain
		var isapp = location.substring(0,21) == 'http://apps.facebook.';
		//else chek if it's on the new domain
		if (!isapp) isapp = location.substring(0,25) == 'http://apps.new.facebook.';
		//return the result
		return isapp;
	},

	//detects if this page has a hidden comment in the header
	hasComment: function() {
		//get the head element
		var head 					= window.content.document.getElementsByTagName('head')[0];
		//read out the content of the head
		var head_content 	= head.innerHTML;
		//check if there is a facebook hidden comment
		return head_content.indexOf('<!--Rendering the page using the following FBML retrieved from ') >= 0;
	},
	
	showComment: function() {
		//check if this app has a hidden fb comment		
		var detected = FBHTMLUncomment.detected();
		//if so, show the comment
		if (detected) {
			//get the head element
			var head 					= window.content.document.getElementsByTagName('head')[0];
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
				
			//build a base64 encoded data url for the content
			var encoded = "data:text/html;base64,"+Base64.encode(output);	
						
			//now load the window with the base64 data url
			var debug_window	= window.open(encoded,"Facebook Debug");			
		}
	},
};

//add the event listener to when a window is loaded
window.addEventListener("load", function(e) { FBHTMLUncomment.init(); }, false);

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

	//now load the window and show it
	var debug_window	= window.open("","Debug");
	debug_window.document.open();
	//write the output to the window
	debug_window.document.write(output);
	debug_window.document.close();

	

	// END OF CODE
})
()
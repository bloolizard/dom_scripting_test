/*
    File Name: script.js
    by Tolga Can
    RT-Theme 15
*/ 

// Flex Slider and Helper Functions
jQuery(window).load(function() {

	if(rttheme_flex_slider_effect == "") rttheme_flex_slider_effect = "slide";

	if (jQuery('.flexslider.home_main').length>0){
		jQuery('.flexslider.home_main').flexslider({
			animation: ''+rttheme_flex_slider_effect+'',
			slideshowSpeed:rttheme_slider_timeout,
			smoothHeight: true,   
		 	directionNav: false, 
			before: function(slider){  
				if(slider.width()>600){
			  		jQuery('.flexslider.home_main').find('.title,.text').css({'right':'-100px','opacity':'0'},0);
			  	}
			}, 
			after: function(slider){   
				if(slider.width()>600){
					jQuery('.flexslider.home_main .flex-active-slide').find('.title').animate({'right':'0px','opacity':'1'},800,'easeOutBack');
					jQuery('.flexslider.home_main .flex-active-slide').find('.text').delay(300).animate({'right':'0px','opacity':'1'},800,'easeOutBack');  
				}else{
					jQuery('.flexslider.home_main .flex-active-slide').find('.title').css({'right':'0px','opacity':'1'});
					jQuery('.flexslider.home_main .flex-active-slide').find('.text').css({'right':'0px','opacity':'1'});  					
				}
			}, 
			start: function(slider){
			  jQuery('body').removeClass('loading');
			}         
		});
	}  

	if (jQuery('.flexslider.shortcode').length>0){
		jQuery('.flexslider.shortcode').flexslider({
			animation: "fade",
			directionNav: false, 
			smoothHeight: true,  
			start: function(slider){
			  jQuery('body').removeClass('loading');
			}         
		});
	}	
});  

// description fix
jQuery(window).resize(function() { // description fix on window resize
	jQuery('.flex-caption').css({'bottom':'0','opacity':'1'});
}); 


// Navigation Menu
jQuery(document).ready(function (){  
  //Usage
  jQuery("#navigation ul li").menu({
  	autohide: 0,
	autostartSpeed: 0
  });
});

 
// Cycle Slider  
jQuery(window).load(function() {
	
	var slider_area;
	var slider_buttons;

	// Which slider
	if (jQuery('#slider_area').length>0){
		
		// Home Page Slider
		slider_area="#slider_area";	
		slider_buttons="#numbers";
	
		jQuery(slider_area).cycle({ 
			fx:     rttheme_slider_effect,  // Effect 
			timeout:  rttheme_slider_timeout,  // Timeout value (ms) = 4 seconds
			easing: 'backout', 
			pager:  slider_buttons, 
			cleartype:  1,
			after:   onAfter ,
			before:  onBefore,
			pause:           true,     // true to enable "pause on hover"
			pauseOnPagerHover: true,   // true to pause when hovering over pager link					
			pagerAnchorBuilder: function(idx) { 
				return '<a href="#" title=""><img src="'+rttheme_template_dir+'/images/pixel.gif" width="8" heigth="8"></a>'; 
			}
		});
	}   

	function onBefore() {
		jQuery('#slider .text,#slider .title').css({opacity:0});
	} 
	
	function onAfter() {
		jQuery('#slider .title').delay(0).animate({opacity:1},1200);
		jQuery('#slider .text').delay(300).animate({opacity:1},600);
	}		
});


//Nivo Slider
jQuery(window).load(function() {
	 
	    if (jQuery('#nivo-slider').length>0){
		   jQuery('#nivo-slider').nivoSlider({ 
				pauseTime:rttheme_slider_timeout, // How long each slide will show	
				captionOpacity:1,
				effect:rttheme_nivo_slider_effect,
				controlNav: true 	  
		    });
	    } 
 
});    


//pretty photo
jQuery(document).ready(function(){
		jQuery("a[rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});        
});  
 
 

// Tabs
jQuery(function() {// perform JavaScript after the document is scriptable.
    jQuery("ul.tabs").tabs("> .pane", {effect: 'fade'});
        
    jQuery(".scrollable").scrollable();

    jQuery(".items.big_image img").click(function() {
    
       // see if same thumb is being clicked
       if (jQuery(this).hasClass("active")) { return; }
    
       // calclulate large image's URL based on the thumbnail URL (flickr specific)
       var url = jQuery(this).data("gal");	 
    
       // get handle to element that wraps the image and make it semi-transparent
       var wrap = jQuery("#image_wrap").fadeTo("medium", 0.5);
    
       // the large image from www.flickr.com
       var img = new Image();
    
    
       // call this function after it's loaded
       img.onload = function() {
    
          // make wrapper fully visible
          wrap.fadeTo("fast", 1);
    
          // change the image
          wrap.find("img").attr("src", url);
    
       };
    
       // begin loading the image from www.flickr.com
       img.src = url;
    
       // activate item
       jQuery(".items img").removeClass("active");
       jQuery(this).addClass("active");
    
    // when page loads simulate a "click" on the first image
    }).filter(":first").click();

});
 
//RT Portfolio Effect
jQuery(document).ready(function() {
     
	var portfolio_item=jQuery("a.imgeffect");
	
 		
		portfolio_item.each(function(){
			var imageClass = jQuery(this).attr("class"); // get the class
			var theImage = jQuery(this).html(); 	// save the image
			jQuery(this).find("img").addClass("active");
			jQuery(this).append('<span class="imagemask '+imageClass+'">'+theImage+'</span>'); //create new image within span
			jQuery(this).find('span').parents('img').remove(); //remove image 
		});
			
		jQuery('a.imgeffect .active').remove(); //remove image
 
	
	portfolio_item.mouseover(function(){
		jQuery(this).find('img').stop().animate({ top:"-22px" }, 100, "easeInQuad"); 								
	}).mouseout(function(){
		jQuery(this).find('img').stop().animate({ top:"0" }, 100, "easeInQuad"); 	
	});    

});



 
//validate contact form
jQuery(document).ready(function(){ 
	if(typeof jQuery.validator != 'undefined'){
		// show a simple loading indicator
		var loader = jQuery('<img src=""+rttheme_template_dir+"images/loading.gif" alt="..." />')
		      .appendTo(".loading")
		      .hide();
		jQuery().ajaxStart(function() {
		      loader.show();
		}).ajaxStop(function() {
		      loader.hide();
		}).ajaxError(function(a, b, e) {
		      throw e;
		});

		jQuery.validator.messages.required = "";
		var v = jQuery("#validate_form").validate({
		      submitHandler: function(form) {
		              jQuery(form).ajaxSubmit({
		                      target: "#result"
		              });
		      }
		});

		jQuery("#reset").click(function() {
		      v.resetForm();
		});
	}
});


//Slide to top
jQuery(document).ready(function(){
    jQuery(".line span.top").click(function() {
        jQuery('html, body').animate( { scrollTop: 0 }, 'slow' );
    });
});


//Social Media Icons
if(!jQuery.browser.msie){
jQuery(function() {
	jQuery('.social_media_icons img').each(function() {
		jQuery(this).hover(
			function() {
				jQuery(this).stop().animate({ opacity: 1.0 }, 400);
			},
			function() {
				jQuery(this).stop().animate({ opacity: 0.3 }, 400);
			})
		});
	});
}

/* Popoye Slider */    
jQuery(document).ready(function () {
	var options = {
	    caption:'hover',
	    opacity:0.7,
	    easing:'easeIn',
	    zindex:20000
	}
	jQuery('.ppy').popeye(options); 
});
    

/* tool tips */    
jQuery(document).ready(function(){
	jQuery('.j_ttip').colorTip({color:'white'});
	jQuery('.j_ttip2').colorTip({color:'black'});
});

//RT form field - text back function
jQuery(document).ready(function() {

var form_inputs=jQuery(".showtextback");

	form_inputs.each(function(){
	
		jQuery(this).focus( function()
		{
			val = jQuery(this).val();
			if (jQuery(this).attr("alt") != "0"){
			    jQuery(this).attr("alt",jQuery(this).attr("value")); 
			    jQuery(this).attr("value","");
			}
		});
	
		jQuery(this).blur( function(){
			if (jQuery(this).attr("alt") != "0"){
				val = jQuery(this).val(); 
				if (val == '' || val == jQuery(this).attr("alt")){
				    jQuery(this).attr("value",jQuery(this).attr("alt"));
				}
			}
		});
	
		jQuery(this).keypress( function(){  
			jQuery(this).attr("alt","0");	    
		});                 
	});  
         
});


 /*
 * jQuery Easing Compatibility v1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Adds compatibility for applications that use the pre 1.2 easing names
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// check easing names
(function($){
	if(typeof easeIn != 'function'){

		jQuery.extend( jQuery.easing,
		{
			easeIn: function (x, t, b, c, d) {
				return jQuery.easing.easeInQuad(x, t, b, c, d);
			},
			easeOut: function (x, t, b, c, d) {
				return jQuery.easing.easeOutQuad(x, t, b, c, d);
			},
			easeInOut: function (x, t, b, c, d) {
				return jQuery.easing.easeInOutQuad(x, t, b, c, d);
			},
			expoin: function(x, t, b, c, d) {
				return jQuery.easing.easeInExpo(x, t, b, c, d);
			},
			expoout: function(x, t, b, c, d) {
				return jQuery.easing.easeOutExpo(x, t, b, c, d);
			},
			expoinout: function(x, t, b, c, d) {
				return jQuery.easing.easeInOutExpo(x, t, b, c, d);
			},
			bouncein: function(x, t, b, c, d) {
				return jQuery.easing.easeInBounce(x, t, b, c, d);
			},
			bounceout: function(x, t, b, c, d) {
				return jQuery.easing.easeOutBounce(x, t, b, c, d);
			},
			bounceinout: function(x, t, b, c, d) {
				return jQuery.easing.easeInOutBounce(x, t, b, c, d);
			},
			elasin: function(x, t, b, c, d) {
				return jQuery.easing.easeInElastic(x, t, b, c, d);
			},
			elasout: function(x, t, b, c, d) {
				return jQuery.easing.easeOutElastic(x, t, b, c, d);
			},
			elasinout: function(x, t, b, c, d) {
				return jQuery.easing.easeInOutElastic(x, t, b, c, d);
			},
			backin: function(x, t, b, c, d) {
				return jQuery.easing.easeInBack(x, t, b, c, d);
			},
			backout: function(x, t, b, c, d) {
				return jQuery.easing.easeOutBack(x, t, b, c, d);
			},
			backinout: function(x, t, b, c, d) {
				return jQuery.easing.easeInOutBack(x, t, b, c, d);
			}
		});
 
	}
})(jQuery);
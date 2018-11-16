/* <![CDATA[ */
;(function($){
	
	"use strict";
	
	/* Global DOM Objects
	================================================== */
	var $brooklyn_body   = $("body");
	var $brooklyn_header = $("#ut-header");
	
	 /* Global Variables
	================================================== */                    
	var brooklyn_scroll_offset = $brooklyn_header.data("line-height");

	if( $brooklyn_body.hasClass('ut-header-fixed') ) {

		brooklyn_scroll_offset = 0;

	}    

	if( $brooklyn_body.hasClass('ut-header-hide-on-hero') ) {

		brooklyn_scroll_offset = $brooklyn_header.height();

	}

	/* Helper Functions
	================================================== */
	function ut_get_current_scroll() {

		return window.pageYOffset || document.documentElement.scrollTop;

	}
	
	/* Header Animations
	================================================== */        
	var border_offset = $brooklyn_body.hasClass("ut-site-border") ? 40 : 0,
		hide_offset   = $brooklyn_header.data("line-height") - border_offset - $brooklyn_header.height(),
		new_offset    = '',
		last_offset   = 0;

	var scroll_up_offset = $brooklyn_body.hasClass("ut-site-border") ? $brooklyn_header.height() : 0;

	function ut_move_header() {

		// scroll up
		if( ut_get_current_scroll() < last_offset ) {

			if( ut_get_current_scroll() <= scroll_up_offset ) {

				if( -ut_get_current_scroll() > hide_offset ) {

					$('#ut-header-placeholder').height( $brooklyn_header.height() - ut_get_current_scroll() );

					new_offset = -ut_get_current_scroll();                        
					$brooklyn_header.css('transform', "translateY("+ new_offset +"px)");

				}

				if( $('#ut-header-placeholder').length && ut_get_current_scroll() === 0 ) {

					brooklyn_scroll_offset = Math.abs(hide_offset) + $brooklyn_header.data("line-height");

				}

			}

		// scroll down    
		} else {                

			if( ut_get_current_scroll() > 0 ) {

				$('#ut-header-placeholder').height( $brooklyn_header.data("line-height") - border_offset );
				$brooklyn_header.css('transform', "translateY("+ hide_offset +"px)");

				if( $('#ut-header-placeholder').length ) {

					brooklyn_scroll_offset = $brooklyn_header.data("line-height");

				}

			}

		}            

		last_offset = ut_get_current_scroll();

	}   

	if( $brooklyn_body.hasClass('ut-header-floating') && !$brooklyn_body.hasClass('ut-header-hide-on-hero') ) {

		if( window.pageYOffset === 0 && $('#ut-header-placeholder').length ) {

			brooklyn_scroll_offset = Math.abs(hide_offset) + $brooklyn_header.data("line-height");

		}

		$(window).scroll(function() {            

			window.requestAnimationFrame(ut_move_header);

		});    

	}
	
	
	$(document).ready(function(){
		
		
		
		
		
		
		
	});
	
})(jQuery);
 /* ]]> */
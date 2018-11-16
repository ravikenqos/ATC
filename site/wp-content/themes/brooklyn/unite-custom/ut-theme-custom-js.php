<?php if (!defined('UT_VERSION')) {
    exit; // exit if accessed directly
}

/**
 * Custom JavaScript Class
 * 
 * 
 * @package Brooklyn Theme
 * @author United Themes
 * since 4.4
 */

if( !class_exists( 'UT_Custom_JS' ) ) {	
    
    class UT_Custom_JS {
        
        public $js;
        
        function __construct() {
            
            add_action( 'wp_head', array( $this, 'header_js' ) ); 
            add_action( 'ut_java_footer_hook', array( $this, 'custom_js' ), 100 );
            
        }        
                
        public function minify_js( $js ) {
            
            $js = str_replace('<script>','', $js);
            $js = str_replace('</script>','', $js);
                        
            if( WP_DEBUG ){
                return $js;                    
            }
            
            // remove comments
            $js = preg_replace("/((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/", "", $js);
            
            // remove tabs, spaces, newlines, etc.
            $js = str_replace(array("\r\n","\r","\t","\n",'  ','    ','     '), '', $js);
            
            // remove other spaces before/after
            $js = preg_replace(array('(( )+\))','(\)( )+)'), ')', $js);
            
            return $js;
            
        }
        
        public function header_js() {
            
            ob_start(); ?>
                
            <script>
                
            (function($){

                "use strict";
                        
                $("html").removeClass("ut-no-js").addClass("ut-js js");    
                
                <?php
                
                /**
                  * Animated Hero Image
                  */           
            
                if( ut_return_hero_config('ut_hero_type', 'image') == 'animatedimage' ) :
                
                    $header_image = ut_return_hero_config('ut_hero_animated_image');
            
                    // animation speed in second
                    $image_speed  = ut_return_hero_config('ut_hero_animated_image_speed', 40);
                    $image_speed  = preg_replace("/[^0-9]/", '', $image_speed);        
            
                    // animation direction
                    $image_direction  = ut_return_hero_config('ut_hero_animated_image_direction', 'left');
                    $direction = $image_direction == 'right' ? '' : '-';
                
                    // alternate 
                    $alternate = ut_return_hero_config( 'ut_hero_animated_image_direction_alternate', 'on' );
            
                    if( !empty( $header_image ) ) :
                    
                        $header_image = ut_get_image_id( $header_image );    
                        $header_image = wp_get_attachment_image_src( $header_image , 'full' );
            
                        if( !empty( $header_image ) && is_array( $header_image ) ) :
            
                    ?>

                    $(document).ready(function(){
                        
                        
                        <?php if( ut_return_hero_config( 'ut_hero_animated_image_size' ) == 'cover' || !ut_return_hero_config( 'ut_hero_animated_image_size' ) && ut_return_hero_config('ut_hero_animated_image_cover', 'off') == 'off' ) : ?>
                        
                            var supportedFlag = $.keyframe.isSupported(),
                                position = $(window).width() < <?php echo $header_image[1]; ?> ? <?php echo $header_image[1]; ?> - $(window).width() : $(window).width();
                        
                            if( $(window).width() < <?php echo $header_image[1]; ?> ) {
                                
                               $('#ut-hero .parallax-scroll-container').addClass('ut-animated-image-background');
                        
                            }
                                      
                        <?php else : ?>
                            
                            var supportedFlag = $.keyframe.isSupported(),
                                position = $(window).width();
                                  
                        <?php endif; ?>                    
                        
                        <?php if( $alternate == 'off' ) : ?>              
                                      
                            $.keyframe.define([{
                                name: 'animatedBackground',
                                media: 'screen and (min-width: 1025px)',
                                '0%':  { 'background-position' : '0 0'},
                                '100%':{ 'background-position' : <?php echo $direction; ?>position+'px 0' },
                            }]);

                            $(window).load(function(){

                                $('#ut-hero .parallax-scroll-container').delay(800).queue(function(){
                                            
                                    $(this).addClass('ut-hero-ready').playKeyframe({
                                        name: 'animatedBackground',
                                        timingFunction: 'linear',
                                        duration: '<?php echo $image_speed; ?>s',
                                        iterationCount: 'infinite'
                                    });

                                });                            

                            });
                    
                        <?php else : ?>    
                        
                           $.keyframe.define([{
                                name: 'animatedBackground',
                                media: 'screen and (min-width: 1025px)',
                                '0%': { 'background-position' : '0 0'},
                                '50%':{ 'background-position' : <?php echo $direction; ?>position+'px 0' },
                                '100%': { 'background-position' : '0 0'}
                            }]);

                            $(window).load(function(){

                                $('#ut-hero .parallax-scroll-container').delay(800).queue(function(){

                                    $(this).addClass('ut-hero-ready').playKeyframe({
                                        name: 'animatedBackground',
                                        timingFunction: 'linear',
                                        duration: '<?php echo $image_speed; ?>s',
                                        iterationCount: 'infinite'
                                    });

                                });                            

                            });
                
                        <?php endif; ?>

                    });                
                
                    <?php endif; ?> 
                
                    <?php endif; ?> 
                
                <?php endif; ?>                
                
				
				<?php 
				
				/**
                  * Hero Area Loading
                  */ 
				
				?>
				
				$(document).ready(function(){
					
					var $sitebody = $("#ut-sitebody"),
						$hero_image_container = $(".parallax-scroll-container", "#ut-hero");
					
					// do not execute of no hero parallax container is available
					if( $hero_image_container.length ) {
					
						$hero_image_container.waitForImages(function() {

							// will also fire if no image has been set
							$sitebody.addClass("ut-hero-image-preloaded");

						});

						$(document.body).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '#ut-hero .parallax-scroll-container', function() {

							if( !$sitebody.hasClass("ut-hero-animation-finished") ) {

							   $sitebody.addClass("ut-hero-image-animated");

							}

						});

						$(document.body).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '#ut-hero .hero-holder', function() {

							$sitebody.addClass("ut-hero-animation-finished");
							$sitebody.removeClass("ut-hero-image-animated");

						});
					
					}					
				
				});
				
            })(jQuery);

            </script>    
                
            <?php 
            
            echo '<script type="text/javascript">' . $this->minify_js( ob_get_clean() ) . '</script>';            
            
        }
                
        public function custom_js() {
            
            $ut_hero_type = ut_return_hero_config('ut_hero_type');
            $ut_hero_type = $ut_hero_type == 'dynamic' ? 'image' : $ut_hero_type; // fallback since dynmaic header has been removed with 4.4
            
            ob_start(); ?>
                
                <script>
                
                (function($){
        	
				    "use strict";
                    
                    $("html").addClass('js');
    				
					if (!String.prototype.includes) {
						
						String.prototype.includes = function(search, start) {
						
							if (typeof start !== 'number') {
								start = 0;
							}

						  	if (start + search.length > this.length) {
								
								return false;
								
						  	} else {
								
								return this.indexOf(search, start) !== -1;
								
							}
							
						};
						
					}
										
					function findLongestWord(str) {
						
						var strSplit = str.split(' ');
					  	var longestWord = 0;
						
					  	for(var i = 0; i < strSplit.length; i++){
							
							if(strSplit[i].length > longestWord) {
								longestWord = strSplit[i].length;								
							}
							
					  	}
						
						return longestWord;
						
					}
					
                    $.fn.flowtype = function(options) {

                        var settings = $.extend({
                            maximum    		 : 9999,
                            minimum    		 : 1,
                            maxFont    		 : 9999,
							lineHeight 		 : false,
                            minFont    		 : 1,
                            fontRatio  		 : 40,
							dynamicFontRatio : false
                        }, options),

                        changes = function(el) {
							
							var ratio_multi = 1.8;
							
							// dynamic responsive factor
							if(window.matchMedia('(max-width: 767px)').matches) {
								
								ratio_multi = 1.2;
								
							} else if (window.matchMedia('(max-width: 1024px)').matches) {
								
								ratio_multi = 1.6
								
							}
							
                            var $el      		= $(el),
								text			= $el.find('.ut-word-rotator').length ? $el.find('.ut-word-rotator').text() : $el.text(),
								lineheight  	= $el.css('line-height'),
                                elw     		= $el.parent().width(),
                                width    		= elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
								font_ratio		= settings.dynamicFontRatio ? ( findLongestWord( text.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n\t|\n|\r\t)/gm," ").trim() ) / ratio_multi ) : settings.fontRatio,
                                fontBase 		= width / font_ratio,
                                fontSize 		= fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
							
							$el.css('font-size', fontSize + 'px');
							
							if( settings.lineHeight && settings.lineHeight.includes("px") ) {
								
								lineheight = settings.lineHeight.replace("px", "");
								
								var ratio = lineheight / settings.maxFont;
								
								if( $el.hasClass("element-with-custom-line-height") || $el.parent().hasClass("element-with-custom-line-height") ) {
								
									el.style.setProperty( 'line-height', ( fontSize * ratio ) + 'px', 'important' );
							   
								} else {
									
									if( lineheight < fontSize ) {
									
										el.style.setProperty( 'line-height', fontSize + 'px', 'important' );
										
									}
									
								}
								
							}

                        };

                        return this.each(function() {

                            var that = this;

                            $(window).utresize(function(){
                                
                                changes(that);
                                
                            });
                            
                            changes(this);
                            
                        });

                    };
                    
                    
                    if( $('.site-logo h1', '#header-section').length ) {
        
                        var text_logo_original_font_size = $('.site-logo h1', '#header-section').css("font-size");
                        
                        if( text_logo_original_font_size ) {

                            var text_logo_max_font = text_logo_original_font_size.replace('px','');

                            $('.site-logo h1', '#header-section').flowtype({
                                maxFont: text_logo_max_font,
                                fontRatio : $('.site-logo h1', '#header-section').text().length / 2,
                                minFont: 10
                            });                    

                        }

                    }                    
                    
                    <?php if( ut_return_hero_config('ut_hero_type', 'image') != 'slider' ) : ?>
                    
                    if( $('.hero-description', '#ut-hero').length ) {
        
                        var hero_dt_original_font_size = $('.hero-description', '#ut-hero').css("font-size"),
							hero_dt_original_line_height = $('.hero-description', '#ut-hero').css("line-height");
                        
                        if( hero_dt_original_font_size ) {

                            var hero_dt_max_font = hero_dt_original_font_size.replace('px','');

                            $('.hero-description', '#ut-hero:not(.slider)').flowtype({
                                maxFont: hero_dt_max_font,
                                fontRatio : 24,
                                minFont: 10,
								// lineHeight : hero_dt_original_line_height
                            });                    

                        }

                    }

                    if( $('.hero-title', '#ut-hero').length ) {
						
                        var hero_title_original_font_size = $('.hero-title', '#ut-hero').css("font-size"),
							hero_title_original_line_height = $('.hero-title', '#ut-hero').css("line-height");
                        
                        if( hero_title_original_font_size ) {

                            var hero_title_max_font = hero_title_original_font_size.replace('px','');
							
                            $('.hero-title', '#ut-hero:not(.slider)').flowtype({
                                maxFont: hero_title_max_font,
								dynamicFontRatio : true,
                                minFont: 40,
								lineHeight : hero_title_original_line_height
                            });

                        }

                    }
                        
                    if( $('.hero-description-bottom', '#ut-hero').length ) {

                        var hero_db_original_font_size = $('.hero-description-bottom', '#ut-hero').css("font-size"),
							hero_db_original_line_height = $('.hero-description-bottom', '#ut-hero').css("line-height");

                        if( hero_db_original_font_size ) {

                            var hero_db_max_font = hero_db_original_font_size.replace('px','');

                            $('.hero-description-bottom', '#ut-hero:not(.slider)').flowtype({
                                maxFont: hero_db_max_font,
                                fontRatio : 24,
                                minFont: 12,
								// lineHeight : hero_db_original_line_height
                            });                    

                        }

                    }
                    
                    <?php endif; ?>
                    
                    $(".page-title, .parallax-title, .section-title").each( function(){

                        var title_original_font_size   = $(this).css("font-size"),
							title_original_line_height = $(this).css("line-height");
                        
                        if( title_original_font_size ) {

                            $(this).data("maxfont", title_original_font_size.replace('px','') );
							$(this).data("lineheight", title_original_line_height );
							
							var font_ratio = $(this).data("maxfont") <= 140 ? 8 : 4;
							
                            $(this).flowtype({
                                maxFont: $(this).data("maxfont"),
                                fontRatio : font_ratio,
                                minFont: 30,
								lineHeight : $(this).data("lineheight"),
                            });                

                        }

                    });
                    
                    $("#ut-overlay-nav ul > li").each( function(){

                        var overlay_font_size = $(this).css("font-size");

                        if( overlay_font_size ) {

                            $(this).data("maxfont", overlay_font_size.replace('px','') );

                            $(this).flowtype({
                                maxFont: $(this).data("maxfont"),
                                fontRatio : 8,
                                minFont: 25
                            });                

                        }

                    });                    
                    
                    $('.vc_section > .vc_row').each(function() {
                        
                        var $this = $(this);
                        
                        if( $this.parent().children('.vc_row').first().is(this) ) {
                            
                            if( $this.hasClass("vc_row-has-fill") ) {
                                
                                $this.parent().addClass("ut-first-row-has-fill");
                                
                            }
                            
                            $this.addClass('ut-first-row');
                            
                        } 
                        
                        if( $this.parent().children('.vc_row').last().is(this) ) {
                            
                            if( $this.hasClass("vc_row-has-fill") ) {
                                
                                $this.parent().addClass("ut-last-row-has-fill");
                                
                            }
                            
                            $this.addClass('ut-last-row');
                                    
                        }       
                    
                    });                    
					
					$(window).utresize(function(){
						
						$('.vc_section').each(function() {
							
							var $this = $(this);
							
							$this.removeClass('ut-first-section ut-last-section');
							
							if( $this.is(':first-of-type') && $this.is(':visible') ) {
                            
								$this.addClass('ut-first-section');    

							}
							
							if( $this.is(':first-of-type') && $this.is(':visible') && $this.next('.vc_row-full-width').next('.vc_section').is(':last-of-type') && !$this.next('.vc_row-full-width').next('.vc_section').is(':visible') ) {

								$this.addClass('ut-last-section');

							}							
							
							if( $this.is(':last-of-type') && $this.is(':visible') ) {

								$this.addClass('ut-last-section');

							}

							if( $this.is(':last-of-type') && $this.is(':visible') && $this.prev('.vc_row-full-width').prev('.vc_section').is(':first-of-type') && !$this.prev('.vc_row-full-width').prev('.vc_section').is(':visible') ) {

								$this.addClass('ut-first-section');

							}
							
						});
						
					});
					
                    $('.vc_section').each(function() {
        
                        var $this = $(this);
                        
                        if( $this.is(':first-of-type') && $this.is(':visible') ) {
                            
                            $this.addClass('ut-first-section');    
                            
                        }
                        
						if( $this.is(':first-of-type') && $this.is(':visible') && $this.next('.vc_row-full-width').next('.vc_section').is(':last-of-type') && !$this.next('.vc_row-full-width').next('.vc_section').is(':visible') ) {

							$this.addClass('ut-last-section');

						}
						
                        if( $this.is(':last-of-type') && $this.is(':visible') ) {
                            
                            $this.addClass('ut-last-section');
                            
                        }
                        
						if( $this.is(':last-of-type') && $this.is(':visible') && $this.prev('.vc_row-full-width').prev('.vc_section').is(':first-of-type') && !$this.prev('.vc_row-full-width').prev('.vc_section').is(':visible') ) {
                            
                            $this.addClass('ut-first-section');
                            
                        }
						                        
                        if( $this.hasClass('vc_section-has-no-fill') && !$this.hasClass('ut-last-row-has-fill') && $this.next('.vc_row-full-width').next('.vc_section').hasClass('vc_section-has-no-fill') && !$this.next('.vc_row-full-width').next('.vc_section').hasClass('ut-first-row-has-fill') ) {
                            
                            $this.addClass("vc_section-remove-padding-bottom");
                            
                        }
                        
                        
                    });
                    
					$('.ut-plan-module-popular').each(function() {
						
						var $this = $(this);
						
						$this.closest(".wpb_column").addClass("ut-column-with-popular-pricing-table");
								
					});
										
                    <?php 
                    
                     /**
                      * Scroll Fade Effect for Hero Area
                      */                    
                    
                    if( ut_return_hero_config('ut_hero_image_parallax') == 'on' ) : ?>

                        <?php if( !unite_mobile_detection()->isMobile() ) : ?>

                            var hero_inner = $(".hero-inner", '#ut-hero'); 
                            var scroll_down = $(".hero-down-arrow", '#ut-hero');

                            $(window).on("scroll", function() {

                                var st = $(this).scrollTop();

                                hero_inner.css({
                                    "opacity" : 1 - st/($(window).height()/4*3)
                                });

                                scroll_down.css({
                                    "opacity" : 1 - st/($(window).height()/4*3)
                                });

                            });

                        <?php endif; ?>

                    <?php endif; ?>
                    
					
                    <?php 
                    
                     /**
                      * Youtube Video Player 
                      */
            
                    if( !unite_mobile_detection()->isMobile() && $ut_hero_type == 'video' && ut_return_hero_config('ut_video_source' , 'youtube') == 'youtube' || unite_mobile_detection()->isMobile() && $ut_hero_type == 'video' && ut_return_hero_config('ut_video_source' , 'youtube') == 'youtube' && ut_return_hero_config('ut_video_mobile' , 'off') == 'on' || !unite_mobile_detection()->isMobile() && $ut_hero_type == 'tabs' && ut_return_hero_config('ut_video_containment', 'hero') == 'body' ) : ?>
                    
                        if( $("#ut-background-video-hero").length ) {						

                            var $hero_player = $("#ut-background-video-hero").YTPlayer();
							
							$hero_player.on("YTPReady",function(){
								
								$hero_player.siblings('.parallax-scroll-container').fadeOut();
								
							});
							
							$hero_player.on("YTPEnd",function(){
								
								$hero_player.siblings('.parallax-scroll-container').fadeIn();
								
							});
							
                            $("#ut-video-hero-control.youtube").click(function(event){

                                if( $(this).hasClass("ut-unmute") ) {									

                                    $(this).removeClass("ut-unmute").addClass("ut-mute");														
                                    $hero_player.YTPUnmute();

                                } else {

                                    $(this).removeClass("ut-mute").addClass("ut-unmute");
                                    $hero_player.YTPMute();							

                                }

                                event.preventDefault();

                            });

                        }
                    
                    <?php endif; ?>
                    
                    
                    
                    <?php
                
                    /**
                      * Retina JS Logo
                      */ 

                    $sitelogo_retina = !is_front_page() && !is_home() && ( !apply_filters( 'ut_show_hero', false ) ) ? ( ut_return_logo_config( 'ut_site_logo_alt_retina' ) ? ut_return_logo_config( 'ut_site_logo_alt_retina' ) : ut_return_logo_config( 'ut_site_logo_retina' ) ) : ut_return_logo_config( 'ut_site_logo_retina' );                        
                    $alternate_logo_retina = ut_return_logo_config( 'ut_site_logo_alt_retina' ) ? ut_return_logo_config( 'ut_site_logo_alt_retina' ) : ut_return_logo_config( 'ut_site_logo_retina' ); 

                    ?>

                    window.matchMedia||(window.matchMedia=function(){

                        var c=window.styleMedia || window.media;if(!c) {

                            var a=document.createElement("style"),
                                d=document.getElementsByTagName("script")[0],
                                e=null;

                            a.type="text/css";a.id="matchmediajs-test";d.parentNode.insertBefore(a,d);e="getComputedStyle"in window&&window.getComputedStyle(a,null)||a.currentStyle;c={matchMedium:function(b){b="@media "+b+"{ #matchmediajs-test { width: 1px; } }";a.styleSheet?a.styleSheet.cssText=b:a.textContent=b;return"1px"===e.width}}}return function(a){return{matches:c.matchMedium(a|| "all"),media:a||"all"}}

                    }());

                    var modern_media_query = window.matchMedia( "screen and (-webkit-min-device-pixel-ratio:2)");

                    <?php if( !empty( $sitelogo_retina ) ) : ?>

                        if( modern_media_query.matches ) {

                             var $logo = $(".site-logo").not("#ut-overlay-site-logo").find("img");
                            $logo.attr("src", retina_logos.sitelogo_retina );
                            
                        }

                    <?php endif; ?>
                    
                    <?php if( !empty( $alternate_logo_retina ) ) : ?>

                        if( modern_media_query.matches ) {

                             var $logo = $(".site-logo").not("#ut-overlay-site-logo").find("img");
                            $logo.data("altlogo" , retina_logos.alternate_logo_retina );        

                        }

                    <?php endif; ?>
                    
                    <?php if( ot_get_option("ut_overlay_logo_retina") ) : ?>

                        if( modern_media_query.matches ) {

                            var $logo = $("#ut-overlay-site-logo img");
                            $logo.attr("src", retina_logos.overlay_sitelogo_retina );

                        }

                    <?php endif; ?>
                    
					
					
					<?php if( ut_return_header_config( 'ut_header_top_type', 'classic' ) == 'advanced' ) : ?>
						
						/* Global Variables
						================================================== */                    
						var brooklyn_scroll_offset = $('#ut-header').height();                    

						/* Global Objects
						================================================== */
						var $brooklyn_main   = $("#main-content");
					
						/* Header Top Animations 
						================================================== */
						<?php if( ut_return_header_config( 'ut_header_layout', 'default' ) == 'default' && ut_return_header_config( 'ut_header_scroll_position', 'floating' ) == 'floating' ) : ?>

							var $header = $("#ut-header"),
								$logo	= $(".ut-site-logo img"),
								logo	= $logo.attr("src"),
								logoalt = $logo.data("alternate-logo");

							function ut_nav_skin_changer( direction, animClassDown, animClassUp, headerClassDown, headerClassUp ) {

								animClassUp = typeof animClassUp !== 'undefined' ? animClassUp : '';
								animClassDown = typeof animClassDown !== 'undefined' ? animClassDown : '';

								headerClassUp = typeof headerClassUp !== 'undefined' ? headerClassUp : '';
								headerClassDown = typeof headerClassDown !== 'undefined' ? headerClassDown : '';                            

								if( direction === "down" ) {

									$logo.attr("src" , logoalt );        
									$header.attr("class", "ut-header").addClass(headerClassDown).addClass(animClassDown);                                

								} else if( direction === "up" ){

									$logo.attr("src" , logo );
									$header.attr("class", "ut-header").addClass(headerClassUp).addClass(animClassUp);                                

								}

							}

							<?php

							// default classes 
							$classes = array();

							$classes[] = 'ut-header-floating';
							$classes[] = 'ut-header-' . ut_return_header_config('ut_header_top_layout' , 'style-1');

							$classes[] = ut_return_header_config( 'ut_navigation_shadow', 'off' ) == 'off' ? 'ut-header-shadow-off' : '';
							$classes[] = ut_return_header_config( 'ut_navigation_transparent_border' ) == 'on' ?  'ut-header-has-border' : '';
							$classes[] = ut_return_header_config( 'ut_navigation_width', 'centered' ) == 'centered' ? 'ut-header-centered' : 'ut-header-fullwidth';
			
			

							?>

							<?php 

							/* 
							 * Animation for Custom Headers with individual classes
							 */

							if( apply_filters( 'ut_show_hero', false ) && ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-custom' ) : ?>
								
								<?php if( ut_return_header_config('ut_navigation_customskin_state' , 'off') == 'off' ) : ?>

									<?php $classes[] = 'ut-primary-custom-skin'; ?>

									$brooklyn_main.waypoint( function( direction ) {

										ut_nav_skin_changer( direction ,  $( "#main-content" ).data( "animateDown" ) , $( "#main-content" ).data( "animateUp" ), "<?php echo implode(' ', $classes ); ?>", "<?php echo implode(' ', $classes ); ?>" );

									}, { offset: brooklyn_scroll_offset } );


								<?php endif; ?>


								<?php if( ut_return_header_config('ut_navigation_customskin_state' , 'off') == 'on_switch' ) : ?>                            

									$brooklyn_main.waypoint( function( direction ) {

										ut_nav_skin_changer(direction, "ut-secondary-custom-skin", "ut-primary-custom-skin", "<?php echo implode(' ', $classes ); ?>", "<?php echo implode(' ', $classes ); ?>" );			

									}, { offset: brooklyn_scroll_offset }); 

								<?php endif; ?>
					

							<?php endif; ?>                    


							<?php if( apply_filters( 'ut_show_hero', false ) && ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) != 'ut-header-custom' ) : ?>
								
								<?php if( ut_return_header_config('ut_navigation_state' , 'off') == 'off' ) : ?>

									<?php  $classes[] = ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ); ?>

									$brooklyn_main.waypoint( function( direction ) {

										ut_nav_skin_changer( direction , $( "#main-content" ).data( "animateDown" ) , $( "#main-content" ).data( "animateUp" ), "<?php echo implode(' ', $classes ); ?>", "<?php echo implode(' ', $classes ); ?>" );

									}, { offset: brooklyn_scroll_offset } );


								<?php endif; ?>


								<?php if( ut_return_header_config('ut_navigation_state' , 'off') == 'on_transparent' ) : ?>

								   <?php $navigation_skin = ut_return_header_config('ut_navigation_skin' , 'ut-header-light'); ?>

								   $brooklyn_main.waypoint( function( direction ) {

										ut_nav_skin_changer( direction, "<?php echo $navigation_skin; ?> ut-header-floating ut-header-<?php echo ut_return_header_config('ut_header_top_layout' , 'style-1'); ?>", "ut-header-transparent ut-header-floating ut-header-<?php echo ut_return_header_config('ut_header_top_layout' , 'style-1'); ?>" );

								   }, { offset: brooklyn_scroll_offset });

								<?php endif; ?>
					

							<?php endif; ?>

						<?php endif; ?>
					
					<?php endif; ?>
					
                })(jQuery);
                
                </script>
                
            <?php 
            
            echo $this->minify_js( ob_get_clean() );
            
            
        }        
            
    }

}

$UT_Custom_JS = new UT_Custom_JS;
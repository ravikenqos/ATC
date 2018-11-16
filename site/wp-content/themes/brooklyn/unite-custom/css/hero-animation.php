<?php

if ( ! defined( 'ABSPATH' ) ) exit;

if( !class_exists( 'UT_Hero_Animation_CSS' ) ) {	
    
    class UT_Hero_Animation_CSS extends UT_Custom_CSS {
        
        public function custom_css() {
			
			// hero type
            $ut_hero_type = ut_return_hero_config( 'ut_hero_type', 'image' );
            $ut_hero_type = $ut_hero_type == 'dynamic' ? 'image' : $ut_hero_type;
			
            ob_start(); ?>
            
            <style id="ut-hero-animation-css" type="text/css">
                
				<?php if( apply_filters( 'ut_show_hero', false ) && ( $ut_hero_type == 'image' || $ut_hero_type == 'splithero' || $ut_hero_type == 'animatedimage' || $ut_hero_type == 'tabs' || $ut_hero_type == 'video' ) ) : ?>
				
					/* # Animate Hero Overlay
					================================================== */
					.ut-js #ut-sitebody #ut-hero .parallax-overlay {
						opacity: 0;
					}
					.ut-js #ut-sitebody #ut-hero .parallax-overlay {
						-webkit-transition: opacity 0.20s linear;
						   -moz-transition: opacity 0.20s linear;
								transition: opacity 0.20s linear;
					}
					.ut-js #ut-sitebody.ut-hero-image-preloaded #ut-hero .parallax-overlay {
						opacity: 1;
					}

					/* # Animate Hero Scroll Container
					================================================== */
					.ut-js #ut-sitebody #ut-hero .parallax-scroll-container {
						visibility: hidden;
					}
					.ut-js #ut-sitebody.ut-hero-image-preloaded #ut-hero .parallax-scroll-container {
						visibility: visible;
						-webkit-animation: heroFadeIn 1s linear;
						   -moz-animation: heroFadeIn 1s linear;
								animation: heroFadeIn 1s linear;
					}

					/* # Other Hero Related Animation
					================================================== */
					.ut-js #ut-sitebody #ut-hero .hero-holder,
					.ut-js #ut-sitebody #ut-hero .ut-tablet-holder,
					.ut-js #ut-sitebody .hero-down-arrow-wrap {
						visibility: hidden;
						will-change: "opacity";
					}
					.ut-js #ut-sitebody.ut-hero-image-animated #ut-hero .hero-holder,
					.ut-js #ut-sitebody.ut-hero-image-animated #ut-hero .ut-tablet-holder {
						visibility: visible;
						-webkit-animation: heroRelFadeIn 1s linear;
						   -moz-animation: heroRelFadeIn 1s linear;
								animation: heroRelFadeIn 1s linear;
					}
					.ut-js #ut-sitebody.ut-hero-image-animated #ut-hero .hero-down-arrow-wrap {
						visibility: visible;
						-webkit-animation: heroRelFadeIn 1s linear;
						   -moz-animation: heroRelFadeIn 1s linear;
								animation: heroRelFadeIn 1s linear;
					}
					.ut-js #ut-sitebody.ut-hero-animation-finished #ut-hero .hero-holder,
					.ut-js #ut-sitebody.ut-hero-animation-finished #ut-hero .ut-tablet-holder,
					.ut-js #ut-sitebody.ut-hero-animation-finished #ut-hero .parallax-scroll-container,
					.ut-js #ut-sitebody.ut-hero-animation-finished #ut-hero .hero-down-arrow-wrap {
						visibility: visible;
					}
					
					<?php if( ut_return_header_config( 'ut_header_layout', 'default' ) == 'default' && ut_return_header_config('ut_navigation_scroll_position' , 'floating') == 'floating' || ut_return_header_config( 'ut_header_layout', 'default' ) == 'default' && ut_return_header_config('ut_navigation_scroll_position' , 'floating') == 'fixed' && ut_return_header_config( 'ut_navigation_state') == 'on_transparent' ) : ?>
				
						.ut-js #ut-sitebody #header-section {
							visibility: hidden;
							will-change: "opacity";
						}

						.ut-js #ut-sitebody.ut-hero-image-animated #header-section {
							visibility: visible;
							-webkit-animation: heroRelFadeIn 1s linear;
							   -moz-animation: heroRelFadeIn 1s linear;
									animation: heroRelFadeIn 1s linear;
						}

						.ut-js #ut-sitebody.ut-hero-animation-finished #header-section {
							visibility: visible;
						}
				
					<?php endif; ?>
				
				<?php endif; ?>
				
				/* # Hero Related Animation Keyframes
				================================================== */
				@-webkit-keyframes heroFadeIn {
					0% {
						opacity: 0;
					}
					66% {
						opacity: 0;
					}
					76% {
						opacity: 1;
					}
					100% {
						opacity: 1;
					}
				}

				@-moz-keyframes heroFadeIn {
					0% {
						opacity: 0;
					}
					66% {
						opacity: 0;
					}
					76% {
						opacity: 1;
					}
					100% {
						opacity: 1;
					}
				}

				@keyframes heroFadeIn {
					0% {
						opacity: 0;
					}
					66% {
						opacity: 0;
					}
					76% {
						opacity: 1;
					}
					100% {
						opacity: 1;
					}
				}

				@-webkit-keyframes heroRelFadeIn {
					0% {
						opacity: 0;
					}
					50% {
						opacity: 1;
					}
					100% {
						opacity: 1;
					}
				}

				@-moz-keyframes heroRelFadeIn {
					0% {
						opacity: 0;
					}
					50% {
						opacity: 1;
					}
					100% {
						opacity: 1;
					}
				}

				@keyframes heroRelFadeIn {
					0% {
						opacity: 0;
					}
					50% {
						opacity: 1;
					}
					100% {
						opacity: 1;
					}
				}
                
            </style>
            
            <?php 
 
            echo $this->minify_css( ob_get_clean() );
        
        }  
            
    }

}

new UT_Hero_Animation_CSS;
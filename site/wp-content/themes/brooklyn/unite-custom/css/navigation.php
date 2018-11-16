<?php

if ( ! defined( 'ABSPATH' ) ) exit;

if( !class_exists( 'UT_Navigation_CSS' ) ) {	
    
    class UT_Navigation_CSS extends UT_Custom_CSS {
        
        public function custom_css() {
            
			if( ut_return_header_config( 'ut_header_top_type', 'classic' ) == 'advanced' ) {
				return;
			}
			
            /* font weight fallback */
            $font_weight_fallback = ut_return_header_config( 'ut_navigation_font_weight', 'normal' ) == 'bold' ? 'semibold' : 'regular';
            
            ob_start(); ?>
            
            <style id="ut-navigation-custom-css" type="text/css">
            
            /* Main Navigation
            ================================================== */ 
            <?php 
            
                echo $this->font_style_css( array(
                    'selector'           => '#ut-sitebody #ut-mobile-menu a, #ut-sitebody #navigation ul li a',
                    'font-type'          => ot_get_option('ut_global_navigation_font_type', 'ut-font' ),   
                    'font-style'         => ot_get_option('ut_global_navigation_font_style', $font_weight_fallback ),
                    'google-font-style'  => ot_get_option('ut_global_navigation_google_font_style'),
                    'websafe-font-style' => ot_get_option('ut_global_navigation_websafe_font_style'),
					'custom-font-style'  => ot_get_option('ut_global_navigation_custom_font_style')
                ) );			
                
            ?>
            
            /* Main Navigation Submenu
            ================================================== */        
            <?php 
			
			echo $this->typography_css( '#ut-sitebody #navigation ul.sub-menu li > a', ot_get_option('ut_global_navigation_submenu_font_style') );
			echo $this->typography_css( '#ut-sitebody #navigation .ut-navigation-column-list li a', ot_get_option('ut_global_navigation_submenu_font_style') ); ?>     
            
            #navigation ul.sub-menu,
			#navigation .ut-megamenu	{ 
                border-top-color:<?php echo $this->accent; ?>; 
            }
            
            <?php if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-light' ) : ?>
                
                /* Light Skin Navigation Settings
                ================================================== */
                #ut-sitebody #navigation li a:not(.bklyn-btn):hover { color: <?php echo $this->accent; ?>; }
                
                /* main navigation parents and ancestor */
                #ut-sitebody #navigation .selected,
                #ut-sitebody #navigation ul li.current_page_parent:not(.ut-front-page-link) a.active,
                #ut-sitebody #navigation ul li.current-menu-ancestor:not(.ut-front-page-link) a.active { color: <?php echo $this->accent; ?>; }
                             
                #ut-sitebody #navigation ul li a:not(.bklyn-btn):hover, 
                #ut-sitebody #navigation ul.sub-menu li a:not(.bklyn-btn):hover { color: <?php echo $this->accent; ?>; }
				#ut-sitebody #navigation .ut-navigation-column-list li a:not(.bklyn-btn):hover { color: <?php echo $this->accent; ?>; }
                
                /* main navigation current page */
                #ut-sitebody #navigation ul li.current-menu-item:not(.current_page_parent):not(.menu-item-object-custom) a,
                #ut-sitebody #navigation ul li.current_page_item:not(.current_page_parent):not(.menu-item-object-custom) a { color: <?php echo $this->accent; ?>; }
                
                <?php if( ut_return_header_config('ut_navigation_state') == 'on_transparent' && ut_return_header_config('ut_navigation_transparent_border') == 'on' ) : ?>
                
                /* animation black line fix */
                #ut-sitebody #header-section.ha-transparent:not(.ut-header-has-border) {
                    border-color: transparent;
                }
				
                <?php endif; ?>
                
				<?php if( ut_return_header_config('ut_navigation_state') == 'on_transparent' && ut_return_header_config('ut_navigation_transparent_border') == 'off' ) : ?>
				
				#ut-sitebody .ha-header.ut-header-light:not(.ut-header-has-border) {
                    border: none;
                }
				
				<?php endif; ?>
                
            <?php endif; ?>
            
            
            <?php if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-dark' ) : ?>
                
                /* Dark Skin Navigation Settings
                ================================================== */
                
                /* main navigation parents and ancestor */
                #ut-sitebody #navigation .selected, 
                #ut-sitebody .ut-header-dark #navigation ul li.current_page_parent:not(.ut-front-page-link) a.active,
                #ut-sitebody .ut-header-dark #navigation ul li.current-menu-ancestor:not(.ut-front-page-link) a.active { color: <?php echo $this->accent; ?>; }
                
                /* main navigation current page */
                #ut-sitebody .ut-header-dark #navigation ul li.current-menu-item:not(.current_page_parent):not(.menu-item-object-custom) a,
                #ut-sitebody .ut-header-dark #navigation ul li.current_page_item:not(.current_page_parent):not(.menu-item-object-custom) a { color: <?php echo $this->accent; ?>; }
                
                <?php if( ut_return_header_config( 'ut_navigation_level_one_color' ) )  { ?>
                    
                    #ut-sitebody .ut-header-dark #navigation ul li a:not(.bklyn-btn) { color: <?php echo ut_return_header_config( 'ut_navigation_level_one_color' ); ?>; }    
                
                <?php } ?>
                
                <?php if( ut_return_header_config('ut_navigation_level_one_icon_color') ) { ?>
                    
                    #ut-sitebody .ut-header-dark #navigation ul li a:not(.bklyn-btn):after { color: <?php echo ut_return_header_config('ut_navigation_level_one_icon_color'); ?>; }
                
                <?php } ?>
                
                <?php if( ut_return_header_config('ut_navigation_state') == 'on_transparent' && ut_return_header_config('ut_navigation_transparent_border') == 'on' ) : ?>
                
                /* animation black line fix */
                #ut-sitebody #header-section.ha-transparent:not(.ut-header-has-border) {
                    border-color: transparent;
                }                     
                
                <?php endif; ?>
				
				<?php if( ut_return_header_config('ut_navigation_state') == 'on_transparent' && ut_return_header_config('ut_navigation_transparent_border') == 'off' ) : ?>
				
				#ut-sitebody .ha-header.ut-header-dark:not(.ut-header-has-border) {
                    border: none;
                }
				
				<?php endif; ?>
                
            <?php endif; ?>
            
            
            /* Custom Skin Navigation Settings
            ================================================== */
            
            <?php if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-custom' ) : ?>            
                
                /* Primary Skin Settings
                ================================================== */       
                <?php if( ut_return_header_config( 'ut_header_ps_text_logo_color' ) ) : ?>
                        
                    .ut-primary-custom-skin h1.logo a {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ps_text_logo_color' ) ); ?>;
                        color:<?php echo ut_return_header_config( 'ut_header_ps_text_logo_color' ); ?>;
                    }
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_header_ps_text_logo_color_hover' ) ) : ?>
                
                    .ut-primary-custom-skin h1.logo a:hover,
                    .ut-primary-custom-skin h1.logo a:focus,
                    .ut-primary-custom-skin h1.logo a:active {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ps_text_logo_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_header_ps_text_logo_color_hover' ); ?> !important;
                    }
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_header_ps_hover_text_logo_color' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover h1.logo a {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ps_hover_text_logo_color' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_header_ps_hover_text_logo_color' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_header_ps_hover_text_logo_color_hover' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover h1.logo a:hover,
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover h1.logo a:focus,
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover h1.logo a:active {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ps_hover_text_logo_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_header_ps_hover_text_logo_color_hover' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                                
                <?php if( ut_return_header_config( 'ut_header_ps_background_color' ) ) : ?>
                    
                    <?php 
                    
                    $ut_header_ps_background_color = ut_return_header_config( 'ut_header_ps_background_color' );
            
                    if( $this->is_gradient( $ut_header_ps_background_color ) ) : ?>
                        
                        #ut-sitebody #header-section.ut-primary-custom-skin:before,
                        #ut-sitebody #header-section.ut-primary-custom-skin:after {
                            position: absolute;
                            content: '';
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            transition: opacity 0.5s ease-in-out;
                            opacity: 0;
                        }
                
                        <?php echo $this->create_gradient_css( $ut_header_ps_background_color, '#ut-sitebody #header-section.ut-primary-custom-skin:before', false, 'background' ); ?>
                
                        #ut-sitebody #header-section.ut-primary-custom-skin:before {
                            opacity: 1;
                        }
                
                        #ut-sitebody #header-section.ut-primary-custom-skin {
                            background: transparent;
                        } 
            
                    <?php else : ?>                
                        
                        #ut-sitebody #header-section.ut-primary-custom-skin {
                            background:transparent !important;
                            background:<?php echo $this->rgba_to_rgb( $ut_header_ps_background_color ); ?> !important;
                            background:<?php echo $ut_header_ps_background_color; ?> !important;
                        }
                
                    <?php endif; ?>
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_header_ps_shadow_color' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header {
                       -webkit-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ps_shadow_color' ); ?>;
                          -moz-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ps_shadow_color' ); ?>;
                               box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ps_shadow_color' ); ?>;
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_header_ps_border_color' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header {
                        border-bottom:1px solid <?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ps_border_color' ) ); ?>;
                        border-bottom:1px solid <?php echo ut_return_header_config( 'ut_header_ps_border_color' ); ?>;
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_header_ps_border_color_hover' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin:hover {
                        border-bottom:1px solid <?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ps_border_color_hover' ) ); ?>;
                        border-bottom:1px solid <?php echo ut_return_header_config( 'ut_header_ps_border_color_hover' ); ?>;
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_header_ps_background_color_hover' ) ) : ?>
                    
                    <?php 
                    
                    $ut_header_ps_background_color_hover = ut_return_header_config( 'ut_header_ps_background_color_hover' );
            
                    if( $this->is_gradient( $ut_header_ps_background_color_hover ) ) : ?> 
                    
                        #ut-sitebody #header-section.ut-primary-custom-skin:after {
                            position: absolute;
                            content: '';
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            transition: opacity 0.5s ease-in-out;
                            opacity: 0;
                        }
                
                        <?php echo $this->create_gradient_css( $ut_header_ps_background_color_hover, '#ut-sitebody #header-section.ut-primary-custom-skin:after', false, 'background', true ); ?>
                
                        #ut-sitebody #header-section.ut-primary-custom-skin:hover:after {
                            opacity: 1;
                        }
                
                        #ut-sitebody #header-section.ut-primary-custom-skin:hover {
                            background: transparent !important;
                        }                
                
                    <?php else : ?>                
                        
                        #ut-sitebody #header-section.ut-primary-custom-skin:hover {
                            background:<?php echo $this->rgba_to_rgb( $ut_header_ps_background_color_hover ); ?> !important;
                            background:<?php echo $ut_header_ps_background_color_hover; ?> !important;
                        }
                
                    <?php endif; ?>
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_header_ps_shadow_color_hover' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover {
                       -webkit-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ps_shadow_color_hover' ); ?>;
                          -moz-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ps_shadow_color_hover' ); ?>;
                               box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ps_shadow_color_hover' ); ?>;
                    }
                
                <?php endif; ?>
                                
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_fl_color' ) ) : ?>
                
                    #ut-sitebody .ut-primary-custom-skin #navigation ul li a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_fl_color' ) ); ?>;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_fl_color' ); ?>;   
                    }    
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_fl_color_hover' ) ) : ?>
                
                    #ut-sitebody .ut-primary-custom-skin #navigation ul li a:not(.bklyn-btn):hover,
                    #ut-sitebody .ut-primary-custom-skin #navigation ul li a:not(.bklyn-btn):focus,
                    #ut-sitebody .ut-primary-custom-skin #navigation ul li a:not(.bklyn-btn):active {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_fl_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_fl_color_hover' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_fl_dot_color' ) ) : ?>
                
                    #ut-sitebody .ut-primary-custom-skin #navigation ul li a:not(.bklyn-btn)::after {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_fl_dot_color' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_fl_dot_color' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                                
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_navigation_ps_hover_fl_color' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover #navigation > ul > li > a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_hover_fl_color' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_hover_fl_color' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_navigation_ps_hover_fl_color_active' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover #navigation > ul > li > a.active:not(.bklyn-btn),
					#ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover #navigation > ul > li > a.selected:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_hover_fl_color_active' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_hover_fl_color_active' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_navigation_ps_hover_fl_color_hover' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover #navigation > ul > li > a:not(.bklyn-btn):hover,
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover #navigation > ul > li > a:not(.bklyn-btn):active,
                    #ut-sitebody #header-section.ut-primary-custom-skin.ha-header:hover #navigation > ul > li > a:not(.bklyn-btn):focus {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_hover_fl_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_hover_fl_color_hover' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_hover_state', 'off' ) == 'on' && ut_return_header_config( 'ut_navigation_ps_hover_fl_dot_color' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-primary-custom-skin:hover #navigation ul li a:not(.bklyn-btn)::after {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_hover_fl_dot_color' ) ); ?> !important;   
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_hover_fl_dot_color' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_fl_active_color' ) ) : ?>
                
                    #ut-sitebody .ut-primary-custom-skin #navigation .current_page_item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn), 
                    #ut-sitebody .ut-primary-custom-skin #navigation .current-menu-item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation .current_page_ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn), 
                    #ut-sitebody .ut-primary-custom-skin #navigation .current-menu-ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation ul li a:not(.bklyn-btn).selected {
                         color:<?php echo $this->rgba_to_rgb(  ut_return_header_config( 'ut_navigation_ps_fl_active_color' ) ); ?> !important;
                         color:<?php echo ut_return_header_config( 'ut_navigation_ps_fl_active_color' ); ?> !important;
                    }
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_sl_color' ) ) : ?>
            
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn),
					#ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_color' ) ); ?>;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_color' ); ?>;
                    }
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_sl_color_hover' ) ) : ?>
                
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn):hover,
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn):focus,
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn):active  {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_color_hover' ); ?> !important;
                    }
				
					#ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn):hover,
                    #ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn):focus,
                    #ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn):active  {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_color_hover' ); ?> !important;
                    }
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_sl_active_color' ) ) : ?>
                    
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu .current_page_item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu .current-menu-item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu .current_page_ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu .current-menu-ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_active_color' ) ); ?>!important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_active_color' ); ?>!important;
                    }
				
					#ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list .current_page_item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list .current-menu-item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list .current_page_ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-primary-custom-skin #navigation .ut-navigation-column-list .current-menu-ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_active_color' ) ); ?>!important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_active_color' ); ?>!important;
                    }
                    
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_sl_background_color' ) ) : ?>
                    
                    <?php 
                    
                    $ut_navigation_ps_sl_background_color = ut_return_header_config( 'ut_navigation_ps_sl_background_color' );
            
                    if( $this->is_gradient( $ut_navigation_ps_sl_background_color ) ) : 
                    
                        echo $this->create_gradient_css( $ut_navigation_ps_sl_background_color, '#ut-sitebody .ut-primary-custom-skin #navigation .sub-menu', false, 'background' );
						echo $this->create_gradient_css( $ut_navigation_ps_sl_background_color, '#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu', false, 'background' );
                
                    else : ?>                
                
                        #ut-sitebody .ut-primary-custom-skin #navigation .sub-menu,
						#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu {
                            background:<?php echo $this->rgba_to_rgb( $ut_navigation_ps_sl_background_color ); ?>;
                            background:<?php echo $ut_navigation_ps_sl_background_color; ?>;
                        }
                
                    <?php endif; ?>
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_navigation_ps_sl_shadow_color' ) ) : ?>
                
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu,
					#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu  {
                       -webkit-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_navigation_ps_sl_shadow_color' ); ?>;
                          -moz-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_navigation_ps_sl_shadow_color' ); ?>;
                               box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_navigation_ps_sl_shadow_color' ); ?>;
                    }
                
                <?php endif; ?>
				
				<?php if( ut_return_header_config( 'ut_navigation_ps_sl_border_width' ) != '' ) : ?>
                    
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu,
					#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu {
                        border-width:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_border_width' ); ?>px !important;
                    }
                
                <?php endif; ?>
				
                <?php if( ut_return_header_config( 'ut_navigation_ps_sl_border_color' ) ) : ?>
                    
                    #ut-sitebody .ut-primary-custom-skin #navigation ul.sub-menu,
					#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu {
                        border-color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_border_color' ) ); ?> !important;
                        border-color:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_border_color' ); ?> !important;
                    }
                
                <?php endif; ?>
                                
                
                /* Secondary Skin Settings
                ================================================== */
                <?php if( ut_return_header_config( 'ut_header_ss_text_logo_color' ) ) : ?>
                        
                    .ut-secondary-custom-skin h1.logo a {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ss_text_logo_color' ) ); ?>;
                        color:<?php echo ut_return_header_config( 'ut_header_ss_text_logo_color' ); ?>;   
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_header_ss_text_logo_color_hover' ) ) : ?>
                
                    .ut-secondary-custom-skin h1.logo a:hover,
                    .ut-secondary-custom-skin h1.logo a:focus,
                    .ut-secondary-custom-skin h1.logo a:active {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ss_text_logo_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_header_ss_text_logo_color_hover' ); ?> !important;
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_header_ss_background_color' ) ) : ?>
                    
                    <?php 
                    
                    $ut_header_ss_background_color = ut_return_header_config( 'ut_header_ss_background_color' );
            
                    if( $this->is_gradient( $ut_header_ss_background_color ) ) : ?>
                    
                        #ut-sitebody #header-section.ut-secondary-custom-skin:before,
                        #ut-sitebody #header-section.ut-secondary-custom-skin:after {
                            position: absolute;
                            content: '';
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            transition: opacity 0.5s ease-in-out;
                            opacity: 0;
                        }
                        
                        <?php echo $this->create_gradient_css( $ut_header_ss_background_color, '#ut-sitebody #header-section.ut-secondary-custom-skin:after', false, 'background' ); ?>
                
                        #ut-sitebody #header-section.ut-secondary-custom-skin:after {
                            opacity: 1;
                        }
                
                        #ut-sitebody #header-section.ut-secondary-custom-skin {
                            background: transparent !important;
                        }
                
                    <?php else : ?>                
                
                        #ut-sitebody #header-section.ut-secondary-custom-skin {
                            background:transparent !important;
                            background:<?php echo $this->rgba_to_rgb( $ut_header_ss_background_color ); ?> !important;
                            background:<?php echo $ut_header_ss_background_color; ?> !important;
                        }
                
                    <?php endif; ?>
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_header_ss_shadow_color' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-secondary-custom-skin.ha-header {
                       -webkit-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ss_shadow_color' ); ?>;
                          -moz-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ss_shadow_color' ); ?>;
                               box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_header_ss_shadow_color' ); ?>;
                    }
                
                <?php endif; ?>
                
                <?php if( ut_return_header_config( 'ut_header_ss_border_color' ) ) : ?>
                
                    #ut-sitebody #header-section.ut-secondary-custom-skin.ha-header {
                       border-bottom:1px solid <?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_header_ss_border_color' ) ); ?>;
                       border-bottom:1px solid <?php echo ut_return_header_config( 'ut_header_ss_border_color' ); ?>;
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_fl_color' ) ) : ?>
                
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul li a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_fl_color' ) ); ?>;   
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_fl_color' ); ?>;   
                    }    
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_fl_color_hover' ) ) : ?>
                
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul li a:not(.bklyn-btn):hover,
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul li a:not(.bklyn-btn):focus,
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul li a:not(.bklyn-btn):active {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_fl_color_hover' ) ); ?> !important;   
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_fl_color_hover' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_fl_dot_color' ) ) : ?>
                
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul li a:not(.bklyn-btn)::after {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_fl_dot_color' ) ); ?> !important;   
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_fl_dot_color' ); ?> !important;   
                    }    
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_fl_active_color' ) ) : ?>
                
                    #ut-sitebody .ut-secondary-custom-skin #navigation .current_page_item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn), 
                    #ut-sitebody .ut-secondary-custom-skin #navigation .current-menu-item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation .current_page_ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn), 
                    #ut-sitebody .ut-secondary-custom-skin #navigation .current-menu-ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul li a:not(.bklyn-btn).selected {
                         color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_fl_active_color' ) ); ?> !important;
                         color:<?php echo ut_return_header_config( 'ut_navigation_ss_fl_active_color' ); ?> !important;
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_sl_color' ) ) : ?>

					#ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn),
					#ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_color' ) ); ?>;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_color' ); ?>;
                    }
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_sl_color_hover' ) ) : ?>
                
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn):hover,
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn):focus,
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu li > a:not(.bklyn-btn):active  {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_color_hover' ); ?> !important;
                    }
				
					#ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn):hover,
                    #ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn):focus,
                    #ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list li > a:not(.bklyn-btn):active  {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_color_hover' ) ); ?> !important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_color_hover' ); ?> !important;
                    }
                
                <?php endif; ?>
                
				<?php if( ut_return_header_config( 'ut_navigation_ss_sl_active_color' ) ) : ?>
                    
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu .current_page_item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu .current-menu-item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu .current_page_ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu .current-menu-ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_active_color' ) ); ?>!important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_active_color' ); ?>!important;
                    }
				
					#ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list .current_page_item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list .current-menu-item:not(.menu-item-object-custom):not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list .current_page_ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn),
                    #ut-sitebody .ut-secondary-custom-skin #navigation .ut-navigation-column-list .current-menu-ancestor:not(.ut-front-page-link) > a:not(.bklyn-btn) {
                        color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_active_color' ) ); ?>!important;
                        color:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_active_color' ); ?>!important;
                    }
                    
                <?php endif; ?>
				
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_sl_background_color' ) ) : ?>
                    
                    <?php 
                    
                    $ut_navigation_ss_sl_background_color = ut_return_header_config( 'ut_navigation_ss_sl_background_color' );
            
                    if( $this->is_gradient( $ut_navigation_ss_sl_background_color ) ) : 
                    
                        echo $this->create_gradient_css( $ut_navigation_ss_sl_background_color, '#ut-sitebody .ut-secondary-custom-skin #navigation .sub-menu', false, 'background' );
						echo $this->create_gradient_css( $ut_navigation_ss_sl_background_color, '#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu', false, 'background' );
                
                    else : ?>                
                
                        #ut-sitebody .ut-secondary-custom-skin #navigation .sub-menu,
						#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu {
                            background:<?php echo $this->rgba_to_rgb( $ut_navigation_ss_sl_background_color ); ?>;
                            background:<?php echo $ut_navigation_ss_sl_background_color; ?>;
                        }
                
                    <?php endif; ?>
                
                <?php endif; ?>
                
                
                <?php if( ut_return_header_config( 'ut_navigation_ss_sl_shadow_color' ) ) : ?>
                
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu,
					#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu {
                       -webkit-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_navigation_ss_sl_shadow_color' ); ?>;
                          -moz-box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_navigation_ss_sl_shadow_color' ); ?>;
                               box-shadow:0 1px 5px <?php echo ut_return_header_config( 'ut_navigation_ss_sl_shadow_color' ); ?>;
                    }
                
                <?php endif; ?>
                                
				<?php if( ut_return_header_config( 'ut_navigation_ss_sl_border_width' ) != '' ) : ?>
                    
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu,
					#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu {
                        border-width:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_border_width' ); ?>px !important;
                    }
                
                <?php endif; ?>
				
                <?php if( ut_return_header_config( 'ut_navigation_ss_sl_border_color' ) ) : ?>
                    
                    #ut-sitebody .ut-secondary-custom-skin #navigation ul.sub-menu,
					#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu {
                        border-top-color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_border_color' ) ); ?> !important;
                        border-top-color:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_border_color' ); ?> !important;
                    }
                
                <?php endif; ?>
                                
            
            <?php endif; ?>
            
                
            /* Main Navigation Menu Separator
            ================================================== */
            <?php if( ut_return_header_config('ut_header_layout', 'default' ) == 'default' && ut_return_header_config( 'ut_navigation_item_separator_style' , 'default' ) == 'custom' ) : ?>
            
                 #navigation ul li a:not(.bklyn-btn)::after { content: "<?php echo ut_return_header_config('ut_navigation_item_separator'); ?>"; }
            
            <?php endif; ?>                
                
            <?php if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) != 'ut-header-custom' && ut_return_header_config('ut_navigation_shadow' , 'off' ) == 'off' ) : ?>
                    
                /* Header without Shadow
                ================================================== */
                .ha-header { box-shadow: none; }
                    
            <?php endif; ?>
            
            <?php if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-light' && ut_return_header_config('ut_navigation_border_bottom' , 'on' ) == 'off' ) : ?>
                    
                /* Header without Border
                ================================================== */
                .ha-header.ut-header-light { border-bottom: none; }
                    
            <?php endif; ?>    
                
                    
            /* Header Height
            ================================================== */
            @media (min-width: 1025px) {
                
                #header-section { 
                    line-height: <?php echo ut_return_header_config( 'ut_navigation_height', 80 ); ?>px;
                }

                .ha-header-small, 
                .ha-header-hide {
                    height: <?php echo ut_return_header_config( 'ut_navigation_height', 80 ); ?>px;
                    line-height: <?php echo ut_return_header_config( 'ut_navigation_height', 80 ); ?>px;    
                }   
                
                .site-logo,
                .ut-mm-trigger,
                .ut-mm-button,
                .ha-header-small .site-logo,
                .ha-header-hide .site-logo {
                    height: <?php echo ut_return_header_config( 'ut_navigation_height', 80 ); ?>px !important;
                    line-height: <?php echo ut_return_header_config( 'ut_navigation_height', 80 ); ?>px !important;
                }
                
            }
            	
            /* Header Scroll Position
            ================================================== */    
            <?php if( ut_return_header_config('ut_navigation_scroll_position' , 'floating') == 'fixed' && ut_return_header_config( 'ut_header_layout', 'default' ) == 'default' ) : ?>
                    
                #header-section.ut-header-fixed:not(.ha-header-hide) {
                    position:relative;
                    top:0;
                }
                
                .ut-mobile-menu-open #header-section.ut-header-fixed:not(.ha-header-hide) {
                    position:absolute;
                }
                
                
                #header-section.ut-header-fixed.ha-transparent {
                    position:absolute;
                }
                
                .ut-site-frame-top #header-section.ut-header-fixed.ha-transparent,
                .ut-has-top-header #header-section.ut-header-fixed.ha-transparent {
                    top: 40px;
                }
                
				<?php if( ut_return_header_config( 'ut_navigation_on_hero', 'off' ) == 'on' ) : ?>
				
					#header-section.ut-header-fixed:not(.ha-header-hide) {
						position:absolute;						
					}
				
				<?php endif; ?>
				
            <?php endif; ?>            
                
            /* Text Logo
            ================================================== */ 
            <?php 
            
                echo $this->font_style_css( array(
                    'selector'           => '#ut-sitebody h1.logo',
                    'font-type'          => ot_get_option('ut_global_header_text_logo_font_type', 'ut-font' ),   
                    'font-style'         => ot_get_option('ut_global_header_text_logo_font_style', 'semibold' ),
                    'google-font-style'  => ot_get_option('ut_global_header_text_google_font_style'),
                    'websafe-font-style' => ot_get_option('ut_global_header_text_logo_websafe_font_style'),
					'custom-font-style'  => ot_get_option('ut_global_header_text_logo_custom_font_style')
                ) ); 
                
            ?>  
            
			/* Mega Menu Column Titles
            ================================================== */ 
            <?php 
            
                echo $this->font_style_css( array(
                    'selector'           => '#navigation .ut-megamenu .ut-nav-header h3',
                    'font-type'          => ot_get_option('ut_global_megamenu_column_title_font_type', 'ut-font' ),   
                    'font-style'         => ot_get_option('ut_global_megamenu_column_title_font_style', 'semibold' ),
                    'google-font-style'  => ot_get_option('ut_global_megamenu_column_title_google_font_style'),
                    'websafe-font-style' => ot_get_option('ut_global_megamenu_column_title_websafe_font_style'),
					'custom-font-style'  => ot_get_option('ut_global_megamenu_column_title_custom_font_style')
                ) ); 
                
            ?> 	
				
			<?php 
			
			/* Primary Skin */
			if( ut_return_header_config( 'ut_navigation_ps_megamenu_column_title_color' ) ) : ?>
                
				#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu .ut-nav-header h3 {
					color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_megamenu_column_title_color' ) ); ?> !important;   
					color:<?php echo ut_return_header_config( 'ut_navigation_ps_megamenu_column_title_color' ); ?> !important;   
				}    

			<?php endif; ?>
				
			<?php 
			
			/* Primary Skin Active */
			if( ut_return_header_config( 'ut_navigation_ps_megamenu_column_title_color_hover' ) ) : ?>
                
				#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu .ut-navigation-column-list:hover .ut-nav-header h3 {
					color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_megamenu_column_title_color_hover' ) ); ?> !important;   
					color:<?php echo ut_return_header_config( 'ut_navigation_ps_megamenu_column_title_color_hover' ); ?> !important;   
				}    

			<?php endif; ?>	
			
			<?php 
			
			/* Primary Skin Sub Menu and Mega Menu Link Animation */
			if( ut_return_header_config( 'ut_navigation_ps_sl_animation_color' ) ) : ?>
                
				#ut-sitebody .ut-primary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-background ul.sub-menu li a span::after,
				#ut-sitebody .ut-primary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-background .ut-navigation-column-list li a span::after {
					background:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_animation_color' ) ); ?> !important;   
					background:<?php echo ut_return_header_config( 'ut_navigation_ps_sl_animation_color' ); ?> !important;   
				}
				
				#ut-sitebody .ut-primary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-border ul.sub-menu li a span::after,
				#ut-sitebody .ut-primary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-border .ut-navigation-column-list li a span::after {
					border-bottom: 1px solid <?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ps_sl_animation_color' ) ); ?> !important;   
					border-bottom: 1px solid <?php echo ut_return_header_config( 'ut_navigation_ps_sl_animation_color' ); ?> !important;   
				}

			<?php endif; ?>
				
			<?php 
			
			$ut_navigation_ps_sl_mm_border = ut_return_header_config( 'ut_navigation_ps_sl_mm_border' );
			
			/* Primary Skin Mega Menu Border */
			if( !empty( $ut_navigation_ps_sl_mm_border['border-left-style'] ) && $ut_navigation_ps_sl_mm_border['border-left-style'] != 'none' ) : ?>
                
				<?php $css = implode(';', array_map( function ($v, $k) { 
				
					$v = $k == 'border-left-width' ? $v . 'px' : $v;
				
					return $k . ':' . $v; 
					
					}, $ut_navigation_ps_sl_mm_border, array_keys($ut_navigation_ps_sl_mm_border) ) ); ?>
				
				#ut-sitebody .ut-primary-custom-skin #navigation .ut-megamenu .ut-megamenu-grid-col:not(:first-child) {
					<?php echo $css; ?>					
				}	    

			<?php endif; ?>		
				
			<?php 
			
			/* Secondary Skin */	
			if( ut_return_header_config( 'ut_navigation_ss_megamenu_column_title_color' ) ) : ?>
                
				#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu .ut-nav-header h3 {
					color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_megamenu_column_title_color' ) ); ?> !important;   
					color:<?php echo ut_return_header_config( 'ut_navigation_ss_megamenu_column_title_color' ); ?> !important;   
				}    

			<?php endif; ?>	
				
			<?php 
			
			/* Secondary Skin Active */	
			if( ut_return_header_config( 'ut_navigation_ss_megamenu_column_title_color_hover' ) ) : ?>
                
				#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu .ut-navigation-column-list:hover .ut-nav-header h3 {
					color:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_megamenu_column_title_color_hover' ) ); ?> !important;   
					color:<?php echo ut_return_header_config( 'ut_navigation_ss_megamenu_column_title_color_hover' ); ?> !important;   
				}    

			<?php endif; ?>	
				
			<?php 
			
			/* Primary Skin Sub Menu and Mega Menu Link Animation */
			if( ut_return_header_config( 'ut_navigation_ss_sl_animation_color' ) ) : ?>
                
				#ut-sitebody .ut-secondary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-background ul.sub-menu li a span::after,
				#ut-sitebody .ut-secondary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-background .ut-navigation-column-list li a span::after {
					background:<?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_animation_color' ) ); ?> !important;   
					background:<?php echo ut_return_header_config( 'ut_navigation_ss_sl_animation_color' ); ?> !important;   
				}    
				
				#ut-sitebody .ut-secondary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-border ul.sub-menu li a span::after,
				#ut-sitebody .ut-secondary-custom-skin #navigation.ut-navigation-with-link-animation.ut-navigation-with-link-animation-type-border .ut-navigation-column-list li a span::after {
					border-bottom: 1px solid <?php echo $this->rgba_to_rgb( ut_return_header_config( 'ut_navigation_ss_sl_animation_color' ) ); ?> !important;   
					border-bottom: 1px solid <?php echo ut_return_header_config( 'ut_navigation_ss_sl_animation_color' ); ?> !important;   
				}
				
			<?php endif; ?>	
			
			<?php 
			
			$ut_navigation_ss_sl_mm_border = ut_return_header_config( 'ut_navigation_ss_sl_mm_border' );
			
			/* Secondary Skin Mega Menu Border */
			if( !empty( $ut_navigation_ss_sl_mm_border['border-left-style'] ) && $ut_navigation_ss_sl_mm_border['border-left-style'] != 'none' ) : ?>
                
				<?php $css = implode(';', array_map( function ($v, $k) { 
				
					$v = $k == 'border-left-width' ? $v . 'px' : $v;
				
					return $k . ':' . $v; 
					
					}, $ut_navigation_ss_sl_mm_border, array_keys($ut_navigation_ss_sl_mm_border) ) ); ?>
				
				#ut-sitebody .ut-secondary-custom-skin #navigation .ut-megamenu .ut-megamenu-grid-col:not(:first-child) {
					<?php echo $css; ?>					
				}	    

			<?php endif; ?>		
				
            /* Site Logo Table Width
            ================================================== */ 
            #header-section .site-logo {
                 width: 100%;
            }           

			</style>            
            
            <?php
            
            /* output css */
            echo $this->minify_css( ob_get_clean() );
        
        }  
            
    }

}

new UT_Navigation_CSS;
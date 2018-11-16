<?php

if ( ! defined( 'ABSPATH' ) ) exit;

if( !class_exists( 'UT_MC4WP_CSS' ) ) {	
    
    class UT_MC4WP_CSS extends UT_Custom_CSS {
        
        public $class_prefix = '.mc4wp-form-';
        
        public function custom_css() {
            
            $mc4wp_color_skins = ot_get_option("ut_mailchimp_color_skins");
            
            if( !empty( $mc4wp_color_skins ) && is_array( $mc4wp_color_skins ) ) {
                
                foreach( $mc4wp_color_skins as $skin ) {
                    
                    $class = $this->class_prefix . $skin["unique_id"];
                    
                    if( !empty( $skin["label_color"] ) ) {
                        $this->css .= $class . ' label { color: ' . $skin["label_color"] . '; }';
                    }
                    
                    // input size
                    if( !empty( $skin["email_input_size"] ) ) {
                        
                        $this->css .= '@media (min-width: 1025px) {';                        
                            $this->css .= $class . ' input[type="email"] { width: ' . $skin["email_input_size"] . '%; }';
                        $this->css .= '}';
                        
                    }
                    
					// input spacing
					if( !empty( $skin["email_input_spacing"] ) && is_array( $skin["email_input_spacing"] ) ) {
                        
                        foreach( $skin["email_input_spacing"] as $key => $spacing ) {
                            
                            if( $spacing != 0 ) {
                                
                                $this->css .= $class . ' input[type="email"] { ' . $key . ' : ' . $spacing . 'px !important; }';
                                
                            }
                            
                        }                        
                        
                    }
					
					// input border radius
					$border_radius = isset( $skin["email_input_border_radius"] ) ? $skin["email_input_border_radius"] : 0;
					$this->css .= $class . ' input[type="email"] { border-radius: ' . $border_radius . 'px; }';
					
                    // input colors
                    if( !empty( $skin["input_text_color"] ) ) {
                        $this->css .= $class . ' input[type="text"] { color: ' . $skin["input_text_color"] . '; }';
                        $this->css .= $class . ' input[type="email"] { color: ' . $skin["input_text_color"] . '; }';
                    }
                    
                    if( !empty( $skin["input_background_color"] ) ) {
                        $this->css .= $class . ' input[type="text"] { background: ' . $skin["input_background_color"] . '; }';
                        $this->css .= $class . ' input[type="email"] { background: ' . $skin["input_background_color"] . '; }';
                    }
                    
                    if( !empty( $skin["input_border_color"] ) ) {
                        $this->css .= $class . ' input[type="text"] { border-color: ' . $skin["input_border_color"] . '; }';
                        $this->css .= $class . ' input[type="email"] { border-color: ' . $skin["input_border_color"] . '; }';
                    }
                    
                    // input focus colors
                    if( !empty( $skin["input_text_color_focus"] ) ) {
                        $this->css .= $class . ' input[type="text"]:focus { color: ' . $skin["input_text_color_focus"] . '; }';
                        $this->css .= $class . ' input[type="email"]:focus { color: ' . $skin["input_text_color_focus"] . '; }';
                    }
                    
                    if( !empty( $skin["input_background_color_focus"] ) ) {
                        $this->css .= $class . ' input[type="text"]:focus { background: ' . $skin["input_background_color_focus"] . '; }';
                        $this->css .= $class . ' input[type="email"]:focus { background: ' . $skin["input_background_color_focus"] . '; }';
                    }
                    
                    if( !empty( $skin["input_border_color_focus"] ) ) {
                        $this->css .= $class . ' input[type="text"]:focus { border-color: ' . $skin["input_border_color_focus"] . '; }';
                        $this->css .= $class . ' input[type="email"]:focus { border-color: ' . $skin["input_border_color_focus"] . '; }';
                    }
                    
                    // submit button colors
                    if( !empty( $skin["submit_button_text_color"] ) ) {
                        $this->css .= $class . ' input[type="submit"] { color: ' . $skin["submit_button_text_color"] . '; }';
                    }
                    
					if( !empty( $skin["submit_button_background_color"] ) ) {
					
						if( $this->is_gradient( $skin["submit_button_background_color"] ) ) {
							
							$this->css .= $this->create_gradient_css( $skin["submit_button_background_color"], $class . ' input[type="submit"]', false, 'background' );
							
						} else {
							
							$this->css .= $class . ' input[type="submit"] { background: ' . $skin["submit_button_background_color"] . '; }';
							
						}					
						
					} 
					
                    if( !empty( $skin["submit_button_text_color_hover"] ) ) {
                        $this->css .= $class . ' input[type="submit"]:hover { color: ' . $skin["submit_button_text_color_hover"] . '; }';
                        $this->css .= $class . ' input[type="submit"]:focus { color: ' . $skin["submit_button_text_color_hover"] . '; }';
                        $this->css .= $class . ' input[type="submit"]:active { color: ' . $skin["submit_button_text_color_hover"] . '; }';
                    }
                    
					if( !empty( $skin["submit_button_background_color_hover"] ) ) {
					
						if( $this->is_gradient( $skin["submit_button_background_color_hover"] ) ) {
							
							$this->css .= $this->create_gradient_css( $skin["submit_button_background_color_hover"], $class . ' input[type="submit"]:hover', false, 'background' );
							$this->css .= $this->create_gradient_css( $skin["submit_button_background_color_hover"], $class . ' input[type="submit"]:focus', false, 'background' );
							$this->css .= $this->create_gradient_css( $skin["submit_button_background_color_hover"], $class . ' input[type="submit"]:active', false, 'background' );
							
						} else {
							
							$this->css .= $class . ' input[type="submit"]:hover { background: ' . $skin["submit_button_background_color_hover"] . '; }';
                        	$this->css .= $class . ' input[type="submit"]:focus { background: ' . $skin["submit_button_background_color_hover"] . '; }';
                        	$this->css .= $class . ' input[type="submit"]:active { background: ' . $skin["submit_button_background_color_hover"] . '; }';
							
						}					
						
					}
					
                    if( !empty( $skin["submit_button_font_weight"] ) ) {
                        $this->css .= $class . ' input[type="submit"] { font-weight: ' . $skin["submit_button_font_weight"] . '; }';
                    }
                    
                    // submit button border settings
                    $border_width  = isset( $skin["submit_button_border_width"] )  ? $skin["submit_button_border_width"]  : 0;
                    $border_style  = !empty( $skin["submit_button_border_style"] ) ? $skin["submit_button_border_style"]  : 'solid';
                    $border_radius = isset( $skin["submit_button_border_radius"] ) ? $skin["submit_button_border_radius"] : 2;
                    
                    if( !empty( $skin["submit_button_border_color"] ) ) {
                        $this->css .= $class . ' input[type="submit"] { border: ' . $border_width . 'px ' . $border_style  . ' ' . $skin["submit_button_border_color"] . ' !important; }';
                    }
                    
                    if( !empty( $skin["submit_button_hover_border_color"] ) ) {
                        $this->css .= $class . ' input[type="submit"]:hover { border: ' . $border_width . 'px ' . $border_style  . ' ' . $skin["submit_button_hover_border_color"] . ' !important; }';
                        $this->css .= $class . ' input[type="submit"]:active { border: ' . $border_width . 'px ' . $border_style  . ' ' . $skin["submit_button_hover_border_color"] . ' !important; }';
                        $this->css .= $class . ' input[type="submit"]:focus { border: ' . $border_width . 'px ' . $border_style  . ' ' . $skin["submit_button_hover_border_color"] . ' !important; }';
                    }
                    
                    $this->css .= $class . ' input[type="submit"] { border-radius: ' . $border_radius . 'px; }';
                    
                    if( !empty( $skin["submit_button_size"] ) && $skin["submit_button_size"] == 'mini' ) {
                        
                        $this->css .= $class . ' input[type="submit"] { font-size:75%; line-height: 18px; }';    
                        
                    }
                    
                    if( !empty( $skin["submit_button_size"] ) && $skin["submit_button_size"] == 'small' ) {
                        
                        $this->css .= $class . ' input[type="submit"] { font-size:12px; line-height: 24px; padding: 0.8em 0.9em; }';    
                        
                    }
                    
                    if( !empty( $skin["submit_button_size"] ) && $skin["submit_button_size"] == 'normal' ) {
                        
                        $this->css .= $class . ' input[type="submit"] { font-size: 14px; line-height: 28px; padding: 0.9em 1em; }';   
                        
                    }
                    
                    if( !empty( $skin["submit_button_size"] ) && $skin["submit_button_size"] == 'large' ) {
                        
                        $this->css .= $class . ' input[type="submit"] { font-size:20px; line-height: 40px; padding: 1em; }';    
                        
                    }                    
                    
                    if( !empty( $skin["submit_button_spacing"] ) && is_array( $skin["submit_button_spacing"] ) ) {
                        
                        foreach( $skin["submit_button_spacing"] as $key => $spacing ) {
                            
                            if( $spacing != 0 ) {
                                
                                $this->css .= $class . ' input[type="submit"] { ' . $key . ' : ' . $spacing . 'px !important; }';
                                
                            }
                            
                        }                        
                        
                    }
                    
                }
                
            }            
            
            if( !empty( $this->css ) ) {
                echo $this->minify_css( '<style id="ut-mc4wp-skin-css" type="text/css">' . $this->css . '</style>' );
            }
            
        }

    }

}

new UT_MC4WP_CSS;
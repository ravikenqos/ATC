<?php if (!defined('UT_VERSION')) {
    
    exit; // exit if accessed directly
    
}


/**
 * Pre Fetch Theme Accent Color for an easier color inject
 *
 * @access    public
 * @since     4.4
 */

function ut_custom_theme_accent_color( $color ) {
    
    if( isset( get_queried_object()->ID ) && get_post_meta( get_queried_object()->ID, 'ut_page_accent_color', true ) ) {
        
        return get_post_meta( get_queried_object()->ID, 'ut_page_accent_color', true );
        
    }
    
    return $color;
    
}

add_filter('pre_option_ut_accentcolor', 'ut_custom_theme_accent_color');


/**
 * Class for generating Theme Options and Metapanel CSS
 *
 * @access    public
 * @since     4.0
 */

if( !class_exists( 'UT_Custom_CSS' ) ) {	
    
    class UT_Custom_CSS {
        
        public $css;
        
        /**
         * Accent Color
         * @var string
         */        
        public $accent;
        
        /**
         * Post ID
         * @var string
         */        
        public $ID;
        
        /**
         * Accent Color
         * @var array
         */
        public $google_fonts;
        
        /**
         * Theme Font Styles
         * @var array
         */
        public $theme_font_styles;
        
        /**
         * Font Styles
         * @var array
         */
        public $font_styles;
        
        /**
         * Custom Fonts
         * @var array
         */
		protected $custom_fonts = null;
		
        /**
         * Font Styles
         * @var array
         */
        
        function __construct() {
            
            $this->google_fonts = ut_recognized_google_fonts();   
            
            $this->theme_font_styles = ut_recognized_font_styles();
            $this->font_styles = array( 'regular' => 'normal', 'normal'  => 'normal', 'italic'  => 'italic' );
            
            add_action('wp_head' , array( $this, 'setup_vars' ) );
            add_action('wp_head' , array( $this, 'custom_css' ) ); 
            
        }        
        
        /**
         *  Asssign Vars
         */
        
        public function setup_vars() {
            
            // default theme color
            $this->accent = get_option('ut_accentcolor' , '#F1C40F');
            
            if( isset( get_queried_object()->ID ) ) {
                
                $this->ID = get_queried_object()->ID;
                
            }
            
            if( isset( $this->ID ) && get_post_meta( $this->ID, 'ut_page_accent_color', true ) ) {
        
                $this->accent = get_post_meta( $this->ID, 'ut_page_accent_color', true );

            }
            
        }
        
        /**
         * Changes HEX to RGBA
         *
         * @param     string HEX Color.
         * @param     int opacity.
         * @return    string
         *
         * @access    public
         * @since     1.0
         */
        public function hex_to_rgba( $hex, $opacity = 0.5 ) {
            
            if( empty( $hex ) ) {
                return;
            }
                    
            $hex = preg_replace("/#/", "", $hex);
            $color = array();
         
            if(strlen($hex) == 3) {
                $color['r'] = hexdec(substr($hex, 0, 1) . $r);
                $color['g'] = hexdec(substr($hex, 1, 1) . $g);
                $color['b'] = hexdec(substr($hex, 2, 1) . $b);
            }
            else if(strlen($hex) == 6) {
                $color['r'] = hexdec(substr($hex, 0, 2));
                $color['g'] = hexdec(substr($hex, 2, 2));
                $color['b'] = hexdec(substr($hex, 4, 2));
            }
            
            $color['o'] = $opacity;
            
            return implode(',', $color);
        
        }
        
        
        /**
         * Changes HEX to RGB
         *
         * @param     string HEX Color.
         * @return    string
         *
         * @access    public
         * @since     1.0
         */
        public function hex_to_rgb( $hex ) {            
            
            if( empty( $hex ) ) {
                return;
            }
                    
            $hex = preg_replace("/#/", "", $hex);
            $color = array();
         
            if(strlen($hex) == 3) {
                $color['r'] = hexdec(substr($hex, 0, 1) . $r);
                $color['g'] = hexdec(substr($hex, 1, 1) . $g);
                $color['b'] = hexdec(substr($hex, 2, 1) . $b);
            }
            else if(strlen($hex) == 6) {
                $color['r'] = hexdec(substr($hex, 0, 2));
                $color['g'] = hexdec(substr($hex, 2, 2));
                $color['b'] = hexdec(substr($hex, 4, 2));
            }
            
            return implode(',', $color);
        
        }
        
        
        /**
         * Changes RGBA to RGB for fallback
         *
         * @param     string RGBA Color.
         * @return    string
         *
         * @access    public
         * @since     1.0
         */
        
        public function rgba_to_rgb( $rgba ) {
        
            if( empty( $rgba ) ) {
                return;
            }
            
            /* check if hex */
            if ( preg_match( '/^#[a-f0-9]{6}$/i', $rgba ) ) {
                $rgba = ut_hex_to_rgb( $rgba );
            }
            
            $rgb = preg_replace( '/[^0-9,]/', '', $rgba );
            $rgb = explode( ',', $rgb );
            
            if( count( $rgb ) === 4 ) {
                $stack = array_pop( $rgb );            
            }        
            
            $rgb = implode( ',', $rgb );
            
            return 'rgb(' . $rgb . ')';
        
        }

        /**
         *Check if given string is linear color
         *
         * @param     string
         * @return    bolean
         *
         * @access    public
         * @since     1.0
         */
        
        function is_gradient( $string ) {

            return strpos( $string, 'linear-gradient') === false ? false : true;

        }
		
		/**
         * Create Gradient CSS with Prefix
         *
         * @param     string
         * @return    string
         *
         * @access    public
         * @since     4.6.3
         */
		
		function create_gradient_css( $css, $tag = '', $pattern = false, $attribute = 'background-image', $important = false ) {
        
			if( !ut_is_gradient( $css ) ) {
				return false;
			}

			// optional pattern        
			$background_url_before = ''; // pattern
			$background_url_after = ''; // image

			$patterns = array(
				'bklyn-style-one'   => 'overlay-pattern.png',
				'bklyn-style-two'   => 'overlay-pattern2.png',
				'bklyn-style-three' => 'overlay-pattern3.png'
			);

			if( $pattern && isset( $patterns[$pattern] ) ) {

				$background_url_before = 'url("' . THEME_WEB_ROOT . '/images/' . $patterns[$pattern] . '"),';

			}

			// check for Visual Composer has background with image
			if( strpos( $css, 'url(') !== false ) {

				// extract image
				$background_url = wp_extract_urls( $css );

				if( !empty( $background_url[0] )  ) {

					$background_url_after = ', url("' . esc_url( $background_url[0] ) . '")';

				} else {

					$background_url_after = '';

				}

				// extract linear gradient
				preg_match_all( '/linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)*url\(/', $css, $color );

				if( !empty( $color[0][0] ) ) {

					$css = trim( str_replace('url(' , '', $color[0][0] ) );

				}

			}

			$important = $important ? '!important;' : '';

			$output = $tag . '{';

				$output .= "$attribute: $background_url_before -webkit-$css $background_url_after $important;";
				$output .= "$attribute: $background_url_before -moz-$css $background_url_after $important;";
				$output .= "$attribute: $background_url_before -o-$css $background_url_after $important;";
				$output .= "$attribute: $background_url_before $css $background_url_after $important;";

			$output .= '}';

			return $output;        

		}
		
		/**
         * Create Background Clip for Gradient Fonts
         *
         * @param     string
         * @return    string
         *
         * @access    public
         * @since     4.6.3
         */
		
		function create_background_clip( $tag ) {
			
			$output = $tag . '{ -webkit-text-fill-color: transparent; -webkit-background-clip: text !important; background-clip: text !important; }';
			
			return $output;
			
		}
		
        
        /**
         * Create Section Headline CSS
         *
         * @param     string     .
         * @return    string
         *
         * @access    public
         * @since     1.0
         */
        
        public function section_headline_css( $div = '',  $style = 'pt-style-1', $color = '', $height = '', $width = '' ) {
            
            if( empty( $color ) ) {
                    return;
            }
            
            switch ( $style ) {
            
                case 'pt-style-1':
                    
                    return '';
                    
                break;
                
                case 'pt-style-2':
                    
                    $style  = $div . ' .pt-style-2 .page-title:after, ' . $div . ' .pt-style-2 .parallax-title:after, ' . $div . ' .pt-style-2 .section-title:after {';
                    
                    if( $color ) {
                       $style .= 'background-color: ' . $color . ';' ;
                    }
                    
                    if( $height ) {
                       $style .= 'height: ' . $height . ';' ;
                    }
                    
                    if( $width ) {
                       $style .= 'width: ' . $width . ';' ;
                    }
                    
                    $style .= '}';
                    
                    return $style;
                    
                    
                break;
                
                case 'pt-style-3':
                    
                    return '
                        ' . $div . ' .pt-style-3 .page-title span, 
                        ' . $div . ' .pt-style-3 .parallax-title span, 
                        ' . $div . ' .pt-style-3 .section-title span { 
                            background:' . $color . ';            
                            -webkit-box-shadow:0 0 0 3px ' . $color . '; 
                            -moz-box-shadow:0 0 0 3px ' . $color . '; 
                            box-shadow:0 0 0 3px ' . $color . '; 
                        }
                    ';                
                    
                break;
                
                case 'pt-style-4':
                    
                    return '
                        ' . $div . ' .pt-style-4 .page-title span, 
                        ' . $div . ' .pt-style-4 .parallax-title span, 
                        ' . $div . ' .pt-style-4 .section-title span {
                            border-color:' . $color . ';
                        }
                    ';
                    
                break;
                
                case 'pt-style-5':
                    
                    return '
                        ' . $div . ' .pt-style-5 .page-title span, 
                        ' . $div . ' .pt-style-5 .parallax-title span, 
                        ' . $div . ' .pt-style-5 .section-title span {
                            background:' . $color . ';            
                            -webkit-box-shadow:0 0 0 3px ' . $color . '; 
                            -moz-box-shadow:0 0 0 3px ' . $color . '; 
                            box-shadow:0 0 0 3px ' . $color . '; 
                        }
                    ';
                    
                break;
                
                
                case 'pt-style-6':
                    
                    return '
                        ' . $div . ' .pt-style-6 .page-title:after, 
                        ' . $div . ' .pt-style-6 .parallax-title:after, 
                        ' . $div . ' .pt-style-6 .section-title:after {
                            border-bottom: 1px dotted ' . $color . ';
                        }
                    ';
                
                break;
                
                
            }
        
        }
        
        
        /**
         * Create CSS Background
         *
         * @access    public
         * @since     1.0
         */
        
        public function css_background( $object , $background_settings ) { 
                
            if( !is_array( $background_settings ) || empty( $object ) ) {
                return NULL;
            }
                    
            $skipfixed = false;
            
            $css = $object . '{';
            
            $key_exceptions = array( 'background-color' , 'background-image' , 'background-size' );
            
            /* exception for mobiles and tablets */
            if( unite_mobile_detection()->isMobile() && ( isset($background_settings['background-size']) && $background_settings['background-size'] == 'cover' ) && ( isset($background_settings['background-attachment']) && $background_settings['background-attachment'] == 'fixed' ) ) {
                $skipfixed = true;
            }
            
            foreach( $background_settings as $key => $value) {            
                
                if( in_array( $key , $key_exceptions ) ) {
                    
                    switch( $key ) {
                        
                        case 'background-color' : $css .= 'background: '.$value.';';
                        break;
                        
                        case 'background-image' : $css .= $key . ':' . 'url("'.$value.'");';
                        break;
                        
                        case 'background-size' : $css .= $key . ':' . $value . ' !important;';
                        
                    }
                    
                } else {
                    
                    if($skipfixed && $key == 'background-attachment') {    
                       
                       continue; 
                    
                    } else {
                    
                        $css .= $key . ':' . $value . ' !important;';
                    
                    }
                    
                }
                
            }
            
            $css .= '}';
            
            return $css;
                        
        }
        
        
        /**
         * Button Creator
         *
         * @param     string
         * @return    string
         *
         * @access    public
         * @since     1.0
         */
        
        public function create_button( $selector, $button_settings = array() ) {
            
            if( empty( $selector ) || empty( $button_settings ) ) {
                return;
            }
            
            $button = '';
            
            if( function_exists("ut_create_gradient_css") && $this->is_gradient( $button_settings["color"] ) ) {
            
                // add background image
                $button .= ut_create_gradient_css( $button_settings["color"], $selector ); 

            }
			
            $button .= $selector . '{';
            
                if( !empty( $button_settings['font-size'] ) ) {
                    $button .= 'font-size:' . $button_settings['font-size'] . ' !important;';
                }
            
                if( !empty( $button_settings['line-height'] ) ) {
                    $button .= 'line-height:' . $button_settings['line-height'] . ' !important;';
                }
            
                if( !empty( $button_settings['font-weight'] ) ) {
                    $button .= 'font-weight:' . $button_settings['font-weight'] . ' !important;';
                }
                
                if( !empty( $button_settings['text-transform'] ) ) {
                    $button .= 'text-transform:' . $button_settings['text-transform'] . ' !important;';
                }
                            
                if( !empty( $button_settings['color'] ) && !$this->is_gradient( $button_settings["color"] ) ) {
                
                    $button .= 'background:' . $button_settings['color'] . ' !important;';
                    
                }
                
                if( !empty( $button_settings['text_color'] ) ) {
                    $button .= 'color:' . $button_settings['text_color'] . ' !important;';
                }
                
                if( !empty( $button_settings['border_radius'] ) ) {
                    $button .= '
                    -webkit-border-radius:' . $button_settings['border_radius'] . 'px !important;
                       -moz-border-radius:' . $button_settings['border_radius'] . 'px !important;
                            border-radius:' . $button_settings['border_radius'] . 'px !important;';
                }
            	
				if( !empty( $button_settings['border_width'] ) ) {
                    $button .= 'border-width:' . $button_settings['border_width'] . 'px !important;';
                }
			
                if( !empty( $button_settings['border_color'] ) ) {
                
                    $button .= 'border-color:' . $button_settings['border_color'] . ' !important;';
                
                } else {
                
                    $button .= 'border: none !important;';
                
                }
            
                if( !empty( $button_settings['padding-top'] ) ) {
					$button .= 'padding-top:' . $button_settings['padding-top'] . 'px !important;';
                }
            
                if( !empty( $button_settings['padding-right'] ) ) {
					$button .= 'padding-right:' . $button_settings['padding-right'] . 'px !important;';
                }
            
                if( !empty( $button_settings['padding-bottom'] ) ) {
					$button .= 'padding-bottom:' . $button_settings['padding-bottom'] . 'px !important;';
                }
            
                if( !empty( $button_settings['padding-left'] ) ) {
					$button .= 'padding-left:' . $button_settings['padding-left'] . 'px !important;';
                }
			
            $button .= '}';
            			
			if( !empty( $button_settings['button_effect'] ) && $button_settings['button_effect'] == 'aylen' && !empty( $button_settings['hover_color_2']) ) {

				$button .= $selector . '.bklyn-btn-effect-aylen::before {';

					$button .= 'background-color:' . $button_settings['hover_color_2'] . ';';

				$button .= '}';

			}

			if( !empty( $button_settings['button_effect'] ) && $button_settings['button_effect'] == 'winona' ) {

				$button .= $selector . '.bklyn-btn-effect-winona::after {';
					
					if( !empty( $button_settings['text_hover_color'] ) ) {
						$button .= 'color:' . $button_settings['text_hover_color'] . ';';
					}
						
					if( !empty( $button_settings['padding-top'] ) ) {
						$button .= 'padding-top:' . $button_settings['padding-top'] . 'px !important;';
					}

					if( !empty( $button_settings['padding-right'] ) ) {
						$button .= 'padding-right:' . $button_settings['padding-right'] . 'px !important;';
					}

					if( !empty( $button_settings['padding-bottom'] ) ) {
						$button .= 'padding-bottom:' . $button_settings['padding-bottom'] . 'px !important;';
					}

					if( !empty( $button_settings['padding-left'] ) ) {
						$button .= 'padding-left:' . $button_settings['padding-left'] . 'px !important;';
					}
				
				$button .= '}';
				
			}
			
            if( function_exists("ut_create_gradient_css") && $this->is_gradient( $button_settings["hover_color"] ) ) {
            
                // add background image
                $button .= ut_create_gradient_css( $button_settings["hover_color"], $selector . ':hover' ); 

            }
                        
            $button .= $selector.':hover {';
                
                if( !empty( $button_settings['hover_color'] ) && !$this->is_gradient( $button_settings["hover_color"] ) ) {
                
                    $button .= 'background:' . $button_settings['hover_color'] . ' !important;';
                
                } 
                
                if( !empty( $button_settings['text_hover_color'] ) ) {
                
                    $button .= 'color:' . $button_settings['text_hover_color'] . ' !important;';
                
                }  
                
                if( !empty( $button_settings['border_hover_color'] ) ) {
                
                    $button .= 'border-color:' . $button_settings['border_hover_color'] . ' !important;';
                
                } 
                
            $button.= '}';
            
            return $button;    

        }

        
        /**
         * Add PX to Int
         *
         * @param     string     Hex Color.
         * @return    string
         *
         * @access    public
         * @since     4.2
         */
         
        public function add_px_value( $option ) {
        
            if ( strpos( $option, 'px' ) !== false ) {
                
                return $option;
            
            } else {
                
                return $option . 'px';
            
            }
            
        }
		
		
		/**
         * Add EM to Int
         *
         * @param     string     Hex Color.
         * @return    string
         *
         * @access    public
         * @since     4.2
         */
         
        public function add_em_value( $option ) {
        
            if ( strpos( $option, 'em' ) !== false ) {
                
                return $option;
            
            } else {
                
                return $option . 'em';
            
            }
            
        }
        
        /**
         * Get Image Post ID by given URL
         *
         * @param     url       must be local.
         * @return    int
         *
         * @access    public
         * @since     4.2
         */
        
        public function get_image_id_by_url( $image_url ) {
        
            global $wpdb;
        
            if( empty( $image_url ) ) {
                return;
            }
            
            $prefix = $wpdb->prefix;
            $attachment = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM " . $prefix . "posts" . " WHERE guid='%s';", esc_url( $image_url ) ) ); 
            
            return isset($attachment[0]) ? $attachment[0] : '';     
        
        }
        
        /**
         * CSS Minify
         *
         * @param     string     Hex Color.
         * @return    string
         *
         * @access    public
         * @since     1.0
         */
        
        public function minify_css( $css ) { 
            
            if( WP_DEBUG ) {
                return $css = apply_filters( 'ut_custom_css', preg_replace('/^\h*\v+/m', '', $css ) );
            }
            
            $css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
            $css = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $css);
            
            return apply_filters( 'ut_custom_css', $css );            
        }
        
        
		
		
		
		
		
		
		
		public function get_fonts() {
			
			if ( is_null( $this->custom_fonts ) ) {
				
				$this->custom_fonts = array();

				$terms = get_terms(
					'unite_custom_fonts',
					array(
						'hide_empty' => false,
					)
				);

				if ( ! empty( $terms ) ) {
					
					foreach ( $terms as $term ) {
						
						$this->custom_fonts[$term->term_id] = $term;
						$this->custom_fonts[$term->term_id]->links = $this->get_font_links( $term->term_id );
						
					}					
				}
			}

			return $this->custom_fonts;
			
		}
		
		
		public function get_font_links( $term_id ) {
			
			$links = get_option( "taxonomy_unite_custom_fonts_{$term_id}", array() );
			
			return wp_parse_args(
				$links,
				array(
					'font_woff'  => '',
					'font_woff2' => '',
					'font_ttf'   => '',
					'font_svg'   => '',
					'font_eot'   => '',
				)
			);
			
		}
		
		/**
         * String
         *
         * @param     array     Font Settings.
         * @return    string
         *
         * @access    public
         * @since     4.6.3
         */
        
        public function get_font_face() {
			
			$fonts = $this->get_fonts();
			
			if( !empty( $fonts ) ) {
			
				foreach ( $fonts as $font ) {

					$svg_syntax = ! empty( $font->links['font_svg'] ) ? ", url('" . esc_attr( $font->links['font_svg'] ) . "#{$font->slug}') format('svg')" : ''; ?>

					@font-face {
						font-family: '<?php echo esc_attr( $font->name ); ?>';
						<?php if( !empty( $font->links['font_eot'] ) ) : ?>
						src: url('<?php echo esc_attr( $font->links['font_eot'] ); ?>');
						<?php endif; ?>
						src: <?php if( !empty( $font->links['font_eot'] ) ) : ?>url('<?php echo esc_attr( $font->links['font_eot'] ); ?>?#iefix') format('embedded-opentype'),<?php endif; ?>
							 <?php if( !empty( $font->links['font_woff2'] ) ) : ?>url('<?php echo esc_attr( $font->links['font_woff2'] ); ?>') format('woff2'),<?php endif; ?>
							 <?php if( !empty( $font->links['font_woff'] ) ) : ?>url('<?php echo esc_attr( $font->links['font_woff'] ); ?>') format('woff'),<?php endif; ?>
							 <?php if( !empty( $font->links['font_ttf'] ) ) : ?>url('<?php echo esc_attr( $font->links['font_ttf'] ); ?>') format('truetype')<?php echo $svg_syntax; ?>;<?php endif; ?>
						font-style: normal;
						font-weight: normal;
					}

					<?php	

				}
			
			}
				
		}
		
        /**
         * Typography String
         *
         * @param     array     Font Settings.
         * @return    string
         *
         * @access    public
         * @since     4.0
         */
        
        public function typography_css( $tag = '', $font_settings = '', $color = '' ) { 
        
            if( empty( $tag ) || empty( $font_settings ) ) {
                return;
            }
            
            $font_settings = array_filter( $font_settings );
            
            if( $color ) {
                $font_settings['color'] = $color;            
            }
            
            $font_settings = implode(' ', array_map(
                function ($v, $k) { 
                    
                    if( $k == 'font-family' ) {
                        
                        $font_families = ut_recognized_font_families();
                        return sprintf("%s:%s;", $k, $font_families[$v]);
                    
                    } elseif( $k == 'letter-spacing' && is_numeric( $v ) ) {
                        
						if( $v >= 1 || $v <= -1 ) {
							$v = $v / 100;	
						}
						
                        return sprintf("%s:%s;", $k, $this->add_em_value($v) );                        
                        
                    } else {
                        
                        return sprintf("%s:%s;", $k, $v); 
                    
                    }
                
                },
                $font_settings,
                array_keys( $font_settings )
            ) );
            
            if( $font_settings ) {
                return $tag . '{' . $font_settings . '}';
            }
            
        }
        
        
		/**
         * Custom Typography String
         *
         * @param     array     Font Settings.
         * @return    string
         *
         * @access    public
         * @since     4.6.3
         */
        
        public function custom_typography_css( $tag = '', $font_settings = '', $color = '' ) { 
        
            if( empty( $tag ) || empty( $font_settings ) ) {
                return;
            }
            
            $font_settings = array_filter( $font_settings );
            
            if( $color ) {
                $font_settings['color'] = $color;            
            }
            
            $font_settings = implode(' ', array_map(
                function ($v, $k) { 
                    
                    if( $k == 'font-family' ) {
                        
						$font_family = get_term($v,'unite_custom_fonts');
						
						if( isset( $font_family->name ) ) 
                        return sprintf("%s:'%s';", $k, $font_family->name);
                    
                    } elseif( $k == 'letter-spacing' && is_numeric( $v ) ) {
                        
						// fallback letter spacing
						if( $v >= 1 || $v <= -1 ) {
							$v = $v / 100;	
						}
						
                        return sprintf("%s:%s;", $k, $this->add_em_value($v) );                        
                        
                    } else {
                        
                        return sprintf("%s:%s;", $k, $v); 
                    
                    }
                
                },
                $font_settings,
                array_keys( $font_settings )
            ) );
            
            if( $font_settings ) {
                return $tag . '{' . $font_settings . '}';
            }
            
        }
		
		
        /**
         * Font Styles
         *
         * @param     array     Font Settings.
         * @return    string
         *
         * @access    public
         * @since     4.0
         */
        
        public function font_style_css( $settings ) {
            
            if( empty( $settings ) ) {
                return;
            }
            
            if( $settings['font-type'] == 'ut-google' ) {
                
                $google_font = ut_search_sub_array( $this->google_fonts, 'family', $settings['google-font-style']['font-family'] );
                
				$font = $settings['selector'] . ' {';

					if( !empty( $google_font['family'] ) ) {
						$font .= 'font-family:"' . $google_font['family'] . '";';                    
					}

					if( !empty( $settings['google-font-style']['font-weight']) ) {
						$font .= ' font-weight: ' .  $settings['google-font-style']['font-weight'] . ';';    
					}

					if( !empty( $settings['google-font-style']['font-size']) ) {
						$font .= ' font-size: ' .  $settings['google-font-style']['font-size'] . ';';    
					}

					if( !empty( $settings['google-font-style']['font-style']) && isset( $this->font_styles[ $settings['google-font-style']['font-style']] ) ) {
						$font .= ' font-style: ' . $this->font_styles[ $settings['google-font-style']['font-style']] . ';';    
					}

					if( !empty( $settings['google-font-style']['line-height']) ) {
						$font .= ' line-height: ' .  $settings['google-font-style']['line-height'] . ';';    
					}

					if( !empty( $settings['google-font-style']['letter-spacing'] ) ) {
						
						// fallback letter spacing
						if( $settings['google-font-style']['letter-spacing'] >= 1 || $settings['google-font-style']['letter-spacing'] <= -1 ) {
							$settings['google-font-style']['letter-spacing'] = $settings['google-font-style']['letter-spacing'] / 100;	
						}
						
						$font .= ' letter-spacing: ' .  $this->add_em_value( $settings['google-font-style']['letter-spacing'] ) . ';';
						
					}

					if( !empty( $settings['google-font-style']['text-transform']) ) {
						$font .= ' text-transform: ' .  $settings['google-font-style']['text-transform'] . ';';    
					}

				$font .= '}';

				return $font;
            
            } elseif( $settings['font-type'] == 'ut-websafe' ) {
                
                return $this->typography_css( $settings['selector'], $settings['websafe-font-style'] );
				
			} elseif( $settings['font-type'] == 'ut-custom' ) {	
				
				return $this->custom_typography_css( $settings['selector'], $settings['custom-font-style'] );
                
            } elseif( $settings['font-type'] == 'ut-font' ) {
                
                if( isset( $this->theme_font_styles[$settings['font-style']]) ) {
                
                    return $settings['selector'] . ' { font-family: ' .  $this->theme_font_styles[$settings['font-style']] . ';}'. "\n";                     
                    
                }
                
                
            }
            
        }
        
        /**
         * Create Global Section Headline CSS
         *
         * @access    public
         * @since     1.0
         */
        
        public function global_headline_font_style( 
            
                $object                                 = '', 
                $font_style                             = '', 
                $global_font_type                       = 'ut_global_headline_font_type', 
                $global_google_font_style               = 'ut_global_google_headline_font_style', 
                $ut_global_headline_font_style          = 'ut_global_headline_font_style', 
                $ut_global_headline_font_style_settings = 'ut_global_headline_font_style_settings', 
                $ut_global_headline_websafe_font_style  = 'ut_global_headline_websafe_font_style_settings',
				$ut_global_headline_custom_font_style   = 'ut_global_headline_custom_font_style_settings',
                $ut_global_headline_font_color          = 'ut_global_headline_font_color' 
            
            ) {
        
            if( empty( $object ) ) {
                return;
            }
        
            $font = $font_attr = $font_color = NULL;
            
            /* font settings */
            if( $ut_global_headline_font_style_settings ) {
            
                $font_settings = ot_get_option( $ut_global_headline_font_style_settings );
                if( $font_settings && array_filter( $font_settings ) ) {
                
                    $font_attr = implode(';', array_map(
                        function ($v, $k) { 
                        
                            if( $k == 'font-family' ) {
                            
                                $font_families = ut_recognized_font_families();
                                return sprintf("%s:%s;", $k, $font_families[$v]);
                            
                            } elseif( $k == 'letter-spacing' && is_numeric( $v ) ) {
                                
								if( $v >= 1 || $v <= -1 ) {
									$v = $v / 100;	
								}
								
                                return sprintf("%s:%s;", $k, $this->add_em_value($v) );
                                
                            } else {
                                
                                return sprintf("%s:%s;", $k, $v); 
                            
                            }                        
                        
                        },
                        array_filter( $font_settings ),
                        array_keys( array_filter( $font_settings ) )
                    ));
                
                }
            
            }
            
            /* global font color */
            if( ot_get_option($ut_global_headline_font_color) ) {
                
                $font_color = 'color: ' . ot_get_option($ut_global_headline_font_color) . ';';   
            
            }
            
            if( !empty( $font_style ) && $font_style != 'global' ) {
                
                return $object . '{ font-family: ' . $this->theme_font_styles[$font_style] . '; ' . $font_attr . '; ' . $font_color . ' }'. "\n";
            
            } else {
                
                if( ot_get_option( $global_font_type , 'ut-font') == 'ut-google' ) {
                
                    $ut_global_google_headline_font_style = ot_get_option($global_google_font_style);                
                    $google_font = ut_search_sub_array( $this->google_fonts, 'family', $ut_global_google_headline_font_style['font-family'] );
                    
					$font .= $object . ' {';

						if( !empty( $google_font['family'] ) ) {

							$font .= 'font-family:"' . $google_font['family'] . '";';                    
						
						} else {
                        
							/* fallback if user has not chosen a google font yet */
							$font_style = ot_get_option( $ut_global_headline_font_style , 'semibold' );
							$font .= 'font-family: ' . $this->theme_font_styles[$font_style] . ';';

						}
							
						if( !empty($ut_global_google_headline_font_style['font-weight']) ) {
							$font .= ' font-weight: ' . $ut_global_google_headline_font_style['font-weight'] . ';';    
						}

						if( !empty($ut_global_google_headline_font_style['font-size']) ) {
							$font .= ' font-size: ' . $ut_global_google_headline_font_style['font-size'] . ';';    
						}

						if( !empty($ut_global_google_headline_font_style['font-style']) && isset($this->font_styles[$ut_global_google_headline_font_style['font-style']]) ) {
							$font .= ' font-style: ' . $this->font_styles[$ut_global_google_headline_font_style['font-style']] . ';';    
						}

						if( !empty($ut_global_google_headline_font_style['line-height']) ) {
							$font .= ' line-height: ' . $ut_global_google_headline_font_style['line-height'] . ';';    
						}

						if( !empty($ut_global_google_headline_font_style['letter-spacing']) ) {
							
							if( $ut_global_google_headline_font_style['letter-spacing'] >= 1 || $ut_global_google_headline_font_style['letter-spacing'] <= -1 ) {
								$ut_global_google_headline_font_style['letter-spacing'] = $ut_global_google_headline_font_style['letter-spacing'] / 100;	
							}
							
							$font .= ' letter-spacing: ' . $ut_global_google_headline_font_style['letter-spacing'] . 'em;';    
							
						}

						if( !empty($ut_global_google_headline_font_style['text-transform']) ) {
							$font .= ' text-transform: ' . $ut_global_google_headline_font_style['text-transform'] . ';';    
						}

						$font .= $font_color;

					$font .= '}';

					return $font;
                
                } elseif( ot_get_option( $global_font_type , 'ut-font') == 'ut-websafe' ) {
                    
                    return $this->typography_css( $object, ot_get_option( $ut_global_headline_websafe_font_style , 'semibold' ), ot_get_option($ut_global_headline_font_color) ) ;
                
				} elseif( ot_get_option( $global_font_type , 'ut-font') == 'ut-custom' ) {
                    
                    return $this->custom_typography_css( $object, ot_get_option( $ut_global_headline_custom_font_style , 'semibold' ), ot_get_option($ut_global_headline_font_color) ) ;	
					
                } else {
                    
                    /* font face */
                    $font_style = ot_get_option( $ut_global_headline_font_style , 'semibold' );
                    return $object . '{ font-family: ' . $this->theme_font_styles[$font_style] . '; ' . $font_attr . ' ' . $font_color . ' }'. "\n";
                
                }
                
        
            }
        
        
        }
        
        public function custom_css() {
            
            $this->minify_css( $this->css );
            
        }  
            
    }

}

$UT_Custom_CSS = new UT_Custom_CSS;

/* additional Custom CSS files */
include( 'css/global.php' );
include( 'css/hero.php' );
include( 'css/hero-animation.php' );
include( 'css/deprecated.php' );
include( 'css/navigation.php' );
include( 'css/navigation-advanced.php' );
include( 'css/side-navigation.php' );
include( 'css/overlay-navigation.php' );
include( 'css/mobile-navigation.php' );
include( 'css/front.php' );
include( 'css/onepage.php' );
include( 'css/blog.php' );
include( 'css/sidebar.php' );
include( 'css/page.php' );
include( 'css/portfolio.php' );
include( 'css/shortcodes.php' );
include( 'css/mc4wp.php' );
include( 'css/contact.php' );
include( 'css/footer.php' );
include( 'css/responsive.php' );
include( 'css/custom.php' );

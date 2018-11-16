<?php

/**
 * The New Header Class managing upcoming header styles
 *
 * @since     4.6.5
 * @version   1.0.0
 */

class UT_Theme_Header {
	
	/**
	 * Constructor
	 * @since     1.0.0
	 * @version   1.0.0
	 */
	
	public function __construct() {

		

	}
	
	/** 
	 * Prints a Placeholder for Header Animation Purposes
	 *
	 * @return    html
	 *
	 * @access    public
	 * @since     1.0.0
	 * @version   1.0.0
	 */
	
	public function placeholder() {
		
		if( ut_return_header_config( 'ut_navigation_state' , 'off' ) == 'on_transparent' || ut_return_header_config( 'ut_navigation_state' , 'off' ) == 'off' || ut_return_header_config( 'ut_header_scroll_position', 'floating' ) == 'fixed' ) {
			return;
		}    

		if( ut_return_header_config( 'ut_header_layout', 'default' ) == 'default' && ut_return_header_config( 'ut_header_scroll_position', 'floating' ) == 'floating' ) {

			$skin = 'ut-header-placeholder-custom';

			if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-light' ) {
				$skin = 'ut-placeholder-light';
			}

			if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-dark' ) {
				$skin = 'ut-placeholder-dark';
			}

			echo '<div id="ut-header-placeholder" class="' , $skin , '"></div>';

		}
		
	}
	
	/** 
	 * Return a string containing all classes for the header
	 *
	 * @return    html
	 *
	 * @access    public
	 * @since     1.0.0
	 * @version   1.0.0
	 */
	
	public function header_class( $class = '' ) {
		
		// class array
        $classes   = array();
        $classes[] = $class;
		
        if( ut_return_header_config( 'ut_header_layout', 'default' ) != 'default' ) {        
        
            $classes[] = 'hide-on-desktop';
            
        } else {
            
            // header scroll position
            $classes[] = ut_return_header_config('ut_navigation_scroll_position' , 'floating') == 'floating' && ut_return_header_config( 'ut_header_layout', 'default' ) == 'default' ? 'ut-header-floating' : 'ut-header-fixed';
            
            // site border settings
            $classes[] = apply_filters( 'ut_show_siteframe', 'hide' ) == 'show' ? 'bordered-navigation' : '';
            
            // header width
            $classes[] = ut_return_header_config('ut_navigation_width' , 'centered') == 'centered' ? 'ut-header-centered' : 'ut-header-fullwidth';
            $classes[] = ut_page_option( 'ut_top_header' , 'hide' ) == 'show' ? 'bordered-top' : '';
            $classes[] = ut_page_option( 'ut_site_border', 'hide' ) == 'show' && ut_return_header_config( 'ut_site_navigation_flush', 'no' ) == 'yes' && ut_return_header_config( 'ut_navigation_width', 'centered' ) == 'fullwidth' ? 'ut-flush' : '';
            
            if( ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' ) == 'ut-header-custom' ) {
                
                if( apply_filters( 'ut_show_hero', false ) ) {
                
                    $classes[] = 'ut-primary-custom-skin';
                
                } else {
                    
                    if( ut_return_header_config('ut_navigation_customskin_state' , 'off') == 'on_switch' ) {
                    
                        $classes[] = 'ut-secondary-custom-skin';
                    
                    } else {
                        
                        $classes[] = 'ut-primary-custom-skin';
                    
                    }
                    
                }
                
                if( ut_return_header_config( 'ut_navigation_customskin_state', 'off' ) == 'off' && apply_filters( 'ut_show_hero', false ) ) {
                        
                    $classes[] = 'ut-header-hide';
                    
                }
                
            } else {
                
                // border
                $classes[] = ut_return_header_config( 'ut_navigation_state') == 'on_transparent' && ut_return_header_config( 'ut_navigation_transparent_border' ) == 'on' ?  'ut-header-has-border' : '';
                
                // transparent
                $classes[] = ( ut_return_header_config( 'ut_navigation_state' , 'off' ) == 'on_transparent' && ( is_home() || is_front_page() || is_singular('portfolio') || apply_filters( 'ut_show_hero', false ) ) ) ? 'ut-header-transparent' : ut_return_header_config( 'ut_navigation_skin' , 'ut-header-light' );
                            
                if( apply_filters( 'ut_show_hero', false ) ) {
        
                    if( ut_return_header_config( 'ut_navigation_state' , 'off' ) == 'off' && apply_filters( 'ut_show_hero', false ) ) {
                        
                        $classes[] = 'ut-header-hide';
                        
                    }
                
                }            
                            
            }
        
        }
        
        // clean up
        $classes = array_map( 'esc_attr', $classes );
        $classes = array_unique( $classes );
        
        // output
        echo implode( ' ' , $classes );
		
		
	}
	
	
	/** 
	 * Prints a Default Menu forwarding the user to "Appearance" > "Menus"
	 *
	 * @return    html
	 *
	 * @access    public
	 * @since     1.0.0
	 * @version   1.0.0
	 */
	
	public function default_menu( $classes ) {
		
		echo '<nav id="navigation" class="' , implode(' ' , $classes ) , '">';
            
            echo '<ul id="menu-main">';
            
                echo '<li><a class="ut-setup-menu" href="' , get_admin_url() , 'nav-menus.php">' , esc_html__('Set Up Your Menu', 'unitedthemes') , '</a></li>';
            
            echo '</ul>';
            
        echo '</nav>';
		
	}
	
	
	
	
	
	
	
	/** 
	 * Prints a Logo 
	 *
	 * @return    html
	 *
	 * @access    public
	 * @since     1.0.0
	 * @version   1.0.0
	 */
	
	public function create_site_logo() {
		
		$site_logo 			 = ut_return_logo_config( 'ut_site_logo' );
        $site_logo_alternate = ut_return_logo_config( 'ut_site_logo_alt', $site_logo );	
		
		if( !apply_filters( 'ut_show_hero', false ) ) {

			if( $site_logo_alternate ) {

				$site_logo = $site_logo_alternate;

			}

		} 

		if( ut_return_header_config( 'ut_header_layout', 'default' ) == 'side' ) { 

			$sitelogo = $site_logo_alternate;

		} ?>

		<?php if ( get_theme_mod( 'ut_site_logo' ) ) : ?>

			<div class="ut-site-logo">

				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">

					<img data-alternate-logo="<?php echo esc_url( $site_logo_alternate ); ?>" src="<?php echo esc_url( $site_logo ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">

				</a>

			</div>
		
		
		<?php else : ?>
			
			<div class="ut-site-logo">

				<h1 class="ut-logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>

			</div>

		<?php endif;
		
		
	}	
	
	
	/** 
	 * Prints the main navigation
	 *
	 * @return    html
	 *
	 * @access    public
	 * @since     1.0.0
	 * @version   1.0.0
	 */
	
	public function create_menu( $classes ) {
		
		if ( !has_nav_menu( 'primary' ) ) {    
			
			echo $this->default_menu( $classes );
			
		} 
		
		echo wp_nav_menu( array(
			'echo'              => false,
			'container'         => 'nav',
			'container_id'      => 'navigation',
			'container_class'   => implode(' ' , $classes ),
			'items_wrap'        => '<ul id="%1$s" class="%2$s">%3$s</ul>',
			'theme_location'    => 'primary', 
			'walker'            => new ut_menu_walker()
		) ) ;
		
	}
	
}
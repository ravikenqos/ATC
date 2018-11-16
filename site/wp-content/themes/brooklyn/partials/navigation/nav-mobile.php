<?php

$menu_align = ot_get_option( 'ut_mobile_navigation_align', 'left' );

$mobile = array(
    'echo' => false,
    'container' => 'nav',
    'container_id' => 'ut-mobile-nav',
    'menu_id' => 'ut-mobile-menu',
    'menu_class' => 'ut-mobile-menu ut-mobile-menu-' . $menu_align,
    'fallback_cb' => 'ut_default_menu',
    'container_class' => 'ut-mobile-menu mobile-grid-100 tablet-grid-100 hide-on-desktop',
    'items_wrap' => '<div class="ut-scroll-pane-wrap"><div class="ut-scroll-pane"><ul id="%1$s" class="%2$s">%3$s</ul></div></div>',
    'walker' => new ut_menu_walker()
);

if( has_nav_menu( 'mobile' ) ) {
    
    // mobile navigation trigger
    if( ot_get_option('ut_mobile_navigation_trigger_icon_type', 'hamburger') == 'custom' ) {
	
		echo '<div class="ut-mm-trigger tablet-grid-20 mobile-grid-20 hide-on-desktop"><button class="ut-mm-button"></button></div>';
    
	} else {
	
		echo '<div class="ut-mm-trigger tablet-grid-20 mobile-grid-20 hide-on-desktop">';

			echo ut_transform_button( 'ut-open-mobile-menu', 'ut-hamburger-wrap-mobile' );

		echo '</div>';
	
	}
	
    // add location
    $mobile['theme_location'] = 'mobile';
    
    // mobile navigation
    echo wp_nav_menu( $mobile );
    
} else {
    
    if ( has_nav_menu( 'primary' ) ) {
		
		$classes = array();
		
		if( ut_return_header_config( 'ut_site_navigation_no_logo', 'no' ) == 'yes' ) {
			
			$classes[] = 'tablet-grid-100 mobile-grid-100';
			
			if( ut_return_header_config( 'ut_site_navigation_center', 'yes' ) == 'yes' ) {
				
				$classes[] = 'ut-mm-trigger-center';
				
			}			
			
		} else {
			
			$classes[] = 'tablet-grid-20 mobile-grid-20';
			
		}
		
        // mobile navigation trigger
		if( ot_get_option('ut_mobile_navigation_trigger_icon_type', 'hamburger') == 'custom' ) {

			echo '<div class="ut-mm-trigger ' . implode(" ", $classes ) . ' hide-on-desktop"><button class="ut-mm-button"></button></div>';

		} else {

			echo '<div class="ut-mm-trigger ' . implode(" ", $classes ) . ' hide-on-desktop">';

				echo ut_transform_button( 'ut-open-mobile-menu', 'ut-hamburger-wrap-mobile' );

			echo '</div>';

		}
        
        // add location
        $mobile['theme_location'] = 'primary';
        
        // mobile navigation
        echo wp_nav_menu( $mobile );

    }
    
}
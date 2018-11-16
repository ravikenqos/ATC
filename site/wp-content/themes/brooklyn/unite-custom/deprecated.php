<?php if (!defined('ABSPATH')) {
    exit; // exit if accessed directly
}





/**
 * Creates 2 optional buttons for Hero Area
 *
 * @access     public 
 * @since      4.6
 * @deprecated 4.6.7
 * @version    1.0.0
 *
 */ 

if( !function_exists('ut_hero_buttons') ) {

    function ut_hero_buttons() {
        
        // main button
        $ut_main_hero_button = ut_return_hero_config( 'ut_main_hero_button' );
        
        // no button set, leave
        if( empty( $ut_main_hero_button ) ) {
            return;
        }
        
        /*
         * Main Button Settings
         */
        
        $ut_main_hero_button_url_type = ut_return_hero_config( 'ut_main_hero_button_url_type', 'section' );
        $ut_main_hero_button_target   = ut_return_hero_config( 'ut_main_hero_button_target', '#ut-to-first-section' );
        $ut_main_hero_button_style    = ut_return_hero_config( 'ut_main_hero_button_style', 'default' );
        $ut_main_hero_button_settings = ut_return_hero_config( 'ut_main_hero_button_settings' );
        
        // button classes
        $ut_main_hero_button_classes   = array('hero-btn');
        $ut_main_hero_button_classes[] = $ut_main_hero_button_style;
        $ut_main_hero_button_classes[] = ut_return_hero_config( 'ut_main_hero_button_hover_shadow', 'off' ) == 'on' ? 'hero-btn-shadow' : '';
        $ut_main_hero_button_classes[] = !empty( $ut_main_hero_button_settings['button_effect'] ) ? 'bklyn-btn-with-effect bklyn-btn-effect-' . $ut_main_hero_button_settings['button_effect'] : '';
        // $ut_main_hero_button_classes[] = !empty( $ut_main_hero_button_settings['particle_effect'] ) ? 'ut-btn-disintegrate' : '';
		// $ut_main_hero_button_classes[] = !empty( $ut_main_hero_button_settings['particle_effect_restore'] ) && $ut_main_hero_button_settings['particle_effect_restore'] == 'yes' ? 'ut-btn-integrate' : '';
		
		// button attributes
		$ut_main_hero_button_attributes = array(); 
		$ut_main_hero_button_attributes['data-text'] = $ut_main_hero_button;
		
		// particle effect
		if( !empty( $ut_main_hero_button_settings['particle_effect'] ) ) 
		$ut_main_hero_button_attributes['data-particle-effect'] = $ut_main_hero_button_settings['particle_effect'];
		
		// particle effect direction
		if( !empty( $ut_main_hero_button_settings['particle_effect_direction'] ) ) 
		$ut_main_hero_button_attributes['data-particle-direction'] = $ut_main_hero_button_settings['particle_effect_direction'];
		
		// particle effect color
		$ut_main_hero_button_attributes['data-particle-color'] = !empty( $ut_main_hero_button_settings['particle_effect_color'] ) ? $ut_main_hero_button_settings['particle_effect_color'] : get_option('ut_accentcolor' , '#F1C40F');
		
		// button attributes
		$ut_main_hero_button_attributes = implode(' ', array_map(
			function ($v, $k) { return sprintf("%s=\"%s\"", $k, $v); },
			$ut_main_hero_button_attributes,
			array_keys( $ut_main_hero_button_attributes )
		) );
		
        /*
         * Second Button Settings
         */    

        $ut_second_hero_button = ut_return_hero_config( 'ut_second_hero_button', 'off' );

        if ( $ut_second_hero_button == 'on' ) {

            $ut_second_hero_button_text      = ut_return_hero_config( 'ut_second_hero_button_text' );
            $ut_second_hero_button_url_type  = ut_return_hero_config( 'ut_second_hero_button_url_type', 'page' );
            $ut_second_hero_button_url       = ut_return_hero_config( 'ut_second_hero_button_url' );
            $ut_second_hero_button_style     = ut_return_hero_config( 'ut_second_hero_button_style', 'default' );
            $ut_second_hero_button_settings  = ut_return_hero_config( 'ut_second_hero_button_settings' );
            
            // second button classes
            $ut_second_hero_button_classes   = array('hero-second-btn');
            $ut_second_hero_button_classes[] = $ut_second_hero_button_style;
            $ut_second_hero_button_classes[] = ut_return_hero_config( 'ut_second_hero_button_hover_shadow', 'off' ) == 'on' ? 'hero-btn-shadow' : '';
            $ut_second_hero_button_classes[] = !empty( $ut_second_hero_button_settings['button_effect'] ) ? 'bklyn-btn-with-effect bklyn-btn-effect-' . $ut_second_hero_button_settings['button_effect'] : '';
			//$ut_second_hero_button_classes[] = !empty( $ut_second_hero_button_settings['particle_effect'] ) ? 'ut-btn-disintegrate' : '';
			//$ut_second_hero_button_classes[] = !empty( $ut_second_hero_button_settings['particle_effect_restore'] ) && $ut_second_hero_button_settings['particle_effect_restore'] == 'yes' ? 'ut-btn-integrate' : '';

			// button attributes
			$ut_second_hero_button_attributes = array(); 
			$ut_second_hero_button_attributes['data-text'] = $ut_second_hero_button_text;

			// particle effect
			if( !empty( $ut_second_hero_button_settings['particle_effect'] ) ) 
			$ut_second_hero_button_attributes['data-particle-effect'] = $ut_second_hero_button_settings['particle_effect'];

			// particle effect direction
			if( !empty( $ut_second_hero_button_settings['particle_effect_direction'] ) ) 
			$ut_second_hero_button_attributes['data-particle-direction'] = $ut_second_hero_button_settings['particle_effect_direction'];

			// particle effect color
			$ut_second_hero_button_attributes['data-particle-color'] = !empty( $ut_second_hero_button_settings['particle_effect_color'] ) ? $ut_second_hero_button_settings['particle_effect_color'] : get_option('ut_accentcolor' , '#F1C40F');

			// button attributes
			$ut_second_hero_button_attributes = implode(' ', array_map(
				function ($v, $k) { return sprintf("%s=\"%s\"", $k, $v); },
				$ut_second_hero_button_attributes,
				array_keys( $ut_second_hero_button_attributes )
			) );

        } ?>

        <span class="hero-btn-holder">

            <a id="to-about-section" target="<?php echo ut_return_hero_config( 'ut_main_hero_button_link_target' ); ?>" <?php echo $ut_main_hero_button_attributes; ?> href="<?php echo $ut_main_hero_button_url_type == 'section' ? ut_clean_section_id( $ut_main_hero_button_target ) : $ut_main_hero_button_target; ?>" class="<?php echo implode(" ", $ut_main_hero_button_classes); ?>">
				
				<?php if( !empty( $ut_main_hero_button_settings['button_effect'] ) && $ut_main_hero_button_settings['button_effect'] == 'winona' ) { echo '<span>'; } ?>
				
					<?php if( $ut_main_hero_button_style == 'custom' && isset( $ut_main_hero_button_settings['icon_position'] ) && $ut_main_hero_button_settings['icon_position'] == 'before' || $ut_main_hero_button_style == 'custom' && empty( $ut_main_hero_button_settings['icon_position'] ) ) : ?>                                        

						<?php echo !empty( $ut_main_hero_button_settings['icon'] ) ? '<i class="hero-btn-icon-before fa ' . esc_attr( $ut_main_hero_button_settings['icon'] ) . '"></i>' : ''; ?><?php echo ut_translate_meta( $ut_main_hero_button ); ?>

					<?php endif; ?>

					<?php if( $ut_main_hero_button_style != 'custom' ) : ?>

						<?php echo ut_translate_meta( $ut_main_hero_button ); ?>

					<?php endif; ?>

					<?php if( $ut_main_hero_button_style == 'custom' && isset( $ut_main_hero_button_settings['icon_position'] ) && $ut_main_hero_button_settings['icon_position'] == 'after'  ) : ?>                                        

						<?php echo ut_translate_meta( $ut_main_hero_button ); ?><?php echo !empty( $ut_main_hero_button_settings['icon'] ) ? '<i class="hero-btn-icon-after fa ' . esc_attr( $ut_main_hero_button_settings['icon'] ) . '"></i>' : ''; ?>

					<?php endif; ?>
				
				<?php if( !empty( $ut_main_hero_button_settings['button_effect'] ) && $ut_main_hero_button_settings['button_effect'] == 'winona' ) { echo '</span>'; } ?>

            </a>

            <?php if( $ut_second_hero_button == 'on' ) : ?>

                <a target="<?php echo ut_return_hero_config( 'ut_second_hero_button_target' ); ?>" <?php echo $ut_second_hero_button_attributes; ?> href="<?php echo $ut_second_hero_button_url_type == 'section' ? ut_clean_section_id( $ut_second_hero_button_url ) : $ut_second_hero_button_url; ?>" class="<?php echo implode(" ", $ut_second_hero_button_classes ); ?>">
					
					<?php if( !empty( $ut_second_hero_button_style['button_effect'] ) && $ut_second_hero_button_style['button_effect'] == 'winona' ) { echo '<span>'; } ?>
					
						<?php if( $ut_second_hero_button_style == 'custom' && isset( $ut_second_hero_button_settings['icon_position'] ) && $ut_second_hero_button_settings['icon_position'] == 'before' || $ut_second_hero_button_style == 'custom' && empty( $ut_second_hero_button_settings['icon_position'] ) ) : ?>                                        

							<?php echo !empty( $ut_second_hero_button_settings['icon'] ) ? '<i class="hero-btn-icon-before fa ' . esc_attr( $ut_second_hero_button_settings['icon'] ) . '"></i>' : ''; ?><?php echo ut_translate_meta( $ut_second_hero_button_text ); ?>

						<?php endif; ?>

						<?php if( $ut_second_hero_button_style != 'custom' ) : ?>

							<?php echo ut_translate_meta( $ut_second_hero_button_text ); ?>

						<?php endif; ?>

						<?php if( $ut_second_hero_button_style == 'custom' && isset( $ut_second_hero_button_settings['icon_position'] ) && $ut_second_hero_button_settings['icon_position'] == 'after' ) : ?>                                        

							<?php echo ut_translate_meta( $ut_second_hero_button_text ); ?><?php echo !empty( $ut_second_hero_button_settings['icon'] ) ? '<i class="hero-btn-icon-after fa ' . esc_attr( $ut_second_hero_button_settings['icon'] ) . '"></i>' : ''; ?>

						<?php endif; ?>
					
					<?php if( !empty( $ut_second_hero_button_style['button_effect'] ) && $ut_second_hero_button_style['button_effect'] == 'winona' ) { echo '</span>'; } ?>

                </a>

            <?php endif; ?> 

        </span>

        <?php 

    }

}
<?php

/**
 * The Template for displaying a custom shortcode inside the Hero
 *
 * @author      United Themes
 * @package     Brooklyn
 * @version     2.0
 */

// template config 
$ut_hero_shortcode = ut_return_hero_config('ut_hero_shortcode'); ?>

<!-- hero section -->
<section id="ut-custom-hero" class="ut-custom-hero ha-waypoint" data-animate-up="ha-header-hide" data-animate-down="ha-header-hide">
    
    <div id="ut-hero-early-waypoint" class="ut-early-waypoint"></div>    
    
    <?php echo do_shortcode( ut_translate_meta( $ut_hero_shortcode ) ); ?>
    
    <?php if( ut_return_hero_config('ut_hero_down_arrow' , 'off') == 'on' ) : ?>
                    
        <div class="hero-down-arrow-wrap">                        
            
            <span class="hero-down-arrow">
                
                <?php $ut_hero_down_arrow_scroll_target = ut_return_hero_config( 'ut_hero_down_arrow_scroll_target', '#ut-to-first-section' ); ?>
                
                <a href="<?php echo ut_clean_section_id( $ut_hero_down_arrow_scroll_target ); ?>"><i class="Bklyn-Core-Down-3"></i></a>
                
            </span>
            
        </div>
    
    <?php endif; ?>
    
    <div data-section="top" class="ut-scroll-up-waypoint"></div>
    
</section>
<!-- end hero section -->
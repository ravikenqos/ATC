/* <![CDATA[ */
;(function($){
    
    "use strict";
    
	$.fn.supposition = function(){
		
        var $w = $(window), /*do this once instead of every onBeforeShow call*/
			_offset = function(dir) {
				return window[dir === 'y' ? 'pageYOffset' : 'pageXOffset'] || document.documentElement && document.documentElement[dir==='y' ? 'scrollTop' : 'scrollLeft'] || document.body[dir==='y' ? 'scrollTop' : 'scrollLeft'];
			},
			onInit = function(){
				/* I haven't touched this bit - needs work as there are still z-index issues */
				$topNav = $('li',this);
				var cZ=parseInt($topNav.css('z-index')) + $topNav.length;
				$topNav.each(function() {
					$(this).css({zIndex:--cZ});
				});
			},
			onHide = function(){
				this.css({marginTop:'',marginLeft:''});
			},
			onBeforeShow = function(){
				
                this.each(function(){
					
                    var $u = $(this);
                    
					$u.css('display','block');
					
                    var menuWidth = $u.width(),
						parentWidth = $u.parents('ul').width(),
						totalRight = $w.width() + _offset('x'),
						menuRight = $u.offset().left + menuWidth;    
                    
                    if(menuRight > totalRight) {
						
                        $u.css('margin-left', ( $u.parents('ul').length === 1 ? totalRight - menuRight : -(menuWidth + parentWidth) ) + 'px');
					}

					var windowHeight = $w.height(),
						offsetTop = $u.offset().top,
						menuHeight = $u.height(),
						baseline = windowHeight + _offset('y');
                    
					var expandUp = (offsetTop + menuHeight > baseline);
					
                    if (expandUp) {
						
                        $u.css('margin-top',baseline - (menuHeight + offsetTop));
                        
					}
                    
					//$u.css('display','none');
                    
				});
                
			};
		
		return this.each(function() {
			var $this = $(this),
				o = $this.data('sf-options'); /* get this menu's options */
			
			/* if callbacks already set, store them */
			var _onInit = o.onInit,
				_onBeforeShow = o.onBeforeShow,
				_onHide = o.onHide;
				
			$.extend($this.data('sf-options'),{
				onInit: function() {
					onInit.call(this); /* fire our Supposition callback */
					_onInit.call(this); /* fire stored callbacks */
				},
				onBeforeShow: function() {
					onBeforeShow.call(this); /* fire our Supposition callback */
					_onBeforeShow.call(this); /* fire stored callbacks */
				},
				onHide: function() {
					onHide.call(this); /* fire our Supposition callback */
					_onHide.call(this); /* fire stored callbacks */
				}
			});
		});
	};
    
	$.fn.utvmenu = function(option) {
		
        var obj,
			item;
            
		var options = $.extend({
				speed: 200,
				autostart: true,
				autohide: 1
			},
			option);
            
		obj = $(this);
        
		item = obj.find("ul").parent("li").children("a");
		item.attr("data-option", "off");

		item.unbind('click').on("click", function() {
			
            var a = $(this);
            
			if( options.autohide ) {
				
                a.parent().parent().find("a[data-option='on']").parent("li").children("ul").slideUp(options.speed / 1.2,
					function() {
						$(this).parent("li").children("a").attr("data-option", "off");
				    }
                );
                
			}
            
			if (a.attr("data-option") === "off") {
                
                a.parent("li").children("ul").slideDown(options.speed,
					function() {
						a.attr("data-option", "on");
				    }
                );
                
			}
            
			if (a.attr("data-option") === "on") {
				a.attr("data-option", "off");
				a.parent("li").children("ul").slideUp(options.speed);
			}
		});
		if (options.autostart) {
			obj.find("a").each(function() {

				$(this).parent("li").parent("ul").slideDown(options.speed,
					function() {
						$(this).parent("li").children("a").attr("data-option", "on");
					});
			});
		}

	};

})(jQuery);

;(function($){
	
	"use strict";
	
    $("html").addClass('js');
	
    $('.vc_col-has-fill').each(function() {
        
        $(this).parent(".vc_row").addClass("ut-row-has-filled-cols");
        
    });    
    
    
    // Global Parallax Effect Container
    $('.parallax-scroll-container').each(function() {
		
		var $this            = $(this),
            window_height    = $(window).height(),
            container_height = $this.outerHeight();
        
        if( container_height < window_height ) {
            
            var new_container_height = ( 100 + ( 100 - container_height * 100 / window_height ) );
            
            $this.css( "height", new_container_height + "%" ).css( "margin-top", -( $this.outerHeight() - container_height ) / 2 + "px" ).addClass("parallax-scroll-container-calculated");
           
        }
        
        if( container_height >= window_height ) {
            
            $this.css( "height", "105%" ).css( "margin-top", -( $this.outerHeight() - container_height ) / 2 + "px" ).addClass("parallax-scroll-container-calculated");
            
        }
        
    });
    
    
    // Global Parallax Effect - options controlled by data attributes
    $.hongkong({
        mobile: true,
        selector: '.parallax-scroll-container:not(.parallax-scroll-container-disabled)'        
    });
    
	$(window).load(function(){
		
		/* Section and Row Overlay Effects
		================================================== */  
		$(".bklyn-overlay-effect").each(function(){
						
			var $this	= $(this), 
				id 		= $this.attr("id");
			
			particlesJS(id, $this.data("effect-config") );
			
		});		
		
	});
	
    $(document).ready(function(){
        
        var $brooklyn_header = $("#header-section");
        
        /* Helper Functions
        ================================================== */
        function ut_get_current_scroll() {

            return window.pageYOffset || document.documentElement.scrollTop;

        }
        
        var last_offset = 0;        
        var header_hide = $('#header-section').hasClass("ha-header-hide");
        
        function ut_animate_top_header() {
            
            if( $(window).width() < 1024 ) {
                
                $brooklyn_header.removeAttr("style");                
                return;
                
            }            
            
            if( $('body').hasClass('ut-has-top-header') || $('body').hasClass('ut-site-frame-top') ) {

                // scroll up
                if( ut_get_current_scroll() < last_offset ) {

                    // remove transition on scroll up
                    if( !$('#header-section').hasClass('ut-header-transition-off') ) {

                        $('#header-section').addClass('ut-header-transition-off');

                    }

                    if( ut_get_current_scroll() <= 40 ) {

                        $('#header-section').css('top', 40-ut_get_current_scroll() );

                    }

                // scroll down    
                } else {

                    if( ut_get_current_scroll() > 40 ) {

                        $('#header-section').css('top', 0 );    

                    }

                    if( $('#header-section').hasClass('ut-header-transition-off') ) {

                        $('#header-section').removeClass('ut-header-transition-off');

                    }

                }

            }            

            last_offset = ut_get_current_scroll();            
            
        }
        
        if( !$("#header-section").hasClass("ut-header-fixed") ) {
            
            $(window).scroll(function() {            

                if( header_hide ) {
                    return;
                }

                window.requestAnimationFrame(ut_animate_top_header);

            });

            /* execute on load */
            ut_animate_top_header();
     
        }
        
		/* Lazy Load
		================================================== */
        var $imgs = $("img.utlazy");
    
        $imgs.lazyload({
            effect: 'fadeIn',
            effectspeed: '200',
            event : 'scroll',
			load : function() {
                $(this).show();	
                $.waypoints("refresh");
			},
            failure_limit: Math.max($imgs.length - 1, 0)
        });
		
        
		/* Main Navigation & Mobile Navigation Classes
		================================================== */
		$('#navigation ul.menu').find(".current-menu-ancestor").each(function() { 
            
            $(this).find("a").first().addClass("active"); 
        
        }).end().find(".current_page_parent").each(function() { 
                
            $(this).find("a").first().addClass("active"); 
            
        }).end().superfish({ autoArrows : true }).supposition();
        		
		var mega_menu_open = false;
		
		$(document.body).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.ut-megamenu', function() {
			
			if( $(this).parent(".ut-is-megamenu").hasClass("ut-megamenu-close") ) {
				
				$(this).parent(".ut-is-megamenu").removeClass("ut-megamenu-close");
				mega_menu_open = false;
			
			} 
			
		});
		
		var setTimeoutConst;
		
		$('#navigation > ul > li').hover(function() {
			
			var $this = $(this);
			
			if( $this.hasClass("ut-is-megamenu") ) {
			   
				clearTimeout( setTimeoutConst );
			
				if( !mega_menu_open ) {
					
					mega_menu_open = true;
					$(this).addClass('ut-megamenu-open');					
					
				}   
			   
			}
			
			if( $this.hasClass("ut-menu-item-lvl-0") && $this.not(".ut-is-megamenu").hasClass("ut-has-children") && mega_menu_open ) {
						
				clearTimeout( setTimeoutConst );
				$(".ut-is-megamenu").removeClass("ut-megamenu-open").addClass('ut-megamenu-close');

			} 
			
		}, function( event ) {
			
			var $this = $(this);
			
			if( $this.hasClass("ut-is-megamenu") ) {
			
				setTimeoutConst = setTimeout( function() {

					$this.removeClass("ut-megamenu-open").addClass('ut-megamenu-close');

				}, 200 );
				
				// user is going to leave the menu
				if( $(event.target).hasClass("ut-megamenu-grid-col") ) {
						
					clearTimeout( setTimeoutConst );
					$this.removeClass("ut-megamenu-open").addClass('ut-megamenu-close');

				} 
				
			}
			
		});
		
		$(document).mouseleave(function () {
			
			if( mega_menu_open) {
			   
				$(".ut-is-megamenu").removeClass("ut-megamenu-open").addClass('ut-megamenu-close');	   
			   
			}						
			
		});	
		
		
		$('#ut-mobile-menu').find(".current-menu-ancestor").each(function() { 
            
            $(this).find("a").first().addClass("active"); 
        
        }).end().find(".current_page_parent").each(function() { 
        
            $(this).find("a").first().addClass("active"); 
        
        });

		$('#ut-mobile-menu .sub-menu li:last-child').addClass('last');
    	$('#ut-mobile-menu li:last-child').addClass('last');
        
        /* Mobile Navigation
		================================================== */
		function mobile_menu_dimensions() {
			
			var nav_new_width	= $(window).width(),
				nav_new_height  = $(window).outerHeight();
			
			$("#ut-mobile-nav").css( 'width', nav_new_width ).height( nav_new_height );
			$(".ut-scroll-pane-wrap").css( 'width',  nav_new_width - 20 ).height( nav_new_height );
			$(".ut-scroll-pane").css( 'width',  nav_new_width ).height( nav_new_height );
			$("#ut-mobile-menu").css( 'width',  nav_new_width - 40 );
		
		}
		
		function mobilemenu(){
                
			 if (($(window).width() > 979)) {
				
                $("#ut-mobile-nav").hide(); 
                $('body').removeClass("ut-mobile-menu-open");
                
			 }
			
		}

		$(".ut-mm-trigger").click(function(event){
			
            if( site_settings.mobile_nav_is_animating ) {
                return false;
            }
            
            site_settings.mobile_nav_is_animating = true;
            	
            if( !site_settings.mobile_nav_open ) {
                
                $('body').addClass("ut-mobile-menu-open");
				$('#ut-open-mobile-menu').addClass("is-active");
            
            }
            
            mobile_menu_dimensions();
            
			$(this).toggleClass("active").next().slideToggle(600, function() {
                
                if( !site_settings.mobile_nav_open ) {
                    
                    site_settings.mobile_nav_open = true;					
                
                } else {
                    
                    // redraw sliders since they might be broken
                    if( $(".rev_slider").length ) {
                        $(".rev_slider").revredraw();                    
                    }
                    
                    $('body').removeClass("ut-mobile-menu-open");
					$('#ut-open-mobile-menu').removeClass("is-active");
                    site_settings.mobile_nav_open = false;
                    
                }            
                
                site_settings.mobile_nav_is_animating = false;
                    
            });
                        
			event.preventDefault();
			
		});		
				
		var mobiletimer;
		
		$(window).utresize(function(){
		  
            clearTimeout(mobiletimer);
		    mobiletimer = setTimeout(mobilemenu, 100);
		    mobile_menu_dimensions();
          
		});
        
        
        $('.ut-scroll-pane').on('touchstart', function(){
            
            // nothing to do here 
        
        });
        
		/* Tablet Slider
		================================================== */
		$(".ut-tablet-nav li a").click( function(event) {
			
			var index = $(this).parent().index();
						
			/* remove selected state from previuos tabs link */
			$(".ut-tablet-nav li").removeClass("selected");
			
			/* add class selected to current link */
			$(this).parent().addClass("selected");
			
			/* hide all tabs images */
			$(".ut-tablet").children().hide().removeClass("show");		
			
			/* show the selected tab image */
			$(".ut-tablet").children().eq(index).fadeIn("fast").addClass("show");
			
			event.preventDefault();
		
		});
		
        /* Adjust Offset Anchor
		================================================== */        
        var brooklyn_scroll_offset = $('#header-section').outerHeight();
        
        if( $('#wpadminbar').length ) {
            brooklyn_scroll_offset = brooklyn_scroll_offset + $('#wpadminbar').height();     
        }
        
        if( $('#header-section').hasClass("ut-header-fixed") ) {
            
            brooklyn_scroll_offset = 0;
            
        }
        
        brooklyn_scroll_offset--;
        
        var chrome   = navigator.userAgent.indexOf('Chrome') > -1;
        
        if( $('#header-section').hasClass('ut-header-has-border') || ( chrome && $('#header-section').css('box-shadow') ) ) {
            brooklyn_scroll_offset--;
        }
        
        /* Scroll to Top
		================================================== */
		var ut_scrolleffect = $('body').data("scrolleffect"),
			ut_scrollspeed	= $('body').data("scrollspeed");
		
		$('.logo a[href*="#"], .ut-logo a[href*="#"]').click( function(event) { 
				
			event.preventDefault();
            event.stopImmediatePropagation();
            
			$.scrollTo( $(this).attr('href') , ut_scrollspeed, { easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );			
			
		});
		
		$('.toTop').click( function(event) { 
				
			event.preventDefault();
            event.stopImmediatePropagation();
            
			$.scrollTo( $(this).attr('href') , ut_scrollspeed, { easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );			
			
		});
		
		
		/* Scroll to sections for hero buttons
		================================================== */        
        $('.hero-second-btn[href^="#"], .hero-btn[href^="#"], .hero-down-arrow a[href^="#"]').not(".ut-btn-disintegrate").click( function( event ) {
            
            event.stopImmediatePropagation();    
            event.preventDefault();                

            var target = $(this).attr('href');

            if( target === '#ut-to-first-section' ) {

                $.scrollTo( $('.wrap') , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

            } else {

                $.scrollTo( target , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

           }
            
        
        });         
		
		$('.hero-slider-button[href^="#"]').click( function( event ) {
			    
            event.stopImmediatePropagation();
            event.preventDefault();

            var target = $(this).attr('href');

            if( target === '#ut-to-first-section' ) {

                $.scrollTo( $('.wrap') , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

            } else {

                $.scrollTo( target , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

            }
			
		});
		
        $('.ut-fancy-image-wrap a[href^="#"]').click( function( event ) {
            
            event.stopImmediatePropagation();
            event.preventDefault();                

            var target = $(this).attr('href');

            if( target === '#ut-to-first-section' ) {

                $.scrollTo( $('.wrap') , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

            } else {

                $.scrollTo( $(this).attr('href') , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

            }            
            
                
        });
		
		/* Disintegrate Buttons
		================================================== */
		var $current_button    = '',
			button_with_scroll = false;
		
		function openInNewTab(url, target) {
		  	
			var win = window.open(url, target);
			win.focus();
			
		}
		
		if( $(".ut-btn-disintegrate").length ) { 
			
			$(".ut-btn-disintegrate").each(function(){
				
				// current button
				var $this     = $(this),
					effect    = $this.data("particle-effect"),
					color  	  = $this.data("particle-color"),
					direction = $this.data("particle-direction");
				
				var effect_defaults = site_settings.button_particle_effects[effect];
				
				effect_defaults.color = color;
				effect_defaults.direction = direction;
				effect_defaults.complete = function() {
					
					var target = $this.attr('href').replace(/^.*?(#|$)/,'');
					
					// check if there is a section on the current page
					if( target && $("#" + target ).length || target === 'ut-to-first-section' ) {
						
						if( target === 'ut-to-first-section' ) {

							$.scrollTo( $('.wrap') , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

						} else {

							$.scrollTo( '#' + target , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );

						}						
					
					// link is external	
					} else {
						
						if( $this.hasClass("ut-lightbox") ) {
							
							// @todo
						   
						} else {
						   
							target = $this.attr('target').length ? $this.attr('target') : '_self';
							openInNewTab( $this.attr('href'), target );
						   
						}
						
					}
					
					if( $this.hasClass("ut-btn-integrate") ) {

						$this.delay(3000).queue(function(){

							$(this).data('particle-effect-storage').integrate({
								complete: function(){
									
									$this.removeClass("ut-particles-deactivate-transition");
									
								}						
							});
							$(this).dequeue();

						});	

					} else {

						$this.removeClass("ut-particles-deactivate-transition");

					}
					
				};
				
				$this.data('particle-effect-storage', new Particles( $this[0], effect_defaults ) );
				
			});
			
			$('.ut-btn-disintegrate').click( function( event ) {
				
				// deactivate button default transition
				$(this).addClass("ut-particles-deactivate-transition");
				
				// disintegrate button
				$(this).data('particle-effect-storage').disintegrate();
				
				// event.stopImmediatePropagation();    
				event.preventDefault();                

			});
		
		}
		
        /* Scroll to Section Class
		================================================== */     
        $(document).on("click" , '.ut-scroll-to-section, .ut-scroll-to-section a' , function(event) {
            
            var href = $(this).attr('href');
            
            if( href === undefined ) {
                return;
            }
             
            /* extract section hash */
            var section = '#' + href.substring( href.indexOf('#')+1 );
                        
            $.scrollTo( section , ut_scrollspeed, {  
                easing: ut_scrolleffect ,
                offset: -brooklyn_scroll_offset,
                'axis':'y'
            });
            
            /* activate navigation */
            if( $('#navigation a[href*="' + section + '"]').length ) {
            
                $('#navigation a').removeClass('selected');
                $('#navigation a[href*="' + section + '"]').addClass('selected');            
            
            }
            
            /* activate navigation */
            if( $('#bklyn-sidenav a[href*="' + section + '"]').length ) {
            
                $('#bklyn-sidenav a').removeClass('selected');
                $('#bklyn-sidenav a[href*="' + section + '"]').addClass('selected');            
            
            }
            
            event.preventDefault();
            
        });
        
		/* Scroll to Section if Hash exists
		================================================== */
		$(window).load(function() {
						
			if( window.location.hash ) {
				
				setTimeout ( function () {
                    
                    if( site_settings.navigation === 'default' ) {
                    
                        $.scrollTo( window.location.hash , ut_scrollspeed , { easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , "axis":"y" } );
                        
					} else if( site_settings.navigation === 'side' ) {
                        
                        $.scrollTo( window.location.hash , ut_scrollspeed , { easing: ut_scrolleffect , offset: 0 , "axis":"y" } );
                    
                    }
                    													
				}, 400 );
								
			}
			
		});
				
		/* Scroll to Sections / Main Menu
		================================================== */
		$('#navigation a').click( function(event) { 
                        
			if( this.hash && !$(this).hasClass('external') && $(this.hash).length ) {
			
				$.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );			
				
                event.stopImmediatePropagation();
                event.preventDefault();				
				
			} else if( this.hash && $(this.hash).length && $(this).parent().hasClass('contact-us') ) {
				
				$.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: 0 , 'axis':'y' } );			
                
                event.stopImmediatePropagation();
				event.preventDefault();		
				
			}
			
		});
		
        $('.footer ul.menu a').click( function(event) { 
            
            if( this.hash && $(this.hash).length ) {
			
				$.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );			
				
                event.stopImmediatePropagation();
                event.preventDefault();				
				
			} 
        
        });        
                
        var isIEMobile = isIEMobile();
        
        function isIEMobile() {
            var regExp = new RegExp("IEMobile", "i");
            return navigator.userAgent.match(regExp);
        }
        
        /* Scroll to Sections / Mobile Menu
		================================================== */
		$('#ut-mobile-menu a').click( function(event) { 
			
			if( this.hash && !$(this).hasClass('external') && $(this.hash).length ) {				
                
                if(!isIEMobile){
                                
                    $.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );
                
                } else {
                
                    var thash = this.hash;
                    
                    $('html, body').animate({ scrollTop: $( thash ).offset().top }, ut_scrollspeed );
                
                }
                
                event.stopImmediatePropagation();
				event.preventDefault();	
                			
			}
			
			/* close menu */
			$(".ut-mm-trigger").trigger("click");
			
		});
        
        /* Side Navigation
		================================================== */        
        if( $("#bklyn-sidenav").length ) {
            
            $("#bklyn-sidenav").utvmenu({
                speed: 800,
				autostart: false,
				autohide: true
            });
            
            $('#bklyn-sidenav a').click( function(event) { 

                if( this.hash && !$(this).hasClass('external') && $(this.hash).length ) {

                    $.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: 0 , 'axis':'y' } );			

                    event.stopImmediatePropagation();
                    event.preventDefault();				

                } else if( this.hash && $(this).parent().hasClass('contact-us') ) {

                    $.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: 0 , 'axis':'y' } );			

                    event.stopImmediatePropagation();
                    event.preventDefault();		

                }

            });

        }        
        
        
        var waypoints_active = false;        
        
        $(window).load(function() {
            
            waypoints_active = true;
            
        });
        
            
        $('.ut-vc-offset-anchor-top').each(function() {
            
            $(this).waypoint( function( direction ) {
                
                if( !waypoints_active ) {
                    return;
                }
                    
                var containerID = $(this).attr('id');
                
                if( direction === 'down' ) {
                        
                    $('#navigation a').removeClass('selected');
                    $('#navigation a[href*="#' + containerID + '"]').addClass('selected');
                
                }
                
                if( direction === 'up' ) {
                    
                    $('#navigation a').removeClass('selected');
                
                }                
                
                if( direction === 'up' && $(this).attr('id') === 'to-main-content' ) {
                    
                    if( site_settings.navigation === 'default' ) {
                                        
                        /* update navigation home */
                        $('#navigation a').removeClass('selected');
                        $('.ut-home-link a').addClass('selected');
                    
                    } else if( site_settings.navigation === 'side' ) {
                        
                        /* update navigation home */
                        $('#bklyn-sidenav a').removeClass('selected');
                        $('.ut-home-link a').addClass('selected');
                        
                    }
                                        
                
                }                
                
            }, { offset: brooklyn_scroll_offset + 1 + 'px' });
            
        });
        
        $('.ut-vc-offset-anchor-bottom').each(function() {                
            
            $(this).waypoint( function( direction ) {
                
                if( !waypoints_active ) {
                    return;
                }
                    
                var containerID = $(this).attr('id');
                                
                if( direction === 'down' ) {
                    
                    $('#navigation a').removeClass('selected');
                
                }
                
                if( direction === 'up' ) {
                    
                    $('#navigation a').removeClass('selected');
                    $('#navigation a[href*="#' + containerID + '"]').addClass('selected');
                    
                }
                
            }, { offset: brooklyn_scroll_offset + 10 + 'px' });                    
    
        });                        

        /* reflect scrolling in navigation
        ================================================== */
        $('.ut-offset-anchor').each(function() {
            
            $(this).waypoint( function( direction ) {
                
                if( direction === 'down' && $(this).attr('id') !== 'to-main-content' ) {
                    
                    var containerID = $(this).attr('id');
                                        
                    if( $(this).data('parent') ) {
                        containerID = $(this).data('parent');
                    }
                    
                    if( site_settings.navigation === 'default' ) {
                    
                        /* update navigation */
                        $('#navigation a').removeClass('selected');
                        $('#navigation a[href*="#'+containerID+'"]').addClass('selected');
                    
                    } else if( site_settings.navigation === 'side' ) {
                        
                        /* update navigation */
                        $('#bklyn-sidenav a').removeClass('selected');
                        $('#bklyn-sidenav a[href*="#'+containerID+'"]').addClass('selected');
                    
                    }
                    
                                    
                }
                
                if( direction === 'up' && $(this).attr('id') === 'to-main-content' ) {
                    
                    if( site_settings.navigation === 'default' ) {
                                        
                        /* update navigation home */
                        $('#navigation a').removeClass('selected');
                        $('.ut-home-link a').addClass('selected');
                    
                    } else if( site_settings.navigation === 'side' ) {
                        
                        /* update navigation home */
                        $('#bklyn-sidenav a').removeClass('selected');
                        $('.ut-home-link a').addClass('selected');
                        
                    }
                                        
                
                }
                            
            } , { offset: brooklyn_scroll_offset + 1 + 'px' });
                  
        });
        
        $('.ut-scroll-up-waypoint').each(function() {
            
            $(this).waypoint( function( direction ) {
                
                if( direction === 'up' ) {
                    
                    var containerID = $(this).data('section');
                    
                    if( $(this).data('parent') ) {
                        containerID = $(this).data('parent');
                    }
                    
                    if( site_settings.navigation === 'default' ) {
                    
                        /* update navigation */
                        $('#navigation a').removeClass('selected');
                        $('#navigation a[href*="#'+containerID+'"]').addClass('selected');
                    
                    } else if( site_settings.navigation === 'side' ) {
                        
                        /* update navigation */
                        $('#bklyn-sidenav a').removeClass('selected');
                        $('#bklyn-sidenav a[href*="#'+containerID+'"]').addClass('selected');
                    
                    }
                                    
                }
                            
            } , { offset: brooklyn_scroll_offset + 10 + 'px' });
                  
        });	        
        
        
        		
		/* Youtube WMODE
		================================================== */
		$('iframe').each(function() {
			
			var url = $(this).attr("src");
			
			if ( url!==undefined ) {
				
				var youtube   = url.search("youtube"),			
					splitable = url.split("?");
				
				/* url has already vars */	
				if( youtube > 0 && splitable[1] ) {
					$(this).attr("src",url+"&wmode=transparent");
				}
				
				/* url has no vars */
				if( youtube > 0 && !splitable[1] ) {
					$(this).attr("src",url+"?wmode=transparent");
				}
			
			}
			
		});
		
        
        /* LightGallery
		================================================== */ 
        $(".ut-lightbox").lightGallery({
            selector: "this",
            iframeMaxWidth: "80%",
            hash: false
        });
        
		/* Member POPUP
		================================================== */
		$('.ut-show-member-details').click( function(event) { 
		
			event.preventDefault();	
			
			/* show overlay */
			$('.ut-overlay').addClass('ut-overlay-show');			
			
			/* execute animation to make member visible */
			$('#member_'+$(this).data('member')).addClass('ut-box-show').animate( {top: "15%" , opacity: 1 } , 1000 , 'easeInOutExpo' , function() {
				
				var offset  = $(this).offset().top,
					id		= $(this).data("id");
					
				/* now append clone to body */
				$(this).clone().attr("id" , id).css({"position" : "absolute" , "top" : offset , "padding-top" : 0}).appendTo("body").addClass("member-clone");
			
				/* store current member ID */
				$(this).removeClass('ut-box-show').css({ "top" : "30%" , "opacity" : "0" });				
								
			});			
					
		});
		
        $(document).on("click" , '.ut-hide-member-details, body' , function(event) {
			
            if ( !$(event.target).is('.member-social, .member-social *, .ut-btn, .member-box a') ) {
            
                if( $('.ut-modal-box.member-clone').length ) {
                    event.preventDefault();
                }
                
                /* execute animation to make member invisible */
                $('.ut-modal-box.member-clone').animate({top: "0%" , opacity: 0 } , 600 , 'easeInOutExpo' ,function() {
                    
                    $(this).remove();
                    
                    /* hide overlay */
                    $('.ut-overlay').removeClass('ut-overlay-show');				
                    
                });
            
            }
			
		});
		
		$(document).on("click" , '.ut-overlay' , function(event) {
            
			event.preventDefault();
			
			/* execute animation to make member invisible */
			$('.ut-modal-box.member-clone').animate({top: "0%" , opacity: 0 } , 600 , 'easeInOutExpo' ,function() {
				
				$(this).remove();
				
				/* hide overlay */
				$('.ut-overlay').removeClass('ut-overlay-show');				
				
			});
			
		});				
		
        if( !$('html').hasClass('no-touchevents') ) {
               
            var touchmoved;
            
            $(document).on('touchend', '.member-photo', function() {
                                    
                var $this = $(this);
                                
                if( touchmoved !== true ){
                    
                    if( $this.hasClass('ut-touch-event') ) {
                        
                        $this.toggleClass('cs-hover');
                    
                    }
                
                }                
            
            }).on('touchmove', function() {
                
                touchmoved = true;
                
            }).on('touchstart', function() {
                
                touchmoved = false;
                
            });
        
        }
        
		/* FitVid
		================================================== */
		$(".ut-video, .entry-content, .ut-post-media, .entry-thumbnail").fitVids();
		
		/* Split Screen Calculation
		================================================== */
		$(window).load(function() {
			
            $(".ut-split-screen-poster").each(function() {
				
				var parent_ID = $(this).data("posterparent"),
					newHeight = $("#"+parent_ID).height();
				
				$(this).height(newHeight);			
				
			});
			
		});
		
		$('.bklyn-btn[href^="#"], .ut-btn[href^="#"], .cta-btn a[href^="#"], .ut-service-column-vertical-link[href^="#"], .ut-custom-link-module[href^="#"]').click( function( event ) {
			
            if( this.hash && $(this.hash).length ) {
                
                event.stopImmediatePropagation();
                event.preventDefault();
                
				if( $(this).parent().hasClass("ut-btn-no-scroll-offset") ) {
				   
					$.scrollTo( $(this).attr('href') , ut_scrollspeed, {  easing: ut_scrolleffect , offset: 0 , 'axis':'y' } );
				   
				} else {
				   
					$.scrollTo( $(this).attr('href') , ut_scrollspeed, {  easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' } );
				   
				}
                
            } else if( this.hash === '' ) {
				
                event.preventDefault();
				
			}
			
			
		});
        
        $('.nivoSlider').hover( function() {
            
            var $this = $(this);
            
            $this.find('.nivo-directionNav .nivo-prevNav').html('');
            $this.find('.nivo-directionNav .nivo-nextNav').html('');
            
        });
        
        /* Overlay Navigation
        ================================================== */ 
        var $brooklyn_overlay_navigation = $("#ut-overlay-menu"),
            $brooklyn_overlay_navigation_links = $("#ut-overlay-nav li a"),
            $brooklyn_open_overlay_menu  = $('#ut-open-overlay-menu');

        function ut_open_overlay_navigation() {
            
            // hide menu and other elements first
            $brooklyn_overlay_navigation_links.css("visibility","hidden");
            $(".ut-overlay-footer-icons-wrap","#ut-overlay-menu-footer").css("visibility","hidden");
            $(".ut-overlay-copyright","#ut-overlay-menu-footer").css("visibility","hidden");
            
            $brooklyn_overlay_navigation.show().addClass("ut-overlay-menu-visible");
            
            setTimeout( function(){
            
                $brooklyn_overlay_navigation_links.each(function( index ) {

                    var $this = $(this);

                    $this.delay( index * 75 ).queue( function() {

                        $this.css("visibility","visible").addClass("fadeInUp").dequeue();

                    });                

                });
                
                setTimeout( function(){
                    
                    $(".ut-overlay-footer-icons-wrap","#ut-overlay-menu-footer").css("visibility","visible").addClass("fadeIn");
                    $(".ut-overlay-copyright","#ut-overlay-menu-footer").css("visibility","visible").addClass("fadeIn");
                    
                }, 75 * $brooklyn_overlay_navigation_links.length + 100 );     
                    
            }, 500 );    

        }

        function ut_close_overlay_navigation() {
            
            $(".ut-overlay-menu", "#ut-overlay-nav").addClass("fadeOut");
            
            $(".ut-overlay-footer-icons-wrap","#ut-overlay-menu-footer").removeClass("fadeIn").addClass("fadeOut");
            $(".ut-overlay-copyright","#ut-overlay-menu-footer").removeClass("fadeIn").addClass("fadeOut");
            
            setTimeout( function(){
                    
                $brooklyn_overlay_navigation.removeClass("ut-overlay-menu-visible").hide();

                setTimeout( function(){
                    
                    $brooklyn_overlay_navigation_links.removeClass("fadeInUp");
                    $(".ut-overlay-menu", "#ut-overlay-nav").removeClass("fadeOut");
                    
                    $(".ut-overlay-copyright","#ut-overlay-menu-footer").removeClass("fadeOut").css("visibility","hidden");
                    $(".ut-overlay-footer-icons-wrap","#ut-overlay-menu-footer").removeClass("fadeOut").css("visibility","hidden");
                    

                }, 500 );


            }, 400 );
            

        }

        $(document).on("click" , '#ut-open-overlay-menu' , function(event) {
            
			// burger position
            var position_offset = $("#ut-open-overlay-menu").offset();
            
            // logo position
            var logo_position_offset = $("#header-section .site-logo").offset();
            
			// overlay position
			var overlay_position_offset = $("#ut-overlay-menu").offset();
			
            if( !$(this).hasClass("is-active") ) {
                    
                window.requestAnimationFrame( ut_open_overlay_navigation );
                
                $("#ut-open-overlay-menu").css({
                    "top" : position_offset.top - overlay_position_offset.top,
                    "left" : position_offset.left
                });
                
                if( $("#ut-overlay-menu .site-logo").length ) {
                	
					// fallback if regular header logo has been turned off
					if(typeof(logo_position_offset) === "undefined") {
						
						logo_position_offset = {
							top : 40,
							left: 40
						};
					   
					}
					
                    $("#ut-overlay-menu .site-logo").css({
                        "top" : logo_position_offset.top - overlay_position_offset.top,
                        "left" : logo_position_offset.left
                    });
                
                    $("#header-section .site-logo").fadeOut();
                    
                }
                    
                $brooklyn_open_overlay_menu.prependTo("#ut-overlay-menu");
                
                $brooklyn_open_overlay_menu.dequeue().delay(100).queue(function(){
                    $brooklyn_open_overlay_menu.addClass("is-active");
                });            

            } else {

                window.requestAnimationFrame( ut_close_overlay_navigation );

                $brooklyn_open_overlay_menu.prependTo("#ut-hamburger-wrap-overlay");
                
                $("#ut-open-overlay-menu").removeAttr("style");
                
                if( $("#ut-overlay-menu .site-logo").length ) {
                    
                    $("#header-section .site-logo").fadeIn();                    
                }
                
                
                $brooklyn_open_overlay_menu.dequeue().delay(100).queue(function(){
                    $brooklyn_open_overlay_menu.removeClass("is-active");
                });            

            }

            event.preventDefault();

        });
        
        $(document).on('touchmove', "#ut-overlay-menu", function(ev) {
            
            if(ev.type !== 'click') {
                
                ev.stopImmediatePropagation();
                ev.preventDefault();
                
            }
            
        });


        document.addEventListener('keyup', function(ev) {

            // escape key.
            if( ev.keyCode === 27 ) {

                if( $brooklyn_open_overlay_menu.hasClass("is-active") ) {
                    $brooklyn_open_overlay_menu.trigger("click");
                }            

            }

        });
        
        $('#ut-overlay-menu a').click( function(event) { 
                        
			if( this.hash && !$(this).hasClass('external') && $(this.hash).length ) {
			
				$.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: -brooklyn_scroll_offset , 'axis':'y' });			
				
                if( $brooklyn_open_overlay_menu.hasClass("is-active") ) {
                    $brooklyn_open_overlay_menu.trigger("click");
                } 
                
                event.stopImmediatePropagation();
                event.preventDefault();				
				
			} else if( this.hash && $(this.hash).length && $(this).parent().hasClass('contact-us') ) {
				
				$.scrollTo( this.hash , ut_scrollspeed, { easing: ut_scrolleffect , offset: 0 , 'axis':'y' } );			
                
                if( $brooklyn_open_overlay_menu.hasClass("is-active") ) {
                    $brooklyn_open_overlay_menu.trigger("click");
                } 
                
                event.stopImmediatePropagation();
				event.preventDefault();		
				
			}
			
		});
        
        
        
        /* Force Re Render of Section with fixed backgrounds
           Chrome flicker issue
		================================================== */        
        if( window.devicePixelRatio > 1 || /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) ){
            
            $.fn.redraw = function() {
                return this.stop(true,true).hide(0, function() {
                    $(this).show();
                });
            };
                
            $('#main-content section').each(function() {
                
                if ( $(this).css('background-attachment') === 'fixed' ) {
                    
                    $(this).addClass('ut-has-fixed-background');
                      
                }
                
            });        
            
            var $document = $(document);
            
            $document.scroll(function(){
                
                $document.find('.ut-has-fixed-background').redraw();
                
            });
		
        }
        	
        /* United Themes Share
		================================================== */     
        
        /* Twitter
		================================================== */
        var utsharetwitter = function() {
            window.open( 'http://twitter.com/intent/tweet?text='+$(".page-title").text() +' '+window.location,
            "Twitter",
            "width=650,height=350" );
            return false;
        };
        
        /* Facebook
		================================================== */
        var utsharefacebook = function(){
            window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
            'facebook',
            'width=650,height=350');
            return false;
        };
        
        /* Google Plus
		================================================== */
        var utsharegoogle = function(){
            window.open( 'https://plus.google.com/share?url='+encodeURIComponent(location.href),
            'googleWindow',
            'width=500,height=500');
            return false;
        };
        
        /* Linkedin
		================================================== */
        var utsharelinkedin = function(){
            window.open( 'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(location.href)+'$title='+$(".page-title").text(),
            'linkedinWindow',
            'width=650,height=450, resizable=1');
            return false;
        };
        
        /* Pinterest
		================================================== */
        var utsharepinterest = function(){
            window.open( 'http://pinterest.com/pin/create/bookmarklet/?media='+ $('.entry-content img').first().attr('src') + '&description='+jQuery('.page-title').text()+' '+encodeURIComponent(location.href),
            'pinterestWindow',
            'width=750,height=430, resizable=1');
            return false;
        };
        
        /* Xing
		================================================== */
        var utsharexing = function(){
            window.open( 'https://www.xing-share.com/app/user?op=share;sc_p=xing-share;url='+encodeURIComponent(location.href),
            'deliciousWindow',
            'width=550,height=550, resizable=1');
            return false;
        };
        
         /* Button Script
		================================================== */
        $(document).on("click", ".ut-share-link", function(event){
                                    
            var social = $(this).data("social");
            
            switch (social) {
                case "utsharetwitter"   : utsharetwitter(); break;
                case "utsharefacebook"  : utsharefacebook(); break;
                case "utsharegoogle"    : utsharegoogle(); break;
                case "utsharelinkedin"  : utsharelinkedin(); break;
                case "utsharepinterest" : utsharepinterest(); break;
                case "utsharexing"      : utsharexing(); break;
            }
            
            event.preventDefault();
            
        });
        
		
	});
	
})(jQuery);
 /* ]]> */
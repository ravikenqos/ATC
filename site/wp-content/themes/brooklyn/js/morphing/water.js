/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	const DOM = {};
	DOM.intro = document.querySelector('.ut-loader-overlay');
	DOM.shape = DOM.intro.querySelector('svg.ut-shape');
	DOM.path = DOM.shape.querySelector('path');
	DOM.enter = document.querySelector('.ut-close-query-loader');
	DOM.enterLetters = Array.from(DOM.enter.querySelectorAll('span'));
	
	// Set the SVG transform origin.
	DOM.shape.style.transformOrigin = '50% 0%';

	const init = () => {
		
		jQuery(DOM.enter).bind('click',function(){
			navigate();
		});
		
	};

	let loaded;
	const navigate = () => {
		
		if ( loaded ) return;
		loaded = true;

		anime({
			targets: DOM.intro,
			duration: 1500,
			easing: 'easeInOutSine',
			translateY: '-200vh'
		});

		anime({
			targets: DOM.path,
			duration: 1500,
			easing: 'easeInOutSine',
			d: DOM.path.getAttribute('pathdata:id')
		});
		
	};

	init();
	
};
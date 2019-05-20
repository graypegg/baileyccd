// Import Babel polyfills //
import 'babel-polyfill';

//
// -------------------------------
// > Style Sheets to be bundled. <
// -------------------------------
// Bundle => bundles/bundle.css
// Loaders => postcss-loader -> sass-loader
//
//import './sass/main.scss';

//
// -------------------------------
// >  Components to be bundled.  <
// -------------------------------
// scss:
// 		Bundle => bundles/bundle.css
// 		Loaders => postcss-loader -> sass-loader
// js:
// 		Bundle => bundles/bundle.js
// 		Loaders => babel-loader
//
import Slider from './vue/Slider/Slider.vue'
import Slide from './vue/Slider/Slide.vue'
import HeaderWrapper from './vue/Header-Wrapper.vue'
import HCImage from './vue/HC-Image.vue'
import HCBackground from './vue/HC-Background.vue'
import ResponsiveIframe from './vue/ResponsiveIframe.vue'


//
// --------------------------
// > Modules to be bundled. <
// --------------------------
// Bundle => bundles/bundle.js
// Loaders => babel-loader
//
import Vue from 'vue'
import smoothScroll from 'smoothscroll'


//
// ----------------------
// > Root Vue component <
// ----------------------
// Should only contain:
// 	- components
// 	- global state
// 	- globally used methods
//
const COLOUR = Symbol('colour mode')
const HC = Symbol('high contrast mode')
const control = { COLOUR, HC }

var vm = new Vue({
	el: '#app',
	data: {
		isOpen: false,
		mode: HC,
		control
	},
	methods: {
		scrollToTop () {
			smoothScroll(0)
		},
		updateMode () {
			this.mode = (document.body.className.indexOf('contrast') !== -1 ? HC : COLOUR)
		}
	},
	mounted () {
		document.querySelector('.a11y-toggle-contrast').addEventListener('click', this.updateMode)
		if (document.cookie.indexOf('a11y-high-contrast=1') !== -1) {
			this.mode = HC
		} else {
			this.mode = COLOUR
		}
	},
	components: {
		Slider,
		Slide,
		HeaderWrapper,
		ResponsiveIframe,
		'hc-image': HCImage,
		'hc-background': HCBackground
	}
})

var accVm = new Vue({
	el: '.a11y-toolbar .skip-to-content',
	methods: {
		scrollToContent () {
			smoothScroll(document.querySelector('.content-start'))
		}
	}
})

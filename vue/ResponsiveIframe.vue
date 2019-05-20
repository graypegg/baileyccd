<template>
	<iframe
		class="responsive-iframe"
		:id="id"
		:src="src"
		@load="resetScroll"
		scrolling="no">
	</iframe>
</template>

<script>
	import Vue from 'vue'
	import iframeResizer from 'iframe-resizer/js/iframeResizer.min.js'

	export default {
		props: {
			src: {
				required: true,
				type: String
			}
		},
		data () {
			return {
				id: 'iframe-' + Math.floor((1 + Math.random()) * 0x10000).toString(36)
			}
		},
		methods: {
			resetScroll () {
				console.log('load')
				window.scrollTo(0,200);
			}
		},
		mounted () {
			Vue.nextTick(() => {
				iframeResizer({ log: false }, '#' + this.id)
			})
		}
	}
</script>

<style>
	iframe.responsive-iframe {
	    width: 100%;
	    border: none;
	}
</style>

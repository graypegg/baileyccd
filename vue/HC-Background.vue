<template>
	<div :style="style">
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			colour: {
				type: String,
				required: true
			},
			hc: {
				type: String,
				required: true
			}
		},
		methods: {
			createEffect (effect) {
				// Create Effect pass thru
				this.$parent.createEffect(effect)
			}
		},
		computed: {
			mode () {
				return this.$root.mode
			},
			style () {
				return 'background-image: url(' + (this.mode === this.$root.control.HC ? this.hc : this.colour) + ') !important;'
			}
		}
	}
</script>

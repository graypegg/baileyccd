<template>
	<img :src="src" :alt="alternative"/>
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
			},
			alternative: {
				type: String,
				required: true
			}
		},
		computed: {
			mode () {
				return this.$root.mode
			},
			src () {
				switch (this.mode) {
					case this.$root.control.HC:
						return this.hc
					case this.$root.control.COLOUR:
						return this.colour
					default:
						return this.colour
				}
			}
		}
	}
</script>
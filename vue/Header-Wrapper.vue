<template>
	<header :class="(isOpen ? 'active' : '')">
		<!-- Header inserted here -->
		<slot></slot>
		<!-- //////////////////// -->

		<!-- Only for mobile nav -->
		<div class="menu-btn" @click="toggleNav">
			<i :class="'fa fa-' + (isOpen ? 'times' : 'bars')" aria-hidden="true"></i>
		</div>
		<!-- /////////////////// -->

		<div class="backdrop" @click="toggleNav"></div>
	</header>
</template>

<script>
	import Vue from 'vue'

	export default {
		data () {
			return {
				subnavs: []
			}
		},
		computed: {
			isOpen () { return this.$root.isOpen }
		},
		methods: {
			toggleNav () {
				this.$root.isOpen = !this.$root.isOpen
			}
		},
		mounted () {
			Vue.nextTick(() => {
				const els = Array.prototype.slice.call(this.$el.querySelectorAll("ul.menu>li.menu-item-has-children"))
				this.subnavs = els.map((el) => {
					return {
						el,
						isOpen: false
					}
				})

				this.subnavs.forEach((subnav) => {
					subnav.el.addEventListener('click', (e) => {
						e.preventDefault()
						e.stopPropagation()
						this.subnavs = this.subnavs.map((x) => {
							if (x.el === subnav.el) {
								x.isOpen = !x.isOpen
							} else {
								x.isOpen = false
							}
							return x
						})
					})

					// I'm so sorry
					let links = Array.prototype.slice.call(subnav.el.querySelectorAll('ul.sub-menu>li a'))
					links.forEach((link) => {
						link.addEventListener('click', () => {
							window.location = link.href
						})
					})
				})

				this.$watch('subnavs', (subnavs) => {
					subnavs.forEach((subnav) => {
						if (subnav.isOpen) subnav.el.classList.add('active')
						else subnav.el.classList.remove('active')
					})
				})
			})
		}
	}
</script>
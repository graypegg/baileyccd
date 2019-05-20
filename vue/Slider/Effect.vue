<template>
  <div :class="'effect' + (state ? ' ' + state : '')" :style="(this.duration ? 'animation-duration:' + this.duration + 'ms;' : '')">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['mode', 'delay', 'duration'],
    data () {
      return {
        state: '',
        shown: false
      }
    },
    methods: {
      show (force) {
        if (this.delay && (!force)) {
          this.hold()
          setTimeout(() => { this.show(true) }, this.delay)
        } else {
          this.state = this.mode + '-in'
          this.shown = true
        }
      },
      hide () {
        this.state = this.mode + '-out'
        this.shown = false
      },
      hold () {
        this.state = this.mode + '-hold'
        this.shown = false
      }
    },
    created () {
      this.$parent.createEffect(this)
    }
  }
</script>

<style lang="scss">
  @import '../../sass/sass-only/_utils.scss';

  /**
   * Effects
   */

  .effect {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: transparent !important;

    /**
     * Vertical Fade-in
     * mode = 'fade-ver'
     */
    @media screen and (min-width: 800px) {
      &.fade-ver-hold {
        opacity: 0;
        transform: translateY(-50px);
      }

      &.fade-ver-in {
        @keyframes fadeverin {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        animation: fadeverin 3s $expo 0s 1 normal;
        animation-fill-mode: forwards;
      }

      &.fade-ver-out {
        @keyframes fadeverout {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(50px);
          }
        }

        animation: fadeverout 600ms $expo 0s 1 normal;
        animation-fill-mode: forwards;
      }
    }

    /**
     * Horizontal Fade-in
     * mode = 'fade-hor'
     */

    &.fade-hor-hold {
      opacity: 0;
      transform: translateX(450px) scale(1.5);
    }

    &.fade-hor-in {
      @keyframes fadehorin {
        from {
          opacity: 0;
          transform: translateX(450px) scale(1.5);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      animation: fadehorin 2s $expo 0s 1 normal;
      animation-fill-mode: forwards;
    }

    &.fade-hor-out {
      @keyframes fadehorout {
        from {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateX(450px) scale(1.5);
        }
      }

      animation: fadehorout 1550ms linear 0s 1 normal;
      animation-fill-mode: forwards;
    }

    /**
     * Text spread
     * mode = 'spread'
     */

    &.spread-hold {
      transform: perspective(500px) rotateX(90deg) scale(1.25);
    }

    &.spread-in {
      @keyframes spreadin {
        from {
          transform: perspective(500px) rotateX(90deg) scale(1.25);
        }
        to {
          transform: perspective(0px) rotateX(0deg) scale(1);
        }
      }

      animation: spreadin 2s $expo 0s 1 normal;
      animation-fill-mode: forwards;
    }

    &.spread-out {
      @keyframes spreadout {
        from {
          transform: perspective(0px) rotateX(0deg) scale(1);
        }
        to {
          transform: perspective(500px) rotateX(90deg) scale(1.25);
        }
      }

      animation: spreadout 1550ms linear 0s 1 normal;
      animation-fill-mode: forwards;
    }
  }
</style>

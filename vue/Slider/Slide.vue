<template>
  <div :class="'slide' + (animation ? ' ' + animation : '') + (this.$parent.fade ? ' fade-mode' : '')">
    <hc-background class="background" :colour="background" :hc="hcBackground"></hc-background>
    <div class="slide-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import HCBackground from '../HC-Background.vue'
  import Vue from 'vue'

  export default {
    props: ['background'],
    data () {
      return {
        animation: null,
        effects: [],
        shown: false,
        height: 0
      }
    },
    computed: {
      hcBackground () {
        return this.background.replace(/(\.[\w\d_-]+)$/i, '-high-contrast$1');
      }
    },
    methods: {
      show (dir) {
        if (dir === 'left') {
          this.animation = 'from-right'
        } else if (dir === 'right') {
          this.animation = 'from-left'
        } else {
          this.animation = 'force-show'
        }
        this.shown = true
        this.effects.forEach((e) => e.show())
      },
      hide (dir) {
        if (dir === 'left') {
          this.animation = 'to-right'
        } else if (dir === 'right') {
          this.animation = 'to-left'
        } else {
          this.animation = 'force-hide'
        }
        this.shown = false
        this.effects.forEach((e) => e.hide())
      },
      createEffect (effect) {
        this.effects.push(effect)
      },
      updateHeight () {
        this.height = this.$el.clientHeight
      }
    },
    mounted () {
      Vue.nextTick(() => {
        this.updateHeight()
        window.addEventListener('resize', this.updateHeight)
      })
    },
    created () {
      this.$parent.createSlide(this)
    },
    components: {
      'hc-background': HCBackground
    }
  }
</script>

<style lang="scss">
  @import '../../sass/sass-only/_utils.scss';

  /**
   * Keyframes
   */

  @keyframes slideFromRight {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes slideFromLeft {
    from {
      transform: translateX(-200%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes slideToRight {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @keyframes slideToLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(-200%);
    }
  }

  /**
   * Styles
   */

  .slide {
    position: absolute;
    top: 0;
    left: 100vw;
    height: 100%;
    width: 100vw;
    background-size: cover;
    background-position: center top;
    z-index: 1;

    @media screen and (max-width: 800px) {
      height: initial !important;
    }

    &.from-right {
      animation: slideFromRight 1550ms $expo 0s 1 normal;
      animation-fill-mode: forwards;
    }

    &.from-left {
      animation: slideFromLeft 1550ms $expo 0s 1 normal;
      animation-fill-mode: forwards;
    }

    &.to-right {
      animation: slideToRight 1550ms $expo 0s 1 normal;
      animation-fill-mode: forwards;
    }

    &.to-left {
      animation: slideToLeft 1550ms $expo 0s 1 normal;
      animation-fill-mode: forwards;
    }

    &.force-show { transform: translateX(-100%); }
    &.force-hide { transform: translateX(0);     }

    .background {
      min-height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-size: cover;
      background-position: center center;

      @media screen and (max-width: 800px) {
        min-height: 305px;
        position: static;
      }
    }

    .slide-content {
      position: absolute;
      left: 50%;
      max-width: 1040px;
      width: 100vw;
      height: 100%;
      transform: translateX(-50%);
      background: transparent !important;

      @media screen and (max-width: 800px) {
        position: static !important;
        height: initial !important;
        transform: translateX(0);

        .effect {
          position: static !important;
          height: initial !important;
          width: initial !important;
        }
      }

      .text {
        position: relative;
        background: hsla(0,0%,100%,.8);
        padding: 55px 30px 25px;
        width: 100%;
        height: 100%;
        max-width: 320px;

        @media screen and (max-width: 800px) {
          position: static;
          transform: none;
          height: auto;
          max-width: initial;
          padding: 40px 30px;
          background: none;

          h2 {
            margin-top: 0;
          }
        }

        @media screen and (max-width: 500px) {
          h2 {
            font-size: 1.4rem !important;
          }
        }

        h2,
        p {
          color: #414042;
          text-align: center;
        }

        h2 {
          font-size: 1.9rem;
        }

        p {
          padding-top: 15px;
          font-size: 1.1rem;
          line-height: 24px;

          &::before {
            content: "";
            display: block;
            background: #09539c;
            height: 2px;
            width: 45px;
            position: absolute;
            left: 50%;
            transform: translate(-15px, -15px);
          }
        }
      }
    }
  }
</style>

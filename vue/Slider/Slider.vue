<template>
  <div class="slider-container" style="height: 450px;">
    <div class="slider">
      <div v-if="!url" class="slides">
        <slot></slot>
      </div>
      <div v-else class="slides">
        <slide v-for="(slide, key) in slideStream" :background="slide.post_thumbnail" :key="key">
          <div class="text">
            <h2>{{ slide.post_title }}</h2>
            <div v-html="marked(slide.post_excerpt || '')"></div>
            <p>
              {{ slide.post_slider }}
            </p>
          </div>
        </slide>
      </div>
      <div v-if="buttonsEnabled" class="btns">
        <div role="button" class="btn btn-left" @click="prev">Last</div>
        <div role="button" class="btn btn-pause" @click="togglePause">
          {{ toggleBtnText }}
          <i :class="'fa fa-' + toggleBtnText.toLowerCase()"></i>
        </div>
        <div role="button" class="btn btn-right" @click="next">Next</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Slide from './Slide.vue'
  import marked from 'marked'

  export default {
    props: {
      buttons: { type: Boolean, default: true },
      speed: { type: Number },
      url: { type: String, default: '' }
    },
    data () {
      return {
        i: 0,
        slides: [],
        slideStream: [],
        height: 450,
        timerID: null,
        isPaused: false,
        marked
      }
    },
    computed: {
      current () {
        return this.slides[this.i]
      },
      buttonsEnabled () {
        return (this.buttons === undefined ? true : this.buttons)
      },
      toggleBtnText () {
        return (this.isPaused ? 'Play' : 'Pause')
      }
    },
    methods: {
      next () {
        this.current.hide('right')
        this.i = (this.i + 1) % this.slides.length
        this.height = this.current.height
        this.current.show('left')
        this.resetTimer()
      },
      prev () {
        this.current.hide('left')
        this.i = this.mod(this.i - 1, this.slides.length)
        this.height = this.current.height
        this.current.show('right')
        this.resetTimer()
      },
      show (index) {
        if (index < this.i) {
          this.current.hide('left')
          this.i = index
          this.height = this.current.height
          this.current.show('right')
          this.resetTimer()
        } else {
          this.current.hide('right')
          this.i = index
          this.height = this.current.height
          this.current.show('left')
          this.resetTimer()
        }
      },
      togglePause () {
        this.isPaused = !this.isPaused;
        this.resetTimer();
      },
      setTimer () {
        if (this.speed !== undefined) {
          this.timerID = setInterval(() => this.next(), this.speed)
        }
      },
      resetTimer () {
        if (this.speed !== undefined) {
          if (this.timerID !== null) {
            clearInterval(this.timerID)
          }
          if (!this.isPaused) {
            this.timerID = setInterval(() => this.next(), this.speed)
          }
        }
      },
      createSlide (slide) {
        this.slides.push(slide)
      },
      mod (m, n) {
        return ((m%n)+n)%n;
      }
    },
    mounted () {
      if (!this.url) {
        this.height = this.current.height
        this.current.show()
        if (this.speed) this.setTimer()
      } else {
        fetch(this.url)
          .then((res) => res.json())
          .then((obj) => this.slideStream = obj)
          .then(() => {
            Vue.nextTick(() => {
              window.addEventListener('resize', () => { this.height = this.current.height })
              this.current.show()
              setTimeout(() => { this.height = this.current.height }, 80)
              if (this.speed) this.setTimer()
            })
          })
      }
    },
    components: { Slide }
  }
</script>

<style lang="scss">
  @import '../../sass/sass-only/_app.scss';
  @import '../../sass/sass-only/_utils.scss';

  /**
   * Button and container styles
   */

  .slider-container {
    position: relative;
    height: 450px !important;
    max-height: 700px;
    margin-bottom: 75px;

    @media screen and (max-width: 800px) {
      margin-bottom: -80px;
      transition: 1s height $expo;
    }

    .slider {
      height: 100%;
      width: 100%;
      position: relative;
      background: transparent !important;

      .slides {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: transparent !important;
      }

      .btns {
        display: flex;
        justify-content: space-around;
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 240px;
        z-index: 999;
        transform: translate(-50%, 50%);

        @media screen and (max-width: 800px) {
          top: 252px;
          bottom: initial;
        }

        .btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 10px 15px;
          color: #FFF;
          border: 4px solid #FFF;
          border-radius: 15px;
          cursor: pointer;
          background: $primary;
          transform: scale(1);
          transition: all 0.2s $expo;

          &:hover {
            background: lighten($primary, 7);
            transform: scale(1.05);
          }

          &:active {
            background: lighten($primary, 14);
          }

          i {
            margin-left: 8px;
          }

          &.btn-left,
          &.btn-right {
            font-size: 0.8rem;
            flex: 1 1 80px;
          }

          &.btn-pause {
            font-size: 1.1rem;
            flex: 1 1 190px;
          }
        }
      }
    }
  }
</style>

/**
 * Note that the class has to be bound so we use dynamic data with it.
 */
<template>
  <div
    :class="{
      hidden: hidden
    }"
    :style="{
      'width': `${percent}%`
    }"
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      hidden: true,
      percent: 0
    }
  },
  methods: {
    start () {
      this.hidden = false
      this.percent = 0
      this.timer = setInterval(() => { // Create an interval and save as property of vm
        this.percent++
      }, 100)
    },
    finish () {
      this.hidden = true
      this.percent = 100
      clearInterval(this.timer)
    }
  }
}
</script>

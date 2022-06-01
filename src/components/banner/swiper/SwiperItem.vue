<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide'
}
</script>

<style scoped>
  .slide {
    margin: 0px 16px;
    height: 135px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
</style>

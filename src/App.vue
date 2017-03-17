<template>
  <div id="app">
    <Weather></Weather>
  </div>
</template>

<script>
import Weather from './components/Weather'

export default {
  name: 'app',
  components: {
    Weather
  }
}
</script>

<style>
  body {
    font-family: 'leto', sans-serif;
    color: #192937;
    background-color: #E0F1FF;
  }
</style>

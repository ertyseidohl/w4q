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
    margin: 0;
    background-color: rgba(126,155,181,0.2);
  }
</style>

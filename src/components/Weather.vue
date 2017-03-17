<template>
  <div class="weather">
  <p v-if="error">{{error}}</p>
   {{ weather }}
  </div>
</template>

<script>
export default {
  name: 'weather',
  data () {
    return {
      error: '',
      weather: []
    }
  },
  created () {
    this.$http.get('http://api.aerisapi.com/forecasts/11101?client_id=BzLiAN309pgsOETvp5n2M&client_secret=P16ulhmNHXU8z82AuVPvLGRsgvYOOIjTCXYWtYcF').then(
      res => {
        this.weather = res.body
        if (res.body.error) {
          this.error = res.body.error
        }
      },
      err => {
        console.log(err)
        this.error = 'There was an error accessing the weather API. Please double check your connection and try again.'
      }
    )
  }
}
</script>

<style scoped>

</style>

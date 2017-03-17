<template>
  <div class="weather">
    <p v-if="error">{{error}}</p>
    <h1>Weather for 11101 <button class="switch" v-on:click="switchUnits">°{{useUnits}} / <span class="other">{{otherUnit()}}</span></button></h1>
    
    <div v-if="weather">
      <div class="day" v-for="day of weather.periods">
        <h3>{{day.timestamp | date}}</h3>
        <div class="temp_container">
          <div class="icon">
            <img
              v-bind:srcset="'/static/Aeris_WxIcons_55x55/' + day.icon + ', /static/Aeris_WxIcons_110x110/' + day.icon + ' 2x'"
              v-bind:src="'/static/Aeris_WxIcons_55x55/' + day.icon"
              v-bind:alt="day.weather"
            ><br>
            {{day.weather}}
          </div>
          <div
            class="temp temp_max"
            v-bind:style="{
              width: getWidthForTemp('maxTemp', day),
              'border-right-color': '#192937'
            }"
          >
          </div>
          <div
            class="temp_text"
            v-bind:style="{
              'left': getWidthForTemp('maxTemp', day)
            }"
          >
            MAX<br>{{getValueWithUnit('maxTemp', day)}}{{getDecoratorForUnit('temp')}}
          </div>

          <div
            class="temp temp_avg"
            v-bind:style="{
              width: getWidthForTemp('avgTemp', day),
              'border-right-color': '#192937'
            }"
          >
          </div>
          <div
            class="temp_text"
            v-bind:style="{
              'left': getWidthForTemp('avgTemp', day)
            }"
          >
            AVG<br>{{getValueWithUnit('avgTemp', day)}}{{getDecoratorForUnit('temp')}}
          </div>

           <div
            class="temp temp_min"
            v-bind:style="{
              width: getWidthForTemp('minTemp', day),
              'border-right-color': '#192937'
            }"
          >
          </div>
          <div
            class="temp_text"
            v-bind:style="{
              'left': getWidthForTemp('minTemp', day)
            }"
          >
            MIN<br>{{getValueWithUnit('minTemp', day)}}{{getDecoratorForUnit('temp')}}
          </div>

          <div
            class="temp temp_min_cover"
            v-bind:style="{
              width: getWidthForTemp('minTemp', day)
            }"
          ></div>
          
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
const UNITS = {
  C: {
    temp: 'C',
    lengthsmall: 'MM',
    lengthlarge: 'CM',
    speed: 'KPH',
    pressure: 'MB'
  },
  F: {
    temp: 'F',
    lengthsmall: 'IN',
    lengthlarge: 'IN',
    speed: 'MPH',
    pressure: 'IN'
  }
}
const MAX_WIDTH = 75
const MIN_WIDTH = 20
export default {
  name: 'weather',
  data () {
    return {
      error: '',
      weather: null,
      useUnits: 'F',
      extremes: {
        maxTemp: {
          C: 0,
          F: 0
        },
        minTemp: {
          C: 0,
          F: 0
        }
      },
      UNITS
    }
  },
  methods: {
    switchUnits () {
      this.useUnits = this.useUnits === 'C' ? 'F' : 'C'
    },
    otherUnit () {
      return this.useUnits === 'C' ? 'F' : 'C'
    },
    getValueWithUnit (key, day) {
      let currUnit = 'temp'
      switch (key) {
        case 'precip':
          currUnit = 'lengthsmall'
          break
      }
      return day[key + UNITS[this.useUnits][currUnit]]
    },
    getWidthForTemp (key, day) {
      let temp = day[key + 'C']
      let maxTemp = this.extremes['maxTempC']
      let minTemp = this.extremes['minTempC']
      if (minTemp < 0) {
        maxTemp += -minTemp
        temp += -minTemp
      }
      const width = ((temp / maxTemp) * MAX_WIDTH) + MIN_WIDTH
      return `${width}%`
    },
    cacheExtremes () {
      const findMax = (key) => (o, n) => Math.max(o, n[key])
      const findMin = (key) => (o, n) => Math.min(o, n[key])
      this.extremes = {
        maxTempC: this.weather.periods.reduce(findMax('maxTempC'), -Infinity),
        maxTempF: this.weather.periods.reduce(findMax('maxTempF'), -Infinity),
        minTempC: this.weather.periods.reduce(findMin('minTempC'), Infinity),
        minTempF: this.weather.periods.reduce(findMin('minTempF'), Infinity)
      }
    },
    getDecoratorForUnit (key) {
      switch (key) {
        case 'temp':
          return '°'
      }
    }
  },
  created () {
    this.$http.get('http://api.aerisapi.com/forecasts/11101?client_id=BzLiAN309pgsOETvp5n2M&client_secret=P16ulhmNHXU8z82AuVPvLGRsgvYOOIjTCXYWtYcF').then(
      res => {
        if (res.body.error) {
          this.error = res.body.error
        } else {
          this.weather = res.body.response[0]
          this.maxTemp = this.cacheExtremes()
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
  h1 {
    margin: 1rem;
  }
  .day {
      box-shadow: 0 4px 4px -3px #5589B7;
      padding: 0.1rem 1rem 1.5rem;
      background-color: #E0F1FF;
  }
  .icon {
    position: absolute;
    height: 8rem;
    font-size: 0.85rem;
    top: 0.25rem;
    z-index: 2;
  }

  .switch {
    background-color: #5589B7;
    border: 1px solid #5589B7;
    border-radius: 5px;
    outline: none;
    font-size: 1.5rem;
  }

  .other {
    color: #3D6384;
    font-size: 1rem;
  }

  .temp_container {
    position: relative;
  }

  .day {
    height: 8rem;
    margin: 1rem 0;
    position: relative;
  }

  .temp {
    position: absolute;
    height: 1.5rem;
    top: 2rem;
    left: 0;
    border-right: 2px solid;
    background-color: rgba(85, 137, 183, 0.33);
  }

  .temp_text {
    position: absolute;
    font-size: 0.8rem;
    text-align: center;
    margin-left: -0.7rem;
  }

  .temp_min_cover {
    position: absolute;
    background-color: #E0F1FF;
    top: calc(2rem - 2px);
    height: calc(1.5rem + 4px);
    border: none;
  }

</style>

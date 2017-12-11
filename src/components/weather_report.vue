<template>
  <div class="weather_report">
    <h1>Weather report for {{ city.name }}</h1>
    <select v-model="city" @change="changeCity(city.name)"><option v-for="city in cities" v-bind:value="city" @>{{ city.name }}</option></select>
    <router-link to="/cities">Home</router-link>
    <br><br>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Mininum Tempature</th>
          <th>Maximun Tempature</th>
          <th>Humidity</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr  v-for="(weather, index) in this.$store.state.weathers.list" v-if="index % 8 === 0">
          <td>{{weather.dt_txt.split(" ")[0]}}</td>
          <td>{{weather.main.temp_min}}</td>
          <td>{{weather.main.temp_max}}</td>
          <td>{{weather.main.humidity}}</td>
          <td v-for="final in weather.weather">{{final.description}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default{
    name: 'weather_report',
    data() {
      return {
        city: {
          name: this.$route.params.city
        }
      }
    },
    computed: {
      cities() {
        return this.$store.state.cities;
      }
    },
    methods: {
      changeCity: function(city){
        this.$store.commit('getAPI', city)   
      }
    },
    created() { 
      this.$store.commit('getAPI', this.$route.params.city) 
    },
  }
</script>

<style scoped>
  table{
    width: 100%;
  }
</style>
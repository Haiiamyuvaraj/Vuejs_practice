<template>
  <div class="home">
    <h1>Weather Report</h1>
    <form v-on:submit="addCity">
      <input type="text" v-model="cities.name" placeholder="Enter the city Name">
      <input type="submit" value="submit">
    </form>
    <p v-if="errorMessage">Not a valid City</p>
    <p v-if="alreadyExists">City already exist</p>
    <br>

    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Delete the City</th>
          <th>View Wheather Report</th>
        </tr>
      </thead>

      <tbody v-if="cities.length > 0">
        <tr v-for="city in cities">
          <td >{{city.name}}</td>
          <td><button v-on:click="deleteCity(city)">x</button></td>
          <td><router-link :to="'/cities/' + city.name" >View</router-link> </td>
        </tr>         
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="3">No cities available...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default{
    name: 'home',
    data() {
      return {
        errorMessage: false,
        alreadyExists: false
      }
    },
    computed: {
      cities() {
        return this.$store.state.cities;
      }
    },
    methods: {
      addCity: function(e){
        this.alreadyExists = false;
        for(var i=0; i < this.$store.state.cities.length; i++){
          if( this.$store.state.cities[i].name.toLowerCase() == this.$store.state.cities.name.toLowerCase()){
            this.alreadyExists = true;
            break;
          }
        }
        if (!this.alreadyExists){
          this.$http.get('http://api.openweathermap.org/data/2.5/forecast?q='+this.$store.state.cities.name+'&appid=c2ede116d31fab7ebcd0ec777d0f2310') 
          .then(function(){
              this.$store.state.cities.push({
                     name: this.$store.state.cities.name
                  });
              this.cities.name = "";
              this.errorMessage=false;
          }).catch((err)=>{
              this.errorMessage=true;
          }) 
          e.preventDefault();   
        } 
      },
      deleteCity: function(user){
        this.$store.state.cities.splice(this.cities.indexOf(user), 1);
        if (this.$store.state.cities.length == 0){
            
        }
      }, 
    }, 
  }
</script>

<style scoped>
  table{
    width: 100%;
  }
  th{
    width: 33%
  }
</style>
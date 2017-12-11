import Vue from 'vue';
import Vuex from 'vuex';
import vueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(vueResource);

export const store = new Vuex.Store({
  state: {
    cities: [],
    weathers: []
  },
  mutations: {
    getAPI: function(state,city){
      Vue.http.get('http://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=c2ede116d31fab7ebcd0ec777d0f2310')
        .then(function(response){
          state.weathers = response.data;
        });
    }
  }
});
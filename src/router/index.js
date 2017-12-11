import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import weather_report from '@/components/weather_report'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/cities'
    },
    {
      path: '/cities',
      name: 'home',
      component: home 
    },
    {
      path: '/cities/:city',
      name: 'weather_report',
      component: weather_report
    }
  ]
})

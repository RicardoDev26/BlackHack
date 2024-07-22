import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import blackHack from './Views/BlackJack.vue';
import Homeview from './Views/Home.vue'
import blackHackCel from './Views/BlackJackCel.vue'

import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/BlackHack', component: blackHack, name: 'blackHack' },
  { path: '/', component: Homeview, name: 'Homeview'},
  {path: '/BlackJack', component: blackHackCel, name: 'blackhackcel'},
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app',)

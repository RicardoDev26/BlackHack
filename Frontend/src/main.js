import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import blackHack from './Views/BlackJack.vue';
import Homeview from './Views/Home.vue'

import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/BlackHack', component: blackHack, name: 'blackHack' },
  { path: '/', component: Homeview, name: 'Homeview'}
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app',)

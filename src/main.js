import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import advice from './advice.vue'
import notFound from './notFound.vue'

createApp(App).use(createRouter({
    history: createWebHistory(),
    routes: [{path: '/', component: advice},{path: '/:pathMatch(.*)*', component: notFound}]
})).mount('#app')

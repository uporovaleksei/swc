import { createRouter, createWebHistory } from 'vue-router'
import VechicleView from '../views/VechicleView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'vechicle',
    component: VechicleView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

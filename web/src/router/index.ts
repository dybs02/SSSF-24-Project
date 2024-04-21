import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import ReviewView from '@/views/ReviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user/:username',
      name: 'user',
      component: UserProfileView
    },
    {
      path: '/review/:id',
      name: 'review',
      component: ReviewView
    }
  ]
})

export default router

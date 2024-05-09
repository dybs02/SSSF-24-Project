import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import ReviewView from '@/views/ReviewView.vue'
import CallbackView from '@/views/auth/CallbackView.vue'
import AlbumView from '@/views/AlbumView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserProfileView
    },
    {
      path: '/review/:id',
      name: 'review',
      component: ReviewView
    },
    {
      path: '/album/:id',
      name: 'album',
      component: AlbumView
    },
    {
      path: '/auth-callback',
      name: 'auth-callback',
      component: CallbackView
    }
  ]
})

export default router

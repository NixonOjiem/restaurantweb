import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import ForgotView from '@/views/ForgotView.vue'
import MenuView from '@/views/MenuView.vue'
import TestView from '@/views/TestView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/forgot-password',
      name: 'forgot',
      component: ForgotView,
    },
    {
      path: '/menu',
      name: 'Menu',
      component: MenuView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.user && localStorage.getItem('token')) {
    await authStore.initializeStore()
  }
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // User is NOT logged in, redirect to Login
    // We add a query param so we can redirect them back after they login
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    // User is logged in OR route is public
    next()
  }
})

export default router

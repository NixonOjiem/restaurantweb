import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import ForgotView from '@/views/ForgotView.vue'
import MenuView from '@/views/MenuView.vue'
import TestView from '@/views/TestView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import MyOrdersReservations from '@/views/MyOrdersReservations.vue'
import AboutView from '@/views/AboutView.vue'

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
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit',
      name: 'EditProfile',
      component: EditProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-orders-reservations',
      name: 'OrdersReservations',
      component: MyOrdersReservations,
      meta: { requiresAuth: true },
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/about',
      name:'aboutpage',
      component:AboutView,
    },
   
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 1. Initialize Store (Restore User) if page is refreshed
  // Corrected 'token' to 'authToken' to match your pinia store logic
  if (!authStore.user && localStorage.getItem('authToken')) {
    await authStore.initializeStore()
  }

  // 2. Check Generic Authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // 3. Check Admin Privileges (The new part)
  if (to.meta.requiresAdmin) {
    // Check if the role property exists and is strictly 'admin'
    // You might need to adjust 'admin' string if your DB uses 'ADMIN' or 'administrator'
    if (authStore.user?.role !== 'admin') {
      // User is logged in, but not an admin. Redirect to Home or a 403 page.
      return next({ name: 'home' })
    }
  }

  // 4. Allow Access
  next()
})

export default router

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt?: string
}

interface Logindetails {
  email: string
  password: string
}

interface SignupDetails {
  fullName: string
  userName: string
  email: string
  password: string
}

interface JwtPayload {
  id: string
  fullName: string
  role: string
  name: string
  exp: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const token = ref(localStorage.getItem('authToken') || null)
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // --- Actions ---

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('authToken', newToken)
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('authToken')
  }

  const initializeStore = () => {
    if (!token.value) return

    try {
      const decoded: JwtPayload = jwtDecode(token.value)
      const currentTime = Date.now() / 1000

      if (decoded.exp < currentTime) {
        console.warn('Token expired')
        logout()
        return
      }

      // Populate basic user data from token first
      user.value = {
        id: decoded.id,
        name: decoded.name || decoded.fullName,
        email: '', // Placeholder until fetchProfile runs
        role: decoded.role,
      }
    } catch (error) {
      console.error('Invalid token format', error)
      logout()
    }
  }

  // --- FETCH PROFILE ACTION ---
  const fetchProfile = async () => {
    if (!token.value) return

    isLoading.value = true
    try {
      const response = await fetch(`${API_BASE_URL}/profile/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
      })

      const data = await response.json()
      if (response.ok && data.success) {
        user.value = {
          id: data.data.id,
          name: data.data.userName,
          email: data.data.email,
          role: data.data.role,
          createdAt: data.data.createdAt
        }
      }
    } catch (err) {
      console.error('Failed to fetch profile', err)
    } finally {
      isLoading.value = false
    }
  }

  const login = async (loginDetails: Logindetails) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setToken(data.token)
        await fetchProfile() // Fetch full details immediately after login
        return true
      } else {
        throw new Error(data.message || 'Login failed.')
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const signup = async (signupDetails: SignupDetails) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupDetails),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setToken(data.token)
        await fetchProfile()
        return true
      } else {
        throw new Error(data.message || 'Signup failed.')
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const googleLogin = async (idToken: string) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/auth/googleauth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setToken(data.token)
        await fetchProfile()
        return true
      } else {
        throw new Error(data.message || 'Google login failed.')
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // --- Getters ---
  const isAuthenticated = computed(() => !!token.value)

  return {
    token,
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    initializeStore,
    signup,
    googleLogin,
    logout,
    fetchProfile,
  }
})
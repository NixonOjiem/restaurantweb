import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'
interface User {
  id: string
  name: string
  email: string
  role: string
}

interface logindetails {
  email: string
  password: string
}

interface signupDetails {
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

  const initializeStore = () => {
    // 1. Check if token exists
    if (!token.value) return

    try {
      // 2. Decode the token to get the data
      const decoded: JwtPayload = jwtDecode(token.value)

      // 3. Check if token is expired (exp is in seconds, Date.now is ms)
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        console.warn('Token expired')
        logout()
        return
      }

      // 4. Populate user state directly from token data
      user.value = {
        id: decoded.id,
        name: decoded.name, // or decoded.fullName based on your UI preference
        email: '', // Note: Your token JSON didn't show email. If needed, add it to backend JWT payload.
        role: decoded.role,
      }
    } catch (error) {
      console.error('Invalid token format', error)
      logout()
    }
  }

  const login = async (loginDetails: logindetails) => {
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
        user.value = data.user as User
        return true
      } else {
        throw new Error(data.message || 'Login failed.')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        // Fallback for non-Error objects (e.g. strings or other types thrown)
        error.value = 'An unexpected error occurred during login.'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const signup = async (signupDetails: signupDetails) => {
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
        user.value = data.user as User
        return true
      } else {
        throw new Error(data.message || 'Signup failed.')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        // Fallback for non-Error objects (e.g. strings or other types thrown)
        error.value = 'An unexpected error occurred during login.'
      }
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
        user.value = data.user as User
        return true
      } else {
        throw new Error(data.message || 'Google login failed.')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        // Fallback for non-Error objects (e.g. strings or other types thrown)
        error.value = 'An unexpected error occurred during login.'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('authToken')
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
    googleLogin, // Export the new action
    logout,
  }
})

import { create } from 'zustand'
import { validateCredentials } from '../data/dummyUsers'

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  verificationEmail: null,
  registrationData: null,

  // Actions
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    
    try {
      // TODO: Replace with actual API call
      const user = validateCredentials(email, password)
      
      if (!user) {
        throw new Error('Invalid credentials')
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      })
      
      return true
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: error.message 
      })
      return false
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null })
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Store registration data temporarily
      set({ 
        registrationData: userData,
        verificationEmail: userData.email,
        isLoading: false 
      })
      
      return true
    } catch (error) {
      set({ 
        isLoading: false,
        error: error.message 
      })
      return false
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null })
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // For demo, accept any 6-digit code
      if (!/^\d{6}$/.test(code)) {
        throw new Error('Invalid verification code')
      }
      
      const { registrationData } = get()
      
      // Create user account
      set({ 
        user: {
          ...registrationData,
          id: `u${Date.now()}`, // Generate temporary ID
          isVerified: true
        },
        isAuthenticated: true,
        isLoading: false,
        registrationData: null,
        verificationEmail: null
      })
      
      return true
    } catch (error) {
      set({ 
        isLoading: false,
        error: error.message 
      })
      return false
    }
  },

  resendVerification: async () => {
    set({ isLoading: true, error: null })
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      set({ isLoading: false })
      return true
    } catch (error) {
      set({ 
        isLoading: false,
        error: error.message 
      })
      return false
    }
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false,
      error: null,
      registrationData: null,
      verificationEmail: null
    })
  },

  clearError: () => {
    set({ error: null })
  }
}))

export default useAuthStore

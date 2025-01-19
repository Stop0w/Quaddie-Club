import { create } from 'zustand'
import { cacheManager } from '../utils/cacheManager'

const useCompetitionStore = create((set, get) => ({
  // State
  competitions: [],
  activeCompetition: null,
  updates: [],
  isLoading: false,
  error: null,
  lastUpdate: null,

  // Actions
  setActiveCompetition: (competitionId) => {
    const competition = get().competitions.find(c => c.id === competitionId)
    set({ activeCompetition: competition })
  },

  updateCompetitionState: async (competitionId, update) => {
    set(state => ({
      competitions: state.competitions.map(comp => 
        comp.id === competitionId 
          ? { ...comp, ...update, lastUpdated: new Date().toISOString() }
          : comp
      ),
      updates: [
        { 
          id: Date.now(),
          competitionId,
          type: 'UPDATE',
          data: update,
          timestamp: new Date().toISOString()
        },
        ...state.updates.slice(0, 49) // Keep last 50 updates
      ]
    }))

    // Cache updated state
    await cacheManager.set(`competition-${competitionId}`, update)
  },

  subscribeToUpdates: (competitionId) => {
    // WebSocket connection would go here in production
    const interval = setInterval(() => {
      // Simulate real-time updates
      const randomUpdate = {
        odds: Math.random() * 10 + 1,
        participants: Math.floor(Math.random() * 100),
        status: Math.random() > 0.8 ? 'closed' : 'open'
      }
      get().updateCompetitionState(competitionId, randomUpdate)
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  },

  fetchCompetitionUpdates: async (competitionId) => {
    set({ isLoading: true, error: null })
    
    try {
      // In production, this would be an API call
      const cached = cacheManager.get(`competition-${competitionId}`)
      if (cached) {
        set(state => ({
          competitions: state.competitions.map(comp =>
            comp.id === competitionId
              ? { ...comp, ...cached }
              : comp
          )
        }))
      }
      
      set({ lastUpdate: new Date().toISOString() })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useCompetitionStore

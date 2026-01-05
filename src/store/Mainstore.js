import { create } from 'zustand'

const useMainStore = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}))

export default useMainStore;
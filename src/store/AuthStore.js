import { create } from 'zustand'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAuthStore = create((set) => ({
    userToken: null,
    setUserToken: (token) => set({ userToken: token }),
    activeUser: null,
    setActiveUser: (user) => set({ activeUser: user }),
    login: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json(); 
        set({ userToken: result.token, activeUser: result.user});
    },
    loginGuest: async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/guest`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });
        const result = await response.json(); 
        set({ userToken: result.token, activeUser: result.user});
    },
    
    logout: () => set({ userToken: null, activeUser: null })
}));

export default useAuthStore;
import { create } from 'zustand'

const useAuthStore = create((set) => ({
    userToken: null,
    setUserToken: (token) => set({ userToken: token }),
    ActiveUser: null,
    setActiveUser: (user) => set({ ActiveUser: user }),
    login: async (userData) => {
        const response = await fetch('https://localhost:7203/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const token = await response.json(); 
        set({ isAuthenticated: true, ActiveUser: userData, userToken: token });
    },
    logout: () => set({ userToken: null, ActiveUser: null })
}));

export default useAuthStore;
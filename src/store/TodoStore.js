import { create } from 'zustand'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useTodoStore = create((set) => ({
    todoItems: [],
    categories: [],
    activeCategory: { name: "All", id: null },
    activeTodoItem: null,
    setTodoItems: (items) => set({ todoItems: items }),
    setCategories: (categories) => set({ categories: categories }),
    setActiveCategory: (category) => set({ activeCategory: category }),
    setActiveTodoItem: (item) => set({ activeTodoItem: item }), 

    fetchTodoItems: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/api/todo/${userId}`, { method: 'GET' });
        const data = await response.json(); 
        set({ todoItems: data });
    },
    createTodoItem: async (item) => {
        const response = await fetch(`${API_BASE_URL}/api/todo`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
        const createdItem = await response.json();
        set((state) => ({ todoItems: [...state.todoItems, createdItem] }));
    },
    updateTodoItem: async (item) => {
        const response = await fetch(`${API_BASE_URL}/api/todo/${item.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });

        const updatedItem = await response.json();

        set((state) => ({
            todoItems: state.todoItems.map(t =>
                t.id === updatedItem.id ? updatedItem : t
            ),
        }));
    },

    deleteTodoItem: async (id) => {
        await fetch(`${API_BASE_URL}/api/todo/${id}`, { method: 'DELETE' });
        set((state) => ({
            todoItems: state.todoItems.filter(t => t.id !== id),
        }));
    },

    fetchCategories: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/api/category/${userId}`, { method: 'GET' });
        const data = await response.json(); 
        set({ categories: data });
    },

    deleteCategory: async (id) => {
        await fetch(`${API_BASE_URL}/api/category/${id}`, { method: 'DELETE' });
        set((state) => ({
            categories: state.categories.filter(c => c.id !== id),
        }));
    },

    createCategory: async(item) => {
        const response = await fetch(`${API_BASE_URL}/api/category`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)})
        return response;
    },

    updateCategory: async(item) => {
        const response = await fetch(`${API_BASE_URL}/api/category/${item.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        return response;
    }
}))

export default useTodoStore;
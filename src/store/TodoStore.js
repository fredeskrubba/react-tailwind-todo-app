import { create } from 'zustand'

const useTodoStore = create((set) => ({
    todoItems: [],
    categories: [],
    activeCategory: "All",
    setTodoItems: (items) => set({ todoItems: items }),
    setCategories: (categories) => set({ categories: categories }),
    setActiveCategory: (category) => set({ activeCategory: category }),


    fetchTodoItems: async () => {
        const response = await fetch('https://localhost:7203/api/todo', { method: 'GET' });
        const data = await response.json(); 
        set({ todoItems: data });
    },
    createTodoItem: async (item) => {
        const response = await fetch('https://localhost:7203/api/todo', {
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
        const response = await fetch(`https://localhost:7203/api/todo/${item.id}`, {
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
        await fetch(`https://localhost:7203/api/todo/${id}`, { method: 'DELETE' });
        set((state) => ({
            todoItems: state.todoItems.filter(t => t.id !== id),
        }));
    },

    fetchCategories: async () => {
        const response = await fetch('https://localhost:7203/api/category', { method: 'GET' });
        const data = await response.json(); 
        set({ categories: data });
    }
}))

export default useTodoStore;
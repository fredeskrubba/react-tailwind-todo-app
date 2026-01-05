import { create } from 'zustand'

const useTodoStore = create((set) => ({
    todoItems: [],
    setTodoItems: (items) => set({ todoItems: items }),
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
}))

export default useTodoStore;
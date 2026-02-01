import { create } from 'zustand'

const useNoteStore = create((set) => ({
    notes: [],
    activeNote: null,
    setNotes: (notes) => set({ notes: notes }),
    setActiveNote: (note) => set({ activeNote: note }),
    fetchNotes: async (userId) => {
        const response = await fetch(`https://localhost:7203/api/note/${userId}`, { method: 'GET' });
        const data = await response.json(); 
        set({ notes: data });
    },
    createNote: async (note) => {
        const response = await fetch('https://localhost:7203/api/note', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        const createdNote = await response.json();
        set((state) => ({ notes: [...state.notes, createdNote] }));
        return createdNote;
    },
    deleteNote: async (id) => {
        await fetch(`https://localhost:7203/api/note/${id}`, { method: 'DELETE' });
        set((state) => ({
            notes: state.notes.filter(n => n.id !== id),
        }));
    },
    updateNote: async (note) => {
        const response = await fetch(`https://localhost:7203/api/note/${note.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        if (response.ok) {
            set((state) => ({
                notes: state.notes.map(n => n.id === note.id ? note : n)
            }));
        }
    }
}));

export default useNoteStore;
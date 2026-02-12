import { create } from 'zustand'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useNoteStore = create((set) => ({
    notes: [],
    activeNote: null,
    activeDate: null,
    setNotes: (notes) => set({ notes: notes }),
    setActiveNote: (note) => set({ activeNote: note, activeDate: note?.updatedAt || null }),
    fetchNotes: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/api/note/${userId}`, { method: 'GET' });
        const data = await response.json(); 
        set({ notes: data });
    },
    createNote: async (note) => {
        const response = await fetch(`${API_BASE_URL}/api/note`, {
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
        await fetch(`${API_BASE_URL}/api/note/${id}`, { method: 'DELETE' });
        set((state) => ({
            notes: state.notes.filter(n => n.id !== id),
        }));
    },
    updateNote: async (note) => {
        const response = await fetch(`${API_BASE_URL}/api/note/${note.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                color: note.color,
                title: note.title,
                htmlContent: note.htmlContent,
                userId: note.userId,
                id: note.id
            }),
        });
        if (response.ok) {
            const updatedNote = await response.json();
            set((state) => ({
                activeNote: updatedNote,
                activeDate: updatedNote.updatedAt,
                notes: state.notes.map(n => n.id === note.id ? note : n)
            }));
        }
    }
}));

export default useNoteStore;
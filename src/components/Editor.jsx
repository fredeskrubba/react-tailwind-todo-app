import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useNoteStore from '../store/NoteStore'
import { useEffect } from 'react';
import { useStore } from 'zustand';

const Editor = ({setActiveContent, setActiveTitle, activeTitle}) => {

    const activeNote = useNoteStore(state => state.activeNote);
    const activeDate = useNoteStore(state => state.activeDate);
    useEffect(() => {
        
    }, [activeNote]);

    useEffect(() => {
        if(activeNote){
            editor?.commands.setContent(activeNote.htmlContent || '<p>Get Started writing!</p>');
            setActiveTitle(activeNote.title || '');
        }
        }, [activeNote]);

    const editor = useEditor({
        editorProps : {
            attributes: {
                class: 'h-full p-2 focus:outline-none',
            },
        },
        extensions: [StarterKit],
        content: activeNote?.htmlContent || '<p>Get Started writing!</p>',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setActiveContent(html);
        }
    })

    return (
        <div className="h-full relative">
            <div className=" sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-main-green">
                <div className="w-full mx-auto flex items-center justify-center px-4 py-2">
                    <button
                        type="button"
                        className="rounded px-2 py-1 text-sm font-medium text-gray-700 cursor:pointer hover:bg-gray-100"
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                    >
                        Bold
                    </button>

                    <button
                        type="button"
                        className="rounded px-2 py-1 text-sm font-medium text-gray-700 cursor:pointer hover:bg-gray-100"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                    >
                        Italic
                    </button>

                    <button
                        type="button"
                        className="rounded px-2 py-1 text-sm font-medium text-gray-700 cursor:pointer hover:bg-gray-100"
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                    >
                        Strike
                    </button>

                </div>
            </div>
            <div className='p-2 flex flex-col gap-3'>
                <input type="text" placeholder='No title yet' className='w-full text-2xl focus:outline-none' value={activeTitle} onChange={(e) => setActiveTitle(e.target.value)}/>
                <span className='flex gap-1'>
                    <p className='text-sm text-neutral-400'>{activeDate ? new Date(activeDate).toLocaleDateString([], {year: "numeric", month: "long", day: "numeric"}) : ''}</p>
                    <p className='text-sm text-neutral-400'>{activeDate ? new Date(activeDate).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false, }) : ''}</p>
                </span>
            </div>
            <EditorContent editor={editor} className='h-full'/>
        </div>
    );
}

export default Editor;
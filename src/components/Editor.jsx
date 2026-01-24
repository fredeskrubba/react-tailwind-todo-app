import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


const Editor = () => {

    const editor = useEditor({
        editorProps : {
            attributes: {
                class: 'h-full p-2 focus:outline-none',
            },
        },
        extensions: [StarterKit], // define your extension array
        content: '<p>Hello World!</p>', // initial content
    })

    return (
        <div className="h-full relative">
            <div className=" sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
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

                    <button
                        type="button"
                        className="rounded px-2 py-1 text-sm font-medium text-gray-700 cursor:pointer hover:bg-gray-100"
                        onClick={() => editor?.chain().focus().setParagraph().run()}
                    >
                        P
                    </button>

                    <button
                        type="button"
                        className="rounded px-2 py-1 text-sm font-medium text-gray-700 cursor:pointer hover:bg-gray-100"
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    >
                        • List
                    </button>
                </div>
            </div>
            <div className='p-2 flex flex-col gap-3'>
                <input type="text" placeholder='No title yet' className='w-full text-2xl focus:outline-none'/>
                <p className='text-sm text-neutral-400'>24-01-2026 15:54</p>

            </div>
            <EditorContent editor={editor} className='h-full'/>
        </div>
    );
}

export default Editor;
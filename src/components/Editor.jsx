import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useNoteStore from '../store/NoteStore'
import { useEffect, useState, useRef } from 'react';
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import BoldIcon from "../assets/icons/bold-icon.svg?react"
import ItalicIcon from "../assets/icons/italic-icon.svg?react"
import StrikethroughIcon from "../assets/icons/strikethrough-icon.svg?react"
import UlIcon from "../assets/icons/ul-icon.svg?react"
import OlIcon from "../assets/icons/ol-icon.svg?react"
import ArrowIcon from "../assets/icons/expand-icon.svg?react"

const Editor = ({setActiveContent, setActiveTitle, activeTitle}) => {

    const activeNote = useNoteStore(state => state.activeNote);
    const activeDate = useNoteStore(state => state.activeDate);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isBoldToggled, setIsBoldToggled] = useState(false);
    const [isItalicToggled, setIsItalicToggled] = useState(false);
    const [isStrikethroughToggled, setIsStrikethroughToggled] = useState(false);
    const [currentTextColor, setCurrentTextColor] = useState("#000");
    const [currentTextSize, setCurrentTextSize] = useState("16");

    const savedSelectionRef = useRef<Range | null>(null);

    useEffect(() => {

        // guards so cursor doesnt jump
        if (!editor || !activeNote) return;
        if (editor.isFocused) return;

        const editorHTML = editor.getHTML();
        const noteHTML = activeNote.htmlContent || '<p>Get Started writing!</p>';

        if (editorHTML !== noteHTML) {
            editor.commands.setContent(noteHTML, false);
        }

        setActiveTitle(activeNote.title || '');
    }, [activeNote?.id]);


    function updateToolbar(editor) {

        setIsBoldToggled(editor.isActive('bold'))
        setIsItalicToggled(editor.isActive('italic'))
        setIsStrikethroughToggled(editor.isActive('strike'))

        const { color } = editor.getAttributes('textStyle')
        setCurrentTextColor(color || "#000")
    }

    const editor = useEditor({
        editorProps : {
            attributes: {
                class: 'h-full p-2 focus:outline-none',
            },
        },
        extensions: [StarterKit, TextStyle, Color, FontSize],
        content: activeNote?.htmlContent || '<p>Get Started writing!</p>',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setActiveContent(html);
        },
        onSelectionUpdate({ editor }) {
            updateToolbar(editor)
        },
    })
    
    const updateCurrentSize = () => {
          const { fontSize } = editor.getAttributes("textStyle");
          setCurrentTextSize(fontSize ? parseInt(fontSize) : 16);
    };

    useEffect(() => {
        if (!editor) return;

        updateCurrentSize();

       
        editor.on("selectionUpdate", updateCurrentSize);
        editor.on("transaction", updateCurrentSize);

        return () => {
            editor.off("selectionUpdate", updateCurrentSize);
            editor.off("transaction", updateCurrentSize);
        };

    }, [editor]);

    const increaseFontSize = () => {
        editor.chain().focus().setFontSize(`${currentTextSize + 1}px`).run()
        setCurrentTextSize(prev => prev + 1);
    }

    const decreaseFontSize = () => {
        if(currentTextSize <= 1){
            editor.chain().focus().setFontSize(`1px`).run()
            setCurrentTextSize(1)

        } else {
            editor.chain().focus().setFontSize(`${currentTextSize - 1}px`).run()
            setCurrentTextSize(prev => prev - 1);
        }
    }

    const highlightPreviousText = () => {
        const { from, to } = editor.state.selection;
        savedSelectionRef.current = editor.state.selection; // save range
        // add a temporary mark or decoration if needed
        editor.chain().focus().setTextSelection({ from, to }).run();
    };

    return (
        <div className="h-full relative">
            <div className=" sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-main-green">
                <div className="sticky top-0 z-10 border-b border-main-green bg-white/90 backdrop-blur">
                    <div className="mx-auto flex items-center gap-1 px-4 py-2">
                        <button
                        type="button"
                        className={` px-1.5 py-1.5 rounded-xs text-sm font-medium transition-colors focus:outline-none hover:bg-main-green/30 cursor-pointer ${isBoldToggled ? "bg-main-green" : ""}`}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        >
                            <BoldIcon className={`w-4 h-4 ${isBoldToggled ? "fill-white" : "fill-black"}`}/>
                        </button>

                        <button
                            type="button"
                            className={` px-1.5 py-1.5 rounded-xs text-sm font-medium transition-colors focus:outline-none hover:bg-main-green/30 cursor-pointer ${isItalicToggled ? "bg-main-green" : ""}`}
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            >
                            <ItalicIcon className={`w-4 h-4 ${isItalicToggled ? "stroke-white" : "stroke-black"}`} />
                        </button>

                        <button
                            type="button"
                            className={`px-1.5 py-1.5 rounded-xs text-sm font-medium transition-colors focus:outline-none hover:bg-main-green/30 cursor-pointer ${isStrikethroughToggled ? "bg-main-green" : ""}`}
                            onClick={() => editor?.chain().focus().toggleStrike().run()}
                            >
                            <StrikethroughIcon className={`w-4 h-4 ${isStrikethroughToggled ? "stroke-white" : "stroke-black"}`} />
                        </button>

                        <div className="mx-2 h-5 w-px bg-main-green" />

                        <button
                        type="button"
                        className="px-1.5 py-1.5 rounded-xs text-sm font-medium transition-colors focus:outline-none hover:bg-main-green/30 cursor-pointer"
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        >
                            <UlIcon className="w-5 h-5" />

                        </button>

                        <button
                        type="button"
                        className="px-1.5 py-1.5 rounded-xs text-sm font-medium transition-colors focus:outline-none hover:bg-main-green/30 cursor-pointer"
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        >
                            <OlIcon className="w-5 h-5" />
                        </button>

                        <div className="mx-2 h-5 w-px bg-main-green" />

                        {/* text color */}
                        <div className="relative">
                            <div className='flex border-1 border-main-green'>
                                <button
                                    type="button"
                                    className={`
                                    px-1.5 py-1.5 rounded-xs text-sm font-medium transition-colors focus:outline-none hover:bg-main-green/30 cursor-pointer
                                    rounded-r-none
                                    flex items-center justify-center
                                    px-2
                                    `}
                                    onClick={() => {
                                    editor.chain().focus().unsetColor().run();
                                    }}
                                >
                                    <span className="relative inline-block font-semibold">
                                    A
                                    <span className="absolute left-0 right-0 -bottom-0.5 h-0.5" style={{backgroundColor: currentTextColor}}/>
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className={`
                                        px-1.5 py-1.5 rounded-xs text-sm font-medium transition-colors focus:outline-none hover:bg-main-green/30 cursor-pointer
                                        rounded-l-none
                                        px-1
                                        flex items-center justify-center
                                        w-6 h-full
                                    `}
                                    onClick={() => setShowColorPicker(v => !v)}
                                >
                                    ▾
                                </button> 

                            </div>
                            {showColorPicker && (
                                <div
                                    className="
                                    absolute top-full mt-2 z-50
                                    grid grid-cols-5 gap-2
                                    border-main-green
                                    rounded-md border
                                    bg-white p-2
                                    shadow-lg
                                    w-36
                                    "
                                >
                                    {[
                                    '#000000',
                                    '#374151',
                                    '#ef4444',
                                    '#f59e0b',
                                    '#10b981',
                                    '#3b82f6',
                                    '#8b5cf6',
                                    '#ec4899',
                                    ].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => {
                                        editor.chain().focus().setColor(color).run();
                                        setShowColorPicker(false);
                                        }}
                                        className="
                                        h-6 w-6
                                        border border-gray-200
                                        hover:scale-110
                                        transition
                                        cursor-pointer
                                        "
                                        style={{ backgroundColor: color }}
                                    />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative flex w-22 h-8.5 border border-main-green items-center" >
                            
                            <div
                                contentEditable
                                className="flex-1 flex items-center whitespace-nowrap max-w-full h-full bg-white px-3 text-sm font-medium text-main-green placeholder-main-green/70 focus:outline-none overflow-hidden " 
                                onKeyDown={(e)=> {
                                    const value = e.target.innerText;
                                    if(e.key === "Enter"){
                                        editor.chain().focus().setFontSize(`${value}px`).run()
                                    }
                                }}  
                                onFocus={()=> {
                                    if (!savedSelectionRef.current) return;

                                    editor.chain().focus().setTextSelection(savedSelectionRef.current).unsetMark("textStyle").run();
                                    savedSelectionRef.current = null;
                                }}>
                                {currentTextSize}
                            </div>
                            <div className='flex flex-col border-l-1 border-main-green'>
                                <button onClick={()=> {
                                    increaseFontSize()
                                }}
                                className='cursor-pointer hover:bg-main-green/70 w-full h-full p-0.5'
                                >
                                    <ArrowIcon className="w-3 h-3 rotate-180" />
                                </button>
                                <button
                                    className='cursor-pointer hover:bg-main-green/70 w-full h-full p-0.5'
                                    onClick={()=> {
                                        decreaseFontSize()
                                    }}
                                >
                                    <ArrowIcon className="w-3 h-3"/>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-2 flex flex-col gap-3'>
                <input type="text" placeholder='No title yet' className='w-full text-2xl focus:outline-none' value={activeTitle} onChange={(e) => setActiveTitle(e.target.value)}/>
                <span className='flex gap-1 border-b-1 border-main-green pb-1 md:w-40'>
                    <p className='text-sm text-neutral-400'>{activeDate ? new Date(activeDate).toLocaleDateString([], {year: "numeric", month: "long", day: "numeric"}) : ''}</p>
                    <p className='text-sm text-neutral-400'>{activeDate ? new Date(activeDate).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false, }) : ''}</p>
                </span>
            </div>
            <EditorContent editor={editor} className="h-full [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"/>
        </div>
    );
}

export default Editor;
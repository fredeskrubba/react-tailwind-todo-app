import ListItem from '../components/ListItem.jsx';
import ItemTaskModal from '../components/Modals/ItemTaskModal.jsx';
import { useEffect, useState, useRef } from 'react';
import LoadingIcon from '../components/LoadingIcon.jsx';
import Layout from '../components/Layout/Layout.jsx';
import useMainStore from '../store/Mainstore.js';
import useTodoStore from '../store/TodoStore.js';
import useAuthStore from '../store/AuthStore.js';
import AddIcon from "../assets/icons/plus-icon.svg?react"
import ExpandIcon from "../assets/icons/expand-icon.svg?react"
import { Sketch } from '@uiw/react-color';
import DateIcon from '../assets/icons/date-icon.svg?react';

const TodoList = () => {
    
    
    const todoStore = useTodoStore();

    const isLoading = useMainStore((state) => state.isLoading);
    const setIsLoading = useMainStore((state) => state.setIsLoading);
    const activeUser = useAuthStore((state) => state.activeUser);
    const listItems = useTodoStore((state) => state.todoItems);
    const activeCategory = useTodoStore((state) => state.activeCategory);

    const [addTask, setAddTask] = useState(false);
    const [completedExpanded, setCompletedExpanded] = useState(false);
    const [incompleteExpanded, setIncompleteExpanded] = useState(true);
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("#61BD92");
    const backGroundColors = ["#61BD92", "#C490D1", "#F0B67F", "#E54B4B", "#227C9D"];
    const [showColorPicker, setShowColorPicker] = useState(false);
    const addTodoItem = useTodoStore((state) => state.createTodoItem);
    const pickerRef = useRef(null); 
    const [createInputValue, setCreateInputValue] = useState("");


    const activeTodoItem = useTodoStore((state) => state.activeTodoItem);
    const [activeDescription, setActiveDescription] = useState(null);

    useEffect(() => {
        if(activeTodoItem){
        
            setActiveDescription(activeTodoItem.description);
        }
    }, [activeTodoItem]);

    useEffect(() => {
    const handleClickOutside = (event) => {
     
      if (showColorPicker && pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

    }, [showColorPicker]);

    const OnAddSubmit = (title) => {
        const today = new Date();
        const item = {
            description: "",
            title: title,
            color: selectedBackgroundColor,
            userId: activeUser.id,
            id: 0,
            isComplete: false,
            dueDate: today.toISOString(),
            categoryId: activeCategory.id 
        };

        addTodoItem(item);
        setAddTask(false);
    }

    async function getTodoItems() {
        setIsLoading(true);
        await todoStore.fetchTodoItems(activeUser.id);
        setIsLoading(false);
    }

    useEffect(() => {
        getTodoItems();
    }, []);
    
    useEffect(() => {
        setCompletedExpanded(false);
        setIncompleteExpanded(true);
        setCreateInputValue("");
    }, [activeCategory]);
    

    const filteredListItems = listItems.filter((item) => {
        switch (activeCategory.name.toLowerCase()) {
            case "all":
            return true;

            default:
            return item.categoryId === activeCategory.id;
        }
    });


    // debounce logic for saving description, so it doesn't call the api on every keystroke
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(activeTodoItem){
                saveNewDescription();
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [activeDescription]);

    const saveNewDescription = async () => {
        if(activeTodoItem && activeDescription !== activeTodoItem.description){
            await todoStore.updateTodoItem({
                ...activeTodoItem,
                description: activeDescription
            });
        }
    }

    return ( 
    <>
        <Layout PageMode="todo">
            {isLoading ?
                <LoadingIcon/> : 
                <div className={`${activeTodoItem !== null ? "grid grid-cols-[3fr_1fr] relative" : ""}`}>
                    <div className='flex flex-col gap-4 m-4'>
                        <div className='flex items-center gap-2 flex items-center gap-2 rounded-md border border-neutral-400 bg-neutral-100 px-4 py-2 transition-colors duration-150 focus-within:border-main-green hidden md:flex'>
                            <input type="text" value={createInputValue} placeholder="+ Add task" className="w-full bg-transparent text-gray-800 placeholder-neutral-400 outline-none" 
                            onChange={(e) => setCreateInputValue(e.target.value)}
                            onKeyDown={(e)=> {
                                if (e.key === 'Enter') {
                                    OnAddSubmit(e.target.value);
                                    setCreateInputValue("");
                                }}}/>
                            <div className="relative flex items-center">
                                        
                                <div className={`w-8 h-8 rounded-sm cursor-pointer`} style={{backgroundColor: selectedBackgroundColor}} onClick={() => setShowColorPicker(!showColorPicker)}/>
                                {
                                    showColorPicker &&
                                    <div className="absolute right-10 top-10 z-50 hidden lg:block" ref={pickerRef}>
                                        <Sketch
                                        color={selectedBackgroundColor}
                                        presetColors={backGroundColors}
                                        disableAlpha={true}
                                        onChange={(color) => {
                                            setSelectedBackgroundColor(color.hex);
                                        }}/>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className='flex flex-col overflow-y-auto gap-2'>
                            {
                                filteredListItems.filter(item => item.isComplete !== true).length > 0 &&
                                <div className="flex items-center w-full cursor-pointer " onClick={() => setIncompleteExpanded(!incompleteExpanded)}>
                                    <p className="text-lg font-medium text-main-green">To do</p>
                                    <div className="flex-1 h-px bg-main-green ml-3"></div>
                                    <ExpandIcon className={`h-6 w-6 fill-main-green ml-2 ${incompleteExpanded ? "" : "rotate-180"}`}/>
                                </div>
                            }
                            {!incompleteExpanded ? null : 
                                <div className={`${filteredListItems.length <= 0 || filteredListItems == null ? "block" : "flex flex-col gap-2"}`}>
                                {
                                    filteredListItems.length <= 0 || filteredListItems == null ? 
                                    <p className='text-center'>No items in the current Category</p> :
                                    filteredListItems.filter(item => !item.isComplete).map((item, index) => (
                                        <ListItem key={index} item={item}/>
                                    ))
                                }   
                                        
                                </div>
                            }
                                {
                                filteredListItems.filter(item => item.isComplete === true).length > 0 &&
                                    <div className="flex items-center w-full cursor-pointer" onClick={() => setCompletedExpanded(!completedExpanded)}>
                                        <p className="text-lg font-medium text-main-green">Completed</p>
                                        <div className="flex-1 h-px bg-main-green ml-3"></div>
                                        <ExpandIcon className={`h-6 w-6 fill-main-green ml-2 ${completedExpanded ? "" : "rotate-180"}`}/>
                                    </div>
                                }
                                {
                                !completedExpanded ? null :
                                <div className={`${filteredListItems.length <= 0 || filteredListItems == null ? "block" : "flex flex-col gap-2"}`}>
                                {
                                    filteredListItems.length <= 0 || filteredListItems == null ? 
                                    <p className='text-center'>No items in the current Category</p> :
                                    filteredListItems.filter(item => item.isComplete).map((item, index) => (
                                        <ListItem key={index} item={item}/>
                                    ))
                                }   
                                    
                                </div>
                                }

                        </div>
                    </div>
                    {activeTodoItem !== null && 
                    <div className="fixed inset-y-0 right-0 w-[320px] bg-white border-l border-main-green p-6 overflow-y-auto shadow-lg z-50 flex flex-col justify-between">
                        <div className='flex flex-col gap-4'>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{activeTodoItem.title}</h2>
                            <textarea className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none" value={activeDescription} onChange={(e) => setActiveDescription(e.target.value)} />

                        </div>
                        <div className='flex justify-between border-t-1 border-main-green pt-4'>
                            <DateIcon className="h-6 w-6 fill-main-green"/>
                            <p className="text-main-green">{new Date(activeTodoItem.dueDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    }
                </div>
                }
            <button onClick={() => setAddTask(true)} className='fixed bottom-4 right-4 bg-main-green text-white text-xl p-6 rounded-full font-bold shadow-lg cursor-pointer hover:bg-main-green-dark md:hidden'>
                <AddIcon className="h-6 w-6 fill-white"/>
            </button>
            {addTask && <ItemTaskModal onClose={()=> setAddTask(false)} />}
        </Layout>



    </> 
    );
}
 
export default TodoList;

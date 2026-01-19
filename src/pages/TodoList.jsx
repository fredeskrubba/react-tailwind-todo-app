import ListItem from '../components/ListItem.jsx';
import ItemTaskModal from '../components/Modals/ItemTaskModal.jsx';
import { use, useEffect, useState } from 'react';
import LoadingIcon from '../components/LoadingIcon.jsx';
import Layout from '../components/Layout/Layout.jsx';
import useMainStore from '../store/Mainstore.js';
import useTodoStore from '../store/TodoStore.js';
import useAuthStore from '../store/AuthStore.js';
import AddIcon from "../assets/icons/plus-icon.svg?react"
import ExpandIcon from "../assets/icons/expand-icon.svg?react"

const TodoList = () => {
    
    
    const todoStore = useTodoStore();

    const isLoading = useMainStore((state) => state.isLoading);
    const setIsLoading = useMainStore((state) => state.setIsLoading);
    const activeUser = useAuthStore((state) => state.activeUser);
    const listItems = useTodoStore((state) => state.todoItems);
    const activeCategory = useTodoStore((state) => state.activeCategory);

    const [addTask, setAddTask] = useState(false);
    const [completedExpanded, setCompletedExpanded] = useState(true);
    const [incompleteExpanded, setIncompleteExpanded] = useState(true);
    
    const addTodoItem = useTodoStore((state) => state.createTodoItem);

    const OnAddSubmit = (title) => {
        const today = new Date();
        const item = {
            description: "",
            title: title,
            color: "#61BD92",
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
        setCompletedExpanded(true);
        setIncompleteExpanded(true);
    }, [activeCategory]);
    

    const filteredListItems = listItems.filter((item) => {
        switch (activeCategory.name.toLowerCase()) {
            case "all":
            return true;

            default:
            return item.categoryId === activeCategory.id;
        }
    });

    return ( 
    <>
        <Layout PageMode="todo">
            {isLoading ?
                <LoadingIcon/> : 
                <div className='flex flex-col gap-4 m-4'>
                    <input type="text" placeholder="+ Add task" class="w-full rounded-md bg-neutral-100 px-4 py-2 text-gray-800 placeholder-neutral-400 border border-gray-300 focus:border-main-green focus:outline-none transition-colors duration-150 hidden md:block" 
                    onKeyDown={(e)=> {
                        if (e.key === 'Enter') {
                            OnAddSubmit(e.target.value);
                            e.target.value = "";
                        }}}/>
                    {
                        filteredListItems.filter(item => item.isComplete !== true).length > 0 &&
                        <div className="flex items-center w-full cursor-pointer" onClick={() => setIncompleteExpanded(!incompleteExpanded)}>
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
                </div>}
            <button onClick={() => setAddTask(true)} className='fixed bottom-4 right-4 bg-main-green text-white text-xl p-6 rounded-full font-bold shadow-lg cursor-pointer hover:bg-main-green-dark md:hidden'>
                <AddIcon className="h-6 w-6 fill-white"/>
            </button>
            {addTask && <ItemTaskModal onClose={()=> setAddTask(false)} />}
        </Layout>



    </> 
    );
}
 
export default TodoList;

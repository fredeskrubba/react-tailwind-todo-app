import ListItem from '../components/ListItem.jsx';
import ItemTaskModal from '../components/Modals/ItemTaskModal.jsx';
import { useEffect, useState, useMemo } from 'react';
import LoadingIcon from '../components/LoadingIcon.jsx';
import Layout from '../components/Layout/Layout.jsx';
import useMainStore from '../store/Mainstore.js';
import useTodoStore from '../store/TodoStore.js';
import useAuthStore from '../store/AuthStore.js';
import AddIcon from "../assets/icons/plus-icon.svg?react"
import ExpandIcon from "../assets/icons/expand-icon.svg?react"
import ItemInfoView from '../components/ItemInfoView.jsx';
import { toast } from 'react-toastify';
import TaskIcon from '../assets/icons/to-do-icon.svg?react';
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
    const [overdueExpanded, setOverdueExpanded] = useState(true);  

    const addTodoItem = useTodoStore((state) => state.createTodoItem);
    const [createInputValue, setCreateInputValue] = useState("");


    const activeTodoItem = useTodoStore((state) => state.activeTodoItem);
    const [activeDescription, setActiveDescription] = useState(null);

    useEffect(() => {
        if(activeTodoItem){
        
            setActiveDescription(activeTodoItem.description);
        }
    }, [activeTodoItem]);


    const notifySuccess = () => toast("Item added", { type: "success", position: "bottom-center", autoClose: 2000 });
    const notifyError = () => toast("Failed to add item", { type: "error", position: "bottom-center", autoClose: 2000 });
    
    const OnAddSubmit = async (title) => {
        const today = new Date();
        const item = {
            description: "",
            title: title,
            userId: activeUser.id,
            id: 0,
            isComplete: false,
            dueDate: today.toISOString(),
            categoryId: activeCategory.id 
        };

        try {
            await addTodoItem(item);
            notifySuccess();
        } catch (err) {
            notifyError();
        } finally {
            setAddTask(false);
        }

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
    
    const isOverdue = (item) => {
        
        if (!item.dueDate){
            return false;
        } 

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(item.dueDate);
        due.setHours(0, 0, 0, 0);

        return due < today;
    };

    const getOverdueItems = (items = []) => {
        return items.filter(item => {
    
        if (item.isComplete){
            return false;
        } 

            
        return isOverdue(item);
        });
    };

    const incompleteItems = filteredListItems.filter(
        item => item.isComplete !== true
    );

    const overdueItems = useMemo(
        () => getOverdueItems(filteredListItems),

        [filteredListItems]
    );

    const todoItems = incompleteItems.filter(
        item => !isOverdue(item)
    );


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
        <Layout pageMode="todo">
            {isLoading ?
                <LoadingIcon/> : 
                <div className={`${activeTodoItem !== null ? "md:grid md:grid-cols-[3fr_1fr] md:relative" : ""}`}>
                    <div className='flex flex-col gap-4 m-4'>
                        <div className='flex items-center gap-2 flex items-center gap-2 rounded-xs border border-neutral-400 bg-neutral-100 px-4 py-2 transition-colors duration-150 focus-within:border-main-green hidden md:flex'>
                            <input type="text" value={createInputValue} placeholder="+ Add task" className="w-full bg-transparent text-gray-800 placeholder-neutral-400 outline-none" 
                            onChange={(e) => setCreateInputValue(e.target.value)}
                            onKeyDown={(e)=> {
                                if (e.key === 'Enter') {
                                    OnAddSubmit(e.target.value);
                                    setCreateInputValue("");
                                }}}/>
                            <div className="relative flex items-center">
                                        
                                <button className={`rounded-sm cursor-pointer bg-main-green text-white p-2 font-medium`} onClick={() => {
                                    OnAddSubmit(createInputValue);
                                    setCreateInputValue("");
                                }}> Create </button>
                               
                            </div>
                        </div>
                        
                        {
                            filteredListItems.length <= 0 &&
                            <div className='flex flex-col items-center gap-10 mt-10'>
                                <p className='text-gray-500 text-lg'>No tasks yet, get started by adding a task!</p>
                                <TaskIcon className='h-22 w-22 fill-gray-500'/>
                            </div>
                        }
                        <div className='flex flex-col overflow-y-auto gap-2'>
                            {/* Overdue */}
                            <>
                                {
                                    getOverdueItems(filteredListItems).length > 0 &&
                                        <div
                                            onClick={() => setOverdueExpanded(!overdueExpanded)}
                                            className="
                                                flex items-center w-full cursor-pointer
                                                px-3 py-2
                                                bg-gray-500/5 hover:bg-gray-500/10
                                                border-1 border-red-500
                                                transition-colors
                                                select-none 
                                                rounded-xs
                                            ">
                                            <p className="text-lg font-medium text-red-500">
                                                Overdue ({overdueItems.length})
                                            </p>

                                            <div className="flex-1" />

                                            <ExpandIcon
                                                className={`
                                                h-5 w-5
                                                fill-red-500
                                                transition-transform duration-200
                                                ${overdueExpanded ? "rotate-180" : ""}
                                                `}
                                            />
                                        </div>
                                }

                                {
                                overdueExpanded && overdueItems.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        {overdueItems.map((item, index) => (
                                        <ListItem key={index} item={item} isOverdue={true} />
                                        ))}
                                    </div>
                                    )
                                }
                            </>

                           {/* Incomplete */}
                            <>
                                {
                                    todoItems.length > 0 &&
                                    <div
                                            onClick={() => setIncompleteExpanded(!incompleteExpanded)}
                                            className="
                                                flex items-center w-full cursor-pointer
                                                px-3 py-2
                                                bg-gray-500/5 hover:bg-gray-500/10
                                                border-1 border-main-green
                                                transition-colors
                                                select-none 
                                                rounded-xs
                                            ">
                                            <p className="text-lg font-medium text-main-green">
                                                To do ({todoItems.length})
                                            </p>

                                            <div className="flex-1" />

                                            <ExpandIcon
                                                className={`
                                                h-5 w-5
                                                fill-main-green
                                                transition-transform duration-200
                                                ${incompleteExpanded ? "rotate-180" : ""}
                                                `}
                                            />
                                        </div>
                                }
                                {!incompleteExpanded ? null : 
                                    <div className={`${todoItems.length <= 0 || todoItems == null ? "block" : "flex flex-col gap-2"}`}>
                                    {
                                        todoItems.length >= 0 && 
                                        todoItems.map((item, index) => (
                                            <ListItem key={index} item={item} isOverdue={false} />
                                        ))
                                    }   
                                            
                                    </div>
                                }
                            </>
                            
                            {/* Completed */}
                            <>
                                {
                                filteredListItems.filter(item => item.isComplete === true).length > 0 &&
                                    
                                    <div
                                            onClick={() => setCompletedExpanded(!completedExpanded)}
                                            className="
                                                flex items-center w-full cursor-pointer
                                                px-3 py-2
                                                bg-gray-500/5 hover:bg-gray-500/10
                                                border-1 border-main-green
                                                transition-colors
                                                select-none 
                                                rounded-xs
                                            ">
                                            <p className="text-lg font-medium text-main-green">
                                                Completed ({filteredListItems.filter(item => item.isComplete === true).length})
                                            </p>

                                            <div className="flex-1" />

                                            <ExpandIcon
                                                className={`
                                                h-5 w-5
                                                fill-main-green
                                                transition-transform duration-200
                                                ${completedExpanded ? "rotate-180" : ""}
                                                `}
                                            />
                                        </div>
                                }
                                {
                                !completedExpanded ? null :
                                <div className={`${filteredListItems.length <= 0 || filteredListItems == null ? "block" : "flex flex-col gap-2"}`}>
                                {
                                    filteredListItems.length >= 0 &&
                                    filteredListItems.filter(item => item.isComplete).map((item, index) => (
                                        <ListItem key={index} item={item} isOverdue={false}/>
                                    ))
                                }   
                                    
                                </div>
                                }
                            
                            </>
                                
                        </div>
                    </div>
                    {activeTodoItem !== null && 
                        <ItemInfoView item={activeTodoItem} activeDescription={activeDescription} setActiveDescription={setActiveDescription} />
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

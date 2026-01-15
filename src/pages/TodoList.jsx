import ListItem from '../components/ListItem.jsx';
import ItemTaskModal from '../components/Modals/ItemTaskModal.jsx';
import { use, useEffect, useState } from 'react';
import LoadingIcon from '../components/LoadingIcon.jsx';
import Layout from '../components/Layout/Layout.jsx';
import useMainStore from '../store/Mainstore.js';
import useTodoStore from '../store/TodoStore.js';
import useAuthStore from '../store/AuthStore.js';
import AddIcon from "../assets/icons/plus-icon.svg?react"

const TodoList = () => {
    
    
    const todoStore = useTodoStore();

    const isLoading = useMainStore((state) => state.isLoading);
    const setIsLoading = useMainStore((state) => state.setIsLoading);
    const activeUser = useAuthStore((state) => state.activeUser);
    const listItems = useTodoStore((state) => state.todoItems);
    const activeCategory = useTodoStore((state) => state.activeCategory);

    const [addTask, setAddTask] = useState(false);  
    

    async function getTodoItems() {
        setIsLoading(true);
        await todoStore.fetchTodoItems(activeUser.id);
        setIsLoading(false);
    }

    useEffect(() => {
        getTodoItems();
    }, []);
    
    const filteredListItems = listItems.filter((item) => {
        switch (activeCategory.name.toLowerCase()) {
            case "all":
            return true;

            case "complete":
            return item.isComplete === true;

            case "incomplete":
            return item.isComplete === false;

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
                    <div className={`${filteredListItems.length <= 0 || filteredListItems == null ? "block" : "flex flex-col gap-2"}`}>
                    {
                        filteredListItems.length <= 0 || filteredListItems == null ? 
                        <p className='text-center'>No items in the current Category</p> : 
                        filteredListItems.map((item, index) => (
                            <ListItem key={index} item={item}/>
                        ))
                    }   
                            
                    </div>
                </div>}
            <button onClick={() => setAddTask(true)} className='fixed bottom-4 right-4 bg-main-green text-white text-xl p-6 rounded-full font-bold shadow-lg cursor-pointer hover:bg-main-green-dark'>
                <AddIcon className="h-6 w-6 fill-white"/>
            </button>
            {addTask && <ItemTaskModal onClose={()=> setAddTask(false)} />}
        </Layout>



    </> 
    );
}
 
export default TodoList;

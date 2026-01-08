import ListItem from '../components/ListItem.jsx';
import ItemTaskModal from '../components/Modals/ItemTaskModal.jsx';
import { use, useEffect, useState } from 'react';
import LoadingIcon from '../components/LoadingIcon.jsx';
import Layout from '../components/Layout/Layout.jsx';
import useMainStore from '../store/Mainstore.js';
import useTodoStore from '../store/TodoStore.js';

const TodoList = () => {
    
    
    const todoStore = useTodoStore();

    const isLoading = useMainStore((state) => state.isLoading);
    const setIsLoading = useMainStore((state) => state.setIsLoading);
    
    const listItems = useTodoStore((state) => state.todoItems);
    const activeCategory = useTodoStore((state) => state.activeCategory);

    const [addTask, setAddTask] = useState(false);  
    

    async function getTodoItems() {
        setIsLoading(true);
        await todoStore.fetchTodoItems();
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
                    <div className='grid grid-cols-1  gap-4 items-start sm:grid-cols-2 lg:grid-cols-4'>
                    {
                        filteredListItems.length <= 0 || filteredListItems == null ? 
                        <p>Get started by adding todo items by pressing the add task button!</p> : 
                        filteredListItems.map((item, index) => (
                            <ListItem key={index} item={item}/>
                        ))
                    }   
                            
                    </div>
                </div>}
        </Layout>


        <button onClick={() => setAddTask(true)} className='fixed bottom-4 right-4 bg-main-green text-white text-xl p-6 rounded-lg py-4 font-bold shadow-lg cursor-pointer'>Add Task</button>
        {addTask && <ItemTaskModal onClose={()=> setAddTask(false)} />}

    </> 
    );
}
 
export default TodoList;

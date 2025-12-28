import Header from '../components/Header.jsx';
import ListItem from '../components/ListItem.jsx';
import ItemTaskModal from '../components/ItemTaskModal.jsx';
import { useEffect, useState } from 'react';
import LoadingIcon from '../components/LoadingIcon.jsx';

const Home = () => {
    async function getTodoItems() {
        const response = await fetch('https://localhost:7203/api/todo', { method: 'GET' });
        const data = await response.json(); 
        setIsLoading(false);
        return data;
    }

    const [isLoading, setIsLoading] = useState(true); 
    const [listItems, setListItems] = useState([]);
    const [addTask, setAddTask] = useState(false);  

    const addItem = (item) => {
        
        setListItems([...listItems, item]);
        setAddTask(false);
    }


    useEffect(() => {
        getTodoItems().then(data => {
            setListItems(data)
        });
    }, []);

    return ( 
    <>
        <Header/>
        {isLoading ?
                        <LoadingIcon /> : 
        <div className='flex flex-col gap-4 m-4'>
            <div className='grid grid-cols-1  gap-4 items-start sm:grid-cols-2 lg:grid-cols-4'>
            {
                listItems.length <= 0 || listItems == null ? <p>Get started by adding todo items by pressing the add task button!</p> : listItems.map((item, index) => (
               <ListItem key={index} item={item} setListItems={setListItems} />
           ))

            }   
                    
                
            </div>

        </div>}


        <button onClick={() => setAddTask(true)} className='fixed bottom-4 right-4 bg-main-green text-white text-xl p-6 rounded-lg py-4 font-bold shadow-lg'>Add Task</button>
        {addTask && <ItemTaskModal onClose={()=> setAddTask(false)} onConfirm={addItem} setListItems={setListItems}/>}

    </> 
    );
}
 
export default Home;

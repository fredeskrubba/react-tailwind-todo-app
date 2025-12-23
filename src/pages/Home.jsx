import Header from '../components/Header.jsx';
import ListItem from '../components/ListItem.jsx';
import ItemTaskModal from '../components/ItemTaskModal.jsx';
import { useEffect, useState } from 'react';

const Home = () => {
    async function getTodoItems() {
        const response = await fetch('https://localhost:7203/api/todo', { method: 'GET' });
        const data = await response.json(); 
        return data;
    }

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
        <div className='flex flex-col gap-4 m-4'>
            <div className='flex justify-center flex-col gap-4'>
                {listItems.map((item, index) => (
                    <ListItem key={index} item={item} setListItems={setListItems} />
                ))}
            </div>
            <button onClick={() => setAddTask(true)} className='bg-main-green text-white p-2 w-32 rounded-lg py-4 self-end font-bold'>Add Task</button>

        </div>


        {addTask && <ItemTaskModal onClose={()=> setAddTask(false)} onConfirm={addItem} setListItems={setListItems}/>}

    </> 
    );
}
 
export default Home;

import Header from '../components/Header.jsx';
import ListItem from '../components/ListItem.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import { useState } from 'react';

const Home = () => {

    const [listItems, setListItems] = useState(["Item 1", "Item 2", "Item 3"]);
    const [addTask, setAddTask] = useState(false);  

    const addItem = (item) => {
        setListItems([...listItems, item]);
        setAddTask(false);
    }

    return ( 
    <>
        <Header/>
        <div className='flex flex-col gap-4 m-4'>
            <div className='flex justify-center flex-col gap-4'>
                {listItems.map((item, index) => (
                    <ListItem key={index} text={item} />
                ))}
            </div>
            <button onClick={() => setAddTask(true)} className='bg-main-green text-white p-2 w-32 rounded-lg py-4 self-end'>Add Task</button>

        </div>


        {addTask && <AddTaskModal onClose={()=> setAddTask(false)} onConfirm={addItem} />}
    </> 
    );
}
 
export default Home;

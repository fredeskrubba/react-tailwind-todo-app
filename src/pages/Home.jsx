import Header from '../components/Header.jsx';
import ListItem from '../components/ListItem.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import { useState } from 'react';

const Home = () => {

    const [listItems, setListItems] = useState([
        {
            title: "Item 1",
            description: "big description for item 1 very big description for item 1 very big description for item 1"    
        },
        {
            title: "Item 2",
            description: "big description for item 2 very big description for item 2 very big description for item 2"    
        },
        {
            title: "Item 3",
            description: "big description for item 3 very big description for item 3 very big description for item 3"    
        }
]);
    const [addTask, setAddTask] = useState(false);  

    const addItem = (item) => {
        console.log(item);
        setListItems([...listItems, item]);
        setAddTask(false);
    }

    const removeItem = (index) => {
        const newList = listItems.filter((_, i) => i !== index);
        setListItems(newList);
    }

    return ( 
    <>
        <Header/>
        <div className='flex flex-col gap-4 m-4'>
            <div className='flex justify-center flex-col gap-4'>
                {listItems.map((item, index) => (
                    <ListItem key={index} text={item.title} description={item.description} onDelete={()=> removeItem(index)}/>
                ))}
            </div>
            <button onClick={() => setAddTask(true)} className='bg-main-green text-white p-2 w-32 rounded-lg py-4 self-end font-bold'>Add Task</button>

        </div>


        {addTask && <AddTaskModal onClose={()=> setAddTask(false)} onConfirm={addItem} />}

    </> 
    );
}
 
export default Home;

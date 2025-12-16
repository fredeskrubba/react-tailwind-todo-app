import Header from '../components/Header.jsx';
import ListItem from '../components/ListItem.jsx';
import AddTaskModal from '../components/ItemTaskModal.jsx';
import { useEffect, useState } from 'react';

const Home = () => {
    async function getTodoItems() {
        const response = await fetch('https://localhost:7203/api/todo', { method: 'GET' });
        const data = await response.json(); 
        return data;
    }

    const [listItems, setListItems] = useState([
        {
            title: "Item 1",
            description: "big description for item 1 very big description for item 1 very big description for item 1",
            backgroundColor: "#61BD92"    
        },
        {
            title: "Item 2",
            description: "big description for item 2 very big description for item 2 very big description for item 2",
            backgroundColor: "#C490D1"    
        },
        {
            title: "Item 3",
            description: "big description for item 3 very big description for item 3 very big description for item 3",
            backgroundColor: "#F0B67F"    
        }
]);
    const [addTask, setAddTask] = useState(false);  

    const addItem = (item) => {
        
        setListItems([...listItems, item]);
        setAddTask(false);
    }

    const removeItem = (index) => {
        const newList = listItems.filter((_, i) => i !== index);
        setListItems(newList);
    }

    const updateItem = (item) => {
        listItems.forEach((listItem, index) => {
            if(listItem.title === item.title){
                listItems[index] = item;
            }   
        });
        setListItems([...listItems]);   
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
                    <ListItem key={index} item={item} onDelete={()=> removeItem(index)} updateItem={updateItem} />
                ))}
            </div>
            <button onClick={() => setAddTask(true)} className='bg-main-green text-white p-2 w-32 rounded-lg py-4 self-end font-bold'>Add Task</button>

        </div>


        {addTask && <AddTaskModal onClose={()=> setAddTask(false)} onConfirm={addItem} />}

    </> 
    );
}
 
export default Home;

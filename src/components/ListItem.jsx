import TrashIcon from "../assets/icons/trash-icon.svg?react";
import EditIcon from "../assets/icons/edit-icon.svg?react";
import ExpandIcon from "../assets/icons/expand-icon.svg?react";
import { useState } from "react";
import ItemTaskModal from "./ItemTaskModal.jsx";

const ListItem = ({item, setListItems}) => {


    const [isExpanded, setIsExpanded] = useState(false);
    const [editTask, setEditTask] = useState(false);

    const removeItem = async () => {
        await fetch(`https://localhost:7203/api/todo/${item.id}`, { method: 'DELETE' }).then(res => res.json()).then(deletedItem => {
            setListItems(prev =>
            prev.filter(item => item.id !== deletedItem.id)
        );
        })
    }

    return (
    <div className="border border-gray-300 w-full p-4 transition-transform duration-300 bg-white cursor-pointer" style={{backgroundColor: item.color}} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={`flex justify-between items-cente`}>
            <p className="text-neutral-50 sm:text-lg m-0">
                {item.title}

            </p>

            <div className="flex gap-4 items-center">
                <ExpandIcon className={`w-4 h-4 sm:w-6 sm:h-6 fill-neutral-50 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                <EditIcon className="w-4 h-4 sm:w-6 sm:h-6 fill-neutral-50 cursor-pointer" onClick={(e) => {
                    e.stopPropagation()
                    setEditTask(true)
                }} />
                <TrashIcon className="w-4 h-4 sm:w-6 sm:h-6 fill-red-500 cursor-pointer" onClick={(e)=> {
                    e.stopPropagation()
                    removeItem()
                }} />
            </div>
        </div> 
        
            <div className={`transition-all duration-200 overflow-hidden text-neutral-50 ${isExpanded ? "h-auto opacity-100 border-t border-neutral-50 mt-2 py-4 " : "h-0 opacity-0"}`}>
                {item.description}
            </div>
            
            
            {editTask && <ItemTaskModal onClose={()=> setEditTask(false)} prevInfo={item} />}
    </div> 
    );
}
 
export default ListItem;
import TrashIcon from "../assets/icons/trash-icon.svg?react";
import EditIcon from "../assets/icons/edit-icon.svg?react";
import ExpandIcon from "../assets/icons/expand-icon.svg?react";
import CheckmarkIcon from "../assets/icons/checkmark-icon.svg?react";
import DateIcon from "../assets/icons/date-icon.svg?react";
import TimeIcon from "../assets/icons/time-icon.svg?react";
import { useState } from "react";
import ItemTaskModal from "./ItemTaskModal.jsx";
import WarningModal from "./WarningModal.jsx";

const ListItem = ({item, setListItems}) => {


    const [isExpanded, setIsExpanded] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const dateObj = new Date(item.dueDate);

    const removeItem = async () => {
        await fetch(`https://localhost:7203/api/todo/${item.id}`, { method: 'DELETE' }).then(res => res.json()).then(deletedItem => {
            setListItems(prev =>
            prev.filter(item => item.id !== deletedItem.id)
        );
        })
    }

    const toggleComplete = async () => {
        const updatedItem = { ...item, isComplete: !item.isComplete };
        
        fetch(`https://localhost:7203/api/todo/${item.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem)}).then(res => res.json()).then(result => {
                setListItems(prev =>
                    prev.map(li => li.id === result.id ? result : li 
                ));
            });
    }

    return (
        <div className="border border-gray-300 w-full p-4 transition-transform duration-300 bg-white cursor-pointer rounded-sm" style={{backgroundColor: item.color}}>
            <div className={`flex justify-between items-center`} onClick={() => setIsExpanded(!isExpanded)}>
                <p className="text-neutral-50 sm:text-lg m-0">
                    {item.title}

                </p>
                <div className="flex gap-4 items-center">
                    <div className={`cursor-pointer rounded-full p-2 ${item.isComplete ? "bg-green-500" : "bg-red-500"}`}>
                                <CheckmarkIcon className="w-2 h-2 fill-neutral-50 cursor-pointer" onClick={(e)=> {
                                    e.stopPropagation()
                                    toggleComplete()
                    }} />

                    </div>
                    <ExpandIcon className={`w-4 h-4 fill-neutral-50 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}/>
                </div>

            </div> 
            
                <div className={`transition-all duration-200 overflow-hidden text-neutral-50 py-2 ${isExpanded ? "h-auto opacity-100 border-t border-neutral-50 mt-2 " : "h-0 opacity-0"}`}>
                    <p className="break-words whitespace-normal">{item.description}</p>
                    <div className="flex items-center gap-2 mt-4">
                        <DateIcon className="w-4 h-4 inline-block mr-2 fill-neutral-50" />
                        <p className="m-0">{dateObj.toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TimeIcon className="w-4 h-4 inline-block mr-2 fill-neutral-50" />
                        <p className="m-0">{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false})}</p>
                    </div>
                    <div className={`p-2 mt-2`}>
                        <div className="flex gap-4 items-center justify-end">
                            <div className="cursor-pointer rounded-full p-2 bg-neutral-50" onClick={(e) => {
                                    e.stopPropagation()
                                    setEditTask(true)
                                }}>
                                <EditIcon className="w-4 h-4 fill-neutral-500 cursor-pointer" />

                            </div>
                            <div className="cursor-pointer rounded-full p-2 bg-neutral-50">
                                <TrashIcon className="w-4 h-4 fill-neutral-500 cursor-pointer" onClick={(e)=> {
                                    e.stopPropagation()
                                    setShowWarningModal(true)
                                }} />

                            </div>
                        </div>

                    </div>
                </div>
                
                {editTask && <ItemTaskModal onClose={()=> setEditTask(false)} prevInfo={item} setListItems={setListItems}/>}
                {showWarningModal && <WarningModal text="Are you sure you want to delete this item?" onConfirm={removeItem} onCancel={()=> setShowWarningModal(false)}/>}
        </div> 
    );
}
 
export default ListItem;
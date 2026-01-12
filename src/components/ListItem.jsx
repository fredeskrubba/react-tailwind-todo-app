import TrashIcon from "../assets/icons/trash-icon.svg?react";
import EditIcon from "../assets/icons/edit-icon.svg?react";
import ExpandIcon from "../assets/icons/expand-icon.svg?react";
import CheckmarkIcon from "../assets/icons/checkmark-icon.svg?react";
import DateIcon from "../assets/icons/date-icon.svg?react";
import TimeIcon from "../assets/icons/time-icon.svg?react";
import { useState } from "react";
import ItemTaskModal from "./Modals/ItemTaskModal.jsx";
import WarningModal from "./Modals/WarningModal.jsx";
import useTodoStore from "../store/TodoStore.js";

const ListItem = ({item, setListItems}) => {


    const [isExpanded, setIsExpanded] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const todoStore = useTodoStore();
    const dateObj = new Date(item.dueDate);

    const removeItem = async () => {
        
        await todoStore.deleteTodoItem(item.id);
        setShowWarningModal(false);
    }

    const toggleComplete = async () => {
        const updatedItem = { ...item, isComplete: !item.isComplete };
        
        await todoStore.updateTodoItem(updatedItem);
        
    }

    return (
        <div className="border w-full p-4 transition-transform duration-300 bg-white cursor-pointer rounded-sm" style={{borderColor: item.color}}>
            <div className={`flex justify-between items-center`} onClick={() => setIsExpanded(!isExpanded)}>
                <p className="sm:text-lg m-0">
                    {item.title}

                </p>
                <div className="flex gap-4 items-center">
                    <div className={`cursor-pointer rounded-full p-2 ${item.isComplete ? "bg-green-500" : "bg-red-500"}`}>
                                <CheckmarkIcon className="w-2 h-2 fill-neutral-50 cursor-pointer" onClick={(e)=> {
                                    e.stopPropagation()
                                    toggleComplete()
                    }} />

                    </div>
                    <ExpandIcon className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}/>
                </div>

            </div> 
            
                <div className={`transition-all duration-200 overflow-hidden py-2 ${isExpanded ? "h-auto opacity-100 border-t border-neutral-500 mt-2 " : "h-0 opacity-0"}`}>
                    <p className="break-words whitespace-normal">{item.description}</p>
                    
                    <div className={`p-2 mt-2 flex justify-between`}>
                        <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-1 ">
                                <DateIcon className="w-4 h-4 inline-block mr-2 fill-neutral-500" />
                                <p className="m-0">{dateObj.toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-1">
                                <TimeIcon className="w-4 h-4 inline-block mr-2 fill-neutral-500" />
                                <p className="m-0">{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false})}</p>
                        </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="cursor-pointer rounded-full p-2 " style={{backgroundColor: item.color}} onClick={(e) => {
                                    e.stopPropagation()
                                    setEditTask(true)
                                }}>
                                <EditIcon className="w-4 h-4 fill-white cursor-pointer" />

                            </div>
                            <div className="cursor-pointer rounded-full p-2" style={{backgroundColor: item.color}}>
                                <TrashIcon className="w-4 h-4 fill-white cursor-pointer" onClick={(e)=> {
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
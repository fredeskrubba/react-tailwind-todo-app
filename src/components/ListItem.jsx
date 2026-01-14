import CheckmarkIcon from "../assets/icons/checkmark-icon.svg?react";
import { useState } from "react";
import useTodoStore from "../store/TodoStore.js";
import TodoItemDetailsModal from "./Modals/TodoItemDetailsModal.jsx";
import { lightenColor } from "../helpers/colorHelpers.js";
import WarningModal from "./Modals/WarningModal.jsx";
import ItemTaskModal from "./Modals/ItemTaskModal.jsx";

const ListItem = ({item}) => {

    const [isHover, setIsHover] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const updateItem = useTodoStore(state => state.updateTodoItem)
    const [editTask, setEditTask] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const deleteItem = useTodoStore(state => state.deleteItem);

    const backgroundColor = showInfo
    ? lightenColor(item.color) 
    : isHover
    ? lightenColor(item.color)
    : "white"; 

    const textColor = showInfo
    ? "#fff" 
    : isHover
    ? "#fff"
    : "#000"; 


    const removeItem = async () => {
        
        await deleteItem(item.id);
        setShowWarningModal(false);
        onClose();
    }
    const toggleComplete = async () => {
        const updatedItem = { ...item, isComplete: !item.isComplete };
        await updateItem(updatedItem);    
    }

    return (
        <div className="border-l-4 w-full p-4 transition-transform duration-300 bg-white cursor-pointer rounded-sm shadow-sm md:min-h-30" 
            style={{borderColor: item.color, backgroundColor: backgroundColor, color: textColor}} 
            onClick={()=> setShowInfo(true)} 
            onMouseEnter={(e) => { setIsHover(true)}}
            onMouseLeave={(e) => { setIsHover(false) }}
        > 
            <div className={`flex justify-between items-center`}>
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
                </div>
                


            </div> 
                {editTask && <ItemTaskModal onClose={() => setEditTask(false)}  />}
                {showWarningModal && <WarningModal text="Are you sure you want to delete this item?" onConfirm={removeItem} onCancel={() => setShowWarningModal(false)}/>}  
                {showInfo && 
                    <TodoItemDetailsModal item={item} 
                        onClose={(e)=> {
                        // stop bubbling so showInfo is always true
                        e.stopPropagation()

                        setIsHover(false);
                        setShowInfo(false);
                        }}
                        showDeleteModal={()=> {
                            setShowWarningModal(true);
                            setShowInfo(false);
                        }}
                        showEditModal={()=> {
                          setEditTask(true);
                          setShowInfo(false);  
                        }}
            />}

        </div> 
    );
}
 
export default ListItem;
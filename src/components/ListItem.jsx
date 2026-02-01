import CheckmarkIcon from "../assets/icons/checkmark-icon.svg?react";
import { useState } from "react";
import useTodoStore from "../store/TodoStore.js";
import TodoItemDetailsModal from "./Modals/TodoItemDetailsModal.jsx";
import { lightenColor } from "../helpers/colorHelpers.js";
import WarningModal from "./Modals/WarningModal.jsx";
import ItemTaskModal from "./Modals/ItemTaskModal.jsx";
import { Menu, Item, useContextMenu } from 'react-contexify';
import {useId} from 'react';
import { toast } from 'react-toastify';

const ListItem = ({item}) => {

    const [isHover, setIsHover] = useState(false);
    const updateItem = useTodoStore(state => state.updateTodoItem)
    const [editTask, setEditTask] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const deleteItem = useTodoStore(state => state.deleteTodoItem);
    const menuId = `item_menu_${useId()}`;

    const setActiveTodoItem = useTodoStore((state) => state.setActiveTodoItem);
    const activeTodoItem = useTodoStore((state) => state.activeTodoItem);
    
    const notifyDeletionSuccess = () => toast("Item added", { type: "success", position: "bottom-center", autoClose: 2000 });
    const notifyDeletionError = () => toast("Failed to add item", { type: "error", position: "bottom-center", autoClose: 2000 });
    const notifyCompletedToggleSuccess = () => toast("Item status updated", { type: "success", position: "bottom-center", autoClose: 2000 });
    const notifyCompletedToggleError = () => toast("Failed to update item status", { type: "error", position: "bottom-center", autoClose: 2000 });

    const backgroundColor = activeTodoItem && activeTodoItem.id === item.id
    ? item.color
    : isHover
    ? lightenColor(item.color)
    : "white"; 

    const textColor = activeTodoItem && activeTodoItem.id === item.id
    ? "#fff" 
    : isHover
    ? "#fff"
    : "#000"; 

        
        const { show } = useContextMenu({
        id: menuId,
    });

    const handleContextMenu = (e, item) => {
        
        show({
        id: menuId,
        event: e,
        props: item,
        });
    };

    const removeItem = async () => {
        
        await deleteItem(item.id);

        try {
            await deleteItem(item.id);
            notifyDeletionSuccess();
        } catch (err) {
            notifyDeletionError();
        } finally {
            setShowWarningModal(false);
        }
    }

    const toggleComplete = async () => {
        const updatedItem = { ...item, isComplete: !item.isComplete };

        try {
            await updateItem(updatedItem);
            notifyCompletedToggleSuccess();
        } catch (err) {
            notifyCompletedToggleError();
        }    
    }


    const ShowInfoForItem = (item) => {
        setActiveTodoItem(null);
        const ismobile = window.innerWidth <= 768;
        if(ismobile){
            setShowInfo(true);
        } else {
            if(activeTodoItem && activeTodoItem.id === item.id){
                setActiveTodoItem(null);
            } else {
                setActiveTodoItem(item);
            }
        }
    }

    return (
        <div className="border-l-4 w-full transition-transform duration-300 bg-white cursor-pointer shadow-sm md:min-h-3 grid grid-cols-[1fr_auto]" 
            style={{borderColor: item.color, backgroundColor: backgroundColor, color: textColor}} 
            onClick={(e)=> {
                e.stopPropagation();
                ShowInfoForItem(item)
            }
            } 
            onMouseEnter={(e) => { setIsHover(true)}}
            onMouseLeave={(e) => { setIsHover(false) }}
            onContextMenu={(e) => handleContextMenu(e, item)}
        > 
                
                <p className="text-xs md:text-base m-0 p-4">
                    {item.title}
                </p>
                
             

                <div className={`flex items-center justify-center w-12 h-full md:w-14 md:h-14 cursor-pointer p-2 cursor-pointer ${item.isComplete ? "bg-green-500" : "bg-red-500"}`} onClick={(e)=> {
                                e.stopPropagation()
                                toggleComplete()}}>
                            <CheckmarkIcon className="w-5 h-5 fill-neutral-50 " />
                </div>
                {editTask && <ItemTaskModal onClose={(e) => {
                    setEditTask(false)
                }}  prevInfo={item}/>}

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
            <Menu id={menuId} theme="myTheme">
              <Item
                onClick={({ props }) => {
                  setShowWarningModal(true);
                }}
              >
                Delete
              </Item>
            </Menu>
        </div> 
    );
}
 
export default ListItem;
import DateIcon from '../assets/icons/date-icon.svg?react';
import TimeIcon from '../assets/icons/time-icon.svg?react';
import { useState, useEffect, useRef } from 'react';
import useTodoStore from "../store/TodoStore.js";

const ItemInfoView = ({ item, activeDescription, setActiveDescription }) => {

    const [itemDate, setItemDate] = useState("");
    const [itemTime, setItemTime] = useState("");

    const dateRef = useRef(null)
    const timeRef = useRef(null)

    const updateItem = useTodoStore((state) => state.updateTodoItem);
    

    useEffect(()=> { 
        if (item?.dueDate) { 
            setItemDate(new Date(item.dueDate).toISOString().slice(0, 10)); 
            setItemTime(new Date(item.dueDate).toISOString().slice(11, 16))

        } else { 
            setItemDate("");
            setItemTime("");
        }
    }, [item])

    const updateItemDate = async (newDate) => {
        setItemDate(newDate)

        const newDueDate = `${newDate}T${itemTime}:00`;

        try {
            await updateItem({
                    ...item,
                    dueDate: newDueDate
                });
            
        } catch {

        }

    }

    const updateItemTime = async (newTime) => {
        setItemTime(newTime)

        const newDueDate = `${itemDate}T${newTime}:00`;

        try {
            await updateItem({
                    ...item,
                    dueDate: newDueDate
                });
            
        } catch {

        }
    }

    return (
        <div className="fixed inset-y-0 right-0 w-[320px] bg-white border-l border-main-green p-6 overflow-y-auto shadow-lg z-50 md:flex-col md:justify-between hidden md:flex overflow-x-hidden">
                        <div className='flex flex-col gap-4 h-full'>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 border-b-1 border-main-green pb-2">{item.title}</h2>
                            <textarea className="w-full h-full text-base text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none" value={activeDescription ? activeDescription : ""} onChange={(e) => setActiveDescription(e.target.value)} placeholder='Enter description'/>

                        </div>
                        <div className='flex flex-col border-t-1 border-main-green pt-4 gap-4'>
                            <div className='flex justify-between cursor-pointer' onClick={()=> { dateRef.current?.showPicker?.()}}>
                                <DateIcon className="h-6 w-6 fill-main-green"/>     
                                <input type="date" value={itemDate} onChange={(e) => updateItemDate(e.target.value)} onClick={() => dateRef.current?.showPicker?.()} className="custom-date-input bg-transparent text-main-green focus:outline-none" ref={dateRef}/>     
                            </div>
                            <div className='flex justify-between cursor-pointer' onClick={()=>{timeRef.current?.showPicker?.()} }>
                                <TimeIcon className="h-6 w-6 fill-main-green"/>
                                <input type="time" value={itemTime} onChange={(e) => updateItemTime(e.target.value)} onClick={() => timeRef.current?.showPicker?.()} className="bg-transparent text-main-green focus:outline-none" ref={timeRef}/>     

                            </div>

                        </div>
                    </div>
    );
}

export default ItemInfoView;
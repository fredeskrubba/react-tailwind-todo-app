import { useEffect, useState } from "react";
import useTodoStore from "../../store/TodoStore";
import useAuthStore from "../../store/AuthStore";

const ItemTaskModal = ({ onClose, prevInfo}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 16));
    
    const todoStore = useTodoStore();

    const [error, setError] = useState({});
    const activeCategory = useTodoStore((state) => state.activeCategory);
    const activeUser = useAuthStore((state) => state.activeUser);

    useEffect(() => {
        
        if (prevInfo) {
            setTitle(prevInfo.title)
            setDescription(prevInfo.description);
            setDueDate(prevInfo.dueDate);
        }}, [prevInfo]);

    const SubmitForm = async () => {
       
        //  validation
        if (title.trim() === "") {
            setError({title: "Title is required"});
            return;
        }

        if(description.trim() === "") {
            setError({description: "Description is required"});
            return;
        }

        if (!dueDate) {
            setError({dueDate: "Due date is required"});
            return;
        }
            
        const item = {
            description: description,
            title: title,
            id: prevInfo ? prevInfo.id : 0,
            userId: activeUser.id,
            isComplete: false,
            dueDate: dueDate,
            categoryId: activeCategory.id
        }

        if(!prevInfo){
            todoStore.createTodoItem(item);
            onClose();

        } else {
            await todoStore.updateTodoItem(item);
            onClose();
        }
    }

    return ( 
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={(e) => e.stopPropagation()} >
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4"> {prevInfo ? "Update Task" : "New Task" }</h2>
            <div className="text-gray-600 mb-6 flex-col gap-4 flex relative">
                <div className="flex flex-col gap-2">
                    <h2>Title</h2>
                    <input type="text" placeholder="Task Title" onChange={(e)=> setTitle(e.target.value)} className="border border-gray-400 p-2 focus:outline-none" value={title} />
                    {
                        error && error.title && <p className="text-red-500 text-sm m-0">{error.title}</p>
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <h2>Description</h2>
                    <textarea name="description" placeholder="Enter task description" className="border border-gray-400 p-2 focus:outline-none sm:h-44" onChange={(e) => setDescription(e.target.value)} value={description} />
                    {
                        error && error.description && <p className="text-red-500 text-sm m-0">{error.description}</p>
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <h2>Due Date</h2>
                    <input type="datetime-local" className="border border-gray-400 p-2 focus:outline-none" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    {
                        error && error.dueDate && <p className="text-red-500 text-sm m-0">{error.dueDate}</p>
                    }
                </div>

                
            </div>

            <div className="flex justify-end gap-3">
                <button className="px-4 py-2 rounded-lg bg-red-400 text-white cursor-pointer" onClick={onClose}>
                    Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-main-green text-white cursor-pointer" onClick={() => {
                    SubmitForm()
                }}>
                    Confirm
                </button>
            </div>
        </div>
        
        
    </div> 
    );
}
 
export default ItemTaskModal;
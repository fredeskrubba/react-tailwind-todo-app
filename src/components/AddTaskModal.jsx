import { useState } from "react";

const AddTaskModal = ({ onClose, onConfirm }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    return ( 
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">New Task</h2>
            <div className="text-gray-600 mb-6 flex-col gap-4 flex">
                <input type="text" placeholder="Task Title" onChange={(e)=> setTitle(e.target.value)} className="border border-gray-400 p-2 focus:outline-none"/>
                <textarea name="description" placeholder="Enter task description" className="border border-gray-400 p-2 focus:outline-none sm:h-44" onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="flex justify-end gap-3">
            <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose}>
                Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-main-green text-white hover:bg-blue-700" onClick={() => onConfirm(title)}>
                Confirm
            </button>
            </div>
        </div>
    </div> 
    );
}
 
export default AddTaskModal;
import { useState } from "react";

const EditTaskModal = ({ onClose, onConfirm, prevInfo }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("");

    const backGroundColors = ["#61BD92", "#C490D1", "#F0B67F", "#E54B4B", "#227C9D"];


    if (prevInfo) {
        setTitle(prevInfo.title)
        setDescription(prevInfo.description);
        setSelectedBackgroundColor(prevInfo.backgroundColor);
    }

    return ( 
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4"> {prevInfo ? "Update Task" : "New Task" }</h2>
            <div className="text-gray-600 mb-6 flex-col gap-4 flex">
                <input type="text" placeholder="Task Title" onChange={(e)=> setTitle(e.target.value)} className="border border-gray-400 p-2 focus:outline-none" value={title} />
                <textarea name="description" placeholder="Enter task description" className="border border-gray-400 p-2 focus:outline-none sm:h-44" onChange={(e) => setDescription(e.target.value)} value={description} />
                <p className="m-0">Select Background Color:</p>
                <div className="flex items-center gap-2">
                    {backGroundColors.map((color, index) => (
                        <div key={index} className={`w-8 h-8 rounded-sm cursor-pointer ${selectedBackgroundColor === color ? "ring-2 ring-offset-2 ring-neutral-900" : ""}`} style={{backgroundColor: color}} onClick={() => setSelectedBackgroundColor(color)}></div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3">
            <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose}>
                Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-main-green text-white hover:bg-blue-700" onClick={() => {
                onConfirm({title, description})
                onClose();}}>
                Confirm
            </button>
            </div>
        </div>
    </div> 
    );
}
 
export default EditTaskModal;
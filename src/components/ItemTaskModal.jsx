import { useEffect, useState } from "react";
import { Sketch, Wheel, ShadeSlider } from '@uiw/react-color';
import { hsvaToHex } from '@uiw/color-convert';

const ItemTaskModal = ({ onClose, prevInfo, setListItems }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    
    // for desktop
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("#61BD92");
    const backGroundColors = ["#61BD92", "#C490D1", "#F0B67F", "#E54B4B", "#227C9D"];

    // for mobile
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

    const [showColorPicker, setShowColorPicker] = useState(false);


    useEffect(() => {
        
        if (prevInfo) {
            setTitle(prevInfo.title)
            setDescription(prevInfo.description);
            setSelectedBackgroundColor(prevInfo.color);
        }}, [prevInfo]);

    const SubmitForm = async () => {
        const item = {
            description: description,
            title: title,
            color: selectedBackgroundColor,
            id: prevInfo ? prevInfo.id : 0,
            IsComplete: false
        }

        if(!prevInfo){
            fetch('https://localhost:7203/api/todo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)}).then(res => res.json()).then(createdItem => {
                setListItems(prev => [...prev, createdItem]);
                onClose();
            });

        } else {
            fetch(`https://localhost:7203/api/todo/${item.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)}).then(res => res.json()).then(updatedItem => {
                setListItems(prev =>
                    prev.map(li => li.id === updatedItem.id ? updatedItem : li 
                ));
                onClose();
            });
        }
    }

    return ( 
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4"> {prevInfo ? "Update Task" : "New Task" }</h2>
            <div className="text-gray-600 mb-6 flex-col gap-4 flex relative">
                <div className="flex flex-col gap-2">
                    <h2>Title</h2>
                    <input type="text" placeholder="Task Title" onChange={(e)=> setTitle(e.target.value)} className="border border-gray-400 p-2 focus:outline-none" value={title} />
                </div>
                <div className="flex flex-col gap-2">
                    <h2>Description</h2>
                    <textarea name="description" placeholder="Enter task description" className="border border-gray-400 p-2 focus:outline-none sm:h-44" onChange={(e) => setDescription(e.target.value)} value={description} />
                </div>
                <div className="flex flex-col gap-2">
                    <h2>Due Date</h2>
                    <input type="datetime-local" className="border border-gray-400 p-2 focus:outline-none" placeholder=""/>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="m-0">Select Background Color:</p>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-sm cursor-pointer`} style={{backgroundColor: selectedBackgroundColor}} onClick={() => setShowColorPicker(!showColorPicker)}/>
                    </div>
                </div>

                {showColorPicker &&
                <>
                    <div className="absolute right-10 bottom-0 z-50 hidden lg:block">
                            <Sketch
                            color={selectedBackgroundColor}
                            presetColors={backGroundColors}
                            disableAlpha={true}
                            onChange={(color) => {
                                setSelectedBackgroundColor(color.hex);
                            }}/>
                    </div>
                    <div className="absolute right-15 bottom-0 bg-neutral-50 p-2 md:top-40 z-50 lg:hidden">
                            <Wheel color={hsva} onChange={(color) => {
                                setHsva(color.hsva);
                                setSelectedBackgroundColor(hsvaToHex(color.hsva))
                            }} />
                            <ShadeSlider
                                hsva={hsva}
                                style={{ width: 210, marginTop: 20 }}
                                onChange={(newShade) => {
                                setHsva({ ...hsva, ...newShade });
                                }}
                            />
                            <div style={{ width: '100%', height: 34, marginTop: 20, background: hsvaToHex(hsva) }}></div>
                    </div>
                
                </>
                }
            </div>

            <div className="flex justify-end gap-3">
            <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose}>
                Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-main-green text-white hover:bg-blue-700" onClick={() => {
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
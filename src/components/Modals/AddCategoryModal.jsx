import BaseModal from "./BaseModal";
import { Sketch, Wheel, ShadeSlider } from '@uiw/react-color';
import { hsvaToHex } from '@uiw/color-convert';
import { use, useState } from "react";

const AddCategoryModal = ({ onClose, onSubmit }) => {
    // for desktop
        const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("#61BD92");
        const backGroundColors = ["#61BD92", "#C490D1", "#F0B67F", "#E54B4B", "#227C9D"];
        
    // for mobile
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
    const [showColorPicker, setShowColorPicker] = useState(false);

    const [name, setName] = useState("");
    const [error, setError] = useState({});

    const AddCategory = async () => {
        if (name.trim() === "") {
            setError({name: "name is required"});
            return;
        }

        const item = {
            name: name,
            color: selectedBackgroundColor,
            userId: 1
        }

        await fetch('https://localhost:7203/api/category', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)}).then(res => res.json()).then(createdItem => {
                onSubmit(createdItem);
                onClose();
            });
    }

    return (
        <BaseModal title="Add Category" onClose={onClose} onSubmit={AddCategory}>
            <form className="space-y-4 relative text-gray-600">
                <div>
                    <h2 className="m-0 mb-2">Category Name</h2>
                    <input
                    type="text"
                    placeholder="Category name"
                    className="w-full border px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    {
                        error && error.name && <p className="text-red-500 text-sm m-0">{error.name}</p>
                    }
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
                            <div className="absolute right-15 bottom-0 bg-neutral-50 p-2 md:top-10 z-50 lg:hidden">
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
            </form>
        </BaseModal>
  );
};

export default AddCategoryModal;
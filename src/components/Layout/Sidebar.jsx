import { useEffect, useState } from "react";
import CrossIcon from "../../assets/icons/cross-icon.svg?react";
import BurgerIcon from "../../assets/icons/burger-icon.svg?react";

const Sidebar = ({ PageMode, isMenuOpen, setIsMenuOpen }) => {
  
  const [activeItem, setActiveItem] = useState("All");
  
  const noteMenuItems = [
    { name: "All", color: "#227C9D" },
    { name: "Ideas", color: "#E54B4B" },
    { name: "School", color: "#3B82F6" },
    { name: "Work", color: "#EF4444" },
    { name: "Personal", color: "#10B981" }
  ];
  
  const todoMenuItems = [
    { name: "All", color: "#227C9D" },
    { name: "Completed", color: "#10B981" },
    { name: "Todo", color: "#FBBF24" }
  ];
  
  let menuItems = [] 
  
  menuItems = PageMode === "notes" ? noteMenuItems : todoMenuItems;


  return (
    <>
        
        <div className="w-64 border-r-2 border-main-green p-4  hidden md:flex md:flex-col md:gap-2">
          {menuItems.map((item) => (
              <button
                className={activeItem === item.name ? `text-left px-3 py-2 rounded border-l-4 text-white` : `text-left px-3 py-2 rounded border-l-4`}
                style={activeItem === item.name ? { backgroundColor: item.color, borderColor: item.color} : { borderColor: item.color }}
                onClick={() => setActiveItem(item.name)}
              >
              {item.name}
              </button>
          ))}
          <button className="mt-4 px-3 py-2 text-main-green bg-neutral-100 cursor-pointer">
            Add Category
          </button>
        </div>
        
        <div
        className={`
          fixed inset-0 bg-white z-50 p-6 flex flex-col
          transform transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-end mb-4">
          
            <CrossIcon className="w-6 h-6" onClick={() => setIsMenuOpen(false)}/>
          
        </div>

        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              className="text-left px-3 py-2 hover:bg-gray-100 rounded text-lg"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
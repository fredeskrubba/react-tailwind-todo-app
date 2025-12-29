import { useState } from "react";
import CrossIcon from "../../assets/icons/cross-icon.svg?react";
import BurgerIcon from "../../assets/icons/burger-icon.svg?react";

const Sidebar = ({ type, isMenuOpen, setIsMenuOpen }) => {
  
  const menuItems = type === "todo"
    ? ["Add Todo", "Group by Date", "Group by Priority"]
    : ["Add Note", "Group by Notebook", "Sort by Recent"];

  return (
    <>
        
        <div className="w-64 border-r-2 border-main-green p-4  hidden md:flex md:flex-col md:gap-2">
        {menuItems.map((item) => (
            <button
            key={item}
            className="text-left px-3 py-2 hover:bg-gray-100 rounded"
            >
            {item}
            </button>
        ))}
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
              key={item}
              className="text-left px-3 py-2 hover:bg-gray-100 rounded text-lg"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
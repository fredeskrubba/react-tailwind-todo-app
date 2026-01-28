import { act, use, useEffect, useState } from "react";
import CrossIcon from "../../assets/icons/cross-icon.svg?react";
import BurgerIcon from "../../assets/icons/burger-icon.svg?react";
import AddCategoryModal from "../Modals/AddCategoryModal";
import useTodoStore from "../../store/TodoStore";
import { Menu, Item, useContextMenu } from 'react-contexify';
import useAuthStore from "../../store/AuthStore";
import { lightenColor } from "../../helpers/colorHelpers.js";
import WarningModal from "../Modals/WarningModal.jsx";
import { toast } from 'react-toastify';


const Sidebar = ({ PageMode, isMenuOpen, setIsMenuOpen }) => {
  
  const [activeItem, setActiveItem] = useState(0);
  const [isCreateCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const activeUser = useAuthStore(state => state.activeUser);
  

  const [userMenuItems, setUserMenuItems] = useState([]);
  const [defaultMenuItems, setDefaultMenuItems] = useState([]);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");


  const todoStore = useTodoStore();
  const categories = useTodoStore(state => state.categories);
  
  const MENU_ID = "category_menu";
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleContextMenu = (e, item) => {
 
    show({
      id: MENU_ID,
      event: e,
      props: item,
    });
  };

  useEffect(() => {
    if (PageMode === 'todo') {
      todoStore.fetchCategories(activeUser.id);
    }
  }, []);
  
  useEffect(() => {
    if (PageMode !== 'todo') return;
  
    let defaultItems = categories.filter(cat => cat.userId == null);
    let userItems = categories.filter(cat => cat.userId != null);

    setDefaultMenuItems(defaultItems)
    setUserMenuItems(userItems)

    if(userMenuItems.length > 0){

      setActiveItem(defaultMenuItems[0].id)
    }
}, [categories, PageMode]);

  const notify = () => toast("Wow so easy!");

  const AddCategory = (category) => {
    setUserMenuItems(prev => [...prev, category]);
  };

  const deleteCategory = (id) => {
    todoStore.deleteCategory(id);
    setShowWarningModal(false);
    handleContextMenu();
  }

  const changeActiveCategory = (category) => {
    setActiveItem(category.id);
    todoStore.setActiveCategory({name: category.name, id: category.id, color: category.color, userId: 1});
  };

  return (
    <>
        
        <div className="w-64 min-h-0 h-full border-r-2 border-main-green p-4 flex flex-col hidden md:flex md:flex-col md:gap-2 ">
          <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto">
            {defaultMenuItems.map((item) => (
              
                <button
                  key={item.id}
                  className={`text-left px-3 py-2 rounded border-l-4 cursor-pointer`}
                  style={{
                    color: activeItem === item.id ? "#fff" : isHovering === item.id ? "#fff" : "#000",
                    backgroundColor: activeItem === item.id ? item.color : isHovering === item.id ? lightenColor(item.color, 0.3) : "#fff",      
                    borderColor: item.color,
                  }}
                  onClick={() => changeActiveCategory(item)}
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  onMouseEnter={(e) => { setIsHovering(item.id)}}
                  onMouseLeave={(e) => { setIsHovering(null) }}>
                  {item.name}
                </button>   
            ))}

            <hr className={`border-0 h-0.5 bg-neutral-300 opacity-75`}/>

            {userMenuItems.map((item) => (
              
                <button
                  key={item.id}
                  className={`text-left px-3 py-2 rounded border-l-4 cursor-pointer`}
                  style={{
                    color: activeItem === item.id ? "#fff" : isHovering === item.id ? "#fff" : "#000",
                    backgroundColor: activeItem === item.id ? item.color : isHovering === item.id ? lightenColor(item.color, 0.3) : "#fff",      
                    borderColor: item.color,
                  }}
                  onClick={() => changeActiveCategory(item)}
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  onMouseEnter={(e) => { setIsHovering(item.id)}}
                  onMouseLeave={(e) => { setIsHovering(null) }}>
                  {item.name}
                </button>   
            ))}
            <div>
              <button onClick={notify}>Notify!</button>
            </div>
            <Menu id={MENU_ID} theme="myTheme">
              <Item
                disabled={({ props }) =>
                  props?.name === "All" ||
                  props?.name === "Incomplete" ||
                  props?.name === "Complete"
                }
                onClick={({ props }) => {
                  setSelectedItemId(props.id);
                  setShowWarningModal(true);
                }}
              >
                Delete
              </Item>
            </Menu>
          </div>
          <button className="mt-4 px-3 py-2 border-2 border-main-green text-main-green bg-neutral-100 cursor-pointer mt-auto" onClick={() => PageMode === "todo" && setCreateCategoryModalOpen(true)}>
            {
              PageMode === "notes" ? "Add Note" : "Add Category"
            }
          </button>
        </div>
        
        <div
        className={`
          fixed inset-0 bg-white z-50 p-6 flex flex-col
          transform transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-end mb-4 border-b-2 border-main-green pb-3">
          
            <CrossIcon className="w-6 h-6 fill-main-green" onClick={() => setIsMenuOpen(false)}/>
          
        </div>

        <div className="flex flex-col gap-4">
          {userMenuItems.map((item) => (
            <button
              className="text-left px-3 py-2 hover:bg-gray-100 rounded text-lg"
              key={item.id}
              style={activeItem.name === item.name ? { backgroundColor: item.color, color: "#fff"} : {}}
              onClick={() => { 
                changeActiveCategory(item); 
                setIsMenuOpen(false); }}>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {
        isCreateCategoryModalOpen && <AddCategoryModal onClose={() => setCreateCategoryModalOpen(false)} onSubmit={AddCategory} />
      }
      {showWarningModal && <WarningModal text="Are you sure you want to delete this item?" onConfirm={() => deleteCategory(selectedItemId)} onCancel={() => setShowWarningModal(false)}/>} 

    </>
  );
};

export default Sidebar;
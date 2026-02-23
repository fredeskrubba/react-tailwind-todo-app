import { useEffect, useState } from "react";
import CrossIcon from "../../assets/icons/cross-icon.svg?react";
import AddCategoryModal from "../Modals/CategoryModal.jsx";
import useTodoStore from "../../store/TodoStore";
import { Menu, Item, useContextMenu } from 'react-contexify';
import useAuthStore from "../../store/AuthStore";
import { lightenColor } from "../../helpers/colorHelpers.js";
import WarningModal from "../Modals/WarningModal.jsx";
import { toast } from 'react-toastify';
import useNoteStore from "../../store/NoteStore.js";
import useMainStore from "../../store/Mainstore.js";
import LogoutIcon from "../../assets/icons/logout-icon.svg?react";
import EditIcon from "../../assets/icons/edit-icon.svg?react";
import TrashIcon from "../../assets/icons/trash-icon.svg?react";


const Sidebar = ({ pageMode, isMenuOpen, setIsMenuOpen }) => {
  
  const [activeItem, setActiveItem] = useState(0);
  const [isCreateCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const activeUser = useAuthStore(state => state.activeUser);


  const [userMenuItems, setUserMenuItems] = useState([]);
  const [defaultMenuItems, setDefaultMenuItems] = useState([]);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const todoStore = useTodoStore();
  const noteStore = useNoteStore();
  const categories = useTodoStore(state => state.categories);
  const userNotes = useNoteStore(state => state.notes);
  const setIsLoading = useMainStore((state) => state.setIsLoading);
  const isLoading = useMainStore((state) => state.isLoading);
  const setActiveTodoItem = useTodoStore((state) => state.setActiveTodoItem);
  const setActiveCategory = useTodoStore((state)=> state.setActiveCategory)

  const notifyDeletionSuccess = () => toast("Category deleted", { type: "success", position: "bottom-center", autoClose: 2000 });
  const notifyNoteDeletionSuccess = () => toast("Note deleted", { type: "success", position: "bottom-center", autoClose: 2000 });
  const notifyDeletionError = () => toast("Failed to delete category", { type: "error", position: "bottom-center", autoClose: 2000 });
  
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

    const logout = useAuthStore(state => state.logout);

    const onLogout = () => {
        logout();
    }

  const fetchNotes = async () => {
    setIsLoading(true);
    await noteStore.fetchNotes(activeUser.id);
    setIsLoading(false);
  }

  useEffect(() => {
    if (pageMode === 'todo') {
      todoStore.fetchCategories(activeUser.id);
    } else if (pageMode === 'notes') {
     
      fetchNotes();
      
    }
  }, []);
  
  useEffect(() => {
    if (pageMode == 'todo'){
      let defaultItems = categories.filter(cat => cat.userId == null);
      let userItems = categories.filter(cat => cat.userId != null);
  
      setDefaultMenuItems(defaultItems)
      setUserMenuItems(userItems)
  
      if(defaultMenuItems.length > 0){
        setActiveItem(defaultMenuItems[0].id)
        setActiveCategory({name: defaultMenuItems[0].name, id: defaultMenuItems[0].id, color: defaultMenuItems[0].color, userId: defaultMenuItems[0].userId})
      }
    } 
  }, [categories, pageMode ]);


  useEffect(()=> {

    if(userNotes.length > 0){
        setActiveItem(userNotes[0].id)
        noteStore.setActiveNote(userNotes[0]);
      } else {
        setActiveItem(null)
        noteStore.setActiveNote(null);
      }

  }, [userNotes.length, pageMode])

  const addCategory = (category) => {
    setUserMenuItems(prev => [...prev, category]);
    setActiveCategory({name: category.name, id: category.id, color: category.color, userId: activeUser.id});
    setActiveItem(category.id)
  };

  const deleteCategory = async (id) => {
    try {
        await todoStore.deleteCategory(id);
        notifyDeletionSuccess();
    } catch (err) {
        notifyDeletionError();
    } finally {
        setShowWarningModal(false);
        setActiveItem(defaultMenuItems[0].id)
        handleContextMenu();
    }
  }
  
  const editCategory = async (category) => {
    
   
    try {
          let updatedCategory = await todoStore.updateCategory(category);
          setUserMenuItems(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
          setActiveCategory({name: updatedCategory.name, id: updatedCategory.id, color: updatedCategory.color, userId: activeUser.id});
          setActiveItem(updatedCategory.id)
          
    } catch (err) {
        notifyDeletionError();
    } finally {
        setCreateCategoryModalOpen(false);
        handleContextMenu();
    }
  }

  const addNote = async () => {
  try {
    const newNote = await noteStore.createNote({
      title: 'Untitled Note',
      htmlContent: '<p>Get Started writing!</p>',
      userId: activeUser.id,
      color: '#61BD92',
    });

    changeActiveNote(newNote)

  } catch (err) {
    console.error('Failed to create note:', err);
  }
};

  const deleteNote = async (id) => {
    try {
        await noteStore.deleteNote(id);
        notifyNoteDeletionSuccess();
    } catch (err) {
        notifyDeletionError();
    } finally {
        setShowWarningModal(false);
        handleContextMenu();
    }
  }

  const changeActiveCategory = (category) => {
    setActiveItem(category.id);
    setActiveTodoItem(null);
    setActiveCategory({name: category.name, id: category.id, color: category.color, userId: activeUser.id});
  };

  const changeActiveNote = (note) => {

    setActiveItem(note.id);
    noteStore.setActiveNote(note);
  }

  
  return (
    
    <>
        {
          isLoading ? <></> :
        <div className="w-64 min-h-0 h-full border-r-2 border-main-green p-4 flex flex-col hidden md:flex md:flex-col md:gap-2 ">


          {
            pageMode === "todo" &&
            <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto">
              {defaultMenuItems.map((item) => (
                
                  <button
                    key={item.id}
                    className={`text-left px-3 py-2 border-l-4 cursor-pointer`}
                    style={{
                      color: activeItem === item.id ? "#fff" : isHovering === item.id ? "#fff" : "#000",
                      backgroundColor: activeItem === item.id ? item.color : isHovering === item.id ? lightenColor(item.color, 0.3) : "#fff",      
                      borderColor: item.color,
                    }}
                    onClick={() => changeActiveCategory(item)}
                    onContextMenu={(e) => handleContextMenu(e, item)}
                    onMouseEnter={() => { setIsHovering(item.id)}}
                    onMouseLeave={() => { setIsHovering(null) }}>
                    {item.name}
                  </button>   
              ))}

              <hr className={`border-0 h-0.5 bg-neutral-300 opacity-75`}/>

              {userMenuItems.map((item) => (
                
                  <button
                    key={item.id}
                    className={`text-left px-3 py-2 border-l-4 cursor-pointer`}
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

              <Menu id={MENU_ID} theme="myTheme">
                <Item
                  
                  onClick={({ props }) => {
                    setSelectedItem(props);
                    setShowWarningModal(true);
                  }}
                >
                  Delete category
                </Item>

                <Item
                  
                  onClick={({ props }) => {
                    setSelectedItem(props);
                    setCreateCategoryModalOpen(true);
                  }}
                >
                  Edit category
                </Item>
              </Menu>
            </div>
          }


          {
            pageMode === "notes" &&
              <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto">
                {userNotes.map((note) => (
                   
                    <button
                      key={note.id}
                      className={`text-left px-3 py-2 border-l-4 cursor-pointer`}
                      style={{
                        color: activeItem === note.id ? "#fff" : isHovering === note.id ? "#fff" : "#000",
                        backgroundColor: activeItem === note.id ? note.color : isHovering === note.id ? lightenColor(note.color, 0.3) : "#fff",      
                        borderColor: note.color,
                      }} onClick={() => changeActiveNote(note)}
                      onContextMenu={(e) => handleContextMenu(e, note)}
                      onMouseEnter={(e) => { setIsHovering(note.id)}}
                      onMouseLeave={(e) => { setIsHovering(null) }}
                      >
                      {note.title}
                    </button>   
                ))}
              </div>
          }




          <button className="mt-4 px-3 py-2 border-2 border-main-green text-main-green bg-neutral-100 cursor-pointer mt-auto" onClick={() => {
            setSelectedItem(null);
            pageMode === "todo" ? setCreateCategoryModalOpen(true) : addNote()
            }}>
            {
              pageMode === "notes" ? "Add Note" : "Add Category"
            }
          </button>
        </div>
        }
        
        <div
        className={`
          fixed inset-0 bg-white z-50 p-6 flex flex-col
          transform transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* mobile nav menu */}
        <div className="flex justify-end mb-4 border-b-2 border-main-green pb-3">
          
            <CrossIcon className="w-6 h-6 fill-main-green" onClick={() => setIsMenuOpen(false)}/>


        </div>

          {
            pageMode == "todo" ? 
            <div className="flex flex-col gap-4">
              {defaultMenuItems.map((item) => (
                    
                      <div
                        key={item.id}
                        className={`text-left px-3 py-2 hover:bg-gray-100 rounded text-lg flex items-center justify-between cursor-pointer`}
                        style={{
                          color: activeItem === item.id ? "#fff" : isHovering === item.id ? "#fff" : "#000",
                          backgroundColor: activeItem === item.id ? item.color : isHovering === item.id ? lightenColor(item.color, 0.3) : "#fff",      
                          borderColor: item.color,
                        }}
                        onClick={() => { 
                          changeActiveCategory(item); 
                          setIsMenuOpen(false); 
                        }}>

                        {item.name}
              
                      </div>   
              ))}
              
              {userMenuItems.map((item) => (
                <div
                  className="text-left px-3 py-2 hover:bg-gray-100 rounded text-lg flex items-center justify-between cursor-pointer"
                  key={item.id}
                  style={{
                          color: activeItem === item.id ? "#fff" : isHovering === item.id ? "#fff" : "#000",
                          backgroundColor: activeItem === item.id ? item.color : isHovering === item.id ? lightenColor(item.color, 0.3) : "#fff",      
                          borderColor: item.color,
                        }}
                  onClick={() => { 
                    changeActiveCategory(item); 
                    setIsMenuOpen(false); }}>
                  {item.name}
                  <div className="flex gap-4">
                          <EditIcon className="w-4 h-4 fill-neutral-50 inline-block ml-2" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                            setCreateCategoryModalOpen(true);
                          }}/>
                          <TrashIcon className="w-4 h-4 fill-neutral-50 inline-block ml-2" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                            setShowWarningModal(true);
                          }}/>

                        </div>
                </div>
              ))}
            </div> : 
             <div className="flex flex-col gap-4 h-full">
             
              {userNotes.map((note) => (
                <div
                  className="text-left px-3 py-2 hover:bg-gray-100 rounded text-lg"
                  key={note.id}
                  style={{
                          color: activeItem === note.id ? "#fff" : isHovering === note.id ? "#fff" : "#000",
                          backgroundColor: activeItem === note.id ? note.color : isHovering === note.id ? lightenColor(note.color, 0.3) : "#fff",      
                          borderColor: note.color,
                        }}
                  onClick={() => { 
                    setActiveItem(note.id); 
                    changeActiveNote(note)
                    setIsMenuOpen(false); }}>
                  {note.title}


                </div>
              ))}
             
            </div> 

          }

        <div className="sticky border-t-2 border-main-green w-full py-2 mt-auto flex justify-between items-center">

            {
              pageMode === "todo" ?
              <button className=" px-3 py-2 border-2 border-main-green text-main-green bg-neutral-100 cursor-pointer" onClick={() => { setCreateCategoryModalOpen(true); setIsMenuOpen(false)}}>
                New Category
              </button> :
              <button className=" px-3 py-2 border-2 border-main-green text-main-green bg-neutral-100 cursor-pointer" onClick={() => { addNote(); setIsMenuOpen(false)}}>
                New Note
              </button>
            }         
            <button type="button" onClick={onLogout} title="logout" className=" md:hidden">
              <LogoutIcon className="w-8 h-8 fill-main-green cursor-pointer"/>
            </button>
        </div>
      </div>

      {
        isCreateCategoryModalOpen && <AddCategoryModal onClose={() => setCreateCategoryModalOpen(false)} onSubmit={selectedItem ? editCategory : addCategory} prevCategory={selectedItem}/>
      }
      {showWarningModal && <WarningModal text="Are you sure you want to delete this item?" onConfirm={() => {
        if(pageMode === "todo"){
          deleteCategory(selectedItem.id);
        } else if (pageMode === "notes"){
          deleteNote(selectedItem.id);
        }
      }} onCancel={() => setShowWarningModal(false)}/>} 

    </>
    
  );
};

export default Sidebar;
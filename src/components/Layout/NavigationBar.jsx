import { Link, useLocation } from "wouter";
import LogoutIcon from "../../assets/icons/logout-icon.svg?react";
import BurgerIcon from "../../assets/icons/burger-icon.svg?react";
import useAuthStore from "../../store/AuthStore";
import TodoIcon from "../../assets/icons/to-do-icon.svg?react";
import NotesIcon from "../../assets/icons/notes-icon.svg?react";

const NavigationBar = ({ setIsMenuOpen, pageMode}) => {
    const [location] = useLocation();
    const logout = useAuthStore(state => state.logout);

    const onLogout = () => {
        logout();
    }

    return ( 
        <div className="py-4 px-8 border-2 border-b-main-green border-t-0 border-x-0 flex justify-between items-center md:flex-col md:border-0 md:border-r-2 md:border-main-green md:px-4">
            <div className="flex gap-4 md:flex-col">
                <Link to="/TodoList">
                    <div className={`border-3 rounded-full p-2 ${location === "/TodoList" ? "border-main-green fill-main-green"  : "border-neutral-300 fill-neutral-300"}`} title="To-do list">
                        <TodoIcon className="w-5 h-5 md:w-6 md:h-6"/>
                    </div>
                </Link>
                <Link to="/Notes">
                    <div className={`border-3 rounded-full p-2 fill-white ${location === "/Notes" ? "border-main-green stroke-main-green"  : "border-neutral-300 stroke-neutral-300 "}`} title="Notes">
                        <NotesIcon className="w-5 h-5 md:w-6 md:h-6"/>
                    </div>                
                </Link>
            </div>
            <div className="flex items-center gap-6">
                
                <BurgerIcon className="w-6 h-6 fill-main-green sm:w-7 sm:h-7 md:hidden" onClick={() => setIsMenuOpen(true)}/>
                <button type="button" onClick={onLogout} title="logout" className="hidden md:block">
                    <LogoutIcon className="w-8 h-8 fill-main-green cursor-pointer"/>
                </button>
                
            </div>
        </div>

     );
}
 
export default NavigationBar;
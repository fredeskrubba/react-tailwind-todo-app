import { Link, useLocation } from "wouter";
import LogoutIcon from "../../assets/icons/logout-icon.svg?react";
import BurgerIcon from "../../assets/icons/burger-icon.svg?react";
import useAuthStore from "../../store/AuthStore";

const Header = ({ setIsMenuOpen}) => {
    const [location] = useLocation();
    const logout = useAuthStore(state => state.logout);

    const onLogout = () => {
        logout();
    }

    return ( 
        <div className="py-4 px-8 border-2 border-b-main-green border-t-0 border-x-0 flex justify-between items-center">
            <div className="flex gap-4">
                <Link to="/TodoList">
                    <p className={`text-base md:text-xl border-2 rounded-md p-2 ${location === "/TodoList" ? "font-bold text-main-green border-main-green"  : " text-neutral-300 border-neutral-300"}`}>To-do List</p>
                </Link>
                <Link to="/Notes">
                    <p className={`text-base md:text-xl border-2 rounded-md p-2 ${location === "/Notes" ? "font-bold text-main-green border-main-green" : " text-neutral-300 border-neutral-300"}`}>Notes</p>
                </Link>
            </div>
            <div className="flex items-center gap-6">
                
                <BurgerIcon className="w-4 h-4 fill-main-green sm:w-7 sm:h-7 md:hidden" onClick={() => setIsMenuOpen(true)}/>
                
                <button type="button" onClick={onLogout}>
                    <LogoutIcon className="w-6 h-6 fill-main-green sm:w-8 sm:h-8" />
                </button>
                
            </div>
        </div>

     );
}
 
export default Header;
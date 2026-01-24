import NavigationBar from "./NavigationBar.jsx";
import Sidebar from "./Sidebar";
import { useState } from "react";
import LoadingIcon from '../LoadingIcon.jsx';
import useMainStore from '../../store/Mainstore.js';

const Layout = ({ PageMode, children }) => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoading = useMainStore((state) => state.isLoading);

    return (
        
        isLoading ? <LoadingIcon/> :
        <>
            <div className="flex flex-col h-screen md:hidden">
                <NavigationBar setIsMenuOpen={setIsMenuOpen} />

                <div className="flex flex-1 min-h-0 overflow-hidden">
                    <Sidebar PageMode={PageMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="flex-1 p-6 overflow-auto bg-neutral-50">
                    {children}
                    </div>
                </div>
            </div>
            <div className="hidden flex-col h-screen md:flex">
                <div className="flex flex-1 min-h-0 overflow-hidden">
                    <NavigationBar setIsMenuOpen={setIsMenuOpen} />
                    <Sidebar PageMode={PageMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    
                    {
                        PageMode === "notes" ? 
                        <div className="flex-1 p-0 overflow-auto bg-neutral-50">
                        {children}
                        </div>
                        :   
                        <div className="flex-1 overflow-auto bg-neutral-50">
                        {children}
                        </div>
                    }
                </div>
            </div>
        </>
        
    );
};

export default Layout;
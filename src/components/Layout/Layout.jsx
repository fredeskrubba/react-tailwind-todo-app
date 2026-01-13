import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import LoadingIcon from '../LoadingIcon.jsx';
import useMainStore from '../../store/Mainstore.js';

const Layout = ({ PageMode, children }) => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoading = useMainStore((state) => state.isLoading);

    return (
        
        isLoading ? <LoadingIcon/> :
            <div className="flex flex-col h-screen">
                <Header setIsMenuOpen={setIsMenuOpen} />

                <div className="flex flex-1 min-h-0 overflow-hidden">
                    <Sidebar PageMode={PageMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="flex-1 p-6 overflow-auto bg-neutral-50">
                    {children}
                    </div>
                </div>
            </div>
        
    );
};

export default Layout;
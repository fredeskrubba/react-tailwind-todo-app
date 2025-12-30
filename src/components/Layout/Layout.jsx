import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
const Layout = ({ PageMode, children }) => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            <Header setIsMenuOpen={setIsMenuOpen} />

            <div className="flex flex-1 min-h-0 overflow-hidden">
                <Sidebar PageMode={PageMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                <div className="flex-1 p-6 overflow-auto">
                {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
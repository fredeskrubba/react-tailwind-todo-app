import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
const Layout = ({ type, children }) => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen">
        <Header setIsMenuOpen={setIsMenuOpen} />

        <div className="flex flex-1">
            <Sidebar type={type} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <div className="flex-1 p-6 overflow-auto">
            {children}
            </div>
        </div>
        </div>
    );
};

export default Layout;
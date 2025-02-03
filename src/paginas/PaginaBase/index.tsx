import React, { useState } from "react";
import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../components/BarraNavegacao/index.tsx"
import MenuLateral from "../../components/MenuLateral/index.tsx"

const PaginaBase = () => {
    
    const [expandido, setExpandido] = useState(false);
  
    const toggleMenu = () => {
        setExpandido(!expandido);
    };

    return (
        <div>
            <div className="appContainer">
                <BarraNavegacao toggleMenu={toggleMenu}/>
            </div>
            <div className="mainContainer">
                <MenuLateral menuExpandido={expandido} />
                <div className={`mainContent ${expandido ? 'expandido' : ''}`}>                    
                    <Outlet />
                </div>
            </div>
        </div>)
}

export default PaginaBase
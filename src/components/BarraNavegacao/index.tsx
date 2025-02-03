import React, { useState } from 'react';
import './BarraNavegacao.css';
import Logo from './assets/logo.png';
import { IoIosMenu } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { ImFilesEmpty } from "react-icons/im";

const BarraNavegacao = () => {
  const [expandido, setExpandido] = useState(false);

  const toggleMenu = () => {
    setExpandido(!expandido);
  };

  return (
    <div>
      <div className="barraNavegacao">
        <button onClick={toggleMenu} >          
          <IoIosMenu size={24} className='buttonIcon'/>
        </button>
        <img src={Logo} />
      </div>
      <div className={`menuLateral ${expandido ? 'expandido' : ''}`}>
        <div className="menuItem">          
          <span className="menuTexto">Início</span>
          <IoMdHome className="menuIcon" size={24}/>
        </div>
        <div className="menuItem">          
          <span className="menuTexto">Meus Documentos</span>
          <ImFilesEmpty className="menuIcon" size={24}/>
        </div>
        <div className="menuItem">          
          <span className="menuTexto" onClick={() => alert('teste')}>Informações</span>
          <IoInformationCircleOutline className="menuIcon" size={24}/>
        </div>
      </div>
    </div>
  );
}

export default BarraNavegacao;
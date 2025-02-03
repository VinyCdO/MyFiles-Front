import React from 'react';
import './BarraNavegacao.css';
import Logo from '../../assets/logo.png';
import { IoIosMenu } from "react-icons/io";

const BarraNavegacao = ({ toggleMenu }) => {
  
  return (
    <div>
      <div className="barraNavegacao">
        <button className='buttonMenuLateral' onClick={toggleMenu} >          
          <IoIosMenu size={24} className='buttonIcon'/>
        </button>
        <img src={Logo} alt="Logo da DocSpider"/>
      </div>      
    </div>
    
  );
}

export default BarraNavegacao;
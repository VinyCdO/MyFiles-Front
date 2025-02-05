import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { ImFilesEmpty } from "react-icons/im";
import Modal from '../ModalSobre/index.tsx';
import './menuLateral.css';

const MenuLateral = ({ menuExpandido }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`menuLateral ${menuExpandido ? 'expandido' : ''}`}>
      <Link to="/" className="link">
        <div className={`menuItem ${location.pathname === '/' ? ' active' : ''}`}>          
          <span className="menuTexto">Início</span>
          <IoMdHome className="menuIcon" size={24}/>
        </div>
      </Link>
      <Link to="/documentos" className="link">
        <div className={`menuItem ${location.pathname === '/documentos' ? ' active' : ''}`}>
          <span className="menuTexto">Meus Documentos</span>
          <ImFilesEmpty className="menuIcon" size={24}/>
        </div>
      </Link>
      <div className={`menuItem ${isModalOpen === true ? ' active' : ''}`} onClick={openModal}>          
        <span className="menuTexto" >Sobre</span>
        <IoInformationCircleOutline className="menuIcon" size={24}/>          
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );

}

export default MenuLateral;
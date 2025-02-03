import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { ImFilesEmpty } from "react-icons/im";
import Modal from '../ModalSobre/index.tsx';
import './menuLateral.css';

interface MenuLateralProps {
  menuExpandido: boolean;
}

const MenuLateral = ({ menuExpandido }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`menuLateral ${menuExpandido ? 'expandido' : ''}`}>
      <Link to="/marketing" className='link'>
        <div className="menuItem">          
          <span className="menuTexto">Início</span>
          <IoMdHome className="menuIcon" size={24}/>
        </div>
      </Link>
      <Link to="/arquivos" className='link'>
        <div className="menuItem">          
          <span className="menuTexto">Meus Documentos</span>
          <ImFilesEmpty className="menuIcon" size={24}/>
        </div>
      </Link>
      <div className="menuItem" onClick={openModal}>          
        <span className="menuTexto" >Sobre</span>
        <IoInformationCircleOutline className="menuIcon" size={24}/>          
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );

}

export default MenuLateral;
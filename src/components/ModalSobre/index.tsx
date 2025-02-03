import React from 'react';
import './modalSobre.css';
import Logo from '../../assets/logo.png';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="modalCloseButton" onClick={onClose}>
          &times;
        </button>
        <img src={Logo} className='modalLog' alt="Logo da DocSpider" />
        <p className="modalVersion">Versão 1.0.0</p>
      </div>
    </div>
  );
};

export default Modal;
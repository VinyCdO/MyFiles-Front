import React from 'react';
import ImagemDivulgacao from '../../assets/ImagemDivulgaçãoCopilot.png';
import './marketing.css';

export default function Marketing() {
  return (
    <div className='mainContent' >
      <div className='tituloMarketing'>
        <span className='rotaBase'>Início  {'>'}  </span>
        <span className='rotaAtual'>Marketing</span>
      </div>
      <div className='setorMarketing'>
        <img src={ImagemDivulgacao} alt="Imagem de divulgação" className='imgMarketing' />
      </div>
    </div>
  );
}
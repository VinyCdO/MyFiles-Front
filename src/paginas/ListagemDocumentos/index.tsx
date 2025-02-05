import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocumentos } from '../../services/documentos.js';
import { IDocumento } from '../../interfaces/IDocumento.js';
import Loading from '../../components/Loading/index.tsx';
import ModalAlerta from '../../components/ModalAlerta/index.tsx';
import './listagemDocumentos.css';

const FileList: React.FC = () => {
  const [documentos, setDocumentos] = useState<IDocumento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    fetchDocumentos();
  }
  , []);

  async function fetchDocumentos() {
    try {
      const response = await getDocumentos();
      if (response && Array.isArray(response)) {
        setDocumentos(response);
      } else {
        setModalMessage('Ocorreu um erro ao buscar o documento, dados da API em formato inválido.');
        setShowModal(true);
      }
      
    } catch (error) {
      setModalMessage('Ocorreu um erro ao buscar os documentos, tente novamente mais tarde.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }    
  }

  if (loading) {
    return <Loading />;
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (id: string) => {
    navigate(`/documentos/editar/${id}`);
  };

  return (
      <div className='mainContent' >
        <span className='rotaBase'>Início  {'>'}  </span>
        <span className='rotaAtual'>Meus Documentos</span>        
        <div className='headerContent'>
          <h3 className='titulo'>Meus Documentos</h3>
          <button className='addButton' onClick={() => navigate("/documentos/novo")}>Adicionar Documento</button>
        </div>
        <table className='fileTable'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Nome do Documento</th>
              <th>Data/Hora Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((documento) => (
              <tr key={documento._id || Math.random()}>
                <td>{documento.title}</td>
                <td>{documento.description}</td>
                <td>{documento.fileName}</td>
                <td>{new Date(documento.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDownload(documento.filePath)}>Download</button>
                  <button onClick={() => handleEdit(documento._id || '')}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
        {showModal && (
          <ModalAlerta
            titulo="Alerta"
            mensagem={modalMessage}
            onClose={closeModal}
          />
        )}
      </div>    
  );
};

export default FileList;
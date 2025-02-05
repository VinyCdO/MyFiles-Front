import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postDocumento, putDocumento, getDocumentoById, deleteDocumento } from '../../services/documentos';
import './formUploadDocumento.css';
import Loading from '../../components/Loading/index.tsx';
import ModalAlerta from '../../components/ModalAlerta/index.tsx';

const FormUploadDocumento: React.FC = () => {
  const { id } = useParams<{ id: string }>();  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [consulta, setConsulta] = useState<boolean>(false);
  const [excluido, setExcluido] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchDocumento = useCallback(async (id: string) => {
    try {
      const response = await getDocumentoById(id);
      if (response) {
        setTitle(response.title);
        setDescription(response.description);
        setFileUrl(response.filePath); 
        setFileName(response.fileName);
      } else {
        setModalMessage('Ocorreu um erro ao buscar o documento, dados da API em formato inválido.');
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Ocorreu um erro ao buscar o documento, tente novamente mais tarde.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchDocumento(id);
      setConsulta(true);
    } else {
      setLoading(false);
    }
  }, [id, fetchDocumento]);  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      
      const fileExtension = e.target.files[0].name.split('.').pop()?.toLowerCase();
      const invalidExtensions = ['exe', 'zip', 'bat'];

      if (fileExtension && invalidExtensions.includes(fileExtension)) {
        setModalMessage('Tipo de documento não permitido!');
        setShowModal(true);
        return;
      }

      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setModalMessage('Selecione um documento para enviar!');
      setShowModal(true);
      return;
    }

    await enviarDocumento(title, description, fileName, file);
  };

  async function enviarDocumento(title: string, description: string, fileName: string, file: File) {
    const formData = {
      title,
      description,
      filePath: '',
      fileName,
      createdAt: '',
      updatedAt: '',
    };
  
    try {
      const response = await postDocumento(formData);

      if (response && response.insertedId) {
        if (file) {
          const fileResponse = await putDocumento(response.insertedId, file);
          if (fileResponse) {            
            setModalMessage('Documento enviado com sucesso!');
            setShowModal(true);
            setTitle('');
            setDescription('');
            setFile(null);
            setFileName('');
          }
        }
      } else {      
        setModalMessage('Erro ao criar registro do Documento: ' + response.message);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Erro ao enviar documento: ' + error);
      setShowModal(true);
    }
  }  

  const handleExcluir = async () => {
    try {
      const response = await deleteDocumento(id);

      if (response) {
        setExcluido(true);
        setModalMessage('Documento excluído com sucesso!');
        setShowModal(true);       
      } else {      
        setModalMessage('Erro ao excluir registro do Documento: ' + response.message);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Erro ao enviar documento: ' + error);
      setShowModal(true);
    }
  }

  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditar = () => {
    setConsulta(false);    
  }

  if (loading) {
    return <Loading />;
  }

  const closeModal = () => {
    setShowModal(false);

    if (excluido) {
      navigate(-1);      
    }
  };

  return (
    <div>
      <div className='mainContent'>
        <span className='rotaBase'>Início  {'>'}  </span>      
        {id ? <span className='rotaAtual'>Meus Documentos  {'>'}  Editar</span> 
            : <span className='rotaAtual'>Meus Documentos  {'>'}  Novo</span>}
      </div>

      <form className="formUpload" onSubmit={handleSubmit}>      
        <div className="formGroup">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={consulta}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={consulta}
          />
        </div>      
        <div className="formGroup">
          <label htmlFor="fileName">Nome do Documento</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            disabled
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="file">Documento</label>          
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              disabled={consulta}
            />
            {fileUrl && (
              <button type='button' className='buttonDownload' onClick={() => handleDownload(fileUrl)}>                
                Baixar documento existente: {fileName}
              </button>
            )}
        </div>
        <div className="formFooter">
          {!consulta && (
            <button type="submit">Enviar</button>
          )}
          {consulta && (
            <button type="button" onClick={handleEditar}>Editar</button>
          )}
          {consulta && (
            <button type="button" className='buttonExcluir' onClick={handleExcluir}>Excluir</button>
          )}
          <button type="button" className='buttonCancelar' onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
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

export default FormUploadDocumento;


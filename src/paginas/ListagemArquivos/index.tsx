import React, { useEffect, useState } from 'react';
import { getArquivos } from '../../services/arquivos.js';
import { IArquivo } from '../../interfaces/IArquivo.ts';
import './listagemArquivos.css';
import { useNavigate } from 'react-router-dom';

const FileList: React.FC = () => {
  const [arquivos, setArquivos] = useState<IArquivo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let navigate = useNavigate();

  useEffect(() => {
    fetchArquivos();
  }
  , []);

  async function fetchArquivos() {
    try {
      const response = await getArquivos();
      if (response && Array.isArray(response)) {
        setArquivos(response);
      } else {
        console.error("Resposta da API em formato incorreto:", response);
        setError("Ocorreu um erro ao buscar os arquivos, dados da API em formato inválido.");
      }
      
    } catch (error) {
      setError('Ocorreu um erro ao buscar os arquivos, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }    
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const handleEdit = (id: string) => {
  //   // Lógica para editar o arquivo com o ID fornecido
  //   console.log(`Editar arquivo com ID: ${id}`);
  // };

  return (
      <div className='mainContent' >
        <span className='rotaBase'>Início  {'>'}  </span>
        <span className='rotaAtual'>Meus Documentos</span>        
        <div className='headerContent'>
          <h3 className='titulo'>Meus Documentos</h3>
          <button className='addButton' onClick={() => navigate("/arquivos/novo")}>Adicionar Arquivo</button>
        </div>
        <table className='fileTable'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Nome do Arquivo</th>
              <th>Data/Hora Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {arquivos.map((arquivo) => (
              <tr key={arquivo.id}>
                <td>{arquivo.title}</td>
                <td>{arquivo.description}</td>
                <td>{arquivo.fileName}</td>
                <td>{new Date(arquivo.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDownload(arquivo.filePath)}>Download</button>
                  {/* <button onClick={() => handleEdit(arquivo.id)}>Editar</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
      </div>    
  );
};

export default FileList;
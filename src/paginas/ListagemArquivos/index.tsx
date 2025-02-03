import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IArquivo } from '../../interfaces/IArquivo.ts';
import './listagemArquivos.css';

const FileList: React.FC = () => {
  const [arquivos, setArquivos] = useState<IArquivo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    axios.get('http://localhost:8000/arquivos')
      .then(response => {
        setArquivos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError('Erro ao carregar arquivos');
        setLoading(false);
      });
  }, []);

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

  const handleEdit = (id: string) => {
    // Lógica para editar o arquivo com o ID fornecido
    console.log(`Editar arquivo com ID: ${id}`);
  };

  return (
      <div className='mainContent' >
        <span className='rotaBase'>Início  {'>'}  </span>
        <span className='rotaAtual'>Meus Documentos</span>
        <h3 className='titulo'>Meus Documentos</h3>
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
            {arquivos.map(arquivo => (
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
import React, { useState } from 'react';
import { postArquivo, putArquivo } from '../../services/arquivos';
import './formUploadArquivo.css';

const FormUploadArquivo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      
      const fileExtension = e.target.files[0].name.split('.').pop()?.toLowerCase();
      const invalidExtensions = ['exe', 'zip', 'bat'];

      if (fileExtension && invalidExtensions.includes(fileExtension)) {
        alert('Tipo de arquivo não permitido!');
        return;
      }
      
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert('Selecione um arquivo para enviar!');
      return;
    }

    await enviarArquivo(title, description, fileName, file);
  };

  async function enviarArquivo(title: string, description: string, fileName: string, file: File) {
    const formData = {
      title,
      description,
      file: '',
      fileName,
      createdAt: '',
      updatedAt: '',
    };
  
    try {
      const response = await postArquivo(formData);

      if (response && response._id) {
        if (file) {
          const fileResponse = await putArquivo(response._id, file);
          if (fileResponse) {            
            alert('Arquivo enviado com sucesso!');
            setTitle('');
            setDescription('');
            setFile(null);
            setFileName('');
          }
        }
      } else {      
        alert('Erro ao criar registro do Arquivo: ' + response.message);
      }
    }
    catch (error) {
      alert('Erro ao enviar arquivo: ' + error.message);
    }
  }  

  return (
    <form className="formUpload" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="formGroup">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>      
      <div className="formGroup">
        <label htmlFor="fileName">Nome do Arquivo</label>
        <input
          type="text"
          id="fileName"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          readOnly
          required
        />
      </div>
      <div className="formGroup">
        <label htmlFor="file">Arquivo</label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormUploadArquivo;


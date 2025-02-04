import axios from 'axios';

const arquivosAPI = "http://localhost:8000/arquivos";

async function getArquivos() {
  try {
    const response = await axios.get(arquivosAPI);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar arquivos: ", error);
    throw error;
  }	
}

async function postArquivo(arquivo) {
  try {
    const response = await axios.post(arquivosAPI, arquivo);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar arquivo: ", error);
    throw error;
  }
}

async function deleteArquivo(id) {
  try {
    const response = await axios.delete(`${arquivosAPI}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir arquivo: ", error);
    throw error;
  }
}

async function putArquivo(id, arquivo) {
  try {
    const formData = new FormData();
    if (arquivo) {
      formData.append('arquivo', arquivo);
    }

    const response = await axios.put(`${arquivosAPI}/upload/${id}`, formData, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar arquivo: ", error);
    throw error;
  }
}

export { getArquivos, postArquivo, deleteArquivo, putArquivo };
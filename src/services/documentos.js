import axios from 'axios';

const documentosAPI = "http://localhost:8000/documentos";

async function getDocumentos() {
  try {
    const response = await axios.get(documentosAPI);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar documentos: ", error);
    throw error.response.data.Erro;
  }	
}

async function getDocumentoById(id) {
  try {
    const response = await axios.get(`${documentosAPI}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar documento: ", error);
    throw error.response.data.Erro;
  }  
}

async function postDocumento(documento) {
  try {
    const response = await axios.post(documentosAPI, documento);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar documento: ", error);  
    throw error.response.data.Erro;
  }
}

async function putDocumento(id, documento) {
  try {
    const response = await axios.put(`${documentosAPI}/${id}`, documento);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar documento: ", error);  
    throw error.response.data.Erro;
  }
}

async function deleteDocumento(id) {
  try {
    const response = await axios.delete(`${documentosAPI}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir documento: ", error);
    throw error.response.data.Erro;
  }
}

async function putFileDocumento(id, documento) {
  try {
    const formData = new FormData();
    if (documento) {
      formData.append('documento', documento);
    }

    const response = await axios.put(`${documentosAPI}/upload/${id}`, formData, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar documento: ", error);
    throw error.response.data.Erro;
  }
}

export { getDocumentos, getDocumentoById, postDocumento, deleteDocumento, putDocumento, putFileDocumento };
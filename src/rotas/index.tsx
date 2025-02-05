import { Route, Routes } from "react-router-dom";
import React from "react";
import PaginaBase from "../paginas/PaginaBase/index.tsx";
import ListagemDocumentos from "../paginas/ListagemDocumentos/index.tsx";
import Marketing from "../paginas/Marketing/index.tsx";
import FormUploadDocumento from "../paginas/FormUploadDocumento/index.tsx";

const Rotas = () => {
  
  return (
    <Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='/' element={<Marketing />} />
        <Route path='/documentos' element={<ListagemDocumentos />} />
        <Route path='/documentos/novo' element={<FormUploadDocumento />} />
        <Route path='/documentos/editar/:id' element={<FormUploadDocumento />} />
      </Route>
    </Routes>
  );
}

export default Rotas;
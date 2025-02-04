import { Route, Routes } from "react-router-dom";
import React from "react";
import PaginaBase from "../paginas/PaginaBase/index.tsx";
import ListagemArquivos from "../paginas/ListagemArquivos/index.tsx";
import Marketing from "../paginas/Marketing/index.tsx";
import FormUploadArquivo from "../paginas/FormUploadArquivo/index.tsx";

const Rotas = () => {
  
  return (
    <Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='/marketing' element={<Marketing />} />
        <Route path='/arquivos' element={<ListagemArquivos />} />
        <Route path='/arquivos/novo' element={<FormUploadArquivo />} />
      </Route>
    </Routes>
  );
}

export default Rotas;
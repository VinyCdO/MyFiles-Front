import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import PaginaBase from "../paginas/PaginaBase/index.tsx";
import ListagemArquivos from "../paginas/ListagemArquivos/index.tsx";
import Marketing from "../paginas/Marketing/index.tsx";

const Rotas = () => {
  
  return (
    <Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='/marketing' element={<Marketing />} />
        <Route path='/arquivos' element={<ListagemArquivos />} />
      </Route>
    </Routes>
  );
}

export default Rotas;
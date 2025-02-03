import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './rotas/index.tsx';

function App() {
  
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
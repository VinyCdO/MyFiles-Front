import { BrowserRouter } from 'react-router-dom';
import Rotas from './rotas/index.tsx';
import React from 'react';

function App() {  
  return (<BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../components/BarraNavegacao/index.tsx"
// import Rodape from "../../componentes/Rodape"

const PaginaBase = () => {
    return (<main>
        <BarraNavegacao />
        <Outlet />
        {/* <Rodape /> */}
    </main>)
}

export default PaginaBase
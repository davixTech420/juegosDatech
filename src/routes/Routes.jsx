import React from "react";
import { Routes,Route } from "react-router-dom";
import Games from "../components/pages/Games";
import Carrito from "../components/pages/cliente/Carrito";

export function PublicRoutes() {
    return(
    <Routes>
        <Route path="/Games" element={<Games />}/>
        <Route path="/Carrito" element={ <Carrito /> } />
    </Routes>
    );
}
export function ClienteRoutes() {
    return(
    <Routes>
        <Route path="dashboard" element={<div>hello world</div>}></Route>
    </Routes>
    );
    
}


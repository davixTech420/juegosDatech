import React from "react";
import { Routes,Route } from "react-router-dom";
import Games from "../components/pages/Games";
import Carrito from "../components/pages/cliente/Carrito";
import Registrar from "../components/pages/auth/Registrar";
import Login from "../components/pages/auth/Login";
import  Dashboard from "../components/pages/cliente/Dahsboard";

export function PublicRoutes() {
    return(
    <Routes>
        <Route path="/Games" element={<Games />}/>
        <Route path='/Registrar' element={ <Registrar /> } />
        < Route path='/Login' element={ <Login /> } />
    </Routes>
    );
}
export function ClienteRoutes() {
    return(
    <Routes>
        <Route path="dashboard" element={<Dashboard/>}></Route>
        <Route path="carrito" element={ <Carrito /> } />
    </Routes>
    );
    
}


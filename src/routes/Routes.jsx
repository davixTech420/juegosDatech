import React from "react";
import { Routes,Route } from "react-router-dom";
import Games from "../components/pages/Games";

export function PublicRoutes() {
    return(
    <Routes>
        <Route path="/Games" element={<Games />}/>
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


import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import Navbar from "./Navbar";

const App =  () => {
    return (
        <Routes>
            <Route path="home" element={
                <>
                    <Navbar />
                    <h1>Hello World!</h1>
                </>
            }/>
            <Route path="*" element={<Navigate to='home'/>} />
        </Routes>
    );
}

export default App;

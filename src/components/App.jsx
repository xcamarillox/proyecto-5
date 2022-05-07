import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


const App =  () => {
    return (
        <>
            <Routes>
                <Route path="home" element={
                    <div>
                        <h1>Hello World!</h1>
                    </div>
                }/>
                <Route path="*" element={<Navigate to='home'/>} />
            </Routes>
        </>
    );
}

export default App;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter , Routes, Route } from "react-router-dom";
//import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css';
import './styles/main.css';
import { AppProvider } from "./context/AppContext.jsx"
import App from './components/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <HashRouter >
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter >
    </AppProvider>
  </React.StrictMode>
);
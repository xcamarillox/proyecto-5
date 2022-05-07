import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter , Routes, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import './styles/main.css';
import App from './components/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HashRouter >
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter >
  </React.StrictMode>
);
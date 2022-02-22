import React from 'react';
import './App.css';
import { Router } from './Router';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router />
    </BrowserRouter>
  );
}

export default React.memo(App);

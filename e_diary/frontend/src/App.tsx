import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header/Header';
import AppRouters from './Routers/AppRouters';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <AppRouters/>
      </Router>
    </div>
  );
}

export default App;

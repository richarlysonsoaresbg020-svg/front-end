import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import UserCreate from "./pages2/EpCreate";
import UserEdit from "./pages/UserEdit";
import EpList from "./pages2/EpList";
import EpEdit from "./pages2/EpEdit";
import EpCreate from "./pages/UserCreate";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <nav className='navbar'>
        <Link to="/">Haikyuu</Link>
        <Link to="/create">Adicionar Personagem</Link>
        <Link to="/episodios">Episodios</Link>
        <Link to="/">Escritores</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/create" element={<UserCreate/>} />
        <Route path="/edit/:id" element={<UserEdit/>} />
        <Route path="/episodios" element={<EpList/>} />
        <Route path="/episodios/create" element={<EpCreate/>} />
        <Route path="/episodios/edit/:id" element={<EpEdit/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

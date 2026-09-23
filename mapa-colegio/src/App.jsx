import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MapaPage from './pages/MapaPage';
import DashboardRobot from './components/DashboardRobot';
import AccesoModal from './service/AccesoModal';

export default function App() {
  const [usuario, setUsuario] = useState(() => {
    const rol = localStorage.getItem('rol_usuario');
    const salon = localStorage.getItem('salon_activo');
    return rol ? { rol, salon } : null;
  });

  const manejarIngreso = (datos) => {
    setUsuario(datos);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('rol_usuario');
    localStorage.removeItem('salon_activo');
    setUsuario(null);
  };

  if (!usuario) {
    return <AccesoModal onIngresar={manejarIngreso} />;
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
        <Navbar usuario={usuario} onCerrarSesion={cerrarSesion} />
        
        <main style={{ flex: 1, position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapa" element={<MapaPage />} />
            <Route path="/estadisticas" element={<DashboardRobot />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
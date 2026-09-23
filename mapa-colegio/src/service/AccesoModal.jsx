import React, { useState } from 'react';
import { School, User, Lock, ArrowRight } from 'lucide-react';

export default function AccesoModal({ onIngresar }) {
  const [tipoAcceso, setTipoAcceso] = useState(null);
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  // Claves para los salones del 3 al 11
  const clavesValidas = {
    // Claves numéricas directas y con prefijo "salon"
    '3': 'salon_3', 'salon3': 'salon_3', 'salon 3': 'salon_3',
    '4': 'salon_4', 'salon4': 'salon_4', 'salon 4': 'salon_4',
    '5': 'salon_5', 'salon5': 'salon_5', 'salon 5': 'salon_5',
    '6': 'salon_6', 'salon6': 'salon_6', 'salon 6': 'salon_6',
    '7': 'salon_7', 'salon7': 'salon_7', 'salon 7': 'salon_7',
    '8': 'salon_8', 'salon8': 'salon_8', 'salon 8': 'salon_8',
    '9': 'salon_9', 'salon9': 'salon_9', 'salon 9': 'salon_9',
    '10': 'salon_10', 'salon10': 'salon_10', 'salon 10': 'salon_10',
    '11': 'salon_11', 'salon11': 'salon_11', 'salon 11': 'salon_11',
    'colsam': 'salon_colsam', 'admin': 'salon_admin'
  };

  const manejarIngresoSalon = (e) => {
    e.preventDefault();
    
    // Quita espacios y pasa a minúsculas
    const claveLimpia = clave.trim().toLowerCase();

    if (clavesValidas[claveLimpia]) {
      const salon = clavesValidas[claveLimpia];
      localStorage.setItem('rol_usuario', 'salon');
      localStorage.setItem('salon_activo', salon);
      onIngresar({ rol: 'salon', salon });
    } else {
      setError(`Clave inválida. Ingresa el número de salón (del 3 al 11).`);
    }
  };

  const manejarIngresoInvitado = () => {
    localStorage.setItem('rol_usuario', 'invitado');
    localStorage.removeItem('salon_activo');
    onIngresar({ rol: 'invitado', salon: 'invitado' });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '30px', maxWidth: '400px', width: '100%', color: '#fff', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#38bdf8' }}>
          Bienvenido a EcoBot
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '25px' }}>
          Selecciona cómo deseas ingresar a la plataforma:
        </p>

        {!tipoAcceso && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              type="button"
              onClick={() => { setTipoAcceso('salon'); setError(''); }}
              style={{ padding: '14px', borderRadius: '10px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1rem' }}
            >
              <School size={20} /> Ingresar como Salón
            </button>

            <button
              type="button"
              onClick={manejarIngresoInvitado}
              style={{ padding: '14px', borderRadius: '10px', border: '1px solid #475569', backgroundColor: '#334155', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1rem' }}
            >
              <User size={20} /> Entrar como Invitado (Solo Lectura)
            </button>
          </div>
        )}

        {tipoAcceso === 'salon' && (
          <form onSubmit={manejarIngresoSalon} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>
                Ingresa el número de tu salón (3 al 11):
              </label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0 12px' }}>
                <Lock size={18} color="#64748b" />
                <input
                  type="text"
                  value={clave}
                  onChange={(e) => { setClave(e.target.value); setError(''); }}
                  placeholder="Ej: 3, 4, 5... hasta 11"
                  style={{ width: '100%', padding: '12px', background: 'none', border: 'none', color: '#fff', outline: 'none' }}
                  autoFocus
                />
              </div>
            </div>

            {error && <span style={{ color: '#f87171', fontSize: '0.85rem', display: 'block' }}>{error}</span>}

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => { setTipoAcceso(null); setError(''); setClave(''); }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#475569', color: '#fff', cursor: 'pointer' }}
              >
                Volver
              </button>
              <button
                type="submit"
                style={{ flex: 2, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                Entrar <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
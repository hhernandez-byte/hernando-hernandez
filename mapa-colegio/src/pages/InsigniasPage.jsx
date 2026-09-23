import React, { useState } from 'react';
import { Trophy, Key, Star, Award, CheckCircle, Lock, ShieldCheck } from 'lucide-react';

const TODAS_LAS_INSIGNIAS = [
  { id: 'ins_1', titulo: 'Explorador Novato', desc: 'Ingresa la clave de tu salón por primera vez', icono: '🌱', xp: 50, color: 'linear-gradient(135deg, #10b981, #059669)', requiereClave: true },
  { id: 'ins_2', titulo: 'Defensor de Aula', desc: 'Identifica al menos 1 invasor en el mapa', icono: '🛡️', xp: 100, color: 'linear-gradient(135deg, #0284c7, #2563eb)', requiereClave: true },
  { id: 'ins_3', titulo: 'EcoGuardián Leyenda', desc: 'Mantiene limpio el sector de la cancha', icono: '👑', xp: 250, color: 'linear-gradient(135deg, #f59e0b, #d97706)', requiereClave: true },
  { id: 'ins_4', titulo: 'Especialista EcoBot', desc: 'Revisa las estadísticas 3 días seguidos', icono: '🤖', xp: 150, color: 'linear-gradient(135deg, #8b5cf6, #4f46e5)', requiereClave: false },
  { id: 'ins_5', titulo: 'Limpiador Maestro', desc: 'Registra 5 invasores eliminados', icono: '🔥', xp: 300, color: 'linear-gradient(135deg, #ef4444, #dc2626)', requiereClave: true },
  { id: 'ins_6', titulo: 'Héroe del Colegio', desc: 'Desbloquea todos los logros de tu salón', icono: '⭐', xp: 500, color: 'linear-gradient(135deg, #ec4899, #c026d3)', requiereClave: true },
];

export default function InsigniasPage() {
  const [claveIngresada, setClaveIngresada] = useState('');
  const [salonActivo, setSalonActivo] = useState(localStorage.getItem('clave_salon') || '');
  const [insigniasDesbloqueadas, setInsigniasDesbloqueadas] = useState(
    JSON.parse(localStorage.getItem('insignias_usuario')) || ['ins_4']
  );

  const handleIngresarClave = (e) => {
    e.preventDefault();
    if (!claveIngresada.trim()) return;

    const claveFormateada = claveIngresada.trim().toUpperCase();
    localStorage.setItem('clave_salon', claveFormateada);
    setSalonActivo(claveFormateada);

    if (!insigniasDesbloqueadas.includes('ins_1')) {
      const nuevas = [...insigniasDesbloqueadas, 'ins_1', 'ins_2'];
      setInsigniasDesbloqueadas(nuevas);
      localStorage.setItem('insignias_usuario', JSON.stringify(nuevas));
    }
    setClaveIngresada('');
  };

  const porcentajeProgreso = Math.round((insigniasDesbloqueadas.length / TODAS_LAS_INSIGNIAS.length) * 100);

  return (
    <div style={{ backgroundColor: '#090d16', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif" }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* BANNER ESTILO VIDEOJUEGO */}
        <div style={{
          background: 'linear-gradient(135deg, #4c1d95, #1e1b4b)',
          borderRadius: '24px',
          padding: '25px',
          border: '4px solid #facc15',
          boxShadow: '0 0 25px rgba(250, 204, 21, 0.4)',
          marginBottom: '25px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ backgroundColor: '#facc15', padding: '15px', borderRadius: '20px', color: '#0f172a' }}>
              <Trophy size={40} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', color: '#facc15', textShadow: '2px 2px 0px #000' }}>
                SALA DE INSIGNIAS
              </h1>
              <p style={{ margin: 0, color: '#38bdf8', fontWeight: 'bold' }}>
                {salonActivo ? `🎮 Salón Activo: ${salonActivo}` : '⚡ ¡Ingresa tu salón para jugar!'}
              </p>
            </div>
          </div>

          {/* BARRA DE PROGRESO */}
          <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '16px', border: '2px solid #334155', minWidth: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#facc15' }}>
              <span>Nivel Guardián</span>
              <span style={{ color: '#34d399' }}>{porcentajeProgreso}%</span>
            </div>
            <div style={{ backgroundColor: '#1e293b', height: '16px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #475569' }}>
              <div style={{ backgroundColor: '#34d399', width: `${porcentajeProgreso}%`, height: '100%', transition: 'width 0.5s ease', boxShadow: '0 0 10px #34d399' }} />
            </div>
          </div>
        </div>

        {/* INPUT TIPO CLAVE GAMER */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '18px', padding: '20px', border: '2px solid #0284c7', marginBottom: '30px' }}>
          <form onSubmit={handleIngresarClave} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#38bdf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={20} /> Clave del Salón:
            </span>
            <input
              type="text"
              placeholder="EJ: 5A, 11B..."
              value={claveIngresada}
              onChange={(e) => setClaveIngresada(e.target.value)}
              style={{
                flex: '1',
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #38bdf8',
                backgroundColor: '#0f172a',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                outline: 'none',
                minWidth: '150px'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #facc15, #f59e0b)',
                color: '#0f172a',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '900',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 0px #b45309'
              }}
            >
              <ShieldCheck size={20} /> VINCULAR
            </button>
          </form>
        </div>

        {/* GRILLA DE CARTAS / LOGROS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {TODAS_LAS_INSIGNIAS.map((ins) => {
            const estaDesbloqueada = insigniasDesbloqueadas.includes(ins.id);

            return (
              <div
                key={ins.id}
                style={{
                  backgroundColor: estaDesbloqueada ? '#1e293b' : '#0f172a',
                  borderRadius: '20px',
                  padding: '20px',
                  border: estaDesbloqueada ? '3px solid #facc15' : '2px dashed #334155',
                  opacity: estaDesbloqueada ? 1 : 0.6,
                  boxShadow: estaDesbloqueada ? '0 0 15px rgba(250, 204, 21, 0.2)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{
                      background: ins.color,
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '30px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
                    }}>
                      {ins.icono}
                    </div>
                    <span style={{ backgroundColor: '#0f172a', border: '1px solid #facc15', color: '#facc15', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                      +{ins.xp} XP
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#fff' }}>{ins.titulo}</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4' }}>{ins.desc}</p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 'bold' }}>
                  {estaDesbloqueada ? (
                    <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={16} /> ¡DESBLOQUEADO!
                    </span>
                  ) : (
                    <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={16} /> Bloqueado (Ingresa Clave)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
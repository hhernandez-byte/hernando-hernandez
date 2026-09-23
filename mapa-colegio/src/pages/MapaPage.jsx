import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { MapPin, Plus, Trash2, Bug, School, Eye } from 'lucide-react';

export default function MapaPage() {
  const rol = localStorage.getItem('rol_usuario');
  const esInvitado = rol === 'invitado';

  const [salonActivo, setSalonActivo] = useState(
    localStorage.getItem('salon_activo') || 'salon_3'
  );
  
  const [marcadores, setMarcadores] = useState([]);
  const mapaRef = useRef(null);

  // Sincronizar salón activo y cargar marcadores específicos
  useEffect(() => {
    const checkSalonInterval = setInterval(() => {
      const actual = localStorage.getItem('salon_activo') || 'salon_3';
      if (actual !== salonActivo) {
        setSalonActivo(actual);
      }
    }, 500);

    const guardados = localStorage.getItem(`invasores_${salonActivo}`);
    if (guardados) {
      setMarcadores(JSON.parse(guardados));
    } else {
      setMarcadores([
        { id: '1', nombre: 'Invasor 1', x: 230, y: 280, color: '#ef4444' }
      ]);
    }

    return () => clearInterval(checkSalonInterval);
  }, [salonActivo]);

  // Guardar marcadores en localStorage (solo si no es invitado)
  const guardarEnStorage = (nuevosMarcadores) => {
    if (esInvitado) return;
    setMarcadores(nuevosMarcadores);
    localStorage.setItem(`invasores_${salonActivo}`, JSON.stringify(nuevosMarcadores));
  };

  // Agregar invasor
  const agregarInvasor = () => {
    if (esInvitado) return;
    const siguienteNumero = marcadores.length + 1;
    const nuevoInvasor = {
      id: Date.now().toString(),
      nombre: `Invasor ${siguienteNumero}`,
      x: 350,
      y: 200,
      color: '#ef4444'
    };

    const actualizados = [...marcadores, nuevoInvasor];
    guardarEnStorage(actualizados);
  };

  // Mover invasor
  const actualizarPosicion = (id, d) => {
    if (esInvitado) return;
    const actualizados = marcadores.map((m) =>
      m.id === id ? { ...m, x: d.x, y: d.y } : m
    );
    guardarEnStorage(actualizados);
  };

  // Eliminar invasor
  const eliminarMarcador = (id) => {
    if (esInvitado) return;
    const actualizados = marcadores.filter((m) => m.id !== id);
    guardarEnStorage(actualizados);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px)', width: '100vw', backgroundColor: '#0f172a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      
      {/* PANEL DE CONTROL IZQUIERDO */}
      <div style={{ width: '320px', padding: '20px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: '#38bdf8' }}>
            <MapPin color="#38bdf8" /> Mapa Interactivo
          </h2>
          
          <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#0f172a', borderRadius: '6px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: esInvitado ? '#f59e0b' : '#38bdf8' }}>
            {esInvitado ? <Eye size={16} /> : <School size={16} />}
            <span>
              {esInvitado 
                ? <strong>Modo Invitado (Solo Lectura)</strong> 
                : <>Registrando para: <strong>Salón {salonActivo.replace('salon_', '').toUpperCase()}</strong></>
              }
            </span>
          </div>
        </div>

        {/* BOTÓN AGREGAR INVASOR: Oculto para Invitados */}
        {!esInvitado && (
          <button
            onClick={agregarInvasor}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '15px',
              boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
            }}
          >
            <Plus size={20} /> Agregar Invasor
          </button>
        )}

        {/* LISTA DE INVASORES */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bug size={16} color="#ef4444" /> Invasores ({marcadores.length})
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {marcadores.map((m) => (
              <li key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#334155', borderRadius: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: m.color }} />
                  {m.nombre}
                </span>

                {/* Botón borrar oculto para Invitados */}
                {!esInvitado && (
                  <button
                    onClick={() => eliminarMarcador(m.id)}
                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '4px' }}
                    title="Eliminar invasor"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ÁREA PRINCIPAL DEL MAPA SVG VECTORIAL */}
      <div style={{ flex: 1, position: 'relative', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div ref={mapaRef} style={{ position: 'relative', width: '1000px', height: '780px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}>
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 780" width="100%" height="100%" style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAnchor: 'middle' }}>
            <defs>
              <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="20%" stopColor="#ff7f00" />
                <stop offset="40%" stopColor="#ffff00" />
                <stop offset="60%" stopColor="#00ff00" />
                <stop offset="80%" stopColor="#0000ff" />
                <stop offset="100%" stopColor="#8b00ff" />
              </linearGradient>
            </defs>

            {/* EDIFICIOS Y ESPACIOS DEL MAPA */}
            <rect x="140" y="30" width="230" height="130" rx="10" fill="#ffffff" stroke="#2563eb" strokeWidth="3"/>
            <text x="255" y="100" fill="#1e3a8a" fontSize="18">IGLESIA</text>

            <g stroke="#475569" strokeWidth="2" fill="#ffffff">
              <rect x="390" y="30" width="50" height="130"/>
              <rect x="440" y="30" width="50" height="130"/>
              <rect x="490" y="30" width="50" height="130"/>
              <rect x="540" y="30" width="50" height="130"/>
              <rect x="590" y="30" width="50" height="130"/>
              <rect x="640" y="30" width="50" height="130"/>
            </g>
            <g fill="#334155" fontSize="11">
              <text x="415" y="100">AULA 1</text>
              <text x="465" y="100">AULA 2</text>
              <text x="515" y="100">AULA 3</text>
              <text x="565" y="100">AULA 4</text>
              <text x="615" y="100">AULA 5</text>
              <text x="665" y="100">AULA 6</text>
            </g>

            <rect x="705" y="30" width="130" height="130" rx="8" fill="#fafafa" stroke="url(#rainbow)" strokeWidth="4"/>
            <text x="770" y="100" fill="#d97706" fontSize="14">PRE ESCOLAR</text>

            <g stroke="#475569" strokeWidth="2" fill="#ffffff">
              <rect x="15" y="260" width="120" height="75" rx="5"/>
              <rect x="15" y="350" width="120" height="75" rx="5"/>
              <rect x="15" y="525" width="120" height="70" rx="5"/>
              <rect x="15" y="605" width="120" height="70" rx="5"/>
              <rect x="15" y="685" width="120" height="70" rx="5"/>
            </g>
            <g fill="#334155" fontSize="12">
              <text x="75" y="302">AULA 9</text>
              <text x="75" y="392">AULA</text>
              <text x="75" y="565">AULA 10</text>
              <text x="75" y="645">AULA 11</text>
              <text x="75" y="725">OFICINAS</text>
            </g>

            <rect x="15" y="440" width="120" height="70" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
            <text x="75" y="480" fill="#15803d" fontSize="11">SALA SISTEMAS 2</text>

            <rect x="165" y="260" width="160" height="460" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="3"/>
            <line x1="165" y1="490" x2="325" y2="490" stroke="#16a34a" strokeWidth="2"/>
            <circle cx="245" cy="490" r="40" fill="none" stroke="#16a34a" strokeWidth="2"/>
            <text x="245" y="380" fill="#15803d" fontSize="16">CANCHA</text>

            <rect x="200" y="730" width="90" height="35" rx="5" fill="#ffffff" stroke="#334155" strokeWidth="2"/>
            <text x="245" y="752" fill="#334155" fontSize="12">PORTERÍA</text>

            <rect x="350" y="180" width="360" height="50" rx="10" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6,6"/>
            <text x="530" y="210" fill="#ea580c" fontSize="14">ÁREA DE DESCANSO</text>

            <g stroke="#f97316" strokeWidth="2" fill="none">
              <rect x="335" y="300" width="15" height="100" rx="3"/>
              <rect x="335" y="500" width="15" height="100" rx="3"/>
            </g>
            <text x="342" y="350" fill="#ea580c" fontSize="10" writingMode="tb">GRADAS</text>
            <text x="342" y="550" fill="#ea580c" fontSize="10" writingMode="tb">GRADAS</text>

            <rect x="365" y="395" width="80" height="240" rx="15" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="6,6"/>
            <text x="405" y="520" fill="#15803d" fontSize="14">PARQUE</text>

            <rect x="365" y="650" width="70" height="40" rx="5" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,4"/>
            <text x="400" y="675" fill="#ea580c" fontSize="10">MESITA 8</text>

            <circle cx="510" cy="670" r="35" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5"/>
            <text x="510" y="674" fill="#d97706" fontSize="12">KIOSCO</text>

            <polygon points="510,315 535,325 545,350 535,375 510,385 485,375 475,350 485,325" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2"/>
            <text x="510" y="355" fill="#0369a1" fontSize="12">FUENTE</text>

            <g stroke="#475569" strokeWidth="2" fill="#ffffff">
              <rect x="575" y="275" width="50" height="150"/>
              <rect x="625" y="275" width="50" height="150"/>
              <rect x="675" y="275" width="50" height="150"/>
            </g>
            <g fill="#334155" fontSize="11">
              <text x="600" y="350">AULA</text>
              <text x="650" y="350">AULA</text>
              <text x="700" y="350">AULA</text>
            </g>

            <rect x="560" y="425" width="180" height="25" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4"/>
            <text x="650" y="442" fill="#64748b" fontSize="10">PASILLO</text>

            <rect x="585" y="458" width="130" height="175" rx="8" fill="#18181b" stroke="#f97316" strokeWidth="3"/>
            <text x="650" y="550" fill="#f97316" fontSize="13">CASA CURAL</text>

            <rect x="650" y="650" width="130" height="100" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="3"/>
            <text x="715" y="705" fill="#c2410c" fontSize="14">CAFETERÍA</text>

            <rect x="800" y="180" width="170" height="75" rx="5" fill="#fff1f2" stroke="#e11d48" strokeWidth="2"/>
            <text x="885" y="223" fill="#be123c" fontSize="14">ENFERMERÍA</text>

            <rect x="800" y="280" width="170" height="135" rx="5" fill="#faf5ff" stroke="#a855f7" strokeWidth="2"/>
            <text x="885" y="350" fill="#7e22ce" fontSize="14">COORDINACIÓN</text>

            <rect x="800" y="430" width="170" height="110" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
            <text x="885" y="490" fill="#15803d" fontSize="14">SISTEMAS 1</text>

            <rect x="800" y="550" width="170" height="100" rx="5" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2"/>
            <text x="885" y="605" fill="#be185d" fontSize="14">BIBLIOTECA</text>

            <rect x="800" y="660" width="170" height="85" rx="5" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2"/>
            <text x="885" y="710" fill="#0369a1" fontSize="14">BAÑOS</text>
          </svg>

          {/* MARCADORES (Deshabilitados para arrastrar si es invitado) */}
          {marcadores.map((m) => (
            <Rnd
              key={m.id}
              bounds="parent"
              position={{ x: m.x, y: m.y }}
              onDragStop={(e, d) => actualizarPosicion(m.id, d)}
              disableDragging={esInvitado}
              enableResizing={false}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: `2px solid ${m.color}`,
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                  cursor: esInvitado ? 'default' : 'grab',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                <MapPin size={16} color={m.color} fill={m.color} />
                <span>{m.nombre}</span>
              </div>
            </Rnd>
          ))}
        </div>
      </div>
    </div>
  );
}
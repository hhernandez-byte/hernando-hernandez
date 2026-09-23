import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Leaf, ShieldCheck, Mail, Phone, MapPin as LocationIcon } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 60px)', backgroundColor: '#0f172a', color: '#ffffff' }}>
      
      {/* BANNER PRINCIPAL CON TEMÁTICA ECOLÓGICA */}
      <section 
        style={{
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>
          <Leaf size={16} /> Compromiso Ambiental Escolar
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 15px 0', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Bienvenido, el cambio empieza contigo
        </h1>

        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '650px', lineHeight: '1.6', margin: '0 0 30px 0' }}>
          Explora las instalaciones del colegio a través de nuestro plano vectorial interactivo y descubre cada uno de nuestros espacios educativos y verdes.
        </p>

        <Link 
          to="/mapa" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
            transition: 'transform 0.2s'
          }}
        >
          <MapPin size={20} /> Ir al Mapa Interactivo
        </Link>
      </section>

      {/* SECCIÓN INFORMATIVA INTERMEDIA */}
      <section style={{ flex: 1, padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155' }}>
            <Leaf color="#10b981" size={32} style={{ marginBottom: '12px' }} />
            <h3 style={{ margin: '0 0 10px 0', color: '#f8fafc', fontSize: '1.2rem' }}>Espacios Sostenibles</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Promovemos la conciencia ambiental dentro del campus escolar mediante el cuidado de nuestras áreas verdes.
            </p>
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155' }}>
            <MapPin color="#38bdf8" size={32} style={{ marginBottom: '12px' }} />
            <h3 style={{ margin: '0 0 10px 0', color: '#f8fafc', fontSize: '1.2rem' }}>Ubicación Precisa</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              Encuentra rápidamente aulas, oficinas, enfermería y áreas recreativas desde la plataforma digital.
            </p>
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155' }}>
            <ShieldCheck color="#a855f7" size={32} style={{ marginBottom: '12px' }} />
            <h3 style={{ margin: '0 0 10px 0', color: '#f8fafc', fontSize: '1.2rem' }}>Proyecto Institucional</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
             Fomentar el cuidado ambiental escolar monitoreando y registrando los puntos críticos de residuos por salón mediante la tecnología interactiva de EcoBot.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER PROFESIONAL */}
      <footer style={{ backgroundColor: '#090d16', borderTop: '1px solid #1e293b', color: '#94a3b8', padding: '40px 20px 20px 20px', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginBottom: '30px', textAlign: 'left' }}>
          
          <div>
            <h4 style={{ color: '#f8fafc', margin: '0 0 12px 0', fontSize: '1.1rem' }}>Mapa Colegio</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
              Plataforma interactiva para la orientación y gestión de espacios dentro del establecimiento educativo.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#f8fafc', margin: '0 0 12px 0', fontSize: '1.1rem' }}>Navegación</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Inicio</Link></li>
              <li><Link to="/mapa" style={{ color: '#38bdf8', textDecoration: 'none' }}>Mapa Interactivo</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#f8fafc', margin: '0 0 12px 0', fontSize: '1.1rem' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><LocationIcon size={16} /> Calle Principal Colegio #123</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +57 (601) 000-0000</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> contacto@colegio.edu.co</span>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          © {new Date().getFullYear()} Proyecto de Grado - Mapa Interactivo Escolar. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
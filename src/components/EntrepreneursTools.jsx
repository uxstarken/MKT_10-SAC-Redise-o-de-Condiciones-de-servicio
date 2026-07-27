import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './EntrepreneursTools.css';

const EntrepreneursTools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px' 
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="entrepreneurs-section" ref={sectionRef}>
      <h2 className="entrepreneurs-title">
        Herramientas para <span>emprendedores</span>
      </h2>

      {/* Contenedor de Banners Horizontales */}
      <div className={`ep-banners-row ${isVisible ? 'animate-zoom-in' : ''}`}>
        {/* Banner 1: Somos Partner */}
        <div className="ep-banner ep-banner-sp">
          <div className="ep-banner-left ep-sp-left">
            <img src="/mujer-sp.png" alt="Mujer en bean bag" className="ep-banner-img" />
          </div>
          
          <div className="ep-banner-right">
            <img src="/logo-sp.png" alt="Somos Partner" className="ep-logo" />
            <h3 className="ep-banner-title">
              Inscríbete y accede a<br />
              <strong><span>todos</span> nuestros <span>beneficios</span></strong>
            </h3>
            <p className="ep-banner-desc">
              Integra plugins en tu e-commerce y mejora la experiencia de tus envíos.
            </p>
            <button className="ep-btn-orange">Inscríbete en Somos Partner</button>
          </div>
        </div>

        {/* Banner 2: Marketplace Starken */}
        <div className="ep-banner ep-banner-mp">
          <div className="ep-banner-left">
            {/* Ilustración CSS flotante de Marketplace */}
            <div className="ep-mp-illus float-anim-ep">
              <div className="ep-mp-box-main">📦</div>
              <div className="ep-mp-card-float">🛍️</div>
              <div className="ep-mp-sparkle ep-sparkle-1">✦</div>
              <div className="ep-mp-sparkle ep-sparkle-2">✨</div>
            </div>
          </div>

          <div className="ep-banner-right">
            <span className="ep-mp-badge">✦ NUEVO</span>
            <h3 className="ep-banner-title">
              Compra y vende con el nuevo<br />
              <strong>Marketplace <span>Starken</span></strong>
            </h3>
            <p className="ep-banner-desc">
              Apoya a emprendedores, accede a envíos Starken y acumula puntos.
            </p>
            <Link to="/marketplace" state={{ isGuest: true }} className="ep-btn-purple">
              Explorar Marketplace
            </Link>
          </div>
        </div>
      </div>

      {/* Tarjetas Secundarias */}
      <div className={`ep-cards-grid ${isVisible ? 'animate-cards' : ''}`}>
        {/* Card 1: Clientes Empresa */}
        <div className="ep-card-wrapper" style={{ animationDelay: '0.2s' }}>
          <div className="ep-card">
          <div className="ep-card-img-container">
            <img src="/clientes empresa.png" alt="Clientes Empresa" />
          </div>
          <div className="ep-card-content">
            <h4 className="ep-card-title">Clientes Empresa</h4>
            <p className="ep-card-desc">
              Te invitamos a formar parte de nuestro mundo empresas y disfrutar
              de los servicios que tenemos para ti.
            </p>
            <button className="ep-btn-green">Conocer más</button>
          </div>
        </div>
        </div>

        {/* Card 2: Internacional */}
        <div className="ep-card-wrapper" style={{ animationDelay: '0.4s' }}>
          <div className="ep-card">
          <div className="ep-card-img-container">
            <img src="/mujer-internacional.png" alt="Internacional" />
          </div>
          <div className="ep-card-content">
            <h4 className="ep-card-title">Internacional</h4>
            <p className="ep-card-desc">
              Facilitamos tus envíos con eficiencia, alcance global y el respaldo
              de una red experta en logística.
            </p>
            <button className="ep-btn-green">Conocer más</button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneursTools;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ComoEnviar.css';

const steps = [
  {
    id: 1,
    icon: <img src="/icono-caja.png" alt="Prepara tu envío" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    titleGreen: "Prepara",
    titleDark: "tu envío",
    description: "¡Protege tu envío! Asegúrate de que esté correctamente embalado antes de enviarlo.",
    btnText: "Cómo embalar",
    link: "#"
  },
  {
    id: 2,
    icon: <img src="/icono-check.png" alt="Crea tu envío" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    titleGreen: "Crea",
    titleDark: "tu envío",
    description: "Completa los datos, elige quien paga y ¡listo! Hazlo online o presencial. Si lo haces en línea, recibirás la etiqueta vía mail.",
    btnText: "Crear envío",
    link: "/emitir"
  },
  {
    id: 3,
    icon: <img src="/icono-tienda.png" alt="Entrega tu envío" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    titleGreen: "Entrega",
    titleDark: "tu envío",
    description: "Deja tu paquete en un Punto Starken. Si creaste tu envío online, lleva la etiqueta; si no puedes imprimirla, ¡lo haremos por ti!",
    btnText: "Buscar sucursales",
    link: "#"
  },
  {
    id: 4,
    icon: <img src="/icono-camion.png" alt="Sigue tu envío" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    titleGreen: "Sigue",
    titleDark: "tu envío",
    description: "Haz seguimiento de tu envío en cualquier momento y desde cualquier dispositivo.",
    btnText: "Seguimiento",
    link: "#"
  }
];

const ComoEnviar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Solo animar una vez
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="como-enviar-section" ref={sectionRef}>
      <h2 className="como-enviar-title">Cómo enviar con <span>STARKEN</span> en 4 pasos</h2>
      
      <div className="como-enviar-grid">
        {steps.map((step, index) => (
          <div 
            className={`card-animation-wrapper ${isVisible ? 'animate-slide-up' : ''}`} 
            key={step.id}
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            <div className="como-enviar-card">
              <div className="card-watermark">
                {step.id}
              </div>
              
              <div className="card-content">
                <div className="card-icon">
                  {step.icon}
                </div>
                
                <h3 className="card-step-title">
                  <span>{step.titleGreen}</span>
                  {step.titleDark}
                </h3>
                
                <div className="card-divider"></div>
                
                <p className="card-text">
                  {step.description}
                </p>

                {step.link && step.link !== '#' ? (
                  <Link to={step.link} className="card-btn">
                    {step.btnText}
                  </Link>
                ) : (
                  <button className="card-btn">
                    {step.btnText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComoEnviar;

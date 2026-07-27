import React, { useState, useEffect, useRef } from 'react';
import './ServicesCarousel.css';

const servicesData = [
  {
    id: 1,
    image: '/custodia-puntodeventa.png',
    badge: 'Nacional',
    price: 'Desde $2.000',
    title: 'Custodia Punto Starken',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  },
  {
    id: 2,
    image: '/servicio-express.png',
    badge: 'Zona extrema',
    price: 'Desde $2.000',
    title: 'Servicio express',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  },
  {
    id: 3,
    image: '/lockers.png',
    badge: 'Nacional',
    price: 'Desde $2.000',
    title: 'Casilleros',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  },
  {
    id: 4,
    image: '/custodia-puntodeventa.png',
    badge: 'Nacional',
    price: 'Desde $2.000',
    title: 'Custodia Punto Starken',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  },
  {
    id: 5,
    image: '/servicio-express.png',
    badge: 'Zona extrema',
    price: 'Desde $2.000',
    title: 'Servicio express',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  },
  {
    id: 6,
    image: '/lockers.png',
    badge: 'Nacional',
    price: 'Desde $2.000',
    title: 'Casilleros',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  },
  {
    id: 7,
    image: '/custodia-puntodeventa.png',
    badge: 'Nacional',
    price: 'Desde $2.000',
    title: 'Custodia Punto Starken',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  },
  {
    id: 8,
    image: '/servicio-express.png',
    badge: 'Zona extrema',
    price: 'Desde $2.000',
    title: 'Servicio express',
    description: 'Permite dejar envíos en un Punto Starken habilitado para que el destinatario lo retire allí.'
  }
];

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 800) {
        setCardsToShow(2);
      } else {
        setCardsToShow(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const totalCards = servicesData.length;
  const maxIndex = totalCards - cardsToShow;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // Lógica de Swipe para móviles
  const minSwipeDistance = 50; 
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className={`services-title-wrapper ${isVisible ? 'animate-fade-left' : ''}`}>
          <h2 className="services-title">Descubre nuestros <span>servicios</span></h2>
        </div>
        
        <div className="carousel-wrapper">
          <button 
            className="carousel-arrow left" 
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="3" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div 
            className="carousel-track-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndEvent}
          >
            <div 
              className={`carousel-track ${isVisible ? 'animate-cards' : ''}`}
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {servicesData.map((service, index) => (
                <div 
                  key={service.id} 
                  className="service-card-wrapper"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="service-card">
                    <div className="service-image-container">
                      <img src={service.image} alt={service.title} />
                      <div className="price-badge">{service.price}</div>
                    </div>
                    <div className="service-content">
                      <span className={`type-badge ${service.badge === 'Zona extrema' ? 'orange-extrema' : ''}`}>
                        {service.badge}
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-arrow right" 
            onClick={handleNext}
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="3" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;

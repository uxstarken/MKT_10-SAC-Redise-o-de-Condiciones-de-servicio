import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import HomeChatbot from '../components/HomeChatbot';
import './Condiciones.css';

// Text dictionary of each legal section for counting search matches
const SECTION_TEXTS = {
  'gen-1': 'I. Envío Se entenderá por tal, todo sobre, bulto o valija asociado a una OF. Para efectos de emisión se considerará sobre todo envío en embalaje flexible, cuyas medidas máximas sean largo 35cm, ancho 20cm, alto 5cm y cuyo peso no exceda de 300 gramos. Todo envío que exceda las dimensiones y peso anteriormente indicado será considerado bulto o valija.',
  'gen-2': 'II. Restricciones del servicio STARKEN no transportará: dinero; documentos valorados, tales como vale vista, cheques, boletas de garantía; joyas en general, obras de arte, especies suntuosas; armas; sustancias peligrosas tales como explosivos, corrosivos, inflamables sólidos o líquidos, gases comprimidos; sustancias tóxicas e infecciosas; muestras y exámenes médicos; animales vivos o muertos; restos biológicos; restos mortales; drogas y estupefacientes cuya comercialización se encuentre prohibida; elementos radiactivos, nucleares; mercaderías declaradas y catalogadas como peligrosas; productos perecibles, entendiéndose por tales los que requieren condiciones especiales de conservación o cadenas de frío, como carnes, pescados y mariscos, y en general especies que requieran de condiciones especiales de transporte. Cargas consideradas legalmente peligrosas de acuerdo a las normas chilenas 382 Of 89 y NCh 2120/1 al 9 Of 89, y DSL 298, las normas sobre transporte aéreo y las que dicten la Dirección General de Aeronáutica Civil, la Organización de Aviación Civil Internacional (OACI) y la International Air Transport Association (IATA). Para prevenir lo anterior, STARKEN se reserva el derecho, mas no la obligación, de inspeccionar el envío y eventualmente realizar ante las autoridades pertinentes las denuncias respectivas cuando se presenten indicios o sospechas de que el envío pueda afectar a terceros o la seguridad pública. Tanto el Remitente como su Destinatario, conocen y aceptan que el envío podrá siempre ser objeto de control y revisión por parte de autoridades aduaneras, agrícolas, sanitarias y/o policiales. En vista de lo anterior, declaran, aceptan y conocen que podrían tener eventuales responsabilidades civil y/o penal por los daños que pudiera provocar el contenido ya sea por el incumplimiento de las presentes condiciones o por ocultar a sabiendas su contenido. Para tal efecto, STARKEN se reserva el ejercicio de toda acción que tenga por finalidad hacer efectiva tal responsabilidad. Del mismo modo, acepta el Remitente y el Destinatario que, ante requerimientos de autoridad, STARKEN pondrá a disposición de éstas toda documentación que le fuera solicitada y que diga relación con la investigación y esclarecimiento de hechos que pudieran constituir delito.',
  'gen-3': 'III. Emisión de la orden de flete (OF) El Remitente, deberá proporcionar al momento de la emisión, aquella información necesaria, completa y suficiente para que STARKEN cumpla con su cometido. En vista de lo anterior, serán de su exclusiva responsabilidad, los errores u omisiones respecto de: 1) Nombre, domicilio, RUT y medio de contacto del Remitente (teléfono, correo electrónico). 2) Declaración de contenido del envío. 3) Valor declarado del envío. 4) Documentos, copias o número de documento que respalden el valor declarado. 5) Declaración del estado de la carga. 6) Nombre, domicilio, RUT y medio de contacto del Destinatario (teléfono, correo electrónico). Corresponderá al Remitente, proporcionar a STARKEN toda aquella documentación legalmente necesaria para el libre tránsito de la carga. En consecuencia, son de su exclusiva responsabilidad los comisos, multas y, en general, cualquier perjuicio que sufra STARKEN por estar desprovisto de los documentos antes señalados, quien se reserva el derecho de ejercer acciones tendientes a obtener el reembolso de cualquier suma pagada. Finalmente, la información proporcionada como medio de contacto, podrá será utilizada por STARKEN para efectuar notificaciones relacionadas con el envío, tales como avisos de contingencias, seguimientos y otras que fueran pertinentes. Además, podríamos enviar correos electrónicos a través de nuestro sitio con la finalidad de publicitar promociones, ofertas, beneficios y nuevos productos, correos que podrán ser cancelados por su destinatario en cualquier momento.',
  'gen-4': 'IV. Determinación del precio y pago del servicio Para calcular el precio del envío se utilizará el mayor valor entre el peso físico y el peso volumétrico del envío. Este último se calcula multiplicando largo/ancho/alto en centímetros y dividiendo su resultado por 4000. Lo anterior representa una tarifa equivalente a 250 kilogramos por metro cúbico. El precio, determinado en la forma precedentemente indicada no considera aranceles, impuestos, tasas u otras sumas de dinero que el Remitente deba cancelar con ocasión del envío. Por regla general, el pago del precio del servicio corresponderá al Remitente, sin perjuicio de contratar el servicio "por pagar" con cargo al Destinatario.',
  'gen-5': 'V. Declaración de contenido y valor Respecto de los envíos catalogados como bulto o valija cuyo valor a declarar exceda los $50.000 (cincuenta mil pesos) deberá el Remitente respaldar dicha declaración con documentación que tenga validez legal para ello (boletas, facturas o guías de despacho valoradas, sus copias o número de referencia). El monto máximo a declarar por OF será de $3.000.000. En relación a la fecha de emisión del documento que respalda la declaración y del eventual monto a indemnizar su detalle se encuentra en Política de Indemnizaciones. Al momento de la emisión, STARKEN informará al Remitente sobre la obligación de declarar y acompañar la documentación precedentemente indicada, para el caso de persistir en el envío sin contar con la documentación de respaldo del valor que se pretende declarar, solo podrá valorar este como máximo en $50.000. Con todo, STARKEN se reserva el derecho a inspeccionar el envío previo a la emisión de la respectiva OF para comprobar el estado de este, pudiendo rechazarlo en caso de que el contenido no sea verificado. Lo anterior especialmente respecto de aquellos envíos declarados como celulares, notebooks, y artículos tecnológicos en general. Respecto a envíos catalogados como sobre, reconoce el Remitente que los documentos enviados no tienen valor intrínseco ni valor de emisión, y en vista de lo anterior, el monto máximo a declarar será de $5.000. Cualquier indemnización respecto de estos se limitará exclusivamente al valor declarado más el precio del servicio contratado que se hubiere pagado al momento de la emisión. En vista de lo anterior, el Remitente declara estar en conocimiento que todo reclamo originado con ocasión del extravío, daño o merma del envío, considerará como valor máximo para determinar eventuales indemnizaciones el valor declarado y precio del servicio, este último solo para el caso en que hubiera sido pagado al momento de la emisión, excluyendo por tanto las emisiones "por pagar". Lo anterior conforme a nuestra Política de Indemnizaciones.',
  'gen-6': 'VI. Embalaje STARKEN recibe los envíos sellados y embalados por el Remitente, por lo que no participa de esta labor. Sin perjuicio de ello, se reserva el derecho de no transportar cualquier envío que no cumpla con un embalaje adecuado acorde con el contenido declarado. Para ello ponemos en conocimiento nuestras Recomendaciones de Embalaje. Sin perjuicio de lo anterior, la admisión del envío en caso alguno constituye aceptación de que este se encuentre embalado en condiciones que lo protejan durante su traslado, aceptando tanto el Remitente como el Destinatario que cualquier daño que tenga su origen en la deficiencia del embalaje, será de su exclusivo cargo y responsabilidad. STARKEN podrá suspender o cancelar el servicio cuando con ocasión del deficiente embalaje se presenten problemas durante el trayecto, tales como derrames, filtraciones, daños, entre otros. Finalmente, STARKEN no proporciona un tratamiento especial para los envíos signados como "frágil", ni con señales o instrucciones para mantener el envío en una determinada posición u orientación, o con cualquier otra marca o instrucción similar, por lo que el embalaje utilizado por el remitente deberá considerar siempre esta circunstancia.',
  'gen-7': 'VII. Prestación del servicio Cumplidas por el Remitente las condiciones precedentemente señaladas, STARKEN transportará el envío hasta entregarlo a su Destinatario o a la persona adulta que se encuentre en el domicilio de destino indicado en la respectiva OF. Para aquellos envíos cuya dirección de destino disponga de áreas comunes de recepción, la entrega se verificará en dicho lugar y será acreditada por STARKEN a través de cualquier medio idóneo para ello. Si durante el transcurso del viaje, sin haberse verificado la entrega, el Remitente quisiera modificar el destino, deberá previamente acordar con STARKEN las condiciones y tarifa. Acordadas éstas, se procederá a anular la OF emitida originalmente, proporcionando STARKEN una nueva. STARKEN cumplirá su cometido entregando el envío acorde con las indicaciones entregadas por el Remitente en la respectiva OF, y no responderá por reclamos fundados en errores de emisión atribuibles al Remitente (como lo sería, un error en la dirección de entrega). Finalmente, acepta el Remitente, que la acreditación de la entrega por parte de STARKEN se efectúe por medios físicos o electrónicos, la cual constituirá plena prueba para todos los efectos. Nuestro servicio finaliza con la entrega conforme del envío a su Destinatario, ya sea en nuestras sucursales a lo largo del país o en el domicilio consignado en la OF respectiva. En este último caso, si la primera entrega resultara frustrada por causa ajena a STARKEN, realizaremos un segundo intento, no obstante, para los efectos del servicio convenido, se entenderá que el tiempo de entrega fue cumplido oportunamente. Finalmente, para el caso de retiros en sucursales, que sean realizados por un tercero distinto del destinatario, será necesario que este cuente con carta poder en que el destinatario lo autorice a efectuar el retiro, debiendo adjuntar además, copia de la cédula de identidad del destinatario y OF.',
  'gen-8': 'VIII. Imposibilidad de entrega, no retiro y abandono de la carga Para aquellos casos en que el Destinatario se negare a recibir la carga o una vez efectuados dos intentos de entrega en el domicilio indicado en la respectiva OF sin resultado positivo o bien, no habiéndose retirado el envío desde la sucursal de destino por parte del Destinatario, se procederá del modo siguiente: a) El envío permanecerá en poder de STARKEN por un plazo de 10 días hábiles. b) STARKEN tomará contacto con el Remitente o Destinatario, para informar sobre el plazo precedentemente indicando. Siendo responsabilidad de estos últimos el instruir a STARKEN acerca del destino del envío. c) Transcurrido el plazo anterior, sin instrucción alguna por parte del Remitente o Destinatario, el envío se entenderá abandonado para todos los efectos legales y STARKEN procederá a redestinarlo a sus bodegas de rezago, informando lo anterior al Remitente o Destinatario. d) Si con posterioridad, fuera la intención del Remitente o Destinatario recuperar la carga abandonada, deberá cancelar previamente a STARKEN la cantidad de UF 0,1 por kilo de carga, por cada día de bodegaje. e) Transcurridos 6 meses desde el aviso señalado en la letra "b" anterior, acorde con lo prevenido en el artículo 230 del Código de Comercio, se procederá sin más trámite al remate de la carga abandonada. f) Del producto del remate, se descontarán los gastos propios del remate y los valores adeudados a STARKEN por concepto de bodegaje. El remanente será consignado en arcas fiscales de acuerdo con lo dispuesto en el referido artículo.',
  'gen-9': 'IX. Nuestra responsabilidad Desde la emisión de la respectiva OF y recepción del envío, acorde con la normativa vigente STARKEN es responsable por el cumplimiento íntegro del servicio contratado, el que se entiende finalizado con la recepción conforme en el lugar de destino. No obstante lo anterior, STARKEN no responderá por aquellos envíos que incumplan las restricciones del servicio indicadas en el numeral II de las presentes condiciones, por situaciones que impliquen la pérdida, daño o merma de los envíos o retraso en el cumplimiento de los plazos de entrega, cuya causa principal se deba a fuerza mayor o caso fortuito, factores climáticos, imposibilidades de desplazamiento, actos u omisiones de autoridad, actos de violencia, y cualquier otra circunstancia que resulte imprevisible y por ello no atribuible a STARKEN y que incida en el cumplimento de sus obligaciones. Del mismo modo, no comprometen nuestra responsabilidad los desperfectos técnicos, mecánicos, eléctricos o electrónicos de los envíos transportados. Finalmente, nuestra responsabilidad estará limitada siempre por el valor declarado en la respectiva OF, y en caso alguno considerará valores comerciales y ganancias esperadas. Lo anterior conforme a nuestra Política de Indemnizaciones.',
  'gen-10': 'X. Reclamos Todo reclamo originado con ocasión de la prestación del servicio convenido, deberá materializarse a través de nuestra página web www.starken.cl/form-reclamo o formularios físicos disponibles en nuestras sucursales a lo largo del país. En cuanto a su tramitación, se observarán las normas y procedimientos señalados en nuestro Procedimiento de Reclamos.',
  'gen-11': 'XI. Declaración Remitente y Destinatario, declaran conocer y aceptan que la OF constituye para todos los efectos legales la materialización del Contrato de Transporte de Carga, por lo que los efectos de este se regularán teniendo a la vista siempre las declaraciones y documentos acompañados al momento de la emisión, no admitiéndose a su respecto prueba en contrario.',
  'gen-12': 'XII. Datos personales STARKEN asegura la confidencialidad de los datos personales a los consumidores que utilicen sus servicios y que resultan necesarios para la prestación de este (nombre, RUT, teléfono, correo electrónico y dirección), sin perjuicio de los requerimientos emanados de autoridad competente de acuerdo y en los casos que la Ley así lo exija. STARKEN ha adoptado todas las medidas técnicas de seguridad para cuidar y proteger los sistemas de datos. Cualquier violación a la privacidad de los datos almacenados en nuestros servidores será debidamente denunciada a las autoridades competentes y se perseguirán las responsabilidades civiles y penas que correspondan. El titular de los datos personales podrá, en todo momento, ejercer los derechos otorgados por la Ley N° 19.628. En específico, podrá: i) Solicitar información acerca de los datos personales propios que se mantienen registrados. ii) Solicitar la eliminación o cancelación de los datos entregados cuando así lo desee y iii) Oponerse a que sus datos personales sean utilizados para fines estadísticos. www.starken.cl/form-reclamo',
  'gen-13': 'XIII. Normativa aplicable Sin perjuicio de las presentes condiciones, son aplicables además a los servicios ofrecidos por STARKEN la normativa del Código de Comercio relativa a Transporte de Carga Terrestre, Ley de Protección de los Derechos del Consumidor y demás normativa que resultara aplicable.',
  'gen-14': 'XIV. Vigencia Las presentes condiciones entrarán en vigencia a contar del 20 de junio de 2022. Se publicarán en www.starken.cl y se depositará copia física en cada una de las sucursales a lo largo del país. Respecto de los servicios contratados con anterioridad a la fecha de vigencia, se estará a lo dispuesto en la Versión Anterior. STARKEN podrá actualizar, modificar o eliminar el contenido de las presentes Condiciones en cualquier tiempo, total o parcialmente, y sin previo aviso, siempre respetando la normativa aplicable. Estas modificaciones y actualizaciones serán publicadas con a lo menos 10 días de anticipación a su entrada en vigencia en www.starken.cl.',
  
  'rec-1': 'I. Ingreso del reclamo Al momento de ingresar el reclamo por alguno de los medios precedentemente indicados se deberán aportar los antecedentes siguientes: Número de OF. Correo electrónico y número de contacto. Indicar en qué calidad se interpone el reclamo, este es como Remitente o Destinatario. En caso de envíos con valor declarado sobre $50.000 se deberá acompañar copia del documento que sirvió de respaldo al momento de la emisión, entendiéndose por ello, boleta, factura o guía de despacho valorada. Especificar la causa del reclamo.',
  'rec-2': 'II. Recepción del reclamo Recibido el reclamo se procederá a asignar un número de folio, que será informado a través del medio de contacto, y comenzará a correr el plazo de 20 días hábiles para su resolución (considerados de lunes a viernes con exclusión de festivos). Durante la tramitación del reclamo, STARKEN podrá solicitar nuevos antecedentes necesarios para la pronta y adecuada resolución, tales como fotografías o documentos acompañados al momento de la emisión. Efectuada la solicitud anterior y no cumpliéndose por parte del reclamante su envío dentro de los 5 días hábiles siguientes a la solicitud, se comunicará el cierre del reclamo por abandono.',
  'rec-3': 'III. Resolución Revisados los antecedentes STARKEN procederá a notificar la resolución del reclamo mediante aviso de "ACOGE" o "RECHAZA", en este último caso se adjuntará carta que dará cuenta de las circunstancias consideradas para tal resolución. Acogido el reclamo y aceptada la resolución por parte del reclamante, se procederá a la suscripción del respectivo finiquito por medio de firma electrónica simple, la que será proporcionada por STARKEN, efectuándose el abono respectivo en la cuenta bancaria informada dentro de los 5 días hábiles siguientes a la suscripción del documento. Teniéndose el reclamo por cerrado para todos los efectos legales. Sin perjuicio de lo anterior, podrá convenir el reclamante que el pago se efectué mediante vale vista, caso en el cual deberá suscribir previo a la entrega de este el respectivo finiquito.',
  'rec-4': 'IV. Reconsideración Notificada la resolución, que acoge o rechaza, podrá el reclamante solicitar reconsideración dentro de los 3 días hábiles siguientes a la notificación, entendiéndose efectuada está en la fecha de recepción del correo que informa la resolución. Dicha reconsideración será resuelta por STARKEN dentro de los 5 días hábiles siguientes, comunicando la resolución mediante aviso "ACOGE" o "RECHAZA". Siguiéndose el procedimiento indicado en el numeral III anterior según sea el caso y dando por finalizado el reclamo para todos los efectos legales.',
  
  'ind-1': 'I. Determinación del monto a indemnizar por extravíos o mermas en bultos o valijas I.I. Envíos cuyo valor declarado no excede de $50.000 y no cuenta con documentación de respaldo acorde con lo dispuesto en el numeral V de las Condiciones Generales del Servicio En caso de extravío se indemnizará acorde con el valor declarado más el valor del flete o servicio contratado. En caso de mermas o faltante de carga, se tomará como base para determinación del monto proporcional a indemnizar el valor declarado por el Remitente más el proporcional del valor del flete o servicio contratado. I.II. Envíos cuyo valor declarado exceda de $50.000 y cuenta con documentación que respalda la valoración acorde con lo dispuesto en el numeral V de las Condiciones Generales del Servicio En caso de extravío se indemnizará acorde con el valor declarado y debidamente respaldado, más el valor del flete o servicio contratado. En caso de mermas o faltantes de carga, se tomará como base para la determinación del monto proporcional a indemnizar el valor declarado debidamente respaldado, más el proporcional del valor del flete o servicio contratado. Con todo, si el documento que respalda la declaración de valor tiene una fecha de emisión de hasta seis meses anteriores a la fecha del envío, en caso de siniestro STARKEN considerará el 100% del valor declarado como base para determinar una eventual indemnización. Respecto de documentos emitidos entre seis y doce meses anteriores a la fecha del envío, en caso de siniestro STARKEN considerará el 75% del valor declarado como base para determinar una eventual indemnización. Finalmente, respecto de aquellos documentos emitidos con una antigüedad mayor a un año desde la fecha del envío, STARKEN considerará el 50% del valor declarado como base para determinar una eventual indemnización.',
  'ind-2': 'II. Determinación del monto a indemnizar con ocasión de daños o desperfectos no excluidos en el numeral IX de las condiciones generales del servicio en bultos y valijas La determinación del monto eventual a indemnizar se determinará considerando el valor declarado en la respectiva OF y la documentación que dé cuenta del referido valor si fuera procedente, acorde con lo señalado en el numeral anterior. Para aquellos casos en que los daños sean de tal magnitud que vuelva inservible el objeto, corresponderá al Remitente acreditar la referida circunstancia con documentación que dé cuenta de ello, y en vista de lo anterior se procederá a indemnizar acorde con lo dispuesto en el numeral anterior, es decir, considerando el valor declarado. Debiendo en todo caso dejar la especie en poder de STARKEN. En caso de que la especie transportada sufra daños que no la tornen inservible para su uso, corresponderá al Remitente dar cuenta de los costos de reparación o de servicio técnico de manera documental, los que en ningún caso podrán ser mayores al valor declarado en la respectiva OF.',
  'ind-3': 'III. Determinación del monto a reembolsar con ocasión extravío, daños o mermas en sobres Respecto a envíos catalogados como sobre, acorde con lo dispuesto en numeral V de las Condiciones Generales, cualquier indemnización respecto de estos se limitará exclusivamente al valor declarado más el precio del servicio contratado que se hubiere pagado al momento de la emisión.',
  'ind-4': 'IV. Consideraciones específicas respecto a deterioros o faltantes de carga En caso de haber un faltante de carga o deterioro que la torne inútil para su venta, uso o consumo, que sean de responsabilidad de STARKEN, acorde con el artículo 184 del Código de Comercio, el Cliente podrá exigir el pago de acuerdo al valor declarado en OF. Quedando los restos en poder de STARKEN. Si se ha producido una disminución del valor de la carga, STARKEN pagará la proporción del faltante o deterioro tomando como base el valor declarado en la OF, sin perjuicio de aplicar lo dispuesto en el artículo 210 del mismo Código. Si el faltante o el deterioro son visibles en el embalaje al momento de la recepción, el Cliente estará obligado a abrirlo y reclamarlo en forma específica en ese mismo acto. STARKEN no responderá de faltantes o deterioros de la carga que sean consecuencia de caso fortuito, fuerza mayor o vicio propio de la carga, salvo en los casos que establecen los números 1, 2 y 3 del artículo 184 del Código de Comercio.'
};

const MENU_ITEMS = {
  generales: [
    { id: 'gen-1', label: 'I. Envío' },
    { id: 'gen-2', label: 'II. Restricciones del servicio' },
    { id: 'gen-3', label: 'III. Emisión de la OF' },
    { id: 'gen-4', label: 'IV. Determinación del precio y pago' },
    { id: 'gen-5', label: 'V. Declaración de contenido y valor' },
    { id: 'gen-6', label: 'VI. Embalaje' },
    { id: 'gen-7', label: 'VII. Prestación del servicio' },
    { id: 'gen-8', label: 'VIII. Imposibilidad de entrega' },
    { id: 'gen-9', label: 'IX. Nuestra responsabilidad' },
    { id: 'gen-10', label: 'X. Reclamos' },
    { id: 'gen-11', label: 'XI. Declaración' },
    { id: 'gen-12', label: 'XII. Datos personales' },
    { id: 'gen-13', label: 'XIII. Normativa aplicable' },
    { id: 'gen-14', label: 'XIV. Vigencia' }
  ],
  reclamos: [
    { id: 'rec-1', label: 'I. Ingreso del reclamo' },
    { id: 'rec-2', label: 'II. Recepción del reclamo' },
    { id: 'rec-3', label: 'III. Resolución' },
    { id: 'rec-4', label: 'IV. Reconsideración' }
  ],
  indemnizaciones: [
    { id: 'ind-1', label: 'I. Extravíos o mermas en bultos' },
    { id: 'ind-2', label: 'II. Daños o desperfectos en bultos' },
    { id: 'ind-3', label: 'III. Extravío o daño en sobres' },
    { id: 'ind-4', label: 'IV. Deterioros o faltantes' }
  ]
};

// Sidebar Menu Item component with overflow detection and tooltip
const SidebarMenuItem = ({ item, activeSection, scrollToElement, searchQuery, matchCount }) => {
  const labelRef = useRef(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const checkOverflow = () => {
    if (labelRef.current) {
      const hasOverflow = labelRef.current.scrollWidth > (labelRef.current.clientWidth + 1);
      setIsOverflowed(hasOverflow);
    }
  };

  const handleMouseEnter = () => {
    checkOverflow();
    setIsHovered(true);
    // Re-check after hover CSS transition has completed
    setTimeout(checkOverflow, 60);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li 
      className="sidebar-menu-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={() => scrollToElement(item.id)} 
        className={`${activeSection === item.id ? 'active' : ''} ${searchQuery && matchCount === 0 ? 'no-match' : ''}`}
        aria-label={item.label}
      >
        <span className="menu-item-label" ref={labelRef}>{item.label}</span>
        {searchQuery && matchCount > 0 && (
          <span className="sidebar-match-badge">{matchCount}</span>
        )}
      </button>
      {isHovered && isOverflowed && (
        <div className="sidebar-tooltip" role="tooltip">
          {item.label}
        </div>
      )}
    </li>
  );
};

const Condiciones = () => {
  const [activeTab, setActiveTab] = useState('generales');
  const [activeSection, setActiveSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Monitor scroll height to show/hide the back-to-top button
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);

  // Match counter helper
  const countMatches = (sectionId, query) => {
    if (!query || !SECTION_TEXTS[sectionId]) return 0;
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery === '') return 0;
    
    const text = SECTION_TEXTS[sectionId].toLowerCase();
    try {
      const escapedQuery = normalizedQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'g');
      const matches = text.match(regex);
      return matches ? matches.length : 0;
    } catch (e) {
      return 0;
    }
  };

  const getMatchCount = (sectionId) => {
    return countMatches(sectionId, searchQuery);
  };

  const getTabTotalMatches = () => {
    if (!searchQuery) return 0;
    return MENU_ITEMS[activeTab].reduce((acc, item) => acc + getMatchCount(item.id), 0);
  };

  // DOM Highlight effect whenever query or active tab changes
  useEffect(() => {
    const container = document.querySelector('.condiciones-text-content');
    if (!container) return;

    // Remove existing highlights
    const marks = container.querySelectorAll('mark.search-highlight');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });

    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    
    const highlightNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        const index = text.toLowerCase().indexOf(query);
        if (index >= 0) {
          const parent = node.parentNode;
          if (parent.tagName === 'MARK' || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return;

          const matchLength = query.length;
          const matchText = text.substring(index, index + matchLength);
          const beforeText = text.substring(0, index);
          const afterText = text.substring(index + matchLength);

          const fragment = document.createDocumentFragment();
          if (beforeText) fragment.appendChild(document.createTextNode(beforeText));

          const mark = document.createElement('mark');
          mark.className = 'search-highlight';
          mark.textContent = matchText;
          fragment.appendChild(mark);

          if (afterText) {
            const remainingTextNode = document.createTextNode(afterText);
            fragment.appendChild(remainingTextNode);
            highlightNode(remainingTextNode); // recursive call for subsequent matches in same text node
          }

          parent.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length > 0) {
        const children = Array.from(node.childNodes);
        children.forEach(highlightNode);
      }
    };

    highlightNode(container);
  }, [searchQuery, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveSection('');
    
    const tabsElement = document.querySelector('.condiciones-tabs-nav');
    if (tabsElement) {
      const offset = 140; // Height of sticky navbar + spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const tabsRect = tabsElement.getBoundingClientRect().top;
      const tabsPosition = tabsRect - bodyRect;
      window.scrollTo({ top: tabsPosition - offset, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Height of sticky navbar + a bit of spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="condiciones-page">
      {/* Hero Banner Section */}
      <section className="condiciones-hero">
        <div className="condiciones-hero-overlay"></div>
        <div className="condiciones-hero-container">
          <h1 className="condiciones-hero-title">Condiciones Generales de Servicios</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="condiciones-main-container">
        {/* Page Intro Section */}
        <div className="condiciones-page-intro">
          <p className="condiciones-intro-subtitle">
            Aplicables a segmento natural, MIPYME y PYME. Excluye cuenta corriente.
          </p>
          <div className="condiciones-intro-meta">
            Última actualización: 20 de Junio de 2022
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="condiciones-tabs-nav">
          <button 
            className={`tab-nav-btn ${activeTab === 'generales' ? 'active' : ''}`}
            onClick={() => handleTabChange('generales')}
          >
            <div className="tab-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div className="tab-btn-text">
              <span className="tab-title">Condiciones Generales</span>
              <span className="tab-desc">De Servicio y Transporte</span>
            </div>
          </button>

          <button 
            className={`tab-nav-btn ${activeTab === 'reclamos' ? 'active' : ''}`}
            onClick={() => handleTabChange('reclamos')}
          >
            <div className="tab-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="12" y1="7" x2="12" y2="10.5"></line><line x1="12" y1="13.5" x2="12.01" y2="13.5"></line></svg>
            </div>
            <div className="tab-btn-text">
              <span className="tab-title">Procedimiento de Reclamos</span>
              <span className="tab-desc">Ingreso, plazos y resolución</span>
            </div>
          </button>

          <button 
            className={`tab-nav-btn ${activeTab === 'indemnizaciones' ? 'active' : ''}`}
            onClick={() => handleTabChange('indemnizaciones')}
          >
            <div className="tab-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div className="tab-btn-text">
              <span className="tab-title">Políticas de Indemnización</span>
              <span className="tab-desc">Bultos, sobres y mermas</span>
            </div>
          </button>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="condiciones-grid">
          {/* Sidebar Column */}
          <aside className="condiciones-sidebar-column">
            {/* Promo Help Card */}
            <div className="sidebar-promo">
              <h4>¿Necesitas ayuda?</h4>
              <p>Si tienes dudas con tu envío o quieres ingresar una solicitud formal, puedes contactarnos en nuestro sitio.</p>
              <a href="#" className="sidebar-promo-btn">Centro de ayuda</a>
            </div>

            {/* Sticky Sidebar Navigation */}
            <div className="condiciones-sidebar">
              <div className="sidebar-inner">
                <h3 className="sidebar-title">Contenidos</h3>
                
                {/* Sidebar Search Bar Input */}
                <div className="sidebar-search-container">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Buscador por palabra"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="sidebar-search-input"
                  />
                  {searchQuery && (
                    <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="sidebar-divider"></div>
                
                <ul className="sidebar-menu">
                  {MENU_ITEMS[activeTab].map((item) => (
                    <SidebarMenuItem
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      scrollToElement={scrollToElement}
                      searchQuery={searchQuery}
                      matchCount={getMatchCount(item.id)}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Legal Content */}
          <main className="condiciones-text-content">
            {searchQuery && getTabTotalMatches() === 0 ? (
              <div className="search-no-results animate-fade-in">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h4>No se encontraron coincidencias</h4>
                <p>No hay resultados para "{searchQuery}" en la sección actual. Intenta buscar otra palabra o cambia de pestaña.</p>
              </div>
            ) : (
              <>
                {activeTab === 'generales' && (
                  <div className="content-tab-panel animate-fade-in">
                    <div className="section-intro">
                      <h2>Condiciones de servicio</h2>
                      <p className="section-intro-tagline">
                        Aplicables a segmento natural, MIPYME y PYME. Excluye cuenta corriente.
                      </p>
                      <p className="intro-text">
                        STARKEN asume para con sus Clientes el compromiso de transportar, previa emisión de la respectiva Orden de Flete (en adelante OF) los envíos que el Remitente le encargue y que cumplan en todo momento las presentes condiciones, las que se entiende forman parte íntegra del servicio contratado y son aceptadas por el cliente. En cumplimiento de las normas relativas a Protección de los Derechos de los Consumidores, las presentes condiciones se encuentran disponibles a requerimiento de estos en nuestras sucursales, canales de atención y página web www.starken.cl.
                      </p>
                    </div>

                    <div className="legal-blocks-list">
                      <div className="legal-item" id="gen-1">
                        <h3>I. Envío</h3>
                        <p>
                          Se entenderá por tal, todo sobre, bulto o valija asociado a una OF. Para efectos de emisión se considerará sobre todo envío en embalaje flexible, cuyas medidas máximas sean largo 35cm, ancho 20cm, alto 5cm y cuyo peso no exceda de 300 gramos. Todo envío que exceda las dimensiones y peso anteriormente indicado será considerado bulto o valija.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-2">
                        <h3>II. Restricciones del servicio</h3>
                        <p>
                          STARKEN no transportará: dinero; documentos valorados, tales como vale vista, cheques, boletas de garantía; joyas en general, obras de arte, especies suntuosas; armas; sustancias peligrosas tales como explosivos, corrosivos, inflamables sólidos o líquidos, gases comprimidos; sustancias tóxicas e infecciosas; muestras y exámenes médicos; animales vivos o muertos; restos biológicos; restos mortales; drogas y estupefacientes cuya comercialización se encuentre prohibida; elementos radiactivos, nucleares; mercaderías declaradas y catalogadas como peligrosas; productos perecibles, entendiéndose por tales los que requieren condiciones especiales de conservación o cadenas de frío, como carnes, pescados y mariscos, y en general especies que requieran de condiciones especiales de transporte. Cargas consideradas legalmente peligrosas de acuerdo a las normas chilenas 382 Of 89 y NCh 2120/1 al 9 Of 89, y DSL 298, las normas sobre transporte aéreo y las que dicten la Dirección General de Aeronáutica Civil, la Organización de Aviación Civil Internacional (OACI) y la International Air Transport Association (IATA).
                        </p>
                        <p>
                          Para prevenir lo anterior, STARKEN se reserva el derecho, mas no la obligación, de inspeccionar el envío y eventualmente realizar ante las autoridades pertinentes las denuncias respectivas cuando se presenten indicios o sospechas de que el envío pueda afectar a terceros o la seguridad pública. Tanto el Remitente como su Destinatario, conocen y aceptan que el envío podrá siempre ser objeto de control y revisión por parte de autoridades aduaneras, agrícolas, sanitarias y/o policiales. En vista de lo anterior, declaran, aceptan y conocen que podrían tener eventuales responsabilidades civil y/o penal por los daños que pudiera provocar el contenido ya sea por el incumplimiento de las presentes condiciones o por ocultar a sabiendas su contenido. Para tal efecto, STARKEN se reserva el ejercicio de toda acción que tenga por finalidad hacer efectiva tal responsabilidad. Del mismo modo, acepta el Remitente y el Destinatario que, ante requerimientos de autoridad, STARKEN pondrá a disposición de éstas toda documentación que le fuera solicitada y que diga relación con la investigación y esclarecimiento de hechos que pudieran constituir delito.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-3">
                        <h3>III. Emisión de la orden de flete (OF)</h3>
                        <p>
                          El Remitente, deberá proporcionar al momento de la emisión, aquella información necesaria, completa y suficiente para que STARKEN cumpla con su cometido. En vista de lo anterior, serán de su exclusiva responsabilidad, los errores u omisiones respecto de:
                        </p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '16px' }}>
                          <li style={{ marginBottom: '6px' }}>1) Nombre, domicilio, RUT y medio de contacto del Remitente (teléfono, correo electrónico).</li>
                          <li style={{ marginBottom: '6px' }}>2) Declaración de contenido del envío.</li>
                          <li style={{ marginBottom: '6px' }}>3) Valor declarado del envío.</li>
                          <li style={{ marginBottom: '6px' }}>4) Documentos, copias o número de documento que respalden el valor declarado.</li>
                          <li style={{ marginBottom: '6px' }}>5) Declaración del estado de la carga.</li>
                          <li style={{ marginBottom: '6px' }}>6) Nombre, domicilio, RUT y medio de contacto del Destinatario (teléfono, correo electrónico).</li>
                        </ul>
                        <p>
                          Corresponderá al Remitente, proporcionar a STARKEN toda aquella documentación legalmente necesaria para el libre tránsito de la carga. En consecuencia, son de su exclusiva responsabilidad los comisos, multas y, en general, cualquier perjuicio que sufra STARKEN por estar desprovisto de los documentos antes señalados, quien se reserva el derecho de ejercer acciones tendientes a obtener el reembolso de cualquier suma pagada.
                        </p>
                        <p>
                          Finalmente, la información proporcionada como medio de contacto, podrá será utilizada por STARKEN para efectuar notificaciones relacionadas con el envío, tales como avisos de contingencias, seguimientos y otras que fueran pertinentes. Además, podríamos enviar correos electrónicos a través de nuestro sitio con la finalidad de publicitar promociones, ofertas, beneficios y nuevos productos, correos que podrán ser cancelados por su destinatario en cualquier momento.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-4">
                        <h3>IV. Determinación del precio y pago del servicio</h3>
                        <p>
                          Para calcular el precio del envío se utilizará el mayor valor entre el peso físico y el peso volumétrico del envío. Este último se calcula multiplicando largo/ancho/alto en centímetros y dividiendo su resultado por 4000.
                        </p>
                        <p>
                          Lo anterior representa una tarifa equivalente a 250 kilogramos por metro cúbico.
                        </p>
                        <p>
                          El precio, determinado en la forma precedentemente indicada no considera aranceles, impuestos, tasas u otras sumas de dinero que el Remitente deba cancelar con ocasión del envío.
                        </p>
                        <p>
                          Por regla general, el pago del precio del servicio corresponderá al Remitente, sin perjuicio de contratar el servicio "por pagar" con cargo al Destinatario.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-5">
                        <h3>V. Declaración de contenido y valor</h3>
                        <p>
                          Respecto de los envíos catalogados como bulto o valija cuyo valor a declarar exceda los $50.000 (cincuenta mil pesos) deberá el Remitente respaldar dicha declaración con documentación que tenga validez legal para ello (boletas, facturas o guías de despacho valoradas, sus copias o número de referencia). El monto máximo a declarar por OF será de $3.000.000.
                        </p>
                        <p>
                          En relación a la fecha de emisión del documento que respalda la declaración y del eventual monto a indemnizar su detalle se encuentra en Política de Indemnizaciones.
                        </p>
                        <p>
                          Al momento de la emisión, STARKEN informará al Remitente sobre la obligación de declarar y acompañar la documentación precedentemente indicada, para el caso de persistir en el envío sin contar con la documentación de respaldo del valor que se pretende declarar, solo podrá valorar este como máximo en $50.000. Con todo, STARKEN se reserva el derecho a inspeccionar el envío previo a la emisión de la respectiva OF para comprobar el estado de este, pudiendo rechazarlo en caso de que el contenido no sea verificado. Lo anterior especialmente respecto de aquellos envíos declarados como celulares, notebooks, y artículos tecnológicos en general. Respecto a envíos catalogados como sobre, reconoce el Remitente que los documentos enviados no tienen valor intrínseco ni valor de emisión, y en vista de lo anterior, el monto máximo a declarar será de $5.000. Cualquier indemnización respecto de estos se limitará exclusivamente al valor declarado más el precio del servicio contratado que se hubiere pagado al momento de la emisión.
                        </p>
                        <p>
                          En vista de lo anterior, el Remitente declara estar en conocimiento que todo reclamo originado con ocasión del extravío, daño o merma del envío, considerará como valor máximo para determinar eventuales indemnizaciones el valor declarado y precio del servicio, este último solo para el caso en que hubiera sido pagado al momento de la emisión, excluyendo por tanto las emisiones "por pagar". Lo anterior conforme a nuestra Política de Indemnizaciones.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-6">
                        <h3>VI. Embalaje</h3>
                        <p>
                          STARKEN recibe los envíos sellados y embalados por el Remitente, por lo que no participa de esta labor. Sin perjuicio de ello, se reserva el derecho de no transportar cualquier envío que no cumpla con un embalaje adecuado acorde con el contenido declarado. Para ello ponemos en conocimiento nuestras Recomendaciones de Embalaje. Sin perjuicio de lo anterior, la admisión del envío en caso alguno constituye aceptación de que este se encuentre embalado en condiciones que lo protejan durante su traslado, aceptando tanto el Remitente como el Destinatario que cualquier daño que tenga su origen en la deficiencia del embalaje, será de su exclusivo cargo y responsabilidad. STARKEN podrá suspender o cancelar el servicio cuando con ocasión del deficiente embalaje se presenten problemas durante el trayecto, tales como derrames, filtraciones, daños, entre otros.
                        </p>
                        <p>
                          Finalmente, STARKEN no proporciona un tratamiento especial para los envíos signados como "frágil", ni con señales o instrucciones para mantener el envío en una determinada posición u orientación, o con cualquier otra marca o instrucción similar, por lo que el embalaje utilizado por el remitente deberá considerar siempre esta circunstancia.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-7">
                        <h3>VII. Prestación del servicio</h3>
                        <p>
                          Cumplidas por el Remitente las condiciones precedentemente señaladas, STARKEN transportará el envío hasta entregarlo a su Destinatario o a la persona adulta que se encuentre en el domicilio de destino indicado en la respectiva OF. Para aquellos envíos cuya dirección de destino disponga de áreas comunes de recepción, la entrega se verificará en dicho lugar y será acreditada por STARKEN a través de cualquier medio idóneo para ello.
                        </p>
                        <p>
                          Si durante el transcurso del viaje, sin haberse verificado la entrega, el Remitente quisiera modificar el destino, deberá previamente acordar con STARKEN las condiciones y tarifa. Acordadas éstas, se procederá a anular la OF emitida originalmente, proporcionando STARKEN una nueva.
                        </p>
                        <p>
                          STARKEN cumplirá su cometido entregando el envío acorde con las indicaciones entregadas por el Remitente en la respectiva OF, y no responderá por reclamos fundados en errores de emisión atribuibles al Remitente (como lo sería, un error en la dirección de entrega). Finalmente, acepta el Remitente, que la acreditación de la entrega por parte de STARKEN se efectúe por medios físicos o electrónicos, la cual constituirá plena prueba para todos los efectos.
                        </p>
                        <p>
                          Nuestro servicio finaliza con la entrega conforme del envío a su Destinatario, ya sea en nuestras sucursales a lo largo del país o en el domicilio consignado en la OF respectiva. En este último caso, si la primera entrega resultara frustrada por causa ajena a STARKEN, realizaremos un segundo intento, no obstante, para los efectos del servicio convenido, se entenderá que el tiempo de entrega fue cumplido oportunamente.
                        </p>
                        <p>
                          Finalmente, para el caso de retiros en sucursales, que sean realizados por un tercero distinto del destinatario, será necesario que este cuente con carta poder en que el destinatario lo autorice a efectuar el retiro, debiendo adjuntar además, copia de la cédula de identidad del destinatario y OF.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-8">
                        <h3>VIII. Imposibilidad de entrega, no retiro y abandono de la carga</h3>
                        <p>
                          Para aquellos casos en que el Destinatario se negare a recibir la carga o una vez efectuados dos intentos de entrega en el domicilio indicado en la respectiva OF sin resultado positivo o bien, no habiéndose retirado el envío desde la sucursal de destino por parte del Destinatario, se procederá del modo siguiente:
                        </p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '16px' }}>
                          <li style={{ marginBottom: '8px' }}><strong>a)</strong> El envío permanecerá en poder de STARKEN por un plazo de 10 días hábiles.</li>
                          <li style={{ marginBottom: '8px' }}><strong>b)</strong> STARKEN tomará contacto con el Remitente o Destinatario, para informar sobre el plazo precedentemente indicando. Siendo responsabilidad de estos últimos el instruir a STARKEN acerca del destino del envío.</li>
                          <li style={{ marginBottom: '8px' }}><strong>c)</strong> Transcurrido el plazo anterior, sin instrucción alguna por parte del Remitente o Destinatario, el envío se entenderá abandonado para todos los efectos legales y STARKEN procederá a redestinarlo a sus bodegas de rezago, informando lo anterior al Remitente o Destinatario.</li>
                          <li style={{ marginBottom: '8px' }}><strong>d)</strong> Si con posterioridad, fuera la intención del Remitente o Destinatario recuperar la carga abandonada, deberá cancelar previamente a STARKEN la cantidad de UF 0,1 por kilo de carga, por cada día de bodegaje.</li>
                          <li style={{ marginBottom: '8px' }}><strong>e)</strong> Transcurridos 6 meses desde el aviso señalado en la letra "b" anterior, acorde con lo prevenido en el artículo 230 del Código de Comercio, se procederá sin más trámite al remate de la carga abandonada.</li>
                          <li style={{ marginBottom: '8px' }}><strong>f)</strong> Del producto del remate, se descontarán los gastos propios del remate y los valores adeudados a STARKEN por concepto de bodegaje. El remanente será consignado en arcas fiscales de acuerdo con lo dispuesto en el referido artículo.</li>
                        </ul>
                      </div>

                      <div className="legal-item" id="gen-9">
                        <h3>IX. Nuestra responsabilidad</h3>
                        <p>
                          Desde la emisión de la respectiva OF y recepción del envío, acorde con la normativa vigente STARKEN es responsable por el cumplimiento íntegro del servicio contratado, el que se entiende finalizado con la recepción conforme en el lugar de destino.
                        </p>
                        <p>
                          No obstante lo anterior, STARKEN no responderá por aquellos envíos que incumplan las restricciones del servicio indicadas en el numeral II de las presentes condiciones, por situaciones que impliquen la pérdida, daño o merma de los envíos o retraso en el cumplimiento de los plazos de entrega, cuya causa principal se deba a fuerza mayor o caso fortuito, factores climáticos, imposibilidades de desplazamiento, actos u omisiones de autoridad, actos de violencia, y cualquier otra circunstancia que resulte imprevisible y por ello no atribuible a STARKEN y que incida en el cumplimento de sus obligaciones. Del mismo modo, no comprometen nuestra responsabilidad los desperfectos técnicos, mecánicos, eléctricos o electrónicos de los envíos transportados.
                        </p>
                        <p>
                          Finalmente, nuestra responsabilidad estará limitada siempre por el valor declarado en la respectiva OF, y en caso alguno considerará valores comerciales y ganancias esperadas. Lo anterior conforme a nuestra Política de Indemnizaciones.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-10">
                        <h3>X. Reclamos</h3>
                        <p>
                          Todo reclamo originado con ocasión de la prestación del servicio convenido, deberá materializarse a través de nuestra página web <a href="https://www.starken.cl/form-reclamo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--starken-green)', fontWeight: '600' }}>www.starken.cl/form-reclamo</a> o formularios físicos disponibles en nuestras sucursales a lo largo del país. En cuanto a su tramitación, se observarán las normas y procedimientos señalados en nuestro Procedimiento de Reclamos.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-11">
                        <h3>XI. Declaración</h3>
                        <p>
                          Remitente y Destinatario, declaran conocer y aceptan que la OF constituye para todos los efectos legales la materialización del Contrato de Transporte de Carga, por lo que los efectos de este se regularán teniendo a la vista siempre las declaraciones y documentos acompañados al momento de la emisión, no admitiéndose a su respecto prueba en contrario.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-12">
                        <h3>XII. Datos personales</h3>
                        <p>
                          STARKEN asegura la confidencialidad de los datos personales a los consumidores que utilicen sus servicios y que resultan necesarios para la prestación de este (nombre, RUT, teléfono, correo electrónico y dirección), sin perjuicio de los requerimientos emanados de autoridad competente de acuerdo y en los casos que la Ley así lo exija. STARKEN ha adoptado todas las medidas técnicas de seguridad para cuidar y proteger los sistemas de datos. Cualquier violación a la privacidad de los datos almacenados en nuestros servidores será debidamente denunciada a las autoridades competentes y se perseguirán las responsabilidades civiles y penas que correspondan. El titular de los datos personales podrá, en todo momento, ejercer los derechos otorgados por la Ley N° 19.628. En específico, podrá:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                          <li style={{ marginBottom: '6px' }}><strong>i)</strong> Solicitar información acerca de los datos personales propios que se mantienen registrados.</li>
                          <li style={{ marginBottom: '6px' }}><strong>ii)</strong> Solicitar la eliminación o cancelación de los datos entregados cuando así lo desee y</li>
                          <li style={{ marginBottom: '6px' }}><strong>iii)</strong> Oponerse a que sus datos personales sean utilizados para fines estadísticos. <a href="https://www.starken.cl/form-reclamo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--starken-green)', fontWeight: '600' }}>www.starken.cl/form-reclamo</a></li>
                        </ul>
                      </div>

                      <div className="legal-item" id="gen-13">
                        <h3>XIII. Normativa aplicable</h3>
                        <p>
                          Sin perjuicio de las presentes condiciones, son aplicables además a los servicios ofrecidos por STARKEN la normativa del Código de Comercio relativa a Transporte de Carga Terrestre, Ley de Protección de los Derechos del Consumidor y demás normativa que resultara aplicable.
                        </p>
                      </div>

                      <div className="legal-item" id="gen-14">
                        <h3>XIV. Vigencia</h3>
                        <p>
                          Las presentes condiciones entrarán en vigencia a contar del 20 de junio de 2022. Se publicarán en <a href="https://www.starken.cl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--starken-green)', fontWeight: '600' }}>www.starken.cl</a> y se depositará copia física en cada una de las sucursales a lo largo del país. Respecto de los servicios contratados con anterioridad a la fecha de vigencia, se estará a lo dispuesto en la Versión Anterior.
                        </p>
                        <p>
                          STARKEN podrá actualizar, modificar o eliminar el contenido de las presentes Condiciones en cualquier tiempo, total o parcialmente, y sin previo aviso, siempre respetando la normativa aplicable. Estas modificaciones y actualizaciones serán publicadas con a lo menos 10 días de anticipación a su entrada en vigencia en <a href="https://www.starken.cl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--starken-green)', fontWeight: '600' }}>www.starken.cl</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reclamos' && (
                  <div className="content-tab-panel animate-fade-in">
                    <div className="section-intro">
                      <h2>Procedimientos de reclamos</h2>
                      <p className="intro-text">
                        Todo reclamo originado con ocasión de la prestación del servicio convenido deberá materializarse a través de nuestra página <a href="https://www.starken.cl/form-reclamo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--starken-green)', fontWeight: '600' }}>www.starken.cl/form-reclamo</a> o formularios físicos en sucursales a lo largo del país. En cuanto a su tramitación, se observarán las normas y procedimientos siguientes:
                      </p>
                    </div>

                    <div className="legal-blocks-list">
                      <div className="legal-item" id="rec-1">
                        <h3>I. Ingreso del reclamo</h3>
                        <p>
                          Al momento de ingresar el reclamo por alguno de los medios precedentemente indicados se deberán aportar los antecedentes siguientes:
                        </p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '16px' }}>
                          <li style={{ marginBottom: '6px' }}>- Número de OF.</li>
                          <li style={{ marginBottom: '6px' }}>- Correo electrónico y número de contacto.</li>
                          <li style={{ marginBottom: '6px' }}>- Indicar en qué calidad se interpone el reclamo, este es como Remitente o Destinatario.</li>
                          <li style={{ marginBottom: '6px' }}>- En caso de envíos con valor declarado sobre $50.000 se deberá acompañar copia del documento que sirvió de respaldo al momento de la emisión, entendiéndose por ello, boleta, factura o guía de despacho valorada.</li>
                          <li style={{ marginBottom: '6px' }}>- Especificar la causa del reclamo.</li>
                        </ul>
                      </div>

                      <div className="legal-item" id="rec-2">
                        <h3>II. Recepción del reclamo</h3>
                        <p>
                          Recibido el reclamo se procederá a asignar un número de folio, que será informado a través del medio de contacto, y comenzará a correr el plazo de <strong>20 días hábiles</strong> para su resolución (considerados de lunes a viernes con exclusión de festivos).
                        </p>
                        <p>
                          Durante la tramitación del reclamo, STARKEN podrá solicitar nuevos antecedentes necesarios para la pronta y adecuada resolución, tales como fotografías o documentos acompañados al momento de la emisión. Efectuada la solicitud anterior y no cumpliéndose por parte del reclamante su envío dentro de los <strong>5 días hábiles</strong> siguientes a la solicitud, se comunicará el cierre del reclamo por abandono.
                        </p>
                      </div>

                      <div className="legal-item" id="rec-3">
                        <h3>III. Resolución</h3>
                        <p>
                          Revisados los antecedentes STARKEN procederá a notificar la resolución del reclamo mediante aviso de <strong>“ACOGE”</strong> o <strong>“RECHAZA”</strong>, en este último caso se adjuntará carta que dará cuenta de las circunstancias consideradas para tal resolución.
                        </p>
                        <p>
                          Acogido el reclamo y aceptada la resolución por parte del reclamante, se procederá a la suscripción del respectivo finiquito por medio de firma electrónica simple, la que será proporcionada por STARKEN, efectuándose el abono respectivo en la cuenta bancaria informada dentro de los <strong>5 días hábiles</strong> siguientes a la suscripción del documento. Teniéndose el reclamo por cerrado para todos los efectos legales.
                        </p>
                        <p>
                          Sin perjuicio de lo anterior, podrá convenir el reclamante que el pago se efectué mediante vale vista, caso en el cual deberá suscribir previo a la entrega de este el respectivo finiquito.
                        </p>
                      </div>

                      <div className="legal-item" id="rec-4">
                        <h3>IV. Reconsideración</h3>
                        <p>
                          Notificada la resolución, que acoge o rechaza, podrá el reclamante solicitar reconsideración dentro de los <strong>3 días hábiles</strong> siguientes a la notificación, entendiéndose efectuada está en la fecha de recepción del correo que informa la resolución. Dicha reconsideración será resuelta por STARKEN dentro de los <strong>5 días hábiles</strong> siguientes, comunicando la resolución mediante aviso "ACOGE" o "RECHAZA". Siguiéndose el procedimiento indicado en el numeral III anterior según sea el caso y dando por finalizado el reclamo para todos los efectos legales.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'indemnizaciones' && (
                  <div className="content-tab-panel animate-fade-in">
                    <div className="section-intro">
                      <h2>Política de indemnizaciones</h2>
                      <p className="intro-text">
                        En cumplimiento de la normativa legal vigente, STARKEN da a conocer al público en general, la política de indemnizaciones aplicable en caso de reclamos originados con ocasión de la prestación de nuestros servicios, la que junto con las Condiciones Generales del Servicio forman parte íntegra del contrato de Transporte de Carga materializado en la respectiva OF.
                      </p>
                      <p className="intro-text" style={{ marginTop: '12px' }}>
                        Como regla general, la determinación del monto final a indemnizar considerará el valor neto de monto declarado acorde con dispuesto en el numeral V de las Condiciones Generales del Servicio, más los costos del flete o servicio contratado. En ningún caso cubrirá valores esperados, pérdida de venta o negocios u otros conceptos similares.
                      </p>
                    </div>

                    <div className="legal-blocks-list">
                      <div className="legal-item" id="ind-1">
                        <h3>I. Determinación del monto a indemnizar por extravíos o mermas en bultos o valijas</h3>
                        <div className="ind-sub-item">
                          <h5>I.I. Envíos cuyo valor declarado no excede de $50.000 y no cuenta con documentación de respaldo acorde con lo dispuesto en el numeral V de las Condiciones Generales del Servicio</h5>
                          <p>
                            En caso de extravío se indemnizará acorde con el valor declarado más el valor del flete o servicio contratado. En caso de mermas o faltante de carga, se tomará como base para determinación del monto proporcional a indemnizar el valor declarado por el Remitente más el proporcional del valor del flete o servicio contratado.
                          </p>
                        </div>
                        <div className="ind-sub-item">
                          <h5>I.II. Envíos cuyo valor declarado exceda de $50.000 y cuenta con documentación que respalda la valoración acorde con lo dispuesto en el numeral V de las Condiciones Generales del Servicio</h5>
                          <p>
                            En caso de extravío se indemnizará acorde con el valor declarado y debidamente respaldado, más el valor del flete o servicio contratado. En caso de mermas o faltantes de carga, se tomará como base para la determinación del monto proporcional a indemnizar el valor declarado debidamente respaldado, más el proporcional del valor del flete o servicio contratado.
                          </p>
                          <p>
                            Con todo, si el documento que respalda la declaración de valor tiene una fecha de emisión de hasta seis meses anteriores a la fecha del envío, en caso de siniestro STARKEN considerará el 100% del valor declarado como base para determinar una eventual indemnización. Respecto de documentos emitidos entre seis y doce meses anteriores a la fecha del envío, en caso de siniestro STARKEN considerará el 75% del valor declarado como base para determinar una eventual indemnización. Finalmente, respecto de aquellos documentos emitidos con una antigüedad mayor a un año desde la fecha del envío, STARKEN considerará el 50% del valor declarado como base para determinar una eventual indemnización.
                          </p>
                        </div>
                      </div>

                      <div className="legal-item" id="ind-2">
                        <h3>II. Determinación del monto a indemnizar con ocasión de daños o desperfectos no excluidos en el numeral IX de las condiciones generales del servicio en bultos y valijas</h3>
                        <p>
                          La determinación del monto eventual a indemnizar se determinará considerando el valor declarado en la respectiva OF y la documentación que dé cuenta del referido valor si fuera procedente, acorde con lo señalado en el numeral anterior.
                        </p>
                        <p>
                          Para aquellos casos en que los daños sean de tal magnitud que vuelva inservible el objeto, corresponderá al Remitente acreditar la referida circunstancia con documentación que dé cuenta de ello, y en vista de lo anterior se procederá a indemnizar acorde con lo dispuesto en el numeral anterior, es decir, considerando el valor declarado. Debiendo en todo caso dejar la especie en poder de STARKEN. En caso de que la especie transportada sufra daños que no la tornen inservible para su uso, corresponderá al Remitente dar cuenta de los costos de reparación o de servicio técnico de manera documental, los que en ningún caso podrán ser mayores al valor declarado en la respectiva OF.
                        </p>
                      </div>

                      <div className="legal-item" id="ind-3">
                        <h3>III. Determinación del monto a reembolsar con ocasión de extravío, daños o mermas en sobres</h3>
                        <p>
                          Respecto a envíos catalogados como sobre, acorde con lo dispuesto en numeral V de las Condiciones Generales, cualquier indemnización respecto de estos se limitará exclusivamente al valor declarado más el precio del servicio contratado que se hubiere pagado al momento de la emisión.
                        </p>
                      </div>

                      <div className="legal-item" id="ind-4">
                        <h3>IV. Consideraciones específicas respecto a deterioros o faltantes de carga</h3>
                        <p>
                          En caso de haber un faltante de carga o deterioro que la torne inútil para su venta, uso o consumo, que sean de responsabilidad de STARKEN, acorde con el artículo 184 del Código de Comercio, el Cliente podrá exigir el pago de acuerdo al valor declarado en OF. Quedando los restos en poder de STARKEN. Si se ha producido una disminución del valor de la carga, STARKEN pagará la proporción del faltante o deterioro tomando como base el valor declarado en la OF, sin perjuicio de aplicar lo dispuesto en el artículo 210 del mismo Código. Si el faltante o el deterioro son visibles en el embalaje al momento de la recepción, el Cliente estará obligado a abrirlo y reclamarlo en forma específica en ese mismo acto. STARKEN no responderá de faltantes o deterioros de la carga que sean consecuencia de caso fortuito, fuerza mayor o vicio propio de la carga, salvo en los casos que establecen los números 1, 2 y 3 del artículo 184 del Código de Comercio.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Downloads Section */}
                <div className="condiciones-downloads">
                  <h3>Documentos oficiales en PDF</h3>
                  <p>Puedes descargar las versiones oficiales completas e imprimibles de nuestros documentos legales:</p>
                  
                  <div className="downloads-grid">
                    <div className="download-card">
                      <div className="download-card-content">
                        <div className="download-card-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                        </div>
                        <div className="download-card-info">
                          <h5>Condiciones generales</h5>
                          <span>PDF (450 KB)</span>
                        </div>
                      </div>
                      <a href="#" className="download-action-btn" onClick={(e) => e.preventDefault()}>Descargar</a>
                    </div>

                    <div className="download-card">
                      <div className="download-card-content">
                        <div className="download-card-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                        </div>
                        <div className="download-card-info">
                          <h5>Procedimiento de reclamos</h5>
                          <span>PDF (310 KB)</span>
                        </div>
                      </div>
                      <a href="#" className="download-action-btn" onClick={(e) => e.preventDefault()}>Descargar</a>
                    </div>

                    <div className="download-card">
                      <div className="download-card-content">
                        <div className="download-card-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                        </div>
                        <div className="download-card-info">
                          <h5>Política de indemnizaciones</h5>
                          <span>PDF (280 KB)</span>
                        </div>
                      </div>
                      <a href="#" className="download-action-btn" onClick={(e) => e.preventDefault()}>Descargar</a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
      <HomeChatbot />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="scroll-to-top-btn animate-fade-in"
          aria-label="Volver arriba"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Condiciones;

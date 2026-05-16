import { useState, useMemo, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Circle, CheckSquare, Square, 
  Rocket, ChevronRight, ChevronLeft, Calculator, Send, MessageCircle
} from 'lucide-react';
import { sections } from './data/options';
import type { Option } from './data/options';
import './index.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({
    projectType: [],
    designLevel: ['dl_basico'], // default
    branding: [],
    features: [],
    content: [],
    hosting: [],
    deliveryTime: ['dt_normal'], // default
    maintenance: ['m_sin'] // default
  });

  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const section = sections[currentStep];
  const isNextDisabled = !section.multiSelect && (selections[section.id] || []).length === 0;

  const handleSelect = (sectionId: string, optionId: string, multiSelect: boolean) => {
    setSelections(prev => {
      const current = prev[sectionId] || [];
      if (multiSelect) {
        if (current.includes(optionId)) {
          return { ...prev, [sectionId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [sectionId]: [...current, optionId] };
        }
      } else {
        return { ...prev, [sectionId]: [optionId] };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowModal(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const totals = useMemo(() => {
    let baseOneTime = 0;
    let monthly = 0;
    let yearly = 0;
    let timeModifier = 0;

    const allSelectedOptions: Option[] = [];

    sections.forEach(sec => {
      const selectedIds = selections[sec.id] || [];
      selectedIds.forEach(id => {
        const option = sec.options.find(o => o.id === id);
        if (option) {
          allSelectedOptions.push(option);
          if (option.type === 'one-time') {
            baseOneTime += option.price;
          } else if (option.type === 'monthly') {
            monthly += option.price;
          } else if (option.type === 'yearly') {
            yearly += option.price;
          }

          if (option.percentage) {
            timeModifier = option.percentage;
          }
        }
      });
    });

    let subtotal = baseOneTime * (1 + timeModifier);
    const isRedesign = selections['projectType']?.includes('pt_rediseno');
    if (isRedesign) {
      subtotal = subtotal * 0.8;
    }
    const total = subtotal;

    return { baseOneTime, subtotal, total, monthly, yearly, allSelectedOptions, timeModifier, isRedesign };
  }, [selections]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="hero-header">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Rocket size={40} className="text-gradient" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <h1>Asesor de <span className="text-gradient">Cotización</span></h1>
            
            <div className="progress-container" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Paso {currentStep + 1} de {sections.length}</span>
                <span>{Math.round(((currentStep + 1) / sections.length) * 100)}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-card)', borderRadius: '3px', overflow: 'hidden' }}>
                <motion.div 
                  style={{ height: '100%', background: 'var(--accent-gradient)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait" custom={1}>
            <motion.div 
              key={currentStep}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="section"
              style={{ width: '100%', opacity: 1, animation: 'none' }}
            >
              <h2>{section.title}</h2>
              {section.subtitle && <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{section.subtitle}</p>}
              
              <div className="options-grid">
                {section.options.map(option => {
                  const isSelected = (selections[section.id] || []).includes(option.id);
                  return (
                    <div 
                      key={option.id}
                      className={`option-card ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelect(section.id, option.id, section.multiSelect)}
                    >
                      <div className="option-header">
                        <div>
                          <div className="option-label">{option.label}</div>
                        </div>
                      </div>
                      <div className="option-description">{option.description}</div>
                      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                        {section.multiSelect ? (
                          isSelected ? <CheckSquare className="icon-check" size={20} /> : <Square color="var(--text-secondary)" size={20} />
                        ) : (
                          isSelected ? <CheckCircle2 className="icon-check" size={20} /> : <Circle color="var(--text-secondary)" size={20} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', zIndex: 10, position: 'relative' }}>
          {currentStep > 0 ? (
            <button 
              className="btn" 
              onClick={handlePrev} 
              style={{ width: 'auto', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', boxShadow: 'none' }}
            >
              <ChevronLeft size={20} /> Atrás
            </button>
          ) : <div></div>}

          <button 
            className="btn" 
            onClick={handleNext} 
            disabled={isNextDisabled}
            style={{ 
              width: 'auto', 
              padding: '1rem 2.5rem',
              opacity: isNextDisabled ? 0.5 : 1,
              cursor: isNextDisabled ? 'not-allowed' : 'pointer'
            }}
          >
            {currentStep < sections.length - 1 ? (
              <>Siguiente <ChevronRight size={20} /></>
            ) : (
              <>Ver Resumen Final <Send size={18} style={{ marginLeft: '0.5rem' }} /></>
            )}
          </button>
        </div>
      </main>

      {currentStep === sections.length - 1 && (
        <aside className="sidebar-container">
          <div className="sidebar">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={24} className="text-gradient" /> 
              Cotización Actual
            </h2>
            
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
              <AnimatePresence>
                {totals.allSelectedOptions.map(option => (
                  <motion.div 
                    key={option.id} 
                    className="summary-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <span className="summary-label">
                      <CheckCircle2 size={14} className="icon-check" />
                      {option.label}
                    </span>
                    <span className="summary-value">
                      {option.percentage ? `+${option.percentage * 100}%` : `$${option.price}`}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {totals.allSelectedOptions.length === 0 && (
                <p style={{ textAlign: 'center', margin: '2rem 0', opacity: 0.5 }}>
                  Selecciona opciones para ver el resumen
                </p>
              )}
            </div>

            <div className="totals-container">
              {totals.timeModifier > 0 && (
                <div className="total-row" style={{ color: 'var(--text-secondary)' }}>
                  <span className="summary-label">Subtotal Base</span>
                  <span className="summary-value">${totals.baseOneTime.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
              )}
              <div className="total-row final">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Total Estimado</span>
                  {totals.isRedesign && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--success-color)', fontWeight: 400 }}>
                      (Incluye 20% dcto por Rediseño)
                    </span>
                  )}
                </div>
                <span>${totals.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
              </div>
              {(totals.monthly > 0 || totals.yearly > 0) && (
                <div className="monthly-totals">
                  {totals.monthly > 0 && (
                    <div className="total-row">
                      <span style={{ color: 'var(--success-color)' }}>Costos Mensuales</span>
                      <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>${totals.monthly.toLocaleString('en-US')} USD/mes</span>
                    </div>
                  )}
                  {totals.yearly > 0 && (
                    <div className="total-row">
                      <span style={{ color: 'var(--success-color)' }}>Costos Anuales</span>
                      <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>${totals.yearly.toLocaleString('en-US')} USD/año</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
              <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <Send size={32} className="text-gradient" style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                ¡Cotización Lista!
              </h2>
              
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', textAlign: 'center', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 400 }}>Inversión Total Estimada</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ${totals.total.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>USD</span>
                </div>
              </div>

              <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Ingresa tus datos para enviarte el desglose completo.
              </p>
              
              <form 
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isSending) return;
                  setIsSending(true);
                  
                  const adminParams = {
                    from_name: formRef.current?.nombre.value,
                    reply_to: formRef.current?.email.value,
                    phone: formRef.current?.telefono.value,
                    total: `$${totals.total.toLocaleString('en-US')} USD`,
                    message: totals.allSelectedOptions.map(o => o.label).join("\n• ")
                  };


                  const adminSubmissionParams = {
                    ...adminParams,
                    to_email: import.meta.env.VITE_ADMIN_EMAIL
                  };

                  emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID, 
                    import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID, 
                    adminSubmissionParams, 
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                  ).then(() => {
                    setTimeout(() => {
                      const clientParams = {
                        ...adminParams,
                        to_email: formRef.current?.email.value,
                        is_client_copy: "SÍ"
                      };

                      emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
                        import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID, 
                        clientParams, 
                        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                      ).then(() => {
                        Swal.fire({
                          title: '¡Cotización Enviada!',
                          text: 'Hemos enviado una copia detallada a tu correo.',
                          icon: 'success',
                          background: '#1e293b',
                          color: '#f8fafc',
                          confirmButtonColor: '#3b82f6'
                        }).then(() => window.location.reload());
                      }).catch(() => {
                        Swal.fire({
                          title: 'Recibido',
                          text: `Recibimos tu solicitud. Hubo un retraso con tu copia pero te contactaremos pronto.`,
                          icon: 'info',
                          background: '#1e293b',
                          color: '#f8fafc'
                        }).then(() => window.location.reload());
                      }).finally(() => setIsSending(false));
                    }, 1500);
                  }).catch((error) => {
                    Swal.fire({
                      title: 'Error',
                      text: `No pudimos procesar el envío: ${error.text || 'Revisa tu conexión'}.`,
                      icon: 'error',
                      background: '#1e293b',
                      color: '#f8fafc'

                  // 1. Enviar al Administrador (carlosvillavizar07@gmail.com)
                  const adminSubmissionParams = {
                    ...adminParams,
                    to_email: 'carlosvillavizar07@gmail.com'
                  };

                  emailjs.send(
                    'service_ff1j4eb', 
                    'template_bfpqc24', 
                    adminSubmissionParams, 
                    'ambIUButaUEFn0Cue'
                  )
                  .then(() => {
                    console.log('Admin notificado');
                    
                    // 2. Enviar al Cliente después de 1.5 segundos para evitar bloqueos
                    setTimeout(() => {
                      const clientParams = {
                        ...adminParams,
                        to_email: formRef.current?.email.value, // Parámetro específico para el cliente
                        is_client_copy: "SÍ" // Marca para diferenciar el envío
                      };

                      emailjs.send(
                        'service_ff1j4eb', 
                        'template_tvv9c1c', 
                        clientParams, 
                        'ambIUButaUEFn0Cue'
                      )
                      .then(() => {
                        console.log('Cliente notificado');
                        Swal.fire({
                          title: '¡Cotización Enviada!',
                          text: 'Hemos enviado una copia detallada a tu correo electrónico.',
                          icon: 'success',
                          background: '#1e293b',
                          color: '#f8fafc',
                          confirmButtonColor: '#3b82f6',
                          confirmButtonText: 'Excelente'
                        }).then(() => {
                          // Refrescar la página después de que el usuario cierre el mensaje de éxito
                          window.location.reload();
                        });
                      })
                      .catch((err) => {
                        console.error('Error enviando al cliente:', err);
                        Swal.fire({
                          title: 'Recibido Parcialmente',
                          text: `Tu cotización nos llegó, pero hubo un problema enviando tu copia: ${err.text || 'Error desconocido'}. No te preocupes, te contactaremos pronto.`,
                          icon: 'warning',
                          background: '#1e293b',
                          color: '#f8fafc',
                          confirmButtonColor: '#3b82f6'
                        }).then(() => {
                          window.location.reload();
                        });
                      })
                      .finally(() => setIsSending(false));
                    }, 1500);
                  })
                  .catch((error) => {
                    console.log('FALLO...', error.text);
                    Swal.fire({
                      title: 'Error de Envío',
                      text: `No pudimos procesar tu solicitud: ${error.text || 'Error de conexión'}. Por favor, verifica tu internet e intenta de nuevo.`,
                      icon: 'error',
                      background: '#1e293b',
                      color: '#f8fafc',
                      confirmButtonColor: '#ef4444'

                    });
                    setIsSending(false);
                  });
                }}
              >
                <div className="input-group">
                  <label>Tu Nombre</label>
                  <input type="text" name="nombre" required placeholder="Ej. Juan Pérez" />
                </div>
                <div className="input-group">
                  <label>Tu Correo Electrónico</label>
                  <input type="email" name="email" required placeholder="juan@empresa.com" />
                </div>
                <div className="input-group">
                  <label>Tu Teléfono / WhatsApp</label>
                  <input 
                    type="tel" 
                    name="telefono" 
                    required 

                    onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                    onInput={(e) => { (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, ''); }}
                    pattern="[0-9]{7,15}" 
                    placeholder="Ej. 8299381913" 
                  />

                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                    }}
                    pattern="[0-9]{7,15}" 
                    title="Ingresa solo números (de 7 a 15 dígitos)"
                    placeholder="Ej. 8299381913" 
                  />
                  <small style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '4px', display: 'block' }}> Solo números, sin espacios ni guiones </small>

                </div>

                <button 
                  type="submit"
                  className="btn" 
                  disabled={isSending}
                  style={{ 
                    marginTop: '2.5rem', 

                    width: '100%',
                    padding: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}
                >
                  {isSending ? 'Procesando...' : 'Enviar Cotización'} <Send size={20} />

                    opacity: isSending ? 0.7 : 1,
                    width: '100%',
                    padding: '1.2rem',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {isSending ? 'Procesando Envío...' : 'Enviar Cotización'} <Send size={20} />

                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <a 
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, vengo de la página web y me gustaría recibir una cotización personalizada.")}`} 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <span className="wa-tooltip">¿Hablamos de tu proyecto? 🚀</span>
        <MessageCircle size={32} />
      </a>


      <footer className="footer">
        <p>Desarrollado con ❤️ por <strong>Carlos Villavizar</strong></p>
        <a href="https://carlosvillavizar.netlify.app" target="_blank" rel="noopener noreferrer" className="footer-link">

      <footer className="footer">
        <p>Desarrollado con ❤️ por <strong>Carlos Villavizar</strong></p>
        <a 
          href="https://carlosvillavizar.netlify.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-link"
        >

          Visitar mi Portafolio 🚀
        </a>
      </footer>
    </div>
  );
}

export default App;

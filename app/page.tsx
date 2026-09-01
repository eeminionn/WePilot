import {
  ArrowDownRight, ArrowUpRight, Building2, EyeOff, HeartHandshake,
  MessageCircle, MoonStar, Radio, Route, ShieldCheck, Sparkles,
} from 'lucide-react';
import HeroScene from './components/HeroScene';
import Journey from './components/Journey';
import MotionSystem from './components/MotionSystem';

const sourceConaset = 'https://www.conaset.cl/wp-content/uploads/2025/06/Informe-nacional-de-siniestros-en-Chile-2024.pdf';
const sourceCamiones = 'https://www.conaset.cl/wp-content/uploads/2025/12/Camiones-2024.pdf';
const sourceIne = 'https://www.ine.gob.cl/docs/default-source/variables-basicas-ambientales/publicaciones-y-anuarios/informe-anual-de-medio-ambiente/informe-anual-de-estad%C3%ADsticas-del-medio-ambiente-2025.pdf';

export default function Home() {
  return (
    <main>
      <MotionSystem />
      <nav className="nav-shell" aria-label="Navegación principal">
        <a className="wordmark" href="#inicio" aria-label="WePilot, inicio">wePilot<span className="wordmark-dot">.</span></a>
        <div className="nav-links">
          <a href="#problema">El desafío</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#modelo">Para empresas</a>
          <a href="#equipo">Equipo</a>
        </div>
        <a className="nav-cta" href="#piloto">Hablemos <ArrowDownRight size={16} strokeWidth={1.8} /></a>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Seguridad vial, reimaginada</p>
          <h1>Un viaje más<br />seguro empieza<br />con una conversación.</h1>
          <p className="hero-lede">El copiloto digital que ayuda a reconocer el cansancio antes de que se transforme en riesgo. Sin cámaras. Sin vigilancia.</p>
          <div className="hero-actions">
            <a className="button-primary magnetic" href="#como-funciona">Descubrir WePilot <ArrowDownRight size={18} /></a>
            <span className="micro-proof">Diseñado en Chile<br />para moverse por el mundo.</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Trayecto abstracto interactivo en tres dimensiones">
          <HeroScene />
          <div className="visual-caption"><span>01</span><p>Acompaña el trayecto.<br />Actúa antes del riesgo.</p></div>
          <div className="visual-hint">Mueve el cursor</div>
        </div>
        <a className="scroll-cue" href="#problema">Explorar <span>↓</span></a>
      </section>

      <section className="problem" id="problema">
        <div className="problem-intro" data-reveal>
          <p className="eyebrow light"><span /> El momento que importa</p>
          <h2>La fatiga no llega de golpe.<br /><em>El riesgo, sí.</em></h2>
        </div>
        <div className="problem-grid">
          <div className="problem-story" data-reveal>
            <p>En rutas extensas, nocturnas o monótonas, el cansancio se vuelve parte del paisaje.</p>
            <p>Lo que falta es una señal a tiempo que convierta la conciencia en acción. Ese espacio —antes del evento crítico— es donde nace WePilot.</p>
          </div>
          <div className="stat-card cobalt" data-reveal>
            <MoonStar size={25} strokeWidth={1.35} />
            <strong>769</strong>
            <p>siniestros registrados en Chile bajo la categoría “drogas y/o fatiga en el conductor” durante 2024.</p>
            <a href={sourceConaset} target="_blank" rel="noreferrer">Fuente: CONASET <ArrowUpRight size={13} /></a>
          </div>
          <div className="stat-card" data-reveal>
            <Route size={25} strokeWidth={1.35} />
            <strong>10%</strong>
            <p>de las muertes de ocupantes de camiones se vinculó a la categoría “drogas y/o fatiga” durante 2024.</p>
            <a href={sourceCamiones} target="_blank" rel="noreferrer">Fuente: CONASET <ArrowUpRight size={13} /></a>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-orbit orbit-one" data-drift />
        <div className="manifesto-orbit orbit-two" data-drift />
        <p className="eyebrow centered"><span /> Una decisión de diseño</p>
        <div className="manifesto-lines">
          <p data-reveal>No estamos construyendo otra alarma.</p>
          <p className="soft" data-reveal>Estamos construyendo el momento</p>
          <p className="accent" data-reveal>en que alguien decide detenerse.</p>
        </div>
        <div className="principles" data-reveal>
          <span><MessageCircle size={17} /> Conversación</span>
          <span><ShieldCheck size={17} /> Prevención</span>
          <span><HeartHandshake size={17} /> Confianza</span>
        </div>
      </section>

      <section className="journey-title">
        <p className="eyebrow"><span /> Un copiloto que no distrae</p>
        <h2 data-reveal>Pregunta poco.<br />Entiende el contexto.<br /><em>Actúa cuando importa.</em></h2>
        <p data-reveal>Durante la conducción: voz y brevedad.<br />En pantalla: solo con el vehículo detenido.</p>
      </section>

      <Journey />

      <section className="difference" id="diferencia">
        <div className="difference-heading" data-reveal>
          <p className="eyebrow"><span /> Nuestra diferencia</p>
          <h2>No te observa.<br /><em>Te acompaña.</em></h2>
          <p>La seguridad puede ser rigurosa sin sentirse invasiva. WePilot funciona principalmente mediante software, conversación y contexto.</p>
        </div>
        <div className="difference-panel" data-reveal>
          <div className="radar" aria-hidden="true"><span /><span /><span /><div><EyeOff size={34} strokeWidth={1.15} /></div></div>
          <p className="panel-label">Lo que decidimos dejar fuera</p>
          <ul>
            <li><span>Cámaras al rostro</span><b>No</b></li>
            <li><span>Sensores fisiológicos</span><b>No</b></li>
            <li><span>Hardware especializado</span><b>No</b></li>
            <li className="yes"><span>Acompañamiento preventivo</span><b>Sí</b></li>
          </ul>
        </div>
        <div className="benefit-grid">
          <article data-reveal><Radio size={22} /><span>01</span><h3>Más humano para quien conduce.</h3><p>La ayuda se percibe como acompañamiento, no como castigo o vigilancia.</p></article>
          <article data-reveal><Sparkles size={22} /><span>02</span><h3>Más simple para quien implementa.</h3><p>Menos infraestructura, menos fricción y una entrada más accesible.</p></article>
          <article data-reveal><ShieldCheck size={22} /><span>03</span><h3>Más claro para quien decide.</h3><p>Alertas comprensibles y trazabilidad para activar protocolos preventivos.</p></article>
        </div>
      </section>

      <section className="business" id="modelo">
        <div className="business-top">
          <div data-reveal>
            <p className="eyebrow light"><span /> Quién lo usa y quién lo impulsa</p>
            <h2>El conductor usa WePilot.<br /><em>La empresa convierte la señal en prevención.</em></h2>
          </div>
          <p data-reveal>Una solución, tres niveles de impacto. Empezamos donde el problema es cotidiano y diseñamos para escalar donde el impacto puede multiplicarse.</p>
        </div>
        <div className="impact-lanes">
          <article data-reveal><span>Conductor</span><MessageCircle size={28} /><h3>Acompañamiento claro, privado y no distractor.</h3></article>
          <article data-reveal><span>Supervisor</span><Radio size={28} /><h3>Una alerta comprensible para actuar a tiempo.</h3></article>
          <article data-reveal><span>Empresa</span><Building2 size={28} /><h3>Trazabilidad para fortalecer su cultura de seguridad.</h3></article>
        </div>
        <div className="market-card" data-reveal>
          <div><p>Primera entrada al mercado</p><h3>Empresas chilenas de transporte y logística con flotas de 20 a 150 conductores.</h3></div>
          <div className="market-number"><span>Mercado habilitante</span><strong>261.338</strong><p>vehículos motorizados de carga en Chile, 2024.</p><a href={sourceIne} target="_blank" rel="noreferrer">Fuente: INE <ArrowUpRight size={13} /></a></div>
          <div className="model-pill"><span>Modelo</span><strong>Suscripción B2B</strong><p>por conductor activo o vehículo.</p></div>
        </div>
      </section>

      <section className="validation">
        <div className="validation-copy" data-reveal>
          <p className="eyebrow"><span /> Construir con evidencia</p>
          <h2>Una hipótesis ambiciosa.<br /><em>Una validación rigurosa.</em></h2>
          <p>WePilot está en etapa de prototipo. Nuestra energía emprendedora no viene de exagerar lo que existe, sino de tener claridad sobre qué queremos construir y cómo vamos a demostrar que funciona.</p>
        </div>
        <div className="validation-roadmap" data-reveal>
          <div className="roadmap-line"><i style={{ width: '34%' }} /></div>
          <div className="roadmap-points">
            <div className="done"><span /> <small>Hoy</small><strong>Prototipo en validación</strong></div>
            <div><span /> <small>Próximo hito</small><strong>2 empresas · 30 conductores</strong></div>
            <div><span /> <small>Visión</small><strong>Seguridad conversacional para Latinoamérica</strong></div>
          </div>
        </div>
      </section>

      <section className="team" id="equipo">
        <div className="team-heading" data-reveal>
          <p className="eyebrow"><span /> El equipo detrás de WePilot</p>
          <h2>Tres miradas.<br /><em>Una nueva forma de cuidar.</em></h2>
          <p>Somos un equipo que reúne negocio, tecnología y diseño para convertir una idea nacida en la universidad en una empresa con impacto real y potencial global.</p>
        </div>
        <div className="team-list">
          <article data-reveal><div className="person-mark">PG</div><div><span>01 · Estrategia</span><h3>Paloma González</h3><p>Visión, modelo de negocio y comunicación.</p></div><ArrowUpRight size={24} /></article>
          <article data-reveal><div className="person-mark">EA</div><div><span>02 · Tecnología</span><h3>Emilio Abarca</h3><p>Desarrollo e integración del producto.</p></div><ArrowUpRight size={24} /></article>
          <article data-reveal><div className="person-mark">MV</div><div><span>03 · Experiencia</span><h3>Mariana Vercellino</h3><p>Diseño de interacción e investigación con usuarios.</p></div><ArrowUpRight size={24} /></article>
        </div>
      </section>

      <section className="finale" id="piloto">
        <div className="finale-glow" aria-hidden="true" />
        <div className="finale-content" data-reveal>
          <p className="eyebrow centered"><span /> Próximo destino</p>
          <h2>Hay miles de trayectos por delante.<br /><em>Queremos que cada uno termine bien.</em></h2>
          <p>Buscamos empresas, conductores y aliados que quieran construir con nosotros la próxima forma de prevenir la fatiga.</p>
          <div className="pilot-badge"><span className="pulse" /> Piloto 2026 · Conversaciones abiertas</div>
        </div>
      </section>

      <footer>
        <a className="wordmark inverted" href="#inicio">wePilot<span>.</span></a>
        <p>Seguridad conversacional para la movilidad.</p>
        <div><span>Santiago, Chile</span><span>© 2026 WePilot</span></div>
      </footer>
    </main>
  );
}

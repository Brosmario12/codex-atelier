import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Braces,
  Cloud,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import heroImage from './assets/atelier-hero.png'
import './App.css'

const services = [
  {
    icon: Layers3,
    title: 'Landing pages de alto impacto',
    body: 'Narrativa, estructura, copy, responsive y rendimiento listos para convertir.',
  },
  {
    icon: Braces,
    title: 'Apps React listas para crecer',
    body: 'Componentes, estados, rutas, formularios y bases para escalar sin rehacer.',
  },
  {
    icon: Database,
    title: 'Datos con Supabase',
    body: 'Autenticacion, tablas, storage y automatizaciones preparadas para producto real.',
  },
  {
    icon: Cloud,
    title: 'Deploy continuo',
    body: 'GitHub, Vercel y flujos de entrega para publicar versiones en minutos.',
  },
]

const process = [
  'Brief claro y arquitectura de pagina',
  'Diseno visual con assets propios',
  'Implementacion con React, CSS y pruebas',
  'Deploy, medicion y siguiente iteracion',
]

const metrics = [
  ['95+', 'objetivo Lighthouse'],
  ['24h', 'primer prototipo'],
  ['3x', 'variantes por campana'],
]

type Lead = {
  name: string
  email: string
  goal: string
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

function App() {
  const [lead, setLead] = useState<Lead>({
    name: '',
    email: '',
    goal: 'Necesito una landing lista para vender',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'saved' | 'local'>(
    'idle',
  )

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null
    return createClient(supabaseUrl, supabaseAnonKey)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    if (!supabase) {
      setStatus('local')
      return
    }

    const { error } = await supabase.from('launch_requests').insert({
      name: lead.name,
      email: lead.email,
      goal: lead.goal,
    })

    setStatus(error ? 'local' : 'saved')
  }

  return (
    <main>
      <section className="hero-shell">
        <img className="hero-media" src={heroImage} alt="" />
        <div className="hero-overlay" />

        <nav className="topbar" aria-label="Principal">
          <a className="brand" href="#inicio" aria-label="Codex Atelier inicio">
            <span className="brand-mark">CA</span>
            <span>Codex Atelier</span>
          </a>
          <div className="nav-actions">
            <a href="#sistema">Sistema</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <div className="hero-content" id="inicio">
          <div className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Produccion web experta desde WSL
          </div>
          <h1>Paginas web que salen bonitas, rapidas y listas para negocio.</h1>
          <p>
            Un primer taller digital para construir en serie: estrategia,
            diseno, codigo, base de datos y despliegue en una misma linea de
            produccion.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contacto">
              Preparar lanzamiento
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button ghost" href="#sistema">
              Ver sistema
            </a>
          </div>
        </div>

        <div className="hero-panel" aria-label="Estado del sistema">
          {metrics.map(([value, label]) => (
            <div className="metric" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section intro" id="sistema">
        <div>
          <p className="section-kicker">Sistema de produccion</p>
          <h2>Todo lo necesario para convertir una idea en pagina publicada.</h2>
        </div>
        <p>
          Esta primera pagina ya nace con una base moderna: Vite, React,
          Supabase opcional, Vercel-ready, assets generados y una estetica
          propia para empezar a iterar.
        </p>
      </section>

      <section className="service-grid" aria-label="Servicios">
        {services.map(({ icon: Icon, title, body }) => (
          <article className="service-card" key={title}>
            <Icon size={24} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="section split">
        <div className="launch-card">
          <div className="card-header">
            <Rocket size={22} aria-hidden="true" />
            <span>Pipeline activo</span>
          </div>
          <ol>
            {process.map((item) => (
              <li key={item}>
                <BadgeCheck size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ol>
        </div>
        <div className="quality">
          <p className="section-kicker">Criterio profesional</p>
          <h2>No solo se ve bien. Se puede mantener, medir y publicar.</h2>
          <div className="quality-list">
            <span>
              <Gauge size={18} aria-hidden="true" />
              Performance primero
            </span>
            <span>
              <ShieldCheck size={18} aria-hidden="true" />
              Datos preparados
            </span>
            <span>
              <GitBranch size={18} aria-hidden="true" />
              Flujo Git listo
            </span>
          </div>
        </div>
      </section>

      <section className="contact-band" id="contacto">
        <div>
          <p className="section-kicker">Siguiente proyecto</p>
          <h2>Describe que quieres lanzar y lo dejamos en ruta.</h2>
        </div>
        <form className="lead-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              required
              value={lead.name}
              onChange={(event) =>
                setLead((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Tu nombre"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={lead.email}
              onChange={(event) =>
                setLead((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="correo@empresa.com"
            />
          </label>
          <label>
            Objetivo
            <textarea
              required
              value={lead.goal}
              onChange={(event) =>
                setLead((current) => ({ ...current, goal: event.target.value }))
              }
            />
          </label>
          <button className="button primary" type="submit">
            <Mail size={18} aria-hidden="true" />
            Enviar brief
          </button>
          <p className="form-status" role="status">
            {status === 'sending' && 'Guardando solicitud...'}
            {status === 'saved' && 'Solicitud guardada en Supabase.'}
            {status === 'local' &&
              'Formulario listo. Falta conectar variables de Supabase para guardar.'}
          </p>
        </form>
      </section>
    </main>
  )
}

export default App

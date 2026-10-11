
import { useEffect, useState } from 'react'
import './App.css'

const pages = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']

const defaultSkills = [
  'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js',
  'Express.js', 'MySQL', 'Python', 'PHP', 'SQL',
  'Tailwind CSS', 'Power BI', 'Excel'
]

const projects = [
  {
    number: '01',
    category: 'SOFTWARE DEVELOPMENT',
    title: 'DTSC Roster Management System',
    description: 'Roster management features including week-off and WFH assignments, notification calendar, saving rosters, exporting rosters and default holidays.',
    technologies: 'React.js · Node.js · Express.js · MySQL'
  },
  {
    number: '02',
    category: 'DATA ANALYTICS',
    title: 'Sales & Revenue Analysis',
    description: 'Analysis of sales and revenue data to explore trends and present useful business insights.',
    technologies: 'Python · Excel · Power BI'
  },
  {
    number: '03',
    category: 'DATA ANALYTICS',
    title: 'Customer Segmentation',
    description: 'Exploration of customer data to identify meaningful customer groups.',
    technologies: 'Python · SQL · Data Analysis'
  },
  {
    number: '04',
    category: 'DATA ANALYTICS',
    title: 'Predictive Analytics',
    description: 'Exploration of historical data to identify patterns and investigate possible future trends.',
    technologies: 'Python · Data Analysis'
  }
]

function readPage() {
  const hash = window.location.hash.slice(1).toLowerCase()
  return pages.find((page) => page.toLowerCase() === hash) || 'Home'
}

function App() {
  const [activePage, setActivePage] = useState(readPage)
  const [portfolioData, setPortfolioData] = useState(null)
  const [backendStatus, setBackendStatus] = useState('Connecting...')

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(readPage())
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleHashChange)

    fetch('http://localhost:5000/api/portfolio')
      .then((response) => {
        if (!response.ok) throw new Error('Request failed')
        return response.json()
      })
      .then((data) => {
        setPortfolioData(data)
        setBackendStatus('Connected')
      })
      .catch((error) => {
        console.error('Backend connection error:', error)
        setBackendStatus('Offline — showing saved content')
      })

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function navigateTo(page) {
    setActivePage(page)
    window.history.pushState(null, '', `#${page.toLowerCase()}`)
    window.scrollTo(0, 0)
  }

  const skills = portfolioData?.skills || defaultSkills
  const role = portfolioData?.role || 'Aspiring Software Developer'
  const education = portfolioData?.education || 'BCA - Third Year'
  const linkedin =
    portfolioData?.linkedin ||
    'https://www.linkedin.com/in/saniya-bepari-603184321/'

  return (
    <div className="portfolio">
      <nav className="navbar">
        <button className="logo" onClick={() => navigateTo('Home')}>
          Saniya Bepari
        </button>

        <div className="nav-links">
          {pages.map((page) => (
            <button
              key={page}
              className={`nav-link ${activePage === page ? 'active' : ''}`}
              onClick={() => navigateTo(page)}
              type="button"
            >
              {page}
            </button>
          ))}
        </div>
      </nav>

      <main className="main-content">
        {activePage === 'Home' && (
          <section className="hero">
            <p className="eyebrow">HELLO, WELCOME TO MY PORTFOLIO</p>
            <h1>Saniya Abdul Aziz<br /><span>Bepari.</span></h1>
            <h2>{role}</h2>
            <p className="hero-description">
              I am a {education} student who works with programming,
              software development and data analytics to build practical
              solutions.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => navigateTo('Projects')}>
                Explore My Work
              </button>
              <a className="secondary-button" href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
            <p className="backend-status">Backend: {backendStatus}</p>
          </section>
        )}

        {activePage === 'About' && (
          <section className="section page-section">
            <p className="eyebrow">GET TO KNOW ME</p>
            <h2>About Me</h2>
            <p className="section-description">
              I am pursuing a Bachelor of Computer Applications at Goa
              Vidyaprasarak Mandal’s Gopal Govind Poy Raiturcar College
              of Commerce and Economics. I work with programming,
              software development and data analytics to build practical
              solutions. My goal is to become a skilled software developer
              and contribute to meaningful technology projects.
            </p>
            <div className="info-grid">
              <div className="info-card">
                <span>Education</span>
                <h3>Bachelor of Computer Applications</h3>
                <p>Third Year · Expected graduation 2027</p>
              </div>
              <div className="info-card">
                <span>Career Goal</span>
                <h3>Software Developer</h3>
                <p>Building useful and reliable digital solutions</p>
              </div>
            </div>
          </section>
        )}

        {activePage === 'Skills' && (
          <section className="section page-section">
            <p className="eyebrow">WHAT I WORK WITH</p>
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-card" key={skill}>{skill}</div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'Experience' && (
          <section className="section page-section">
            <p className="eyebrow">MY JOURNEY</p>
            <h2>Internship Experience</h2>
            <div className="experience-card">
              <div className="experience-top">
                <div>
                  <h3>D-Link (India) Ltd.</h3>
                  <p>IT Department Intern · Web Development</p>
                </div>
                <span>2026</span>
              </div>
              <p>
                Worked on the DTSC Roster Management module, including
                roster assignments, notification calendar, roster saving,
                export and default holiday functionality.
              </p>
              <p className="muted">22 July 2026 – 30 September 2026</p>
            </div>
            <div className="experience-card">
              <div className="experience-top">
                <div>
                  <h3>Thiranex</h3>
                  <p>Data Analytics Intern</p>
                </div>
                <span>2026</span>
              </div>
              <p>
                Worked on data cleaning, sales and revenue analysis,
                customer segmentation and predictive analytics activities.
              </p>
              <p className="muted">15 May 2026 – 14 June 2026</p>
            </div>
          </section>
        )}

        {activePage === 'Projects' && (
          <section className="section page-section">
            <p className="eyebrow">SELECTED WORK</p>
            <h2>Projects</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <span className="project-number">{project.number}</span>
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="project-tech">{project.technologies}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activePage === 'Contact' && (
          <section className="section page-section contact-section">
            <p className="eyebrow">LET'S CONNECT</p>
            <h2>Have a project in mind?</h2>
            <p>
              Feel free to connect with me for professional opportunities
              and collaboration.
            </p>
            <a className="primary-button" href={linkedin} target="_blank" rel="noreferrer">
              Connect on LinkedIn ↗
            </a>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Saniya Bepari</p>
        <button className="footer-link" onClick={() => navigateTo('Home')}>
          Back to Home ↑
        </button>
      </footer>
    </div>
  )
}

export default App

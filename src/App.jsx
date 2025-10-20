import React from 'react'
import { ConfigProvider } from 'antd'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Certifications from './components/Certifications'
import Skills from './components/Skills'
import Companies from './components/Companies'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import './App.css'

function App() {
  const antTheme = {
    token: {
      colorPrimary: '#6f2dbd',
      borderRadius: 10,
      fontFamily: "'Wix Madefor Text', sans-serif",
    },
  };

  return (
    <ConfigProvider theme={antTheme}>
      <div className="App">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Certifications />
          <Skills />
          <Companies />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </ConfigProvider>
  )
}

export default App

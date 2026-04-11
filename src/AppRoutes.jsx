import React from 'react'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Testimonials from './components/sections/Testimonials'
import Layout from './components/ui/Layout'


import { Route,Routes } from 'react-router-dom'

import Services from './components/sections/Services'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
      <Route path='about' element={<About/>}/>
      <Route path='projects' element={<Projects/>}/>
      <Route path='testimonials' element={<Testimonials/>}/>
      <Route path='services' element={<Services/>}/>
      </Route>
    </Routes>
    
  )
}

export default AppRoutes

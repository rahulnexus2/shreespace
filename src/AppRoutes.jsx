import React from 'react'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Testimonials from './components/sections/Testimonials'
import Layout from './components/ui/Layout'
import Hero from './components/sections/Hero'


import { Route,Routes } from 'react-router-dom'

import Services from './components/sections/Services'
import ServiceDetail from './ServiceDetail'

const AppRoutes = () => {
  return (
    <Routes>
  <Route path='/' element={<Layout/>}>
  <Route index element={<Hero/>} /> 
    <Route path='about' element={<About/>}/>
    <Route path='projects' element={<Projects/>}/>
    <Route path='testimonials' element={<Testimonials/>}/>
    <Route path='services' element={<Services/>}/>
    <Route path='services/:id' element={<ServiceDetail/>}/>  {/* ← removed leading slash */}
  </Route>
</Routes>
    
  )
}

export default AppRoutes

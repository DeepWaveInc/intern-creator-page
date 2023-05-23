import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Redirect from '../component/redirect'
import Home from '../pages/Home'
import Creator from '../pages/Creator'
import { useGetUserMeta } from '../hooks'

const Routers = () => {
  useGetUserMeta()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creator" element={<Creator />} />
      <Route path="*" element={<Redirect to={'/'} />} />
    </Routes>
  )
}

export default Routers

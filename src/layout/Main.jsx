import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import Footers from '../components/Footers'

function Main() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footers/>
    </div>
  )
}

export default Main
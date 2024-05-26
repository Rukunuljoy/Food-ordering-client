import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import Footers from '../components/Footers'
import { AuthContext } from '../contexts/AuthProvider'
import LoadingSpinner from '../components/LoadingSpinner'

function Main() {
  const {loading} = useContext(AuthContext);

  return (
    <div className='bg-primaryBG'>
       {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
        <Navbar />
        <Outlet />
        <Footers />
      </div>
      )}
    </div>
  )
}

export default Main



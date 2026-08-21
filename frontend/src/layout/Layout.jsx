import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-base-100">
      <Navbar />
      <main className="flex-1 overflow-y-auto w-full flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
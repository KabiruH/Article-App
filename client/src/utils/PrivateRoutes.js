import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes() {
    let user = (sessionStorage.getItem("user"));

    let auth = user

  return (
    auth? <Outlet /> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes
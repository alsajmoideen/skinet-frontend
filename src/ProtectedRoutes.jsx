import React from 'react'
import { Route, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
  return (
    <>
    <Route path='/profile' element={<Profile/>}/>
    </>
  )
}

export default ProtectedRoutes

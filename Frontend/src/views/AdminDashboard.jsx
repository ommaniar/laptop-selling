import React from 'react'
import AdminNavigtion from './AdminNavigtion'
import { useLogin } from '../required_context/LoginContext'
import { useNavigate } from 'react-router-dom'
import PageNotFound from './PageNotFound'
function AdminDashboard() {
  const {userType} = useLogin()
  const navigate = useNavigate()
  if (userType != 'admin' ){
    navigate('/')
  }
  return (
    <div>
      <AdminNavigtion></AdminNavigtion>
      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className=" p-5 text-center">
        <h1 className="display-4">Welcome, Admin!</h1>
        <p className="lead">This is your dashboard.</p>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard
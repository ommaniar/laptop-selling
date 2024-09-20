import React from 'react'
import logo from '../assets/logo-laptop.png'
import Header from './header'
import { Link } from 'react-router-dom'
import { useLogin } from '../required_context/LoginContext'
import { useNavigate } from 'react-router-dom'
function AdminNavigtion() {
  const { logout } = useLogin()
  const navigate = useNavigate()
  const performLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
        <div class="container-fluid">
          <Link class="navbar-brand" href="#"><img src={logo} alt="" height='50px' /></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/admin">Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin/add-product">Add Products</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin/orders">Orders</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin/products">Products</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-light text-dark" onClick={performLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNavigtion
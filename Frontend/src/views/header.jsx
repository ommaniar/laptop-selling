import logo from "../assets/logo-laptop.png"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from '../required_context/LoginContext.jsx'
import AdminNavigtion from "./AdminNavigtion.jsx"
function Header(props) {
    const { logout, userType , isLoggedIn} = useLogin()
    const navigate = useNavigate()
    const performLogout = () => {
        logout()
        navigate('/login')
    }
    if(userType != 'admin'){
        return (
            <>
    
                <header class="sticky-top " style={{zIndex:'10'}}>
                    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    
                        <div class="container-fluid ">
                            <div class="navbar-brand"><Link to="/" class="navbar-brand"><img src={logo} height='50px'
                                class="navbar-brand-img rounded" alt="Laptop Company Logo" /> LAPTOP COMPANY</Link></div>
                            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#link1">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse justify-content-end" id="link1">
    
                               
    
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <Link to="/" class="nav-link">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/contact-us" class="nav-link">Contact Us</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/shop" class="nav-link">Shop</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/my-orders" class="nav-link">My Orders</Link>
                                    </li>
                                    {/* <li class="nav-item">
                                            <Link to="/cart" class="nav-link"><i class="bi bi-cart">Cart</i></Link>
                                        </li> */}

                                    {
                                        isLoggedIn ? ( <li className="nav-item">
                                            <button className="btn btn-light text-dark" onClick={performLogout}>Logout</button>
                                        </li>) : ( <li className="nav-item">
                                        <Link className="btn btn-light text-dark" to="/login">Login</Link>
                                    </li>)
                                    }

                                   
                                </ul>
                            </div>
                        </div>
    
                    </nav>
    
                </header>
            </>
        )
    }else{
        return (
            <>
    
                <header class="sticky-top z-3">
                    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    
                        <div class="container-fluid ">
                            <div class="navbar-brand"><Link to="/" class="navbar-brand"><img src={logo}
                                class="navbar-brand-img rounded" alt="Laptop Company Logo" /> LAPTOP COMPANY</Link></div>
                            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#link1">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse justify-content-end" id="link1">
    
                               
    
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <Link to="/" class="nav-link">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/contact-us" class="nav-link">Contact Us</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/shop" class="nav-link">Shop</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/my-orders" class="nav-link">My Orders</Link>
                                    </li>
                                    {/* <li class="nav-item">
                                            <Link to="/cart" class="nav-link"><i class="bi bi-cart">Cart</i></Link>
                                        </li> */}

                                    {
                                        isLoggedIn ? ( <li className="nav-item">
                                            <button className="btn btn-light text-dark" onClick={performLogout}>Logout</button>
                                        </li>) : ( <li className="nav-item">
                                        <Link className="btn btn-light text-dark" to="/login">Login</Link>
                                    </li>)
                                    }

                                   
                                </ul>
                            </div>
                        </div>
    
                    </nav>
    
                </header>
            </>)
    }
    
}

export default Header
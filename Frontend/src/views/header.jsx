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
    
                <header className="sticky-top " style={{zIndex:'10'}}>
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
    
                        <div className="container-fluid ">
                            <div className="navbar-brand"><Link to="/" className="navbar-brand"><img src={logo} height='50px'
                                className="navbar-brand-img rounded" alt="Laptop Company Logo" /> LAPTOP COMPANY</Link></div>
                            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#link1">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="link1">
    
                               
    
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact-us" className="nav-link">Contact Us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/shop" className="nav-link">Shop</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/my-orders" className="nav-link">My Orders</Link>
                                    </li>
                                
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
    
                <header className="sticky-top z-3">
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
    
                        <div className="container-fluid ">
                            <div className="navbar-brand"><Link to="/" className="navbar-brand"><img src={logo}
                                className="navbar-brand-img rounded" alt="Laptop Company Logo" /> LAPTOP COMPANY</Link></div>
                            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#link1">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="link1">
    
                               
    
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact-us" className="nav-link">Contact Us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/shop" className="nav-link">Shop</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/my-orders" className="nav-link">My Orders</Link>
                                    </li>
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
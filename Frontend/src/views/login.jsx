import React,{useState} from 'react'
import { useLogin } from "../required_context/LoginContext"
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Header from './header';
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login,isLoggedIn,userType } = useLogin(username)
    const navigate = useNavigate()
    if (isLoggedIn) {
      // If the user is already logged in, redirect to the home page
      if(userType == 'customer')
        return <Navigate to="/" replace />;
      else
        return <Navigate to='/admin' replace />;
    }
    const performLogin = (e) => {
        e.preventDefault();
        console.log('Performing login');
        fetch('http://127.0.0.1:8000/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.resp === 1) {
                    // user found: loging in
                    login(data.user_type, username)
                    if(userType == 'customer')
                      return <Navigate to="/" replace />;
                    else
                      return <Navigate to='/admin' replace />;
                } else {
                    // user/password failed to match
                    document.getElementById('error-message').innerHTML = 'Username or Password is invalid'
                }
            })
            .catch(error => {
                console.error("Fetch error:", error.message || error);
            });
        console.log("Login attempt complete");
    }

  return (
    <div>
      <Header></Header>
      <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5">
        <h3 className="text-center mb-4">Login</h3>
        <form method='post'  onSubmit={performLogin}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name='username' placeholder='Enter Your Username' onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-secondary w-100">Login</button>
        </form>
        <p id='error-message'></p>
        <div className="text-center mt-3">
          <Link to="/signup" className="text-decoration-none">New User??</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
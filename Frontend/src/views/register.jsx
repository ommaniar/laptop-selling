import React, { useState } from 'react';
import { useLogin } from '../required_context/LoginContext';
import { Link, Navigate} from 'react-router-dom';
import Header from './header';
const Register = () => {
    const {login,isLoggedIn,userType} = useLogin()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const validate_password = (password) =>{ 
        if(password.length < 6) {
            setErrorMessage('password too short');
            return false
        }else if(password.length > 16) {
            setErrorMessage('password too long');
        }else if(password.search(/\d/)== -1){
            setErrorMessage("Password must contain atleast one digit");
            return false
        }else if(password.search(/[a-zA-z]/) == -1){
            setErrorMessage("Password must contain atleast one Letter");
            return false
        }else{
            return true
        }
    }
    if (isLoggedIn) {
        // If the user is already logged in, redirect to the home page
        if(userType == 'customer')
          return <Navigate to="/" replace />;
        else
          return <Navigate to='/admin' replace />;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/account/signup',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "username":username,
                "password":password,
                "email":email,
                "first_name": firstName,
                "last_name": lastName,
                "user_type":'customer'
            }),
        })
        .then(response=> response.json())
        .then(data=>{
            console.log(data)
            if (data.resp === 1){
                login('customer',username)
            }else{
                setErrorMessage(data.message)
            }
        })
        .catch(error=>{console.log(error)})
        console.log('Form Data Submitted:', JSON.stringify({
            "username":username,
            "password":password,
            "email":email,
            "first_name": firstName,
            "last_name": lastName,
            "user_type":'customer'
        }));
    };

    return (
        <div>
            <Header></Header>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card w-100 p-5">
                <div className="card-body">
                    <h2 className="card-title text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <p className='text-danger bg-danger-subtle rounded-3 px-3'>{errorMessage}</p>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                        <Link to="/login" className="text-decoration-none">Already Created Account??</Link>

                    </form>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default Register;

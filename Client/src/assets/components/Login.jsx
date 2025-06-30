import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const naviagte = useNavigate();

    // state for storing login credentials
    let [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    // storing the errors in object
    let [errors, setErrors] = useState({})

    // login form validation
    const validate = () => {

        let errors = {}

        if (!loginData.email.trim()) {
            errors.email = "Email is Required"
            alert("enter your email");
        }
        else if (!loginData.password.trim()) {
            errors.password = "password is required"
            alert("password is required");
        }

        return errors;
    }



    // form submission
    let handleLogin = (e) => {
        e.preventDefault();

        // storing the error in this state
        const validateErrors = validate();
        setErrors(validateErrors);

        // ❌ Don't continue if there are validation errors
        if (Object.keys(validateErrors).length > 0) {
            return;
        }

        fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Login success:", data);

                // 👇 Save userId in localStorage
                localStorage.setItem("userId", data.data.userId); // make sure backend returns userId                
                localStorage.setItem("userName", data.data.userName); // make sure backend returns userId                

                alert("Login Successful!");

                naviagte('/dashboard');
                setLoginData({
                    email: "",
                    password: ""
                })
                // store user or token in localStorage if needed
                // localStorage.setItem("user", JSON.stringify(data));
            })
            .catch((err) => {
                alert("Invalid credentials!");
                console.error(err);
            });
    }

    // input controlls
    let handleClick = (e) => {
        setLoginData(
            { ...loginData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="login">
                <form onSubmit={handleLogin} method='post'>
                    <div className="form_head">
                        <h3>Welcome Back</h3>
                        <p>Enter your credentials to access your todos</p>
                    </div>

                    <div className="input-fields">
                        <div className="input">
                            <label >Email</label>
                            <input type="mail" name='email' value={loginData.email} placeholder='Enter your email' onChange={handleClick} />
                            {/* {errors.email && <p className="error">{errors.email}</p>} */}
                        </div>
                        <div className="input">
                            <label >Password</label>
                            <input type="text" name='password' value={loginData.password} placeholder='Enter your password' onChange={handleClick} />
                            {/* {errors.password && <p className="error">{errors.password}</p>} */}
                            <p style={{ display: 'flex', justifyContent: 'end' }} className='forgot'><a href="#" style={{ color: "black", textDecoration: "none" }}>Forgot Password</a></p>
                        </div>
                    </div>

                    <div className="submit">
                        <button type='submit'>Sign In</button>
                        <p>Don't have an account? <Link to="/register">Sign up</Link>
                            {/* <Link to="signup" element={<Register />}>Sign up</Link> | */}
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
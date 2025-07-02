import React, { useState } from 'react'
import '../assets/css/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {

    const navigate = useNavigate();

    // state for storing login credentials
    let [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })


    // storing the errors in object
    let [errors, setErrors] = useState({})

    // state for show the eye icon in password
    let [showPassword, setShowPassword] = useState(false);

    // login form validation
    const validate = () => {

        let errors = {}

        if (!loginData.email.trim()) {
            errors.email = "Email is Required"
            // alert("enter your email");
        }
        else if (!loginData.password.trim()) {
            errors.password = "password is required"
            // alert("password is required");
        }

        return errors;
    }



    // form submission
    let handleLogin = (e) => {
        e.preventDefault();

        // storing the error in this state
        const validateErrors = validate();
        setErrors(validateErrors);

        //  Don't continue if there are validation errors
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
                localStorage.setItem("userId", data.data.user.userId); // make sure backend returns userId                
                localStorage.setItem("userName", data.data.user.userName); // make sure backend returns userId                

                // protected flag
                // localStorage.setItem("isLoggedIn", "true");

                // After login API response
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("loginTime", new Date().getTime()); // store current time


                alert("Login Successful!");
                navigate('/dashboard');
                // empty after login
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

    // handle the password eye icon
    let togglePassword = (() => {
        setShowPassword((prev) => !prev)
    })


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
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="input" style={{ position: "relative" }} >
                            <label >Password</label>
                            <input type={showPassword ? "text" : "password"} name='password' value={loginData.password} placeholder='Enter your password' onChange={handleClick} />
                            {loginData.password && (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "35%",
                                        right: "15px",
                                        cursor: "pointer"
                                    }} onClick={togglePassword}>
                                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </span>
                            )}
                            {errors.password && <p className="error">{errors.password}</p>}
                            <p style={{ display: 'flex', justifyContent: 'end' }} className='forgot'><a href="#" style={{ color: "black", textDecoration: "none" }}>Forgot Password</a></p>
                        </div>
                    </div>

                    <div className="submit">
                        <button type='submit'>Sign In</button>
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {


    // state for form registration
    let [formData, setFormData] = useState({
        userName: "",
        userMail: "",
        password: "",
        confirmPassword: ""

    });

    // ✅ validation errors
    const [errors, setErrors] = useState({});

    // validate all fields before submit
    const validate = () => {
        let errors = {};

        if (!formData.userName.trim()) {
            errors.userName = "UserName is empty.."
            alert("Enter your email");
        }
        else if (!formData.userMail.trim()) {
            errors.userMail = "Email is Empty.."
            alert("Enter your email");
        } else if (!/\S+@\S+\.\S+/.test(formData.userMail)) {
            errors.userMail = "Invalid email";
            alert("Invalid email");
        }

        else if (!formData.password) {
            errors.password = "Password is required";
            alert("Password is required");
        }
        else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            alert("Password must be at least 6 characters");
        }
        else if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm your password";
            alert("Confirm your password");
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
            alert("Passwords do not match");
        }

        return errors;
    };


    // post api
    let handleRegister = (e) => {
        e.preventDefault();

        // call the fn to validate the form
        const validateErrors = validate();
        setErrors(validateErrors);

        // ❌ Don't continue if there are validation errors
        if (Object.keys(validateErrors).length > 0) {
            return;
        }

        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(() => {
                alert("User Registered Successfully !! ");
                setFormData({
                    userName: "",
                    userMail: "",
                    password: "",
                    confirmPassword: ""
                })
            })

    }



    let handleChange = (e) => {

        // set the value of all input field
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    return (
        <>
            <div className="register">
                <form onSubmit={handleRegister} method='post'>
                    <div className="form_head">
                        <h3>Create Account</h3>
                        <p>Enter your details to create your todo account</p>
                    </div>


                    <div className="input-fields">
                        <div className="input">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" name="userName" value={formData.userName} placeholder='Enter you full name' onChange={handleChange} />
                            {/* {errors.userName && <p className="error">{errors.userName}</p>} */}
                        </div>
                        {/* email */}
                        <div className="input">
                            <label >Email</label>
                            <input type="mail" name="userMail" value={formData.userMail} placeholder='Enter you email' onChange={handleChange} />
                            {/* {errors.userMail && <p className="error">{errors.userMail}</p>} */}
                        </div>
                        {/* password */}
                        <div className="input">
                            <label >Password</label>
                            <input type="text" name="password" value={formData.password} placeholder='Create a password' onChange={handleChange} />
                            {/* {errors.password && <p className="error">{errors.password}</p>} */}
                        </div>
                        {/* confirm pasword */}
                        <div className="input">
                            <label >Confirm Password</label>
                            <input type="text" name="confirmPassword" value={formData.confirmPassword} placeholder='Confirm your password' onChange={handleChange} />
                            {/* {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>} */}
                        </div>
                    </div>


                    <div className="submit">
                        <button type='submit'>Create Account</button>
                        <p>Already have an account ? <Link to="/login">Sign in</Link>
                        </p>
                    </div>

                </form>
            </div>
        </>
    )
}


export default Register
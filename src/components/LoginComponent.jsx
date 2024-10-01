import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Redux/authSlice';
import { FaUser, FaLock } from "react-icons/fa";
import styles from '../sublogin/login.module.css';

const LoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State to manage form inputs and error message
    const [formValue, setFormValue] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    // Handle input changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    // Handle form submission and login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8085/auth/login", formValue);
            if (response.data === "Credentials Invalid !!") {
                setError("Invalid email or password. Please try again.");
            } else {
                dispatch(login({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    roles: response.data.roles,
                    jwttoken: response.data.jwttoken,
                }));
                localStorage.setItem('token', response.data.jwttoken);
                console.log("User login successfully");
                console.log(response.data);
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <section className={styles.loginsection}>
                <div className={styles.login}>
                    <div className={styles.wrapper}>
                        <form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <div className={styles.inputbox}>
                                <input 
                                    type='email' 
                                    name='email'
                                    value={formValue.email}
                                    onChange={handleChange}
                                    placeholder='Enter Your Email' 
                                    required
                                />
                                <FaUser className={styles.icon} />
                            </div>
                            <div className={styles.inputbox}>
                                <input 
                                    type='password' 
                                    name='password'
                                    value={formValue.password}
                                    onChange={handleChange}
                                    placeholder='Enter Your Password' 
                                    required
                                />
                                <FaLock className={styles.icon} />
                            </div>
                            {error && <p className='text-red-600'>{error}</p>}
                            <div className={styles.rememberforgot}>
                                <label><input type='checkbox' />Remember me</label>
                            </div>
                            <button type="submit">Login</button>
                            <div className={styles.registerlink}>
                                <p>Don't have an account? <a href='/login/register'>Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginComponent;

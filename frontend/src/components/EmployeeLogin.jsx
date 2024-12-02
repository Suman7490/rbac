import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import { useNavigate } from 'react-router-dom'

function EmployeeLogin() {
    const [values, setValues] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8081/auth', values)
            .then(result => {
                if (result.data.LoginStatus) {
                    const redirectPath = result.data.Redirect || '/empDashboard/profile';
                    navigate(redirectPath,{ state: { user: result.data.user } })
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => {
                console.error("Login error:", err);
                // setError("Something went wrong. Please try again.");
                setError(err.result?.data?.Error || "Login failed.");

            });
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100 LoginPage'>
                <form className='p-3 w-25 rounded text-center LoginForm' onSubmit={handleSubmit}>
                    <span className='text-danger text-sm'>{error && error}</span>
                    <h2 className='pb-3 text-white text-xl font-bold'>Login Pageee</h2>

                    <div className='form-group'>
                        <input
                            type='email'
                            name='email'
                            placeholder='email'
                            className='form-control'
                            required
                            value={values.email}
                            onChange={e => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            className='form-control'
                            required
                            value={values.password}
                            onChange={e => setValues({ ...values, password: e.target.value })} />
                    </div>
                    <div className='form-group d-flex justify-content-around'>
                        <button type='submit' className='btn btn-success w-100'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EmployeeLogin
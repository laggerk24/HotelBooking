import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const Login = () => {
    const[errorMessage,setErrorMessage] = useState("")
    const[login,setLogin] = useState({
        email: "",
        password:""
    })

    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name] : e.target.value})
    }

    const navigate = useNavigate()
    const auth = useAuth()
    const location = useLocation()
	const redirectUrl = location.state?.path || "/"


    const handleSubmit = async(e) => {
        e.preventDefault()
        const success = await loginUser(login)
        if(success){
            const token = success.token
            auth.handleLogin(token)
            navigate("/")
            // window.location.reload()
        }else{
            setErrorMessage("Invalid username or password. Please try again.")
        }
        setTimeout(() => {
            setErrorMessage("")
        },4000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p> }
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='row mb-3' >
                    <label htmlFor='email' className='col-sm-2 col-form-label'>
                        Email
                    </label>
                    <div>
                        <input id='email' 
                        type="email"
                        name='email'
                        className='form-control'
                        value={login.email}
                        onChange={handleInputChange} />
                    </div>
                </div>
                <div className='row mb-3' >
                    <label htmlFor='password' className='col-sm-2 col-form-label'>
                        Password
                    </label>
                    <div>
                        <input id='password' 
                        type="password"
                        name='password'
                        className='form-control'
                        value={login.password}
                        onChange={handleInputChange} />
                    </div>
                </div>

                <div className='mb-3'>
                    <button className='btn btn-hotel' 
                    type='submit'
                    style={{marginRight:'10px'}}>
                        Login
                    </button>
                    <span style={{marginLeft: '10px'}}>
                        Don`&#39;`t have an account yet? <Link to={'/register'}>Register</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Login
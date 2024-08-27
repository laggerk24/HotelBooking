import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

const Registration = () => {
    const emptyForm = {
        firstName:"",
        lastName:"",
        email: "",
        password:"",
    }

    const[Registration,setRegistration] = useState(emptyForm)
    const[errorMessage,setErrorMessage] = useState("")
    const[successMessage,setSuccessMessage] = useState("")
    
    const handleInputChange = (e) => {
        setRegistration({...Registration,[e.target.name]: e.target.value })
    }

    const handleRegistration = async(e) => {
        e.preventDefault()
        try {
            const result = await registerUser(Registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration(emptyForm)
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Registration error: ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p> }
            {successMessage && <p className='alert alert-success'>{successMessage}</p> }
            
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
				<div className="mb-3 row">
					<label htmlFor="firstName" className="col-sm-2 col-form-label">
						first Name
					</label>
					<div className="col-sm-10">
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={Registration.firstName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="lastName" className="col-sm-2 col-form-label">
						Last Name
					</label>
					<div className="col-sm-10">
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={Registration.lastName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={Registration.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={Registration.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-3">
					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Register
					</button>
					<span style={{ marginLeft: "10px" }}>
						Already have an account? <Link to={"/login"}>Login</Link>
					</span>
				</div>
			</form>
        </section>
    )
}

export default Registration
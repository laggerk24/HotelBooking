import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmation } from '../utils/ApiFunctions'

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        room: { id: "" },
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    })

    const [isDeleted, setIsDeleted] = useState(false)

    const clearBookingInfo = {
        id: "",
        room: { id: "" },
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = await getBookingByConfirmation(confirmationCode)
            setBookingInfo(data)
        } catch (error) {
            setBookingInfo(clearBookingInfo)
            if (error.response && error.response.status == 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully")
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        },2000)
    }


    return (
        <>
            <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
                <h2>Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className='col-md-6'>
                    <div className='input-group mb-3' >
                        <input id='confirmationCode'
                            className="form-control"
                            name='confirmationCode'
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder='Enter the booking confirmation code'
                        />
                        <button className="btn btn-hotel input-group-text">Find booking</button>
                    </div>
                </form>
                {isLoading ? (
                    <div>Finding booking......</div>
                ) : error ? (<div className='text-danger'>{error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p>Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
                        <p>Booking ID: {bookingInfo.id}</p>
                        <p>Room Number : {bookingInfo.room.id}</p>
                        <p>Check-In Date: {bookingInfo.checkInDate}</p>
                        <p>Check-Out Date: {bookingInfo.checkOutDate}</p>
                        <p>Full Name: {bookingInfo.guestName}</p>
                        <p>Email Address: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Childrens: {bookingInfo.numOfChildren}</p>
                        <p>Total Guest: {bookingInfo.totalNumOfGuests}</p>
                        {!isDeleted && (
                            <button
                                className="btn btn-danger"
                                onClick={() => handleBookingCancellation(bookingInfo.id)}
                            >Cancel Booking</button>
                        )}
                    </div>
                ) : (
                    <div> find booking ....</div>
                )}
                {isDeleted && (
                    <div className='alert alert-success mt-3'>{successMessage}</div>
                )}
            </div>
        </>
    )
}

export default FindBooking
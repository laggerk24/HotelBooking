import React, { useState } from 'react'

const Bookings = () => {
  const[bookingInfo, setBookingInfo] = useState([])
  const[isLoading,setIsloading] = useState(true)
  const[errorMessage,setErrorMessage] = useState("")
  
  return (
    <div>Bookings</div>
  )
}

export default Bookings
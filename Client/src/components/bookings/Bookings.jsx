import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import Header from '../common/Header'
import BookingsTable from './BookingsTable'

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setTimeout(() => {
      getAllBookings().then((data) => {
        setBookingInfo(data)
        setIsloading(false)
      }).catch((error) => {
        setError(error.message)
        setIsloading(false)
      })
    },1000)
  },[])

  const handleBookingCancellation = async(bookingId) => {
    try {
      await cancelBooking(bookingId)
      const data = await getAllBookings()
      setBookingInfo(data)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className='container' style={{backgroundColor:'whitesmoke'}}>
      <Header title={'Existing Bookings'} />
        {error && ( <div className='text-danger'>{error}</div> )}
        { isLoading ? (
          <div>Loading existing bookings</div>
        ) : (
          <BookingsTable
            bookingInfo={bookingInfo}
            handleBookingCancellation={handleBookingCancellation}  
          />
        )}
    </section>
  )
}

export default Bookings
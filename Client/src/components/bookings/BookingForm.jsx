import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import {useParams} from 'react-router-dom'
import moment from 'moment'

const BookingForm = () => {
    const[isValidated, setIsValidated] = useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")
    const[roomPrice, setRoomPrice] = useState(0)

    const[booking, setBooking] = useState({
        guestName: "",
        guestEmail:"",
        checkInDate:"",
        checkOutDate:"",
        numberOfAdults:"",
        numberOfChildren:""
    })

    const{roomId} = useParams()

    const handleInputChange = (e) => {
        const{name, value} = e.target
        setBooking({...booking,[name]:value})
        setErrorMessage("")
    }

    const[roomInfo, setRoomInfo] = useState({
        photo:"",
        roomType:"",
        roomPrice:""
    })

    const getRoomPriceById = async(roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch (error) {
            setErrorMessage(error.message)
            throw new Error(error)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    },[roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate)
        const pricePerDay = roomPrice ? roomPrice: 0
        return diffInDays * pricePerDay
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalCount = adultCount+childrenCount
        return totalCount >=1 && adultCount >=1
    }

    const isCheckOutDateValid = () => {
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check-out dfate must come before check in date")
            return false
        }else{
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()){
            e.stopPropagation()                                                  
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking  = async() => {
        try {
            const confirmationCode = await bookRoom(roomId,booking)
            setIsSubmitted(true)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <div>

        </div>
    )
}

export default BookingForm
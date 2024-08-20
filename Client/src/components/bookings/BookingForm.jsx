import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {
    const [validated, setValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: localStorage.getItem("userId") || "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomPrice = async () => {
            try {
                const response = await getRoomById(roomId);
                setRoomPrice(response.roomPrice || 0);
            } catch (error) {
                console.error("Failed to fetch room price:", error);
                setErrorMessage("Failed to fetch room price.");
            }
        };

        fetchRoomPrice();
    }, [roomId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking(prevBooking => ({ ...prevBooking, [name]: value }));
        setErrorMessage("");
    };

    const calculatePayment = () => {
        const { checkInDate, checkOutDate } = booking;
        const checkIn = moment(checkInDate);
        const checkOut = moment(checkOutDate);
        const diffInDays = checkOut.diff(checkIn, "days");
        return diffInDays * (roomPrice || 0);
    };

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults, 10);
        const childrenCount = parseInt(booking.numOfChildren, 10);
        return adultCount >= 1 && (adultCount + childrenCount) >= 1;
    };

    const isCheckOutDateValid = () => {
        const { checkInDate, checkOutDate } = booking;
        if (!moment(checkOutDate).isAfter(moment(checkInDate))) {
            setErrorMessage("Check-out date must be after check-in date.");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setValidated(true);
    };

    const handleFormSubmit = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmitted(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            console.error("Booking failed:", error);
            navigate("/booking-success", { state: { error: error.message } });
        }
    };

    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mt-5">
                        <h4 className="card-title">Reserve Room</h4>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="guestFullName" className="hotel-color">Full Name</Form.Label>
                                <FormControl
                                    required
                                    type="text"
                                    id="guestFullName"
                                    name="guestFullName"
                                    value={booking.guestFullName}
                                    placeholder="Enter your full name"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="guestEmail" className="hotel-color">Email</Form.Label>
                                <FormControl
                                    required
                                    type="email"
                                    id="guestEmail"
                                    name="guestEmail"
                                    value={booking.guestEmail}
                                    placeholder="Enter your email"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                            </Form.Group>

                            <fieldset style={{ border: "2px" }}>
                                <legend>Lodging Period</legend>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Label htmlFor="checkInDate" className="hotel-color">Check-in Date</Form.Label>
                                        <FormControl
                                            required
                                            type="date"
                                            id="checkInDate"
                                            name="checkInDate"
                                            value={booking.checkInDate}
                                            min={moment().format("YYYY-MM-DD")}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please select a check-in date.</Form.Control.Feedback>
                                    </div>

                                    <div className="col-6">
                                        <Form.Label htmlFor="checkOutDate" className="hotel-color">Check-out Date</Form.Label>
                                        <FormControl
                                            required
                                            type="date"
                                            id="checkOutDate"
                                            name="checkOutDate"
                                            value={booking.checkOutDate}
                                            min={moment().format("YYYY-MM-DD")}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please select a check-out date.</Form.Control.Feedback>
                                    </div>
                                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                </div>
                            </fieldset>

                            <fieldset style={{ border: "2px" }}>
                                <legend>Number of Guests</legend>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Label htmlFor="numOfAdults" className="hotel-color">Adults</Form.Label>
                                        <FormControl
                                            required
                                            type="number"
                                            id="numOfAdults"
                                            name="numOfAdults"
                                            value={booking.numOfAdults}
                                            min={1}
                                            placeholder="0"
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please select at least 1 adult.</Form.Control.Feedback>
                                    </div>
                                    <div className="col-6">
                                        <Form.Label htmlFor="numOfChildren" className="hotel-color">Children</Form.Label>
                                        <FormControl
                                            type="number"
                                            id="numOfChildren"
                                            name="numOfChildren"
                                            value={booking.numOfChildren}
                                            min={0}
                                            placeholder="0"
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Select 0 if no children.</Form.Control.Feedback>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="form-group mt-2 mb-2">
                                <Button type="submit" className="btn btn-hotel">Continue</Button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="col-md-6">
                    {isSubmitted && (
                        <BookingSummary
                            booking={booking}
                            payment={calculatePayment()}
                            onConfirm={handleFormSubmit}
                            isFormValid={validated}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingForm;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";  
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numberOfDays = checkOutDate.diff(checkInDate, "days");

    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000);
    };

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success");
        }
    }, [isBookingConfirmed, navigate]);

    const renderPaymentButton = () => {
        if (isProcessingPayment) {
            return (
                <>
                    <span
                        className="spinner-border spinner-border-sm mr-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Booking Confirmed, redirecting to payment...
                </>
            );
        }

        return "Confirm Booking & proceed to payment";
    };

    return (
        <div className="card card-body mt-5">
            <h4 className="card-title hotel-color">Reservation Summary</h4>
            <div className="mb-3">
                <p>
                    Name: <strong>{booking.guestFullName}</strong>
                </p>
                <p>
                    Email: <strong>{booking.guestEmail}</strong>
                </p>
                <p>
                    Check-in Date: <strong>{checkInDate.format("MMM Do YYYY")}</strong>
                </p>
                <p>
                    Check-out Date: <strong>{checkOutDate.format("MMM Do YYYY")}</strong>
                </p>
                <p>
                    Number of Days Booked: <strong>{numberOfDays}</strong>
                </p>
            </div>

            <div className="mb-3">
                <h5 className="hotel-color">Number of Guests</h5>
                <p>
                    Adults: <strong>{booking.numOfAdults}</strong>
                </p>
                <p>
                    Children: <strong>{booking.numOfChildren}</strong>
                </p>
            </div>

            {payment > 0 ? (
                <div>
                    <p className="pb-4">
                        Total payment: <strong>${payment}</strong>
                    </p>

                    {isFormValid && !isBookingConfirmed ? (
                        <Button variant="success" onClick={handleConfirmBooking}>
                            {renderPaymentButton()}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : (
                <p className="text-danger">Check-out date must be after check-in date.</p>
            )}
        </div>
    );
};

BookingSummary.propTypes = {
    booking: PropTypes.shape({
        guestFullName: PropTypes.string.isRequired,
        guestEmail: PropTypes.string.isRequired,
        checkInDate: PropTypes.string.isRequired,
        checkOutDate: PropTypes.string.isRequired,
        numOfAdults: PropTypes.string.isRequired,
        numOfChildren: PropTypes.string.isRequired,
    }).isRequired,
    payment: PropTypes.number.isRequired,
    isFormValid: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default BookingSummary;

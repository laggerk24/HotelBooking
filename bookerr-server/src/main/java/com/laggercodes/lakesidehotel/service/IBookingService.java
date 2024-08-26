package com.laggercodes.lakesidehotel.service;

import com.laggercodes.lakesidehotel.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    void cancelBooking(Long bookingId);
    List<BookedRoom> getAllBookingsByRoomId(Long roomId);
    String saveBooking(Long roomId, BookedRoom bookingRequest);
    BookedRoom findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> getAllBookings();
    List<BookedRoom> getBookingsByUserEmail(String email);
}

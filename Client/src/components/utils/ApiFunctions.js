import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

// This function add a new room to the database
export async function addRoom(photo,roomType,roomPrice) {
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if(response.status === 201) return true
    return false
}

// This function gets all room types from the data base
export async function getRoomTypes() {
    try{
        const response = await api.get("/rooms/room-types")
        return response.data
    }
    catch(error){
        throw new Error("Error fething room types")                   
    }
}

// This function gets all room from DB
export async function getAllRooms(){
    try{
        const response = await api.get("/rooms/all-rooms")
        return response.data
    }
    catch(error){
        throw new Error("Error Fething rooms")
    }
}

// delete a room by Id
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data;
    }
    catch(error){
        throw new Error(`Error Deleting room from ${roomId}`)
    }
}

// This functionality updates a room
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo",roomData.photo)

    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response;
}

// This function gets a room by Id 
export async function getRoomById(roomId) {
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }
    catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }
}

//This function books a room
export async function bookRoom(roomId, booking){
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

//This gets all the bookings
export async function getAllBookings() {
    try {
        const response = await api.get("/bookings/all-bookings")
        return response.data
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message} `)
    }
}

//This gets booking by confirmation code
export async function getBookingByConfirmation(confirmationCode){
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error fetching booking with code ${confirmationCode} : ${error.message} `)
        }
    }
}

//This function canceles a booking
export async function cancelBooking(bookingId){
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking with Id ${bookingId} : ${error.message}`)
    }
}
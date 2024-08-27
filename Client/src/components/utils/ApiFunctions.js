import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

// This function add a new room to the database
export async function addRoom(photo,roomType,roomPrice) {
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response = await api.post("/rooms/add/new-room", formData,{
        headers: getHeader()
    })
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
        const result = await api.delete(`/rooms/delete/room/${roomId}`,{
            headers: getHeader()
        })
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

    const response = await api.put(`/rooms/update/${roomId}`, formData,{
        headers: getHeader()
    })
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
        const response = await api.get("/bookings/all-bookings",{
            headers: getHeader()
        })
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
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`,{
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking with Id ${bookingId} : ${error.message}`)
    }
}

// gets all the avaialble rooms based on type withing a given date.
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
    const results = await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return results
}

// register a new user 
export async function registerUser(registeration) {
    try {
        const response = await api.post("/auth/register-user",registeration)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`User registeration error : ${error.message}`)
        }
    }
}

// login with a new user
export async function loginUser(login) {
    try{
        const response = await api.post("/auth/login", login)
        if(response.status >= 200 && response.status < 300){
            return response.data
        }else{
            return null
        }
    }catch(error){
        console.error(error)
        return null
    }
}

// get User Profile
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

// This is the function to delete a user
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`,{
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

// Function to get a single Use
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

//  Function to get user bookings by the userId
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}
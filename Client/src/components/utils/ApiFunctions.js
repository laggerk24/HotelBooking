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

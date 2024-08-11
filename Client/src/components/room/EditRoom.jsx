import { useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditRoom = () => {

    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: 0
    });

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const {roomId} = useParams()

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error)
            }
        }

        fetchRoom()
    },[roomId])   

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setRoom({...room, photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        setRoom({...room, [name]: value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const success = await updateRoom(roomId, room)
            if(success.status == 200){   
                setSuccessMessage("Room Updated successfully ")
                const updatedRoom = await getRoomById(roomId) 
                setRoom(updatedRoom)
                setImagePreview(updatedRoom.photo)
                setErrorMessage("")
            }
            else{
                setErrorMessage("Error Updating room room")
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() =>{
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
        <section className="container, mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add a New Room</h2>
                    {successMessage && ( <div className="alert alert-success fade show"> {successMessage} </div> )}
                    {errorMessage && ( <div className="alert alert-danger fade show"> {errorMessage} </div> )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">
                                Room Type
                            </label>
                            <input type="text" className="form-control" id="roomType" name="roomType"
                                value={room.roomType} onChange={handleRoomInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label">
                                Room Price
                            </label>
                            <input 
                                type="number" 
                                className="form-control" 
                                required 
                                id="roomPrice" 
                                name = "roomPrice" 
                                value={room.roomPrice} 
                                onChange={handleRoomInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Photo
                            </label>
                            <input 
                                type="file" 
                                id="photo" 
                                name="photo" 
                                className="form-control" 
                                onChange={handleImageChange} />

                            {imagePreview && ( 
                                <img 
                                    src={`data:image/jpeg;base64,${imagePreview}`} 
                                    alt="Room Preview" 
                                    style={{maxWidth:"400px", maxHeight:"400px"}} 
                                    className="mt-3"
                                /> )}
                        </div>
                        <div className="d-grid d-md-flex mt-2">
                            <Link to='/existing-rooms'className="btn btn-outline-info ml-5" >Back</Link>
                            <button type="submit" className="btn btn-outline-warning" >Edit Room</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default EditRoom
import React, { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"
import PropTypes from 'prop-types';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([])
    const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }

    return (<>
        {roomTypes.length >= 0 && (
            <div>
                <select required className="form-select" name="roomType" id="roomType" onChange={(e) => {
                    if (e.target.value === "Add New") {
                        setShowNewRoomTypesInput(true)
                    }
                    else { handleRoomInputChange(e) }
                }}>
                    value={newRoom.roomType}
                    <option value="">select a room type </option>
                    <option value={"Add New"}> Add New </option>
                    {roomTypes.map((type, index) => (<option key={index} value={type}>{type}</option>))}
                </select>
                {showNewRoomTypeInput && (
                    <div className="mt-2">
                        <div className="input-group"><input className="form-control" type="text"
                            placeholder="Enter a new room type" onChange={handleNewRoomTypeInputChange} value={newRoomType} />
                            <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    </div>)}
            </div>)}
    </>)

};

RoomTypeSelector.propTypes = {   
    handleRoomInputChange: PropTypes.func.isRequired,
    newRoom: PropTypes.shape({
        roomType: PropTypes.string,
        roomPrice: PropTypes.number
    }).isRequired
};

export default RoomTypeSelector;
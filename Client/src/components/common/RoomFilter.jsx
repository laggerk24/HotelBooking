import { useState } from "react"


const RoomFilter = ( {data,setFilteredRooms} ) => {
    const[filter,setFilter] = useState("");
    const[roomTypes] = useState([...new Set(data.map((room) => room.roomType))])

    const handleSelectChange = (e) =>{
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().
            includes(selectedRoomType.toLowerCase()))
            setFilteredRooms(filteredRooms)
    }

    const clearFilter = () =>{
        setFilter("")
        setFilteredRooms(data)
    }

    return  (
        <div className="input-group mb-3">
            <span className="input-group-text" id="room-type-filter">
                Filter rooms by type
            </span>
            <select className="form-select" value={filter} onChange={handleSelectChange}>
                <option value="">Select a room type to filter...</option>
                {roomTypes.map((type,index) => (
                    <option value={String(type)} key={index} >{String(type)}</option>
                ))}
            </select>
            <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear Filter</button>
        </div>
    )

}

export default RoomFilter
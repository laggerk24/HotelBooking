import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import HomePage from './components/home/HomePage'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'

function App() {

  return (
    <>
      <main>
        <Router>
        <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/edit-room/:roomId' element={<EditRoom />} />
            <Route path='/existing-rooms' element={<ExistingRooms />} />
            <Route path='/add-room' element={<AddRoom />} />
            <Route path='/browse-all-rooms' element={<RoomListing />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  )
}

export default App

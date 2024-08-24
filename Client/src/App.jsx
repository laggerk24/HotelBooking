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
import Admin from './components/admin/Admin'
import Checkout from './components/bookings/Checkout'
import BookingSuccess from './components/bookings/BookingSuccess'
import Bookings from './components/bookings/Bookings'
import FindBooking from './components/bookings/FindBooking'

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
            <Route path='/book-room/:roomId' element={<Checkout />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path='/browse-all-rooms' element={<RoomListing />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/existing-bookings' element={<Bookings />} />
            <Route path='/find-booking' element={<FindBooking />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  )
}

export default App

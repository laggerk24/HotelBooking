import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import HomePage from './components/home/HomePage'

function App() {

  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path='/' element = { <HomePage/> } />
            <Route path='/edit-room/:roomId' element = { <EditRoom/> } />
            <Route path='/existing-rooms' element = { <ExistingRooms/> } />
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HotelList from './components/HotelList';
import RoomDetails from './components/RoomDetails';
import LoginForm from './components/LoginForm';
import RegistrationPage from './components/RegistrationPage';
import axios from 'axios';

function App() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]); // Define the state for rooms
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetchHotels();
    fetchRooms(); // Fetch room data
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/hotels/');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/rooms/');
      setRooms(response.data); // Set the fetched room data
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleRoomBook = (room) => {
    if (loggedIn) {
      setSelectedRoom(room);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLogin(false);
  };

  const handleReservation = (reservationData) => {
    console.log('Reservation data:', reservationData);
    setSelectedRoom(null);
  };

  const handleNavigateToRegistration = () => {
    setShowRegistration(true);
    setShowLogin(false);
  };

  return (
    <div className="App">
      <Header />
      <HotelList hotels={hotels} rooms={rooms} onRoomBook={handleRoomBook} /> {/* Pass room data */}
      {selectedRoom && <RoomDetails room={selectedRoom} onReservation={handleReservation} />}
      {showLogin && (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegistration={handleNavigateToRegistration}
        />
      )}
      {showRegistration && (
        <RegistrationPage onRegistrationSuccess={() => setShowRegistration(false)} />
      )}
    </div>
  );
}

export default App;

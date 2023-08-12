import React from 'react';

function RoomDetails({ room, onRoomBook }) {
  const handleBookRoom = () => {
    onRoomBook(room);
  };

  return (
    <div className="room-details">
      <h2>{room.name}</h2>
      <p>Room Number: {room.room_number}</p>
      <p>Price: ₹{room.price} per night</p>
      <p>{room.description}</p>
      <button onClick={handleBookRoom}>Reserve Room</button>
    </div>
  );
}

export default RoomDetails;

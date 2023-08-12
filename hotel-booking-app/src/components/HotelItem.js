import React from 'react';
import './HotelItem.css';

function HotelItem({ hotel, onRoomBook }) {
  return (
    <div className="hotel-item">
      <img src={hotel.image} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>{hotel.description}</p>
      <p>Location: {hotel.city}, {hotel.state}, {hotel.country}</p>
      <p>Rating: {hotel.rating}</p>
      <p>Price: ${hotel.price} per night</p>
      <button onClick={() => onRoomBook(hotel)}>Book Now</button>
    </div>
  );
}

export default HotelItem;

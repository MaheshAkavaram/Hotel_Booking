import React, { useState } from 'react';
import './HotelList.css';
import RoomDetails from './RoomDetails';

function HotelList({ hotels, onRoomBook }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleRoomBookClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedHotels = filteredHotels.slice().sort((a, b) => {
    if (sortBy === 'city') {
      return a.city.localeCompare(b.city);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sortBy === 'priceHighToLow') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="hotel-list-container">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by hotel name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={sortBy} onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="city">City</option>
          <option value="rating">Rating</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>
      <div className="hotel-list">
        {sortedHotels.map((hotel) => (
          <div className="hotel-item" key={hotel.id}>
            <img
              className="hotel-image"
              src={`http://127.0.0.1:8000${hotel.image}`}
              alt={hotel.name}
            />
            <div className="hotel-details">
              <h2 className="hotel-name">{hotel.name}</h2>
              <p className="hotel-location">
                {hotel.city}, {hotel.state}, {hotel.country}
              </p>
              <p className="hotel-price">₹ {hotel.price}</p>
              <p className="currency">per night</p>
              <p className="hotel-rating">Rating: {hotel.rating}/5</p>
              <div>
                <button onClick={() => handleRoomBookClick(hotel)}>View Room</button>
              </div>
              {selectedHotel && selectedHotel.id === hotel.id && (
                <RoomDetails room={selectedHotel.room} onRoomBook={onRoomBook} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelList;

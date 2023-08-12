import React, { useState } from 'react';

function ReservationForm({ userIsLoggedIn, onReservation }) {
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    if (userIsLoggedIn) {
      onReservation(formData);
    } else {
      // Handle user not logged in scenario (e.g., show a login/register prompt)
    }
  };

  return (
    <div className="reservation-form">
      <h3>Reservation</h3>
      <form onSubmit={handleReservationSubmit}>
        <label>
          Check-In Date:
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Check-Out Date:
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Number of Guests:
          <input
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}
            min="1"
          />
        </label>
        <button type="submit">Make Reservation</button>
      </form>
    </div>
  );
}

export default ReservationForm;

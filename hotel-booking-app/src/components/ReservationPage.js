import React from 'react';
import LoginForm from './LoginForm';
import ReservationForm from './ReservationForm';

function ReservationPage({ userIsLoggedIn, onLoginSuccess, onReservation }) {
  return (
    <div className="reservation-page">
      <h2>Reservation</h2>
      {userIsLoggedIn ? (
        <ReservationForm
          userIsLoggedIn={userIsLoggedIn}
          onReservation={onReservation}
        />
      ) : (
        <LoginForm onLoginSuccess={onLoginSuccess} />
      )}
    </div>
  );
}

export default ReservationPage;

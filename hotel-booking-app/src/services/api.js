import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/'; // Update the base URL

export const getHotels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/hotels/`); // Update the API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

// Add more API functions as needed

import axios from "axios";

export const geocodeAddress = async (address: string) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    // Handle the response data here (e.g., extract latitude and longitude)
    if (response.data.status === "ZERO_RESULTS") {
      return;
    }
    if (response.data.results) {
      // const length = response.data.results.length - 1;
      return response.data.results[0].geometry.location;
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
  }
};

export const geocodeMap = async (address: string) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    // Handle the response data here (e.g., extract latitude and longitude)
    if (response.data.status === "ZERO_RESULTS") {
      return;
    }
    if (response.data.results) {
      // const length = response.data.results.length - 1;
      return response.data.results[0].geometry;
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
  }
};

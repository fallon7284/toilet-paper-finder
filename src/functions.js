const axios = require("axios");

const getDistance = (currLat, currLong, destLat, destLong) => {
  console.log({ currLat, currLong, destLat, destLong });
  function toRad(x) {
    return (x * Math.PI) / 180;
  }
  const R = 6371;
  const dLat = toRad(currLat - destLat);
  const dLon = toRad(currLong - destLong);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(currLat)) *
      Math.cos(toRad(destLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const result = R * c;
  return result.toFixed(1);
};

const directionsQuery = (location, latitude, longitude) => {
  return `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${latitude},${longitude}`;
};

const postUpdate = (yelpId, amount) => {
  axios.post(`http://localhost:5000/update/${yelpId}&${amount}`);
};

module.exports = { getDistance, directionsQuery, postUpdate };

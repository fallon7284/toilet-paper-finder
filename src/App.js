import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import List from "./pages/List";
import AddStore from "./pages/AddStore";
import { googleKey } from "./secrets";
import { getDistance } from "./functions";
import "./App.css";

function App() {
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [stores, setStores] = useState([]);
  const [sortBy, setSortBy] = useState("distance");
  const [filter, setFilter] = useState(false);

  const fetchLocation = async () => {
    const { data } = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKey}`
    );
    localStorage.setItem("lat", data.location.lat);
    localStorage.setItem("lng", data.location.lng);
    localStorage.setItem("updated", Date.now());
    setLocation(data.location);
  };

  const fetchStores = async () => {
    if (location.lat && location.lng) {
      const { data } = await axios.get(
        `http://localhost:5000/location?lat=${location.lat}&lng=${location.lng}`
      );
      let distancedData = data.stores.map(store => {
        return {
          ...store,
          distance: getDistance(
            location.lat,
            location.lng,
            store.coordinates.latitude,
            store.coordinates.longitude
          )
        };
      });
      setStores(distancedData);
    }
  };

  const handleChange = e => {
    setSortBy(e.target.value);
  };
  useEffect(() => {
    //on component mount check local storage for recent location data
    const storageLocationAge = localStorage.getItem("updated");
    const storageLocationLat = localStorage.getItem("lat");
    const storageLocationLng = localStorage.getItem("lng");
    if (
      //if location data exists and is less than 10 minutes old
      storageLocationLat &&
      storageLocationLng &&
      Date.now() - Number(storageLocationAge) < 600000
    ) {
      //use local storage data
      setLocation({ lat: storageLocationLat, lng: storageLocationLng });
    } else {
      //else use google location services to find new location data
      fetchLocation();
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [location]);
  return (
    <>
      <label>
        SORT BY
        <select value={sortBy} onChange={handleChange}>
          <option value="distance">Distance</option>
          <option value="amount">Amount</option>
        </select>
      </label>
      <BrowserRouter>
        <Route
          path="/"
          render={() => {
            return (
              <List
                location={location}
                stores={stores}
                filter={filter}
                sortBy={sortBy}
              />
            );
          }}
        />
        <Route exact path="/addstore" component={AddStore} />
      </BrowserRouter>
    </>
  );
}

export default App;

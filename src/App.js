import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import List from "./pages/List";
import AddStore from "./pages/AddStore";
import TopBar from "./pages/TopBar";
import { googleKey } from "./secrets";
import { getDistance } from "./functions";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [stores, setStores] = useState([]);
  const [sortBy, setSortBy] = useState(true);
  const [filter, setFilter] = useState(false);
  const toggleFilter = () => setFilter(!filter);

  const fetchLocation = async () => {
    const { data } = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKey}`
    );
    localStorage.setItem("lat", data.location.lat);
    localStorage.setItem("lng", data.location.lng);
    localStorage.setItem("updated", Date.now());
    setLocation(data.location);
  };

  const postUpdate = async (yelpId, amount) => {
    const { data } = await axios.post(
      `http://localhost:5000/update?yelpId=${yelpId}&tpAmount=${amount}`
    );
    console.log(data);
    const storeToUpdate = stores.find(store => store.yelpId === yelpId);
    storeToUpdate.hasTPInStock = data.hasTPInStock;
    storeToUpdate.updatedAt = data.updatedAt;
    setStores([...stores]);
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

  const sortCallback = (a, b) => {
    if (sortBy) {
      return Number(a.distance) - Number(b.distance);
    } else {
      return b[sortBy] - a[sortBy];
    }
  };

  const toggleSort = () => {
    setSortBy(!sortBy);
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
      <TopBar
        toggleFilter={toggleFilter}
        toggleSort={toggleSort}
        sortBy={sortBy}
        filter={filter}
      />
      <div className={classes.offset} />
      <BrowserRouter>
        <Route
          path="/"
          render={() => {
            return (
              <List
                location={location}
                stores={stores.sort((a, b) => {
                  if (sortBy) {
                    return Number(a.distance) - Number(b.distance);
                  } else {
                    return Number(b.hasTPInStock) - Number(a.hasTPInStock);
                  }
                })}
                filter={filter}
                sortBy={sortBy}
                postUpdate={postUpdate}
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

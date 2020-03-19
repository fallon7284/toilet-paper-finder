import React, { useState } from "react";
import { directionsQuery, postUpdate } from "../functions";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";

import Card from "./Card";
import "./listItem.styles.scss";

export default ({ location, store, postUpdate }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const toggleUpdateOpen = () => {
    setUpdateOpen(!updateOpen);
  };
  const {
    name,
    coordinates,
    hasTPInStock,
    updatedAt,
    image_url,
    distance,
    yelpId
  } = store;
  const { latitude, longitude } = coordinates;
  let directionsData = [location, latitude, longitude];
  const tpStrings = [
    "no data reported yet.",
    "no toilet paper in stock.",
    "only a small amount toilet paper in stock.",
    "a fair amount of toilet paper in stock.",
    "a lot of toilet paper in stock."
  ];
  const content = `This store has ${tpStrings[hasTPInStock]}`;
  return (
    <div className="list-item">
      <div className="info">
        <Card
          {...{
            ...store,
            content,
            directionsData,
            toggleUpdateOpen,
            updateOpen
          }}
        />
      </div>
    </div>
  );
};

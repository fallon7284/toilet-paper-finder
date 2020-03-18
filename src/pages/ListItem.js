import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { directionsQuery, postUpdate } from "../functions";
import "./listItem.styles.scss";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

export default ({ location, store }) => {
  const {
    name,
    coordinates,
    hasTPInStock,
    updatedAt,
    image_url,
    distance,
    yelpId
  } = store;
  const tpStrings = [
    "no data reported yet.",
    "no toilet paper in stock.",
    "only a little amount toilet paper in stock.",
    "a fair amount of toilet paper in stock.",
    "a lot of toilet paper in stock."
  ];
  const { latitude, longitude } = coordinates;
  return (
    <div className="list-item">
      <div className="info">
        <div
          className="title"
          style={{
            backgroundImage: `url(${image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "40%"
          }}
        >
          {name}
        </div>
        <div>
          <div>{`This store has ${tpStrings[hasTPInStock]}`}</div>
          <div>{`${
            distance <= 1 ? "Less than a mile" : `${distance} mile`
          } away`}</div>
        </div>
      </div>
      <div className="buttons">
        <div
          onClick={() =>
            window.open(directionsQuery(location, latitude, longitude))
          }
        >
          NAVIGATE
        </div>
        <div onClick={() => postUpdate(yelpId, 5)}>POST UPDATE</div>
      </div>
    </div>
  );
};

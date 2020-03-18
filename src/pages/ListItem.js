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
  const { latitude, longitude } = coordinates;
  const d = new Date();
  let update = d.getMilliseconds(updatedAt);
  console.log(location);
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
          <div>{`This store ${
            hasTPInStock !== null
              ? `${
                  hasTPInStock ? "has" : "does not have"
                }  toilet paper in stock`
              : "has no data reported"
          }`}</div>
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

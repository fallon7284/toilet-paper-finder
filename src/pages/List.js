import React from "react";
import ListItem from "./ListItem";
import "./list.styles.scss";

export default ({ location, stores, sortBy, filter, postUpdate }) => {
  const filteredStores = filter
    ? stores.filter(s => s.hasTPInStock > 1)
    : stores;
  return (
    <div className="list">
      {filteredStores
        .sort((a, b) => {
          if (sortBy === "distance") {
            return Number(a[sortBy]) - Number(b[sortBy]);
          }
          return b[sortBy] - a[sortBy];
        })
        .map((store, idx) => {
          return (
            <ListItem
              key={idx}
              location={location}
              store={store}
              postUpdate={postUpdate}
            />
          );
        })}
    </div>
  );
};

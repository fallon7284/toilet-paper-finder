import React from "react";
import ListItem from "./ListItem";
import "./list.styles.scss";

export default ({ location, stores, sortBy, filter }) => {
  const filteredStores = filter ? stores.filter(s => s.hasTPInStock) : stores;
  return (
    <div className="list">
      {filteredStores
        .sort((a, b) => {
          if (sortBy === "distance") {
            return a[sortBy] - b[sortBy];
          }
          return b[sortBy] - a[sortBy];
        })
        .map((store, idx) => {
          console.log(store);
          return <ListItem key={idx} location={location} store={store} />;
        })}
    </div>
  );
};

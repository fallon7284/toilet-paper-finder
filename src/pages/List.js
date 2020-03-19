import React from "react";
import ListItem from "./ListItem";
import "./list.styles.scss";

export default ({
  location,
  stores,
  sortBy,
  filter,
  postUpdate,
  sortCallback
}) => {
  const filteredStores = filter
    ? stores.filter(s => s.hasTPInStock > 1)
    : stores;
  return (
    <div className="list">
      {filteredStores.map((store, idx) => {
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

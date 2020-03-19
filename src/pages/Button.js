import React from "react";
import Button from "@material-ui/core/Button";
import DropDown from "@material-ui/icons/ArrowDropDownCircle";
import Car from "@material-ui/icons/DirectionsCar";

export default function IconLabelButtons({ title, action }) {
  return (
    <Button
      variant="contained"
      color="default"
      size="small"
      onClick={action}
      startIcon={title === "Navigate" ? <Car /> : <DropDown />}
    >
      {title}
    </Button>
  );
}

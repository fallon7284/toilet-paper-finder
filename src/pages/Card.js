import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Car from "@material-ui/icons/DirectionsCar";
import Button from "./Button";
import * as timeago from "timeago.js";
import placeHolderImage from "./images/toilet.jpg";
import tpImage from "./images/tp.jpg";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";
import { directionsQuery, postUpdate } from "../functions";

const useStyles = makeStyles(theme => ({
  root: {
    width: 325,
    position: "relative"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  noTP: {
    backgroundColor: red[500]
  },
  hasTP: {
    backgroundColor: green[500]
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
}));

export default function StoreCard({
  hasTPInStock,
  name,
  image_url,
  distance,
  content,
  yelpId,
  directionsData,
  updatedAt,
  toggleUpdateOpen,
  updateOpen
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={hasTPInStock > 1 ? classes.hasTP : classes.noTP}
          >
            TP
          </Avatar>
        }
        title={name}
        subheader={`${distance} miles away`}
      />
      <CardMedia
        className={classes.media}
        image={
          image_url.length
            ? image_url
            : hasTPInStock > 1
            ? tpImage
            : placeHolderImage
        }
        title="Paella dish"
      />
      <CardContent style={{ height: "80px" }}>
        <Typography variant="body1" color="textPrimary" component="p">
          {content}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {`Updated ${timeago.format(updatedAt)}`}
        </Typography>
      </CardContent>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: "15px 15px",
          position: "relative",
          bottom: "15px"
        }}
      >
        {/* <IconButton
          aria-label="map-navigate"
          onClick={() => {
            console.log(...directionsData);
            window.open(directionsQuery(...directionsData));
          }}
        > */}
        <Button
          title="Navigate"
          action={() => {
            console.log(...directionsData);
            window.open(directionsQuery(...directionsData));
          }}
        />
        {/* </IconButton> */}
        {/* <IconButton> */}
        <Button title="Update Stock" action={toggleUpdateOpen} />
        {/* </IconButton> */}
      </div>
      {updateOpen && (
        <InputLabel id="update">
          UPDATE TOILET PAPER STOCK
          <Select
            labelId="update"
            value={hasTPInStock}
            onChange={e => postUpdate(yelpId, e.target.value)}
          >
            <MenuItem value={1}>None</MenuItem>
            <MenuItem value={2}>A little</MenuItem>
            <MenuItem value={3}>A fair amount</MenuItem>
            <MenuItem value={4}>A lot</MenuItem>
          </Select>
        </InputLabel>
      )}
    </Card>
  );
}

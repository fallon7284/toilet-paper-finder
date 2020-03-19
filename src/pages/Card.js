import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import Button from "./Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import * as timeago from "timeago.js";
import placeHolderImage from "./images/toilet.jpg";
import tpImage from "./images/tp.jpg";
import InputLabel from "@material-ui/core/InputLabel";
import { directionsQuery } from "../functions";

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
  updateOpen,
  postUpdate,
  location
}) {
  const [checkedValue, setCheckedValue] = useState(hasTPInStock);
  useEffect(() => {
    setCheckedValue(Number(hasTPInStock));
  }, [hasTPInStock]);
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
        title="Store photo"
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
        <Button
          title="Navigate"
          action={() => {
            window.open(directionsQuery(...directionsData));
          }}
        />
        <Button title="Update Stock" action={toggleUpdateOpen} />
      </div>
      {updateOpen && (
        <InputLabel id="update">
          <FormControl component="fieldset">
            <FormLabel component="legend">Update Store TP Stock</FormLabel>
            <RadioGroup
              aria-label="Update Store TP Stock"
              name="gender1"
              value={checkedValue}
              onChange={e => {
                postUpdate(yelpId, e.target.value);
                toggleUpdateOpen();
                setCheckedValue(e.target.value);
              }}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="They have no TP"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="They have a small amount of TP"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="They have a fair amount of TP"
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="They have lot of TP"
              />
            </RadioGroup>
          </FormControl>
        </InputLabel>
      )}
    </Card>
  );
}

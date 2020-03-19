import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import tpIcon from "./images/tpRoll.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold"
  }
}));

export default function ButtonAppBar({
  toggleFilter,
  toggleSort,
  sortBy,
  filter
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Avatar alt="toilet-paper-icon" src={tpIcon} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Find TP
          </Typography>
          <IconButton color="inherit"></IconButton>
          <ButtonGroup variant="contained">
            <Button onClick={toggleSort}>{`Sort ${
              sortBy ? "by inventory" : "by distance"
            }`}</Button>
            <Button style={{ marginLeft: "2px" }} onClick={toggleFilter}>{`${
              filter ? "Remove" : ""
            } Filter`}</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React from "react";
import "./PassedTime.css";

function PassedTime({ model }) {

  const creationTime = model.createdAt;

  let minutes = Math.floor((new Date() - new Date(creationTime)) / (1000 * 60));
  let interval = minutes / 525600; //a year in minutes
  let passedTime = "";

  if (Math.floor(interval) === 1) {
    return passedTime = Math.floor(interval) + " year ago";
  }
  if (interval > 1) {
    return passedTime = Math.floor(interval) + " years ago";
  }
  interval = minutes / 43800; //a month in minutes

  if (Math.floor(interval) === 1) {
    return passedTime = Math.floor(interval) + " month ago";
  }
  if (interval > 1) {
    return passedTime = Math.floor(interval) + " months ago";
  }
  interval = minutes / 1440; //a day in minutes

  if (Math.floor(interval) === 1) {
    return passedTime = Math.floor(interval) + " day ago";
  }
  if (interval > 1) {
    return passedTime = Math.floor(interval) + " days ago";
  }
  interval = minutes / 60; //an hour in minutes

  if (Math.floor(interval) === 1) {
    return passedTime = Math.floor(interval) + " hour ago";
  }
  if (interval > 1) {
    return passedTime = Math.floor(interval) + " hours ago";
  }

  if (Math.floor(minutes) === 1) {
    return passedTime = Math.floor(minutes) + " minute ago";
  } else {
    return passedTime = Math.floor(minutes) + " minutes ago";
  }



  return (
    <>{passedTime}</>
  );

}
export default PassedTime;

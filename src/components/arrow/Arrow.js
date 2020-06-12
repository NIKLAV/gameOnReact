import React, { useEffect, useState } from "react";
import classes from "./Arrow.module.scss";
const Arrow = ({ type, num }) => {
  const transformToDirection = (num) => {
    switch (num) {
      case 1:
        return "up";
      case 2:
        return "right";
      case 3:
        return "down";
      case 4:
        return "left";

      default:
        return null;
    }
  };
  let a = transformToDirection(num);
  console.log(a);
  const cls = [classes[a], classes.right];

  return (
    <div className={classes.arrow}>
      <div className={cls.join(" ")}></div>
    </div>
  );
};

export default Arrow;

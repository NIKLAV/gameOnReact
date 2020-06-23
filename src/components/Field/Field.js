import React, { useState } from "react";
import classes from "./Field.module.scss";

const Field = ({
  orderNumber,
  start,
  end,
  disable,
  handleClick,
  disableAfterClick,
  again,
}) => {
  const [final, setFinal] = useState(null);

  const winOrLose = () => {
    handleClick();
    setFinal(orderNumber === end);
  };

  if (disableAfterClick) {
    setTimeout(() => {
      setFinal(null);
    }, 10000);
  }

  return (
    <>
      <div className={classes.container}>
        <button
          disabled={disable || disableAfterClick}
          onClick={(event) => winOrLose()}
          className={classes.field}
        >
          {orderNumber === start && final === null ? <p>Start</p> : null}
          {final !== null && final && !again && <p>Win</p>}
          {final !== null && !final && !again && <p>Lose</p>}
        </button>
      </div>
    </>
  );
};

export default Field;

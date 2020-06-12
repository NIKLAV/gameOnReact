import React, { useEffect, useState, useCallback, memo, useMemo } from "react";
import "./App.css";
import Field from "./components/Field/Field";
import Arrow from "./components/arrow/Arrow";
import Button from "./components/common/Button/Button";
const rows = 3;
const columns = 3;
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const App = () => {
  const [steps, setSteps] = useState([]);
  const [disable, setDisable] = useState(true);
  const [disableAfterClick, setDisableAfterClick] = useState(false);
  const [start, setStartNumber] = useState(getRandomInRange(1, rows * columns));
  const [again, setAgain] = useState(null);
 
  const handleClick = () => {
    setDisableAfterClick(true)
    setAgain(false)
  }
  
  function validateSteps(array) {
    return array.reduce((acc, item) => {
      if (acc % 3 === 1 && item === 4) return acc;
      if (acc % 3 === 0 && item === 2) return acc;
      if (item === 3 && acc > 6) return acc;
      if (item === 1 && acc < 4) return acc;
      if (item === 1) return acc - 3;
      if (item === 2) return acc + 1;
      if (item === 4) return acc - 1;
      if (item === 3) return acc + 3;
    }, start);
  }

  const createMoves = () => {
    const num = getRandomInRange(1, 4);
    console.log(num);
    setSteps([...steps, num]);
    console.log(steps);
  };

  useEffect(() => {
    if (steps.length < 10) {
      setTimeout(createMoves, 1000);
    } else setDisable(false);
  }, [steps]);
  let end = validateSteps(steps);

  function createField(rows, columns) {
    let orderNumber = 0;
    let arr = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < columns; j++) {
        orderNumber++;
        arr[i][j] = (
          <Field
            key={orderNumber}
            orderNumber={orderNumber}
            start={start}
            end={end}
            disable={disable}
            handleClick={handleClick}
            disableAfterClick={disableAfterClick}
            again={again}
            setAgain={setAgain}
            
          />
        );
      }
    }
    return arr;
  }
  const fields = createField(rows, columns);
  function newGame() {
    setSteps([]);
    setDisable(true);
    setDisableAfterClick(false);
    setStartNumber(getRandomInRange(1, rows * columns));
    setAgain(true);
    console.log("start", start);
  }
  return (
    <div className="container">
      <div className="App">{fields}</div>
      {disableAfterClick && (
        <Button onClick={newGame} type="success">
          Try again
        </Button>
      )}
      <div className="moves">
        {steps.map((el, index) => (
          <Arrow key={index} num={el} />
        ))}
      </div>
    </div>
  );
};

export default App;

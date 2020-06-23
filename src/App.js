import React, { useEffect } from "react";
import "./App.css";
import Field from "./components/Field/Field";
import Arrow from "./components/arrow/Arrow";
import Button from "./components/common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
const rows = 3;
const columns = 3;
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = () => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.stepsNumbersReducer.steps);
  const start = useSelector((state) => state.stepsNumbersReducer.start);
  const again = useSelector((state) => state.stepsNumbersReducer.again);
  const disableAfterClick = useSelector(
    (state) => state.disableReducer.disableAfterClick
  );
  const disable = useSelector((state) => state.disableReducer.disable);

  useEffect(() => {
    dispatch({
      type: "START_NUMBER",
      payload: getRandomInRange(1, rows * columns),
    }); //Генерируем рандомную стартовую клетку
  }, []);

  const handleClick = () => {
    dispatch({ type: "DISABLE_BUTTONS_AFTER_CLICK" }); //Дизейблим кнопку, после клика
    dispatch({ type: "HIDE_TEXT" }); // переводим флажок в false и показываем текст
  };

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
    dispatch({ type: "SET_STEPS", payload: num }); //Записываем сгенерированные ходы в массив
  };

  useEffect(() => {
    if (steps.length < 10) {
      ////генерируем ходы с задержкой
      setTimeout(createMoves, 1000);
    } else dispatch({ type: "DISABLE_BUTTONS_WHILE_RUN" }); //дизейблим, кнопки пока ходы не будут сгенерированы;
  }, [steps]);

  let end = validateSteps(steps); //конечная победная клетка

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
          />
        );
      }
    }
    return arr;
  }

  const fields = createField(rows, columns); //создаём поля
  function newGame() {
    dispatch({ type: "RESET_STEPS" }); // обнуляем наш массив ходов
    dispatch({ type: "DISABLE_BUTTONS_WHILE_RUN" });
    dispatch({ type: "DISABLE_BUTTONS_AFTER_CLICK" }); //переводим в стартовое положение флажок
    dispatch({
      type: "START_NUMBER",
      payload: getRandomInRange(1, rows * columns),
    }); // генерируем новую стартовую клетку
    dispatch({ type: "HIDE_TEXT" }); //переводим флажок в true, чтобы не показывать текст
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

import React, { useState, useEffect } from "react";
import "./App.css";
import comboData from "./combos.js";
import movesData from "./moves";

function App() {
  const [isRandom, setIsRandom] = useState(false);
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [combo, setCombo] = useState("");

  // Generates a random combo
  const newCombo = () => {
    let combo = [];
    // if it's checked, generate a random number from 1 - 7 for number of moves
    if (isRandom) {
      let comboLength = Math.ceil(Math.random() * 7);
      for (let i = 0; i < comboLength; i++) {
        combo.push(
          movesData[Math.floor(Math.random() * movesData.length)].name
        );
      }
      // else pull a random combo from comboData
    } else {
      let index = Math.floor(Math.random() * comboData.length);
      combo = comboData[index].moves;
    }
    // then set new combo
    setCombo(combo.join(" + "));
  };

  // Resets countdown
  const resetCountdown = (e) => {
    e.preventDefault();
    setCountdown(time);
  };

  // Loads a new combo on load only
  useEffect(() => {
    newCombo();
  }, []);

  // Decrements time value when time is reset
  useEffect(() => {
    setCountdown(time);
    const intervalId = setInterval(() => {
      setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="App">
      <header>
        <h1>Kickboxing Trainer</h1>
      </header>
      {combo}
      <h3>{countdown} minutes left</h3>
      <div>
        <input
          type="text"
          name="setTime"
          placeholder="Set Time"
          value={time}
          onChange={(e) => {
            setCountdown(e.target.value);
            setTime(e.target.value);
          }}
        />
        <button onClick={resetCountdown}>Reset Timer</button>
      </div>
      <div>
        <button onClick={newCombo}>New Combo</button>
      </div>
      <label>
        <input
          type="checkbox"
          name="isRandom"
          checked={isRandom}
          onChange={(e) => setIsRandom(e.target.checked)}
        />{" "}
        Create random combos
      </label>
    </div>
  );
}

export default App;

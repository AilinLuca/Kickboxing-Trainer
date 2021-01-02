import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@material-ui/core";
import comboData from "./combos.js";
import movesData from "./moves";
import ReactPlayer from "react-player";

function App() {
  const [isRandom, setIsRandom] = useState(false);
  const [time, setTime] = useState(0);
  const [combo, setCombo] = useState("");
  const [countdown, setCountdown] = useState("00:00");
  const [playMusic] = useState(false);

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
  };

  // Loads a new combo on load only
  useEffect(() => {
    newCombo();
  }, []);

  // Used in above useEffect to correctly format the countdown display
  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    setCountdown(display);
  };

  // Decrements time value when time is reset
  useEffect(() => {
    const now = Date.now();
    const then = now + time * 60 * 1000;

    const intervalId = setInterval(() => {
      const seconds = Math.round((then - Date.now()) / 1000);
      if (seconds < 0) {
        clearInterval(intervalId);
        return;
      }
      formatCountdown(seconds);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kickboxing Trainer</h1>
      </header>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="flex-start"
        justify="center"
      >
        <Grid item>
          <Paper className={"exercise-card"}>
            <h1>{combo}</h1>
            <h1>{countdown}</h1>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={"options-card"}>
            <FormGroup>
              <TextField
                type="text"
                label="Set Minutes"
                name="setTime"
                placeholder="Set Time"
                value={time}
                variant="outlined"
                onChange={(e) => {
                  setCountdown(e.target.value);
                  setTime(e.target.value);
                }}
              />
              <Button onClick={resetCountdown} full-width={true}>
                Reset Timer
              </Button>
              <div>
                <Button onClick={newCombo} color="primary" full-width={true}>
                  New Combo
                </Button>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={isRandom}
                    onChange={(e) => setIsRandom(e.target.checked)}
                  />
                }
                label="Create random combos"
              />
            </FormGroup>
          </Paper>
        </Grid>
        <div className="video-wrapper">
          <ReactPlayer
            playing={playMusic}
            url="https://www.youtube.com/watch?v=qWf-FPFmVw0"
          />
        </div>
      </Grid>
    </div>
  );
}

export default App;

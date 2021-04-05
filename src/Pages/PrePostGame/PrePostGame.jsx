import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import character from "../../Assets/icons/character.svg";
import { Context } from "../../Store";

function PrePostGame() {
  const { globalState, dispatch } = useContext(Context);
  const { grid_side } = globalState;
  const [gridSide, setGridSide] = useState(grid_side);

  const history = useHistory();
  const startGame = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_GRID_SIDE",
      payload: { grid_side: Number(gridSide) },
    });
    history.push("/game");
  };
  return (
    <Fragment>
      <img src={character} alt="FGame Character" />

      <h1>Greedy Hunter</h1>
      <p>The aim is to eat all the food in record time</p>
      <p>Confiure your game grid below 👇🏼</p>

      <form onSubmit={startGame}>
        <div className="d-flex justify-content-center align-items-center">
          <p className="mr-2">Game grid</p>
          <select
            onChange={({ target }) => setGridSide(target.value)}
            value={gridSide}
            name="game_grid"
          >
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <option value={index + 5} key={index}>
                  {index + 5}
                </option>
              ))}
          </select>
        </div>

        <button>Start Game</button>
      </form>
    </Fragment>
  );
}

export default PrePostGame;

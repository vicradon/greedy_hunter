import character from "../Assets/icons/character.svg";
import { useHistory } from "react-router-dom";

import styles from "./PrePostGame.module.scss";
import { useContext, useState } from "react";
import { Context } from "../Store";

function PrePostGameLayout({ children }) {
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
    <div className={styles.main}>
      <img src={character} alt="Game Character" />

      {children}

      <form onSubmit={startGame}>
        <div className="d-flex justify-content-center align-items-center">
          <p className={`mr-2 ${styles.grid_selector_text}`}>Game grid</p>
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

        <button className={styles.action_button}>Start Game</button>
      </form>
    </div>
  );
}

export default PrePostGameLayout;

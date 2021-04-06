import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Player from "../../Components/Player";
import { Context } from "../../Store";
import styles from "./GamePlay.module.scss";
import generateFoodItems from "./generateFoodItems";

/**
 * Limit navigate to game over screen if player exhausts moves
 * Style the board to match Figma
 */

function GamePlay() {
  const { globalState } = useContext(Context);
  const grid = globalState.grid_side;
  const [gridArray, setGridArray] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const maxMoves = Math.ceil(grid * grid * 0.5);
  const [totalMoves, setTotalMoves] = useState(0);
  const scales = {
    5: 13,
    6: 11,
    7: 9,
    8: 7,
    9: 5,
    10: 4,
    11: 3.5,
    12: 3,
  };
  const SCALE = scales[grid];
  const squareUnit = grid * SCALE;
  const gridEdge = grid * grid * SCALE;

  const history = useHistory();

  const handleKeyDown = ({ keyCode }) => {
    if (totalMoves === maxMoves) {
      history.push("/game-over");
    }
    let tempCoordinates = { ...coordinates };

    // left
    if ((keyCode === 37 || keyCode === 65) && coordinates.x - squareUnit >= 0) {
      tempCoordinates = { ...coordinates, x: coordinates.x - squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    // top
    if ((keyCode === 38 || keyCode === 87) && coordinates.y - squareUnit >= 0) {
      tempCoordinates = { ...coordinates, y: coordinates.y - squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    // right
    if (
      (keyCode === 39 || keyCode === 68) &&
      coordinates.x + squareUnit < gridEdge
    ) {
      tempCoordinates = { ...coordinates, x: coordinates.x + squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    // bottom
    if (
      (keyCode === 40 || keyCode === 83) &&
      coordinates.y + squareUnit < gridEdge
    ) {
      tempCoordinates = { ...coordinates, y: coordinates.y + squareUnit };
      setTotalMoves(totalMoves + 1);
    }
    handleFoodIntake(tempCoordinates);
    setCoordinates(tempCoordinates);
  };

  const handleFoodIntake = (coordinates) => {
    if (
      gridArray[coordinates.x / squareUnit][[coordinates.y / squareUnit]] ===
      "x"
    ) {
      const newGridArray = JSON.parse(JSON.stringify(gridArray));
      newGridArray[coordinates.x / squareUnit][
        [coordinates.y / squareUnit]
      ] = 0;
      setGridArray(newGridArray);
      const foodItems = generateFoodItems({
        gridArray: newGridArray,
        SCALE,
        squareUnit,
        grid,
      });
      if (!foodItems.length) {
        history.push("/game-won");
      }
      setFoodItems(foodItems);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    const generateGridArray = () => {
      const gridArray = Array(grid)
        .fill(0)
        .map((_) => Array(grid).fill(0));

      const randomIndex1 = Math.floor(Math.random() * grid);
      const randomIndex2 = Math.floor(Math.random() * grid);

      gridArray[randomIndex1][randomIndex2] = "player";
      setCoordinates({
        x: randomIndex1 * squareUnit,
        y: randomIndex2 * squareUnit,
      });

      Array(grid)
        .fill("x")
        .forEach((foodItem) => {
          let randomIndex1 = Math.floor(Math.random() * grid);
          let randomIndex2 = Math.floor(Math.random() * grid);

          while (
            gridArray[randomIndex1][randomIndex2] === foodItem ||
            gridArray[randomIndex1][randomIndex2] === "player"
          ) {
            randomIndex1 = Math.floor(Math.random() * grid);
            randomIndex2 = Math.floor(Math.random() * grid);
          }
          gridArray[randomIndex1][randomIndex2] = foodItem;
        });

      return gridArray;
    };

    const gridArray = generateGridArray();
    const foodItems = generateFoodItems({ gridArray, SCALE, squareUnit, grid });

    setFoodItems(foodItems);
    setGridArray(gridArray);
  }, [grid, squareUnit, SCALE]);

  return (
    <div className={`d-flex align-items-center ${styles.main}`}>
      <div className={styles.game_card}>
        <p>
          Grid:
          <span className="bold ml-2">
            {grid} x {grid}
          </span>
        </p>
        <div
          style={{
            width: `${grid * grid * SCALE + 2}px`,
          }}
          className={styles.game_board_wrapper}
        >
          <div
            style={{
              backgroundSize: `${grid * SCALE}px ${grid * SCALE}px`,
              height: `${grid * grid * SCALE + 2}px`,
            }}
            className={styles.game_board}
          >
            <Player coordinates={coordinates} width={grid * SCALE} />
            {foodItems}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p>
            Maximum moves:
            <span className="bold ml-2">{maxMoves}</span>
          </p>
          <p>
            Total moves:
            <span className="bold ml-2">{totalMoves}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;

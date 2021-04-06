import React from "react";
import PrePostGameLayout from "../Layouts/PrePostGame";

function GameStart() {
  return (
    <PrePostGameLayout>
      <h1 className="font-size-3-rem text-danger">Greedy Hunter</h1>
      <p className="text-primary">
        The aim is to eat all the food in record time
      </p>
      <p className="text-primary">Confiure your game grid below 👇🏼</p>
    </PrePostGameLayout>
  );
}

export default GameStart;

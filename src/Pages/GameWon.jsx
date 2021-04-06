import React from "react";
import PrePostGameLayout from "../Layouts/PrePostGame";

function GameWon() {
  return (
    <PrePostGameLayout>
      <h1 className="font-size-3-rem text-danger">Bravo</h1>

      <p className="text-primary">
        Time Spent: <span className="bold"> 98 seconds</span>
      </p>
    </PrePostGameLayout>
  );
}

export default GameWon;

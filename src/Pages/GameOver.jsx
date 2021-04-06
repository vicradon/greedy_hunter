import PrePostGameLayout from "../Layouts/PrePostGame";

function GameEnd() {
  return (
    <PrePostGameLayout>
      <h1 className="font-size-3-rem text-danger">Game Over</h1>
      <p className="text-primary">
        Total Food: <span className="bold">7/10</span>
      </p>
      <p className="text-primary">
        Time Spent: <span className="bold"> 98 seconds</span>
      </p>
    </PrePostGameLayout>
  );
}

export default GameEnd;

import { BrowserRouter as Router, Route } from "react-router-dom";
import GamePlay from "./Pages/GamePlay/GamePlay";
import PrePostGame from "./Pages/PrePostGame/PrePostGame";
import Store from "./Store";

function App() {
  return (
    <Store>
      <Router>
        <Route path="/" exact component={PrePostGame} />
        <Route path="/game" component={GamePlay} />
      </Router>
    </Store>
  );
}

export default App;

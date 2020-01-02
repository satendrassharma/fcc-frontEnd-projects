import React from "react";
import "./App.css";
import Promodoro from "./components/Promodoro";
import Calculator from "./components/Calculator";
import DrumMachine from "./components/DrumMachine";
import MarkdownPreviewer from "./components/MarkdownPreviewer";
import RandomQuoteMachine from "./components/RandomQuoteMachine";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Promodoro} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/drumamchine" component={DrumMachine} />
        <Route path="/markdownpreviewer" component={MarkdownPreviewer} />
        <Route path="/Randomquote" component={RandomQuoteMachine} />
      </Switch>
    </div>
  );
}

export default App;

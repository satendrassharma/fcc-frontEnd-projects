import React, { useState } from "react";
import musics from "./musics";
import "./DrumMachine.css";
import DrumPad from "./DrumPad";

export default function DrumMachine() {
  const [display, setDisplay] = useState("Please some key...");

  return (
    <div className="App">
      <header>Drum Machine</header>
      <div id="drum-machine">
        <div id="display">{display}</div>
        <div id="pad">
          {musics.map(music => (
            <DrumPad
              key={music.id}
              id={music.keyTrigger}
              setDisplay={setDisplay}
              dataText={music.id}
              url={music.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

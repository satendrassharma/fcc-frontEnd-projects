import React, { useRef, useEffect } from "react";

export default function DrumPad({ dataText, id, url, setDisplay }) {
  const audioref = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  const handleKeydown = e => {
    console.log(e.key.toUpperCase());
    console.log(id);
    if (e.key.toUpperCase() === id) {
      audioref.current
        .play()
        .then(() => {
          audioref.current.currentTime = 0;
          setDisplay(dataText);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  const handlePlay = () => {
    audioref.current.play();
    audioref.current.currentTime = 0;
    setDisplay(dataText);
  };

  return (
    <div className="drum-pad" id={dataText} onClick={handlePlay}>
      {id}
      <audio ref={audioref} src={url} className="clip" id={id}></audio>
    </div>
  );
}

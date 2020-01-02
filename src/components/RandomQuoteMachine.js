import React, { useState, useEffect } from "react";
import "./randomquote.css";
const RandomQuoteMachine = () => {
  const [text, setText] = useState(
    "Please run tests with browser's zoom level at 100% and page maximized"
  );
  const [author, setAuthor] = useState("satendra sharma");

  useEffect(() => {
    getRandomQuote();
  }, []);
  const getRandomQuote = () => {
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes")
      .then(response => response.json())
      .then(data => {
        setText(data.quote);
        setAuthor(data.character);
      });
  };
  return (
    <div className="App">
      <header>Random Quote Machine</header>
      <div id="quote-box">
        <div id="text">{text}</div>
        <div id="author">~{author}</div>
        <div id="new-quote" onClick={getRandomQuote}>
          New Quote
        </div>
        <a
          href="https://twitter.com/intent/tweet"
          target="_blank"
          id="tweet-quote"
          rel="noopener noreferrer"
        >
          tweet
        </a>
      </div>
    </div>
  );
};

export default RandomQuoteMachine;

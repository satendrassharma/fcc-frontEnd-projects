import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <h1>FCC FL</h1>
      <ul>
        <li>
          <Link to="/">Pomodoro</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
        <li>
          <Link to="/drumamchine">Drum Machine</Link>
        </li>
        <li>
          <Link to="/markdownpreviewer">Markdown Previewer</Link>
        </li>
        <li>
          <Link to="/Randomquote">RandomQuote machine</Link>
        </li>
      </ul>
    </nav>
  );
}

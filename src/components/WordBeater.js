import React, { useState, useEffect, useRef } from "react";
import "./WordBeater.css";
// import "./canvas.js";

const words = [
  [
    "duffles",
    "things",
    "subtle",
    "weird",
    "cyst",
    "anxiety",
    "asthma",
    "bureau",
    "zinc",
    "pompeii",
    "cologne",
    "curious",
    "shoulder",
    "charades",
    "vehicle"
  ],
  [
    "aluminum",
    "suburban",
    "turquoise",
    "obstinance",
    "assuming",
    "symptom",
    "pseudonym",
    "mnemonic",
    "eunuch",
    "conscience",
    "pronunciation",
    "maintenance",
    "cockatiel",
    "bouillon",
    "derriere",
    "piedmont"
  ],
  [
    "atrabilious",
    "circumvallate",
    "effulgent",
    "poinsettia",
    "somersault",
    "repertoire",
    "triskaidekaphobia",
    "convalesce",
    "liaison",
    "schizophrenic",
    "evanescent",
    "bourgeoisie",
    "cretaceous",
    "reconnaissance",
    "euthanasia",
    "sauerbraten",
    "pterodactyl",
    "teetotaler"
  ]
];

const levels = ["easy", "normal", "hard"];

export const WordBeater = props => {
  const displayCurrentWord = useRef(null);
  const canvas = useRef(null);
  const [wordLevel, setWordLevel] = useState(0);
  const [word, setWord] = useState("");
  const [currentWord, setCurrentWord] = useState(words[0][0]);
  const [currentWords, setCurrentWords] = useState(words[0][0]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  const [timerId, setTimerId] = useState(null);
  const [level, setLevel] = useState(0);

  const onKeyUpHandler = e => {
    displayCurrentWord.current.innerHTML = currentWords;
    const curword = displayCurrentWord.current.innerHTML.trim();

    const regex = new RegExp(word, "g");
    setCurrentWord(
      curword.replace(regex, match => {
        return `<span class="matched">${match}</span>`;
      })
    );

    if (time > 0) {
      if (word === currentWords) {
        setWord("");
        setScore(score + 1);
        if (wordLevel < words[level].length - 1) {
          updateWord(level, wordLevel + 1);
        } else if (level < levels.length - 1) {
          const lvl = level + 1;
          setLevel(lvl);
          updateWord(lvl, 0);
        } else {
          clearInterval(timerId);
          setTime("game over");
        }
      }
    }
  };

  const updateWord = (l, w) => {
    setWordLevel(w);
    setCurrentWord(words[l][w]);
    setCurrentWords(words[l][w]);
    setTime(10);
  };

  const timer = () => {
    setTime(time - 1);
  };

  // const drawCanvas = () => {
  //   var c = canvas.current;
  //   var ctx = c.getContext("2d");
  //   ctx.beginPath();
  //   ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  //   ctx.stroke();
  //   console.log(canvas);
  // };

  // useEffect(() => {
  //   drawCanvas();
  //   return;
  // }, []);

  useEffect(() => {
    if (time <= 0) {
      return () => "game over";
    }

    const id = setInterval(timer, 1000);
    setTimerId(id);
    return () => clearInterval(id);
  }, [time]);

  return (
    <div className="container">
      <div className="item-container">
        <div
          className="item-word"
          dangerouslySetInnerHTML={{ __html: currentWord }}
          ref={displayCurrentWord}
        />
        <input
          autoFocus
          className="item-input"
          placeholder="type the word"
          value={word}
          onChange={e => setWord(e.target.value)}
          onKeyUp={onKeyUpHandler}
        />

        <div className="item-group">
          <div className="item-description">
            Score <br /> {score}
          </div>
          <div className="item-description">Time: {time}</div>
          <div className="item-description">Level: {levels[level]}</div>
        </div>
      </div>
    </div>
  );
};

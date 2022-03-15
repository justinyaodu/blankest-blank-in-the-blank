"use strict";

const phraseText = document.getElementById("phrase");
const randomizeBtn = document.getElementById("randomize");
const phraseBank = document.getElementById("phrase-bank");
const parseError = document.getElementById("parse-error");

phraseBank.value = `
biggest, cookie, in the jar
biggest, cow, in the pasture
brightest, bulb, on the Christmas tree
brightest, bulb, in the chandelier
brightest, star, in the sky
fastest, gun, in the west
fattest, pig, in the pen
loudest, chicken, in the coop
most colorful, crayon, in the box
ripest, fruit, in the basket
sharpest, knife, in the drawer
sharpest, pencil, in the cup
sharpest, needle, in the pincushion
sharpest, tool, in the shed
shiniest, penny, in the pond
strongest, horse, in the stable
tallest, tree, in the forest
`.trim();

function parsePhrases(phrases) {
  const lines = phrases.split("\n");
  const parsed = [];
  const invalid = [];
  for (const line of lines) {
    const split = line.split(",");
    if (split.length !== 3) {
      invalid.push(line);
      continue;
    }

    const trimmed = [];
    for (const part of split) {
      trimmed.push(part.trim());
    }
    parsed.push(trimmed);
  }
  return [parsed, invalid];
}

function getPhrases() {
  const [parsed, invalid] = parsePhrases(phraseBank.value);

  let error = "";
  if (invalid.length > 0) {
    error = "Failed to parse the following line(s):";
    for (const line of invalid) {
      error += "\n" + line;
    }
  }
  parseError.innerText = error;

  return parsed;
}

function getRandomPhrase() {
  const phrases = getPhrases();
  if (phrases.length == 0) {
    return "No phrases in phrase bank!"
  }

  let phrase = "Not the";
  for (let i = 0; i < 3; i++) {
    const j = Math.floor(Math.random() * phrases.length);
    phrase += " " + phrases[j][i];
  }
  return phrase;
}

function randomize() {
  phraseText.innerText = getRandomPhrase();
}

function main() {
  randomize();
  randomizeBtn.addEventListener("click", randomize);
}

main();

"use strict";

const phraseText = document.getElementById("phrase");
const randomizeBtn = document.getElementById("randomize");
const phraseBank = document.getElementById("phrase-bank");
const parseError = document.getElementById("parse-error");

phraseBank.value = `
biggest, coconut, on the tree
biggest, cookie, in the jar
biggest, cow, in the pasture
biggest, fish, in the sea
biggest, egg, in the basket
brightest, bulb, on the Christmas tree
brightest, candle, in the chandelier
brightest, star, in the sky
cleanest, plate, on the rack
fastest, gun, in the west
fattest, pig, in the pen
freshest, leaf, in the salad
funniest, clown, in the circus
loudest, chicken, in the coop
loudest, horn, in the orchestra
most beautiful, painting, in the gallery
most colorful, crayon, in the box
most dangerous, pirate, on the high seas
neatest, shelf, in the library
ripest, apple, in the barrel
ripest, banana, in the bunch
roundest, marble, in the bag
sharpest, knife, in the drawer
sharpest, pencil, in the cup
sharpest, needle, in the pincushion
sharpest, tack, on the wall
sharpest, tool, in the shed
shiniest, penny, in the pond
strongest, horse, in the stable
sweetest, berry, on the bush
sweetest, grape, on the vine
tallest, tree, in the forest
tastiest, dumpling, in the pot
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

  let phrase = "You're not the";
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

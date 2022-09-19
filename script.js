"use strict";
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
//Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing our joke to our VoiceRSS API
//VoiceRSS API key needed
const apiKEY = "";
function tellMe(joke) {
  VoiceRSS.speech({
    key: apiKEY,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-Speech
    tellMe(joke);
    //Disable the Button
    toggleButton();
  } catch (err) {
    console.log("Fetch Failed", err);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

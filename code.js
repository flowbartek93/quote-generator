//Get quotes From API
const container = document.querySelector(".quote-container");
const quoteContainer = document.querySelector("#quote");
const quoteDiv = document.querySelector(".quote-text");
const authorContainer = document.querySelector("#author");
const twitterBtn = document.querySelector(".twitter-button");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.getElementById("loader");

//Dark Mode

const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const switcher = document.querySelector('input[type="checkbox"');

function setMode(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", DARK_THEME);
    window.localStorage.setItem("theme", DARK_THEME);
  } else {
    document.documentElement.setAttribute("data-theme", LIGHT_THEME);
    window.localStorage.setItem("theme", LIGHT_THEME);
  }
}

let apiQuotes = [];

const pickRandomIndexFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * (array.length + 1));
  return randomIndex;
};

function ShowLoadingSpinner() {
  loader.hidden = false;
  container.hidden = true;
}

function removeLoadingSpinner() {
  container.hidden = false;
  loader.hidden = true;
}

async function getQuotes() {
  ShowLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    displayQuote();
    removeLoadingSpinner();
  } catch (err) {
    console.log(err);
  }
}

function displayQuote() {
  ShowLoadingSpinner();
  let randomIndex = pickRandomIndexFromArray(apiQuotes);
  const randomQuoteObj = apiQuotes[randomIndex];

  if (!randomQuoteObj.author) {
    authorContainer.textContent = "Unknown";
  } else {
    authorContainer.textContent = randomQuoteObj.author;
  }

  if (randomQuoteObj.text.length > 50) {
    quoteDiv.classList.add("long-quote");
  } else {
    quoteDiv.classList.remove("long-quote");
  }

  quoteContainer.textContent = randomQuoteObj.text;
  removeLoadingSpinner();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteContainer.textContent} - ${authorContainer.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  newQuoteBtn.addEventListener("click", displayQuote);
  twitterBtn.addEventListener("click", tweetQuote);

  switcher.addEventListener("change", setMode);
  const theme = window.localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme);

  getQuotes();
});

//Get quotes From API
const container = document.querySelector(".quote-container");
const quoteContainer = document.querySelector("#quote");
const quoteDiv = document.querySelector(".quote-text");
const authorContainer = document.querySelector("#author");
const twitterBtn = document.querySelector(".twitter-button");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const pickRandomIndexFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * (array.length + 1));
  return randomIndex;
};

function loading() {
  loader.hidden = false;
  container.hidden = true;
}

function complete() {
  container.hidden = false;
  loader.hidden = true;
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    displayQuote();
    complete();
  } catch {}
}

function displayQuote() {
  loading();
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
  complete();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteContainer.textContent} - ${authorContainer.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners

newQuoteBtn.addEventListener("click", displayQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();

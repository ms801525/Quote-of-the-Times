
// Purpose: To display the current date and time on the webpage
function updateTime() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const time = date.toLocaleTimeString();
    const day = date.toLocaleDateString(undefined, options);
    document.getElementById('time').innerHTML =
        `${day} - ${time}`;
}

setInterval(updateTime, 1000);
updateTime();

const button = document.getElementById('quote-button');

// let quotes = [
//     { author: "John Lennon", quote: "Life is what happens when you're busy making other plans." },
//     { author: "William Shakespeare", quote: "To be, or not to be, that is the question." },
//     { author: "Franklin D. Roosevelt", quote: "The only limit to our realization of tomorrow is our doubts of today." }
// ];

// Fetch quotes from the JSON file
//quotes JSON file was taken from https://gist.github.com/JakubPetriska/060958fd744ca34f099e947cd080b540
let quotes = [];
console.log('Fetching quotes from JSON file...');
fetch('quotes.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            console.log('Error fetching quotes:', response.statusText);
        }
        return response.json();
    })
    .then(data => {
        quotes = data;
        console.log('Quotes loaded:', quotes);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        console.log('Error fetching quotes:', error);
    });


function getRandomQuote() {
    if(quotes.length === 0){
        alert("Quote is Loading");
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    console.log(randomIndex);

    const elem = document.getElementById('quote');
    elem.innerHTML = randomQuote.Quote + '<br><br> - ' + randomQuote.Author;
    console.log(randomQuote);

}

function cooldown() {
    button.disabled = true;  // Disable the button immediately
    button.textContent = 'Please wait...';  // Change the button text to inform the user

    getRandomQuote();  // Display the random quote

    // Set a timeout of 5 seconds to re-enable the button
    setTimeout(() => {
        button.disabled = false;  // Re-enable the button after the cooldown period
        button.textContent = 'Get a Random Quote';  // Reset button text
    }, 5000);  // 5000ms = 5 seconds cooldown
}

// Add the getRandomQuote function to the button click event
// Add the cooldown function to the button click event
button.addEventListener('click', cooldown);


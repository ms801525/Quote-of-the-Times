console.log("✅ JS loaded!");

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
// Fetch quotes from the JSON file
//quotes JSON file was taken from https://gist.github.com/JakubPetriska/060958fd744ca34f099e947cd080b540
let quotes = [];
let quotes_like = [];
let currentQuote = null; //create a current quote
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
        console.log("Quote is Loading");
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    currentQuote = randomQuote; //whatever the random quote is, equal it to the current quote so we can USE current quote for the liked feature 
    console.log(randomIndex);

    const elem = document.getElementById('quote');
    elem.innerHTML = randomQuote.Quote + '<br><br> - ' + randomQuote.Author;
    // Call copyText to update the tooltip with the new quote
    console.log(randomQuote);
}
setTimeout(getRandomQuote, 1000); // Initial call to display a quote after 1 second
setInterval(getRandomQuote, 15000); // Hide the copy button initially
getRandomQuote(); // Initial call to display a quote on page load

function copyText(){
    const text = document.getElementById('quote').innerText;
    const tooltip = document.getElementById('tooltip');

    // Check if clipboard API is available and in secure context (HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            tooltip.innerHTML = "✅ Copied!";
            setTimeout(() => tooltip.innerHTML = "Copy to clipboard", 2000);
        }).catch(err => {
            alert("Error copying text: " + err);
        });
    } else {
        // Fallback for HTTP (like your S3 site)
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            tooltip.innerHTML = "Copied!";
            setTimeout(() => tooltip.innerHTML = "Copy to clipboard", 2000);
        } catch (err) {
            alert("Fallback copy failed: " + err);
        }
        document.body.removeChild(textarea);
    }
}

// Add event listener to the button
const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', copyText);

function outFunction(){
    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copy to clipboard";
}

const button_view = document.getElementById("view-toggle");
const background = document.querySelector(".background-image");

button_view.addEventListener("click", function() {
    background.classList.toggle("background-image2");

});
const like_button = document.getElementById("like-button");

like_button.addEventListener("click", function () {


    quotes_like.push({ //push current quote into a new array and use the object for Author and Quote 
        quote: currentQuote.Quote,
        author: currentQuote.Author
    });
    

    const output = document.getElementById("like-text");
    output.innerHTML = "";
    quotes_like.forEach(function (item) { //for each quote - format it like this, loop through and format it with the item variable 
        output.innerHTML += `
            <div class="liked-quote">
                <p>${item.quote}</p>
                <p>- ${item.author}</p>
                <hr>
            </div>
        `;
    });

    console.log(quotes_like);
});
console.log("✅ JS loaded!");

    // document.addEventListener("DOMContentLoaded", function () {
    //   console.log("✅ DOM ready!");

    //   const acc = document.getElementsByClassName("accordion");
    //   console.log("Found", acc.length, "accordion(s)");

    //   for (let i = 0; i < acc.length; i++) {
    //     acc[i].addEventListener("click", function () {
    //       console.log("Accordion clicked");

    //       this.classList.toggle("active");
    //       const panel = this.nextElementSibling;
    //       if (panel.style.display === "block") {
    //         panel.style.display = "none";
    //       } else {
    //         panel.style.display = "block";
    //       }
    //     });
    //   }
    // });
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
    console.log(randomIndex);

    const elem = document.getElementById('quote');
    elem.innerHTML = randomQuote.Quote + '<br><br> - ' + randomQuote.Author;
    // Call copyText to update the tooltip with the new quote
    console.log(randomQuote);
}

setInterval(window.onload = getRandomQuote, 10000); // Hide the copy button initially
getRandomQuote(); // Initial call to display a quote on page load


function copyText(){
    const text = document.getElementById('quote').innerText;
    const tooltip = document.getElementById('tooltip');

    // Check if clipboard API is available and in secure context (HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            tooltip.innerHTML = "Copied!";
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

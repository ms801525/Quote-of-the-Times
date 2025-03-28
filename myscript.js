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

function displayMessage() {
    document.getElementById("wayne").innerHTML = "You miss 100% of the shots you didn't take. - Wayne Gretzky";
}


//Temporary function to display a message on the webpage

// function generateRandomString(length) {
//     let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//         document.getElementById('random').innerHTML = result;
//     }
//     return result;
// }
document.getElementById('quote-button').addEventListener('click', getRandomQuote);

let quotes = [
    { author: "John Lennon", quote: "Life is what happens when you're busy making other plans." },
    { author: "William Shakespeare", quote: "To be, or not to be, that is the question." },
    { author: "Franklin D. Roosevelt", quote: "The only limit to our realization of tomorrow is our doubts of today." }
];

Papa.parse('quotes.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
        console.log('CSV Parsing complete:', results);  // Log the entire parsed data
        quotes = results.data;
        console.log('Parsed quotes array:', quotes);  // Log the quotes array
    },
    error: function(error) {
        console.error('Error parsing CSV:', error); // Log any parsing error
    }
});

function getRandomQuote() {
    if(quotes.length === 0){
        alert("Quote is Loading");
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    document.getElementById('quotedisplay').textContent = `"${randomQuote.quote}"`;
    document.getElementById('author').textContent = `- ${randomQuote.author}`;
}

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
    const message = "You miss 100% of the shots you don't take. - Wayne Gretzky";
    document.getElementById('quote').innerHTML = message;
}
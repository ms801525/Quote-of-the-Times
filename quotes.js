const save_quote =
    JSON.parse(localStorage.getItem("Saved Quotes")) || [];

const output1 = document.getElementById("save-quote");

save_quote.forEach(function (item) {

    output1.innerHTML += `
        <div class="saved-quote">
            <p>${item.quote}</p>
            <p>- ${item.author}</p>
            <hr>
        </div>
    `;

});
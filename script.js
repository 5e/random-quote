const quoteDiv = document.getElementById('quote');
const authorDiv = document.getElementById('author');
const dialog = document.querySelector('dialog');
const showDialogButton = document.getElementById('showDialog');
const closeDialogButton = document.getElementById('closeDialog');

async function getQuotes() {
    const url = `https://quotes.5egt.workers.dev/`;
    const response = await fetch(url);
    if (response.status !== 200) {
        throw new Error('Oops... Something went wrong :(');
    }
    const quotes = await response.text();

    localStorage.setItem("quotesList", quotes);
    localStorage.setItem("index", "0");
}

function nextQuote() {
    let index = localStorage.getItem("index");
    let quotesList = JSON.parse(localStorage.getItem("quotesList"));

    authorDiv.innerHTML = quotesList[index].a;
    quoteDiv.innerHTML = quotesList[index].q;
    index++;
    if (index >= 49) {
        getQuotes();
    } else {
        localStorage.setItem("index", index);
    }
}


function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "true");
    } else {
        localStorage.setItem("dark-mode", "false");
    }
}

showDialogButton.addEventListener("click", () => {
    dialog.showModal();
});
closeDialogButton.addEventListener("click", () => {
    dialog.close();
});


if (localStorage.getItem("dark-mode") === "false") {
    document.body.classList.toggle("dark-mode");
}


async function main() {
    if (localStorage.getItem("quotesList") === null) {
        await getQuotes();
    }

    nextQuote();
}

main();


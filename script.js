const noteEl = document.getElementById("note");
const statusEl = document.getElementById("status");

let currentContent = ""; 

noteEl.addEventListener("focus", () => {
    statusEl.textContent = "";
})

noteEl.addEventListener("blur", () => {
    const newContent = noteEl.innerHTML.trim();

    if (currentContent === newContent) {
        return;
    }

    currentContent = newContent;
    console.log(currentContent);

    statusEl.textContent = "Note saved successfully";

    setTimeout(() => {
        statusEl.textContent = "";
    }, 2000);
});

window.addEventListener("DOMContentLoaded", () => {
    currentContent = noteEl.textContent;
})
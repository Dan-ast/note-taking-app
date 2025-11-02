const noteEl = document.getElementById("note");
const statusEl = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

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
    }, 5000);

    localStorage.setItem("noteContent", newContent);

});

window.addEventListener("DOMContentLoaded", () => {
    currentContent = noteEl.textContent;

    const savedContent = localStorage.getItem("noteContent");

    if(savedContent) {
        noteEl.innerHTML = savedContent;
        currentContent = savedContent;
    }
})

downloadBtn.addEventListener("click", () => {
    const content = noteEl.textContent;
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a  = document.createElement('a');
    a.href = url;
    a.download = 'my-note.txt';
    a.click();
    URL.revokeObjectURL(url);

    statusEl.textContent = "Note downloaded successfully!";
});

resetBtn.addEventListener("click", () => {
    noteEl.textContent = "";
    localStorage.removeItem('noteContent');
    currentContent = "";
    statusEl.textContent = "Note reset successfully!"
})


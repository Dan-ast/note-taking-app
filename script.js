const noteEl = document.getElementById("note");
const statusEl = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");
const saveNoteBtn = document.getElementById("saveBtn");
const notesList = document.getElementById("notesList");

let currentContent = ""; 
let miniNotes = JSON.parse(localStorage.getItem('miniNotes')) || [];

function updateMiniNotesDisplay() {
    notesList.innerHTML = "";
    miniNotes.forEach((note, index) => {
        const miniNoteEl = document.createElement("div");
        miniNoteEl.className = "mini-note";
        miniNoteEl.innerHTML = `
            <button class="mini-note-delete" onclick="deleteMiniNote(${index})">❌</button>
            <div class="mini-note-content">${note.content.substring(0, 100)}${note.content.length > 100 ? '...' : ''}</div>
            `;
            miniNoteEl.addEventListener("click", () => loadMiniNote(index));
            notesList.appendChild(miniNoteEl);
    })
}


//saving a mini note
saveNoteBtn.addEventListener("click", () => {
    const content = noteEl.textContent.trim();
    if (content) {
        miniNotes.push({
            content: content,
            timestamp: new Date().toLocaleString()
        });
        localStorage.setItem('miniNotes', JSON.stringify(miniNotes));
        updateMiniNotesDisplay();
        statusEl.textContent = "Your note saved!"
    }
});

function loadMiniNote(index) {
    noteEl.textContent = notesList[index].content;
    currentContent = notesList[index].content;
    statusEl.textContent = "Note loaded from mini notes";
}

//deleting a mini note
function deleteMiniNote(index) {
    miniNotes.splice(index, 1);
    localStorage.setItem('miniNotes', JSON.stringify(miniNotes));
    updateMiniNotesDisplay();
    statusEl.textContent = "Mini note deleted";
}

window.addEventListener("DOMContentLoaded", () => {
    currentContent = noteEl.textContent;

    const savedContent = localStorage.getItem("noteContent");

    if(savedContent) {
        noteEl.innerHTML = savedContent;
        currentContent = savedContent;
    }
    updateMiniNotesDisplay();
})

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

document.querySelectorAll(".toolbar-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const command = button.dataset.command;

        if  (command === "undo" || command === "redo") {
            document.execCommand(command, false, null);
        } else {
            document.execCommand(command, false, null);
        }

        noteEl.focus();
    })
})
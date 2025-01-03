// Select DOM elements
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const addNoteButton = document.getElementById("add-note");
const notesList = document.getElementById("notes");
const toggleThemeButton = document.getElementById("toggle-theme");
const body = document.body;

// Load notes from localStorage
const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem("quickNotes")) || [];
    notes.forEach((note) => addNoteToDOM(note));
};

// Save notes to localStorage
const saveNotes = () => {
    const notes = Array.from(notesList.children).map((li) => li.querySelector(".note-content").textContent);
    localStorage.setItem("quickNotes", JSON.stringify(notes));
};

// Add a note to the DOM
const addNoteToDOM = (content) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="note-content">${content}</span>
        <button class="delete-note" aria-label="Delete Note">Delete</button>
    `;
    li.querySelector(".delete-note").addEventListener("click", () => {
        li.remove();
        saveNotes();
    });
    notesList.appendChild(li);
};

// Add a new note
const addNote = () => {
    const content = noteText.value.trim();
    if (content && content.length <= 200) {
        addNoteToDOM(content);
        saveNotes();
        noteText.value = "";
        updateCharCount();
    }
};

// Update character count
const updateCharCount = () => {
    const currentLength = noteText.value.length;
    charCount.textContent = currentLength;
    addNoteButton.disabled = currentLength === 0 || currentLength > 200;
};

// Toggle between light and dark mode
const toggleTheme = () => {
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    toggleThemeButton.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
};

// Event listeners
addNoteButton.addEventListener("click", addNote);
noteText.addEventListener("input", updateCharCount);
toggleThemeButton.addEventListener("click", toggleTheme);
document.addEventListener("DOMContentLoaded", loadNotes);

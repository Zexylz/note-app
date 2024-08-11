document.addEventListener('DOMContentLoaded', () => {
    const note = document.querySelector('.note');
    const noteContent = document.getElementById('note-content');
    const loveNoteForm = document.getElementById('love-note-form');
    const loveNoteInput = document.getElementById('love-note-input');

    // Load the note from localStorage
    const savedNote = localStorage.getItem('loveNote');
    if (savedNote && noteContent) {
        noteContent.textContent = savedNote;
    }

    if (note) {
        note.addEventListener('click', () => {
            note.classList.toggle('open');
        });
    }

    if (loveNoteForm) {
        loveNoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newNote = loveNoteInput.value.trim();
            if (newNote) {
                localStorage.setItem('loveNote', newNote);
                alert('Love note sent successfully!');
                loveNoteInput.value = '';
            } else {
                alert('Please enter a love note before sending.');
            }
        });
    }
});
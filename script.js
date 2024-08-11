document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const loveNote = document.getElementById('love-note');
    const noteTo = document.getElementById('note-to');
    const noteFrom = document.getElementById('note-from');
    const noteContent = document.getElementById('note-content');
    const noteDate = document.getElementById('note-date');
    const loveNoteForm = document.getElementById('love-note-form');

    function loadLatestNote() {
        const savedNotes = JSON.parse(localStorage.getItem('loveNotes')) || [];
        const validNotes = savedNotes.filter(note => note.to && note.from && note.content);
        
        if (validNotes.length > 0) {
            const lastNote = validNotes[validNotes.length - 1];
            noteTo.textContent = lastNote.to;
            noteFrom.textContent = lastNote.from;
            noteContent.textContent = lastNote.content;
            const date = new Date(lastNote.date);
            noteDate.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
            noteTo.textContent = "My Love";
            noteFrom.textContent = "Your Secret Admirer";
            noteContent.textContent = "No love notes yet. Be the first to write one!";
            noteDate.textContent = new Date().toLocaleDateString();
        }
    }

    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.add('open');
            setTimeout(() => {
                envelope.style.display = 'none';
                loveNote.style.display = 'block';
            }, 600);
        });
        loadLatestNote();
    }

    if (loveNoteForm) {
        loveNoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const noteTo = document.getElementById('note-to');
            const noteFrom = document.getElementById('note-from');
            const loveNoteInput = document.getElementById('note-content');

            const newNote = {
                to: noteTo.value.trim(),
                from: noteFrom.value.trim(),
                content: loveNoteInput.value.trim(),
                date: new Date().toISOString()
            };

            if (newNote.to && newNote.from && newNote.content) {
                const savedNotes = JSON.parse(localStorage.getItem('loveNotes')) || [];
                savedNotes.push(newNote);
                localStorage.setItem('loveNotes', JSON.stringify(savedNotes));
                alert('Love note sent successfully!');
                noteTo.value = '';
                noteFrom.value = '';
                loveNoteInput.value = '';
            } else {
                alert('Please fill in all fields before sending.');
            }
        });
    }
});
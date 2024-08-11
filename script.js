document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const loveNote = document.getElementById('love-note');
    const noteTo = document.getElementById('note-to');
    const noteFrom = document.getElementById('note-from');
    const noteContent = document.getElementById('note-content');
    const noteDate = document.getElementById('note-date');
    const loveNoteForm = document.getElementById('love-note-form');

    const API_URL = 'http://localhost:3000/api';

    async function loadLatestNote() {
        try {
            const response = await fetch(`${API_URL}/notes`);
            const notes = await response.json();
            
            if (notes.length > 0) {
                const lastNote = notes[0];
                noteTo.textContent = lastNote.to_person;
                noteFrom.textContent = lastNote.from_person;
                noteContent.textContent = lastNote.content;
                const date = new Date(lastNote.date);
                noteDate.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            } else {
                noteTo.textContent = "My Love";
                noteFrom.textContent = "Your Secret Admirer";
                noteContent.textContent = "No love notes yet. Be the first to write one!";
                noteDate.textContent = new Date().toLocaleDateString();
            }
        } catch (error) {
            console.error('Error loading latest note:', error);
            alert('Failed to load the latest love note. Please try again later.');
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
        loveNoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const noteTo = document.getElementById('note-to');
            const noteFrom = document.getElementById('note-from');
            const loveNoteInput = document.getElementById('note-content');

            const newNote = {
                to: noteTo.value.trim(),
                from: noteFrom.value.trim(),
                content: loveNoteInput.value.trim()
            };

            if (newNote.to && newNote.from && newNote.content) {
                try {
                    const response = await fetch(`${API_URL}/notes`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newNote)
                    });

                    if (response.ok) {
                        alert('Love note sent successfully!');
                        noteTo.value = '';
                        noteFrom.value = '';
                        loveNoteInput.value = '';
                    } else {
                        throw new Error('Failed to send love note');
                    }
                } catch (error) {
                    console.error('Error sending love note:', error);
                    alert('Failed to send the love note. Please try again later.');
                }
            } else {
                alert('Please fill in all fields before sending.');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('history-container');
    const API_URL = 'http://localhost:3000/api';

    async function loadNoteHistory() {
        try {
            const response = await fetch(`${API_URL}/notes`);
            const notes = await response.json();
            
            if (notes.length > 0) {
                notes.forEach(note => {
                    const noteElement = createNoteElement(note);
                    historyContainer.appendChild(noteElement);
                });
            } else {
                historyContainer.innerHTML = '<p>No love notes found. Be the first to write one!</p>';
            }
        } catch (error) {
            console.error('Error loading note history:', error);
            historyContainer.innerHTML = '<p>Failed to load love notes. Please try again later.</p>';
        }
    }

    function createNoteElement(note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'love-note';
        
        const date = new Date(note.date);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        noteDiv.innerHTML = `
            <div class="note-header">
                <div class="to-from">
                    <span class="label">To:</span>
                    <span class="value">${note.to_person}</span>
                </div>
                <div class="to-from">
                    <span class="label">From:</span>
                    <span class="value">${note.from_person}</span>
                </div>
            </div>
            <div class="note-content">${note.content}</div>
            <div class="note-footer">
                <span class="date">${formattedDate}</span>
            </div>
        `;

        return noteDiv;
    }

    loadNoteHistory();
});
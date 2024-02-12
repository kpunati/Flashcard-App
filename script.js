//Programmed by Karthik P.

// Utility functions to show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    showSection('main-menu'); // Show main menu initially

    // Event listeners for main menu buttons
    document.getElementById('create-flashcards').addEventListener('click', function() {
        showSection('create-section');
    });

    document.getElementById('view-flashcards').addEventListener('click', function() {
        showSection('view-section');
        displayFlashcards(0);
    });

    document.getElementById('study-flashcards').addEventListener('click', function() {
        showSection('study-section');
        studyFlashcard(0); // Start studying from the first flashcard
    });

    // Back button functionality
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', function() {
            showSection('main-menu');
        });
    });

    // delete-flashcards event listener
    document.getElementById('delete-flashcards').addEventListener('click', function() {
        localStorage.removeItem('flashcards');
        alert('All flashcards have been deleted.');
        displayFlashcards(0); // Refresh display
    });

    // Handle flashcard creation form submission
    document.getElementById('flashcard-form').addEventListener('submit', handleFlashcardFormSubmission);

 
});

function handleFlashcardFormSubmission(e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    addFlashcard(question, answer);
    // Clear the input fields for question and answer
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
    // Provide feedback to the user
    alert('Flashcard added successfully!');
}

// Add a flashcard
function addFlashcard(question, answer) {
    const flashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    flashcards.push({ question, answer });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

// Display flashcards in view-section with pagination
let currentPage = 0;
function displayFlashcards(page) {
    const flashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    const container = document.getElementById('view-section');
    const pageSize = 4;
    const paginatedCards = flashcards.slice(page * pageSize, (page + 1) * pageSize);

    container.innerHTML = '<h2>View Flashcards</h2>'; // Clear and add title
    paginatedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.innerHTML = `<p>${card.question}</p><p>${card.answer}</p>`;
        container.appendChild(cardElement);
    });

    // Pagination
    if (page > 0) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.onclick = () => displayFlashcards(page - 1);
        container.appendChild(prevButton);
    }

    if ((page + 1) * pageSize < flashcards.length) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.onclick = () => displayFlashcards(page + 1);
        container.appendChild(nextButton);
    }
}

// Study a single flashcard with flip functionality

function studyFlashcard(index) {
    const flashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    if (index < flashcards.length) {
        const container = document.getElementById('study-section');
        const card = flashcards[index];
        container.innerHTML = `<div id="flashcard">${card.question}</div>`;
        const flashcardDiv = document.getElementById('flashcard');
        let isQuestion = true; // Track if showing question or answer

        flashcardDiv.addEventListener('click', () => {
            flashcardDiv.innerText = isQuestion ? card.answer : card.question;
            isQuestion = !isQuestion;
        });

        // Next button

        if (index + 1 < flashcards.length) {
            const nextButton = document.createElement('button');
            nextButton.innerText = 'Next';
            nextButton.onclick = () => studyFlashcard(index + 1);
            container.appendChild(nextButton);
        }
    }
}

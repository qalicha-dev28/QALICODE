// JavaScript Explanation:
// This file contains all the interactive logic for our quiz app
// We're using ES6+ features: arrow functions, template literals, destructuring, etc.

// DOM Elements - Selecting elements we'll interact with
const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const buttons = {
    startQuiz: document.getElementById('start-quiz-btn'),
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    submit: document.getElementById('submit-btn'),
    retake: document.getElementById('retake-btn'),
    viewHighscores: document.getElementById('view-highscores-btn'),
    newQuiz: document.getElementById('new-quiz-btn'),
    signup: document.getElementById('signup-btn')
};

const inputs = {
    username: document.getElementById('username-input'),
    modalUsername: document.getElementById('modal-username'),
    fullname: document.getElementById('fullname'),
    email: document.getElementById('email')
};

const displays = {
    username: document.getElementById('username-display'),
    questionCounter: document.getElementById('question-counter'),
    scoreDisplay: document.getElementById('score-display'),
    timer: document.getElementById('timer'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    quizTopic: document.getElementById('quiz-topic'),
    progress: document.getElementById('progress'),
    finalScore: document.getElementById('final-score'),
    correctAnswers: document.getElementById('correct-answers'),
    timeUsed: document.getElementById('time-used'),
    performance: document.getElementById('performance'),
    resultsMessage: document.getElementById('results-message'),
    highscoresList: document.getElementById('highscores-list')
};

const modal = {
    element: document.getElementById('signup-modal'),
    close: document.querySelector('.close-modal'),
    form: document.getElementById('signup-form')
};

const languageButtons = document.querySelectorAll('.lang-btn');

// Quiz State - This object holds all the data about the current quiz
let quizState = {
    currentScreen: 'welcome',
    username: localStorage.getItem('qalicode-username') || 'Guest',
    selectedLanguage: 'html',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: 60,
    timerInterval: null,
    userAnswers: [],
    quizStarted: false
};

// Quiz Questions Database
// Each question is an object with properties: question, options, correctAnswer, and explanation
const questionsDatabase = {
    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            correctAnswer: 0,
            explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages."
        },
        {
            question: "Which HTML element is used for the largest heading?",
            options: ["&lt;h6&gt;", "&lt;head&gt;", "&lt;h1&gt;", "&lt;heading&gt;"],
            correctAnswer: 2,
            explanation: "The &lt;h1&gt; element is used for the most important heading (largest), while &lt;h6&gt; is for the least important."
        },
        {
            question: "What is the correct HTML for creating a hyperlink?",
            options: [
                "&lt;a url='http://example.com'&gt;Example&lt;/a&gt;",
                "&lt;a href='http://example.com'&gt;Example&lt;/a&gt;",
                "&lt;a&gt;http://example.com&lt;/a&gt;",
                "&lt;link&gt;http://example.com&lt;/link&gt;"
            ],
            correctAnswer: 1,
            explanation: "The &lt;a&gt; tag with the 'href' attribute creates a hyperlink in HTML."
        },
        {
            question: "Which attribute is used to provide a unique name for an HTML element?",
            options: ["class", "id", "type", "name"],
            correctAnswer: 1,
            explanation: "The 'id' attribute provides a unique identifier for an HTML element."
        },
        {
            question: "What is the purpose of the &lt;head&gt; element in HTML?",
            options: [
                "To define the main content of the document",
                "To contain metadata about the document",
                "To create a header at the top of the page",
                "To define a section for navigation links"
            ],
            correctAnswer: 1,
            explanation: "The &lt;head&gt; element contains metadata (data about data) like title, character set, styles, scripts, etc."
        }
    ],
    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Colorful Style Sheets"
            ],
            correctAnswer: 1,
            explanation: "CSS stands for Cascading Style Sheets, used to style HTML elements."
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["font-style", "text-size", "font-size", "text-style"],
            correctAnswer: 2,
            explanation: "The 'font-size' property controls the size of text in CSS."
        },
        {
            question: "How do you select an element with id 'header' in CSS?",
            options: [".header", "#header", "*header", "header"],
            correctAnswer: 1,
            explanation: "In CSS, the '#' symbol is used to select elements by their id attribute."
        },
        {
            question: "Which property is used to change the background color?",
            options: ["color", "bgcolor", "background-color", "bg-color"],
            correctAnswer: 2,
            explanation: "The 'background-color' property sets the background color of an element."
        },
        {
            question: "How do you make each word in a text start with a capital letter?",
            options: [
                "text-transform: capitalize",
                "text-transform: uppercase",
                "text-style: capital",
                "font-variant: small-caps"
            ],
            correctAnswer: 0,
            explanation: "The 'text-transform: capitalize' property makes the first character of each word uppercase."
        }
    ],
    js: [
        {
            question: "Which of the following is a JavaScript data type?",
            options: ["Number", "Array", "Boolean", "All of the above"],
            correctAnswer: 3,
            explanation: "JavaScript has several data types including Number, String, Boolean, Object, Array, etc."
        },
        {
            question: "How do you write 'Hello World' in an alert box?",
            options: [
                "alert('Hello World');",
                "msg('Hello World');",
                "alertBox('Hello World');",
                "msgBox('Hello World');"
            ],
            correctAnswer: 0,
            explanation: "The alert() function displays an alert box with a specified message."
        },
        {
            question: "How do you create a function in JavaScript?",
            options: [
                "function myFunction()",
                "function = myFunction()",
                "function:myFunction()",
                "create myFunction()"
            ],
            correctAnswer: 0,
            explanation: "Functions in JavaScript are declared using the 'function' keyword followed by the function name and parentheses."
        },
        {
            question: "How to write an IF statement in JavaScript?",
            options: [
                "if (i == 5)",
                "if i = 5",
                "if i == 5 then",
                "if i = 5 then"
            ],
            correctAnswer: 0,
            explanation: "The correct syntax for an IF statement is: if (condition) { // code to execute }"
        },
        {
            question: "How does a WHILE loop start?",
            options: [
                "while (i <= 10)",
                "while i = 1 to 10",
                "while (i <= 10; i++)",
                "while i <= 10"
            ],
            correctAnswer: 0,
            explanation: "A WHILE loop starts with the 'while' keyword followed by a condition in parentheses."
        }
    ]
};

// Highscores Data - Stored in localStorage
let highscores = JSON.parse(localStorage.getItem('qalicode-highscores')) || [];

// Initialize the App
function initApp() {
    console.log("Initializing QALICODE Quiz App...");
    
    // Set username display
    displays.username.textContent = quizState.username;
    
    // Set up event listeners
    setupEventListeners();
    
    // Show welcome screen
    switchScreen('welcome');
    
    // Update highscores display
    updateHighscoresDisplay();
}

// Set up all event listeners
function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Start quiz button
    buttons.startQuiz.addEventListener('click', startQuiz);
    
    // Quiz navigation buttons
    buttons.prev.addEventListener('click', showPreviousQuestion);
    buttons.next.addEventListener('click', showNextQuestion);
    buttons.submit.addEventListener('click', submitQuiz);
    
    // Results screen buttons
    buttons.retake.addEventListener('click', retakeQuiz);
    buttons.viewHighscores.addEventListener('click', viewHighscores);
    buttons.newQuiz.addEventListener('click', newQuiz);
    
    // Signup button
    buttons.signup.addEventListener('click', openSignupModal);
    
    // Modal events
    modal.close.addEventListener('click', closeSignupModal);
    modal.form.addEventListener('submit', handleSignupSubmit);
    
    // Language selection buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update selected language
            quizState.selectedLanguage = button.dataset.language;
            console.log(`Language selected: ${quizState.selectedLanguage}`);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal.element) {
            closeSignupModal();
        }
    });
    
    // Handle Enter key on username input
    inputs.username.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            startQuiz();
        }
    });
}

// Switch between screens
function switchScreen(screenName) {
    console.log(`Switching to screen: ${screenName}`);
    
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the selected screen
    screens[screenName].classList.add('active');
    quizState.currentScreen = screenName;
    
    // Additional setup for specific screens
    if (screenName === 'quiz') {
        setupQuiz();
    }
}

// Start the quiz
function startQuiz() {
    console.log("Starting quiz...");
    
    // Get username from input
    const username = inputs.username.value.trim();
    if (username) {
        quizState.username = username;
        displays.username.textContent = username;
        
        // Save to localStorage for future use
        localStorage.setItem('qalicode-username', username);
    }
    
    // Get questions based on selected language
    if (quizState.selectedLanguage === 'all') {
        // Mix questions from all categories
        quizState.questions = [
            ...questionsDatabase.html.slice(0, 3),
            ...questionsDatabase.css.slice(0, 3),
            ...questionsDatabase.js.slice(0, 4)
        ];
        // Shuffle the questions
        quizState.questions = shuffleArray(quizState.questions);
    } else {
        quizState.questions = [...questionsDatabase[quizState.selectedLanguage]];
    }
    
    // Reset quiz state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.userAnswers = new Array(quizState.questions.length).fill(null);
    quizState.quizStarted = true;
    
    // Update quiz topic display
    const languageNames = {
        html: 'HTML',
        css: 'CSS',
        js: 'JavaScript',
        all: 'Web Development'
    };
    
    displays.quizTopic.textContent = `${languageNames[quizState.selectedLanguage]} Quiz`;
    
    // Update quiz topic icon
    const topicIcon = document.querySelector('.quiz-topic i');
    topicIcon.className = getLanguageIcon(quizState.selectedLanguage);
    
    // Switch to quiz screen
    switchScreen('quiz');
    
    // Start the timer
    startTimer();
    
    // Display the first question
    displayQuestion();
}

// Setup quiz screen
function setupQuiz() {
    // Reset progress bar
    displays.progress.style.width = '0%';
    
    // Update score display
    displays.scoreDisplay.textContent = quizState.score;
    
    // Set up timer display
    displays.timer.textContent = `${quizState.timer}s`;
    
    // Reset navigation buttons
    buttons.prev.disabled = true;
    buttons.next.disabled = false;
    buttons.submit.style.display = 'none';
    
    // Update question counter
    updateQuestionCounter();
}

// Display current question
function displayQuestion() {
    console.log(`Displaying question ${quizState.currentQuestionIndex + 1}`);
    
    const question = quizState.questions[quizState.currentQuestionIndex];
    
    // Update question text
    displays.questionText.innerHTML = question.question;
    
    // Clear previous options
    displays.optionsContainer.innerHTML = '';
    
    // Create option elements
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Check if this option was previously selected
        if (quizState.userAnswers[quizState.currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-prefix">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index));
        displays.optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update progress bar
    const progressPercentage = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;
    displays.progress.style.width = `${progressPercentage}%`;
}

// Select an option
function selectOption(optionIndex) {
    console.log(`Option ${optionIndex} selected for question ${quizState.currentQuestionIndex + 1}`);
    
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    options[optionIndex].classList.add('selected');
    
    // Save user's answer
    quizState.userAnswers[quizState.currentQuestionIndex] = optionIndex;
    
    // Enable next button if not already enabled
    buttons.next.disabled = false;
}

// Update question counter
function updateQuestionCounter() {
    displays.questionCounter.textContent = 
        `${quizState.currentQuestionIndex + 1}/${quizState.questions.length}`;
}

// Update navigation buttons
function updateNavigationButtons() {
    // Previous button
    buttons.prev.disabled = quizState.currentQuestionIndex === 0;
    
    // Next button
    const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;
    buttons.next.disabled = isLastQuestion && quizState.userAnswers[quizState.currentQuestionIndex] === null;
    
    // Submit button (show only on last question)
    buttons.submit.style.display = isLastQuestion ? 'block' : 'none';
}

// Show previous question
function showPreviousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayQuestion();
    }
}

// Show next question
function showNextQuestion() {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        quizState.currentQuestionIndex++;
        displayQuestion();
    } else if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
        // If on last question and answer is selected, allow submit
        if (quizState.userAnswers[quizState.currentQuestionIndex] !== null) {
            submitQuiz();
        }
    }
}

// Start the quiz timer
function startTimer() {
    // Clear any existing timer
    if (quizState.timerInterval) {
        clearInterval(quizState.timerInterval);
    }
    
    // Reset timer
    quizState.timer = 60;
    displays.timer.textContent = `${quizState.timer}s`;
    
    // Start countdown
    quizState.timerInterval = setInterval(() => {
        quizState.timer--;
        displays.timer.textContent = `${quizState.timer}s`;
        
        // Change color when time is running low
        if (quizState.timer <= 10) {
            displays.timer.style.color = 'var(--danger)';
        }
        
        // Time's up!
        if (quizState.timer <= 0) {
            clearInterval(quizState.timerInterval);
            submitQuiz();
        }
    }, 1000);
}

// Submit the quiz
function submitQuiz() {
    console.log("Submitting quiz...");
    
    // Stop the timer
    clearInterval(quizState.timerInterval);
    
    // Calculate score
    calculateScore();
    
    // Save highscore
    saveHighscore();
    
    // Show results screen
    showResults();
}

// Calculate final score
function calculateScore() {
    let correctCount = 0;
    
    // Check each answer
    quizState.questions.forEach((question, index) => {
        if (quizState.userAnswers[index] === question.correctAnswer) {
            correctCount++;
        }
    });
    
    // Calculate score (base points + time bonus)
    const baseScore = correctCount * 10;
    const timeBonus = Math.floor(quizState.timer * 0.5); // 0.5 points per second remaining
    quizState.score = baseScore + timeBonus;
    
    console.log(`Correct answers: ${correctCount}/${quizState.questions.length}`);
    console.log(`Score: ${quizState.score} (${baseScore} base + ${timeBonus} time bonus)`);
    
    return { correctCount, total: quizState.questions.length };
}

// Show results screen
function showResults() {
    // Calculate results
    const { correctCount, total } = calculateScore();
    
    // Update results displays
    displays.finalScore.textContent = quizState.score;
    displays.correctAnswers.textContent = `${correctCount}/${total}`;
    displays.timeUsed.textContent = `${60 - quizState.timer}s`;
    
    // Set performance rating
    const percentage = (correctCount / total) * 100;
    let performance = "";
    
    if (percentage >= 90) {
        performance = "Expert";
        displays.resultsMessage.textContent = "Outstanding! You're a coding expert! 🎉";
    } else if (percentage >= 70) {
        performance = "Advanced";
        displays.resultsMessage.textContent = "Great job! You have strong coding knowledge! 👍";
    } else if (percentage >= 50) {
        performance = "Intermediate";
        displays.resultsMessage.textContent = "Good effort! Keep practicing to improve! 💪";
    } else {
        performance = "Beginner";
        displays.resultsMessage.textContent = "Keep learning! Every expert was once a beginner. 📚";
    }
    
    displays.performance.textContent = performance;
    
    // Animate the score circle
    const circle = document.querySelector('.score-circle-progress');
    const circumference = 2 * Math.PI * 54; // 2πr
    const offset = circumference - (percentage / 100) * circumference;
    
    // Set initial state
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
    // Animate to final value
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 300);
    
    // Update highscores display
    updateHighscoresDisplay();
    
    // Switch to results screen
    switchScreen('results');
}

// Save highscore to localStorage
function saveHighscore() {
    const highscore = {
        username: quizState.username,
        score: quizState.score,
        language: quizState.selectedLanguage,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };
    
    // Add to highscores array
    highscores.push(highscore);
    
    // Sort by score (descending)
    highscores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10 scores
    if (highscores.length > 10) {
        highscores = highscores.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('qalicode-highscores', JSON.stringify(highscores));
    
    console.log("Highscore saved:", highscore);
}

// Update highscores display
function updateHighscoresDisplay() {
    displays.highscoresList.innerHTML = '';
    
    if (highscores.length === 0) {
        displays.highscoresList.innerHTML = 
            '<p class="no-highscores">No highscores yet. Be the first to set one!</p>';
        return;
    }
    
    // Display top 10 highscores
    highscores.slice(0, 10).forEach((highscore, index) => {
        const highscoreItem = document.createElement('div');
        highscoreItem.className = `highscore-item ${highscore.username === quizState.username ? 'current-user' : ''}`;
        
        highscoreItem.innerHTML = `
            <div class="highscore-rank">${index + 1}</div>
            <div class="highscore-user">${highscore.username}</div>
            <div class="highscore-score">${highscore.score} pts</div>
            <div class="highscore-date">${highscore.date}</div>
        `;
        
        displays.highscoresList.appendChild(highscoreItem);
    });
}

// Retake the same quiz
function retakeQuiz() {
    console.log("Retaking quiz...");
    startQuiz();
}

// View highscores
function viewHighscores() {
    updateHighscoresDisplay();
    // Already on results screen, no need to switch
}

// Start a new quiz
function newQuiz() {
    console.log("Starting new quiz...");
    switchScreen('welcome');
}

// Open signup modal
function openSignupModal() {
    console.log("Opening signup modal...");
    modal.element.style.display = 'flex';
    
    // Pre-fill username if available
    if (quizState.username !== 'Guest') {
        inputs.modalUsername.value = quizState.username;
    }
}

// Close signup modal
function closeSignupModal() {
    modal.element.style.display = 'none';
    modal.form.reset();
}

// Handle signup form submission
function handleSignupSubmit(event) {
    event.preventDefault();
    console.log("Handling signup submission...");
    
    // Get form values
    const fullname = inputs.fullname.value.trim();
    const email = inputs.email.value.trim();
    const username = inputs.modalUsername.value.trim();
    
    // Basic validation
    if (!username || !email) {
        alert("Please fill in all required fields");
        return;
    }
    
    // Update username
    quizState.username = username;
    displays.username.textContent = username;
    inputs.username.value = username;
    
    // Save to localStorage
    localStorage.setItem('qalicode-username', username);
    
    // Show success message
    alert(`Welcome to QALICODE, ${username}! Your account has been created.`);
    
    // Close modal
    closeSignupModal();
}

// Utility function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Get language icon class
function getLanguageIcon(language) {
    switch (language) {
        case 'html': return 'fab fa-html5 html-icon';
        case 'css': return 'fab fa-css3-alt css-icon';
        case 'js': return 'fab fa-js-square js-icon';
        default: return 'fas fa-code';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
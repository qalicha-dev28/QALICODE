// JavaScript Explanation:
// This file contains all the interactive logic for our quiz app
// We're using ES6+ features: arrow functions, template literals, destructuring, etc.

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const buttons = {
    startQuiz: document.getElementById('start-quiz-btn'),
    login: document.getElementById('login-btn'),
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    submit: document.getElementById('submit-btn'),
    retake: document.getElementById('retake-btn'),
    viewHighscores: document.getElementById('view-highscores-btn'),
    newQuiz: document.getElementById('new-quiz-btn'),
    signup: document.getElementById('signup-btn'),
    logout: document.getElementById('logout-btn'),
    hint: document.getElementById('hint-btn'),
    skip: document.getElementById('skip-btn'),
    messageOk: document.getElementById('message-ok-btn')
};

const inputs = {
    username: document.getElementById('username-input'),
    password: document.getElementById('password-input'),
    modalUsername: document.getElementById('modal-username'),
    modalPassword: document.getElementById('modal-password'),
    confirmPassword: document.getElementById('confirm-password'),
    fullname: document.getElementById('fullname'),
    email: document.getElementById('email'),
    loginUsername: document.getElementById('login-username'),
    loginPassword: document.getElementById('login-password')
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
    progressPercentage: document.getElementById('progress-percentage'),
    currentQuestion: document.getElementById('current-question'),
    finalScore: document.getElementById('final-score'),
    correctAnswers: document.getElementById('correct-answers'),
    timeUsed: document.getElementById('time-used'),
    performance: document.getElementById('performance'),
    resultsMessage: document.getElementById('results-message'),
    highscoresList: document.getElementById('highscores-list'),
    userDisplay: document.getElementById('user-display')
};

const modals = {
    signup: document.getElementById('signup-modal'),
    login: document.getElementById('login-modal'),
    message: document.getElementById('message-modal')
};

const messageElements = {
    title: document.getElementById('message-title'),
    icon: document.getElementById('message-icon'),
    text: document.getElementById('message-text')
};

const languageButtons = document.querySelectorAll('.lang-btn');

// Quiz State
let quizState = {
    currentScreen: 'welcome',
    username: 'Guest',
    isLoggedIn: false,
    selectedLanguage: 'html',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: 60,
    timerInterval: null,
    userAnswers: [],
    quizStarted: false,
    hintsUsed: 0,
    questionsSkipped: 0
};

// User Authentication System
const users = JSON.parse(localStorage.getItem('qalicode-users')) || [
    { username: 'admin', password: 'admin123', fullname: 'Admin User', email: 'admin@qalicode.com' }
];

// Questions Database
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
            explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.",
            difficulty: "beginner"
        },
        {
            question: "Which HTML element is used for the largest heading?",
            options: ["&lt;h6&gt;", "&lt;head&gt;", "&lt;h1&gt;", "&lt;heading&gt;"],
            correctAnswer: 2,
            explanation: "The &lt;h1&gt; element is used for the most important heading (largest), while &lt;h6&gt; is for the least important.",
            difficulty: "beginner"
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
            explanation: "The &lt;a&gt; tag with the 'href' attribute creates a hyperlink in HTML.",
            difficulty: "beginner"
        },
        {
            question: "Which attribute is used to provide a unique name for an HTML element?",
            options: ["class", "id", "type", "name"],
            correctAnswer: 1,
            explanation: "The 'id' attribute provides a unique identifier for an HTML element.",
            difficulty: "intermediate"
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
            explanation: "The &lt;head&gt; element contains metadata (data about data) like title, character set, styles, scripts, etc.",
            difficulty: "intermediate"
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
            explanation: "CSS stands for Cascading Style Sheets, used to style HTML elements.",
            difficulty: "beginner"
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["font-style", "text-size", "font-size", "text-style"],
            correctAnswer: 2,
            explanation: "The 'font-size' property controls the size of text in CSS.",
            difficulty: "beginner"
        },
        {
            question: "How do you select an element with id 'header' in CSS?",
            options: [".header", "#header", "*header", "header"],
            correctAnswer: 1,
            explanation: "In CSS, the '#' symbol is used to select elements by their id attribute.",
            difficulty: "beginner"
        },
        {
            question: "Which property is used to change the background color?",
            options: ["color", "bgcolor", "background-color", "bg-color"],
            correctAnswer: 2,
            explanation: "The 'background-color' property sets the background color of an element.",
            difficulty: "beginner"
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
            explanation: "The 'text-transform: capitalize' property makes the first character of each word uppercase.",
            difficulty: "intermediate"
        }
    ],
    js: [
        {
            question: "Which of the following is a JavaScript data type?",
            options: ["Number", "Array", "Boolean", "All of the above"],
            correctAnswer: 3,
            explanation: "JavaScript has several data types including Number, String, Boolean, Object, Array, etc.",
            difficulty: "beginner"
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
            explanation: "The alert() function displays an alert box with a specified message.",
            difficulty: "beginner"
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
            explanation: "Functions in JavaScript are declared using the 'function' keyword followed by the function name and parentheses.",
            difficulty: "beginner"
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
            explanation: "The correct syntax for an IF statement is: if (condition) { // code to execute }",
            difficulty: "beginner"
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
            explanation: "A WHILE loop starts with the 'while' keyword followed by a condition in parentheses.",
            difficulty: "intermediate"
        }
    ]
};

// Highscores Data
let highscores = JSON.parse(localStorage.getItem('qalicode-highscores')) || [];

// Initialize the App
function initApp() {
    console.log("Initializing QALICODE Quiz App...");
    
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('qalicode-current-user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        quizState.username = user.username;
        quizState.isLoggedIn = true;
        updateUserDisplay();
    }
    
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
    
    // Quiz buttons
    buttons.startQuiz.addEventListener('click', startQuiz);
    buttons.login.addEventListener('click', openLoginModal);
    buttons.prev.addEventListener('click', showPreviousQuestion);
    buttons.next.addEventListener('click', showNextQuestion);
    buttons.submit.addEventListener('click', submitQuiz);
    
    // Results screen buttons
    buttons.retake.addEventListener('click', retakeQuiz);
    buttons.viewHighscores.addEventListener('click', viewHighscores);
    buttons.newQuiz.addEventListener('click', newQuiz);
    
    // Auth buttons
    buttons.signup.addEventListener('click', openSignupModal);
    buttons.logout.addEventListener('click', logoutUser);
    
    // Modal events
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    document.getElementById('signup-form').addEventListener('submit', handleSignupSubmit);
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
    buttons.messageOk.addEventListener('click', () => closeModal('message'));
    
    // Modal navigation links
    document.getElementById('login-link').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signup');
        openLoginModal();
    });
    
    document.getElementById('signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('login');
        openSignupModal();
    });
    
    // Language selection buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            quizState.selectedLanguage = button.dataset.language;
            console.log(`Language selected: ${quizState.selectedLanguage}`);
        });
    });
    
    // Hint and skip buttons
    buttons.hint.addEventListener('click', showHint);
    buttons.skip.addEventListener('click', skipQuestion);
    
    // Handle Enter key on username input
    inputs.username.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            startQuiz();
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

// Update user display
function updateUserDisplay() {
    displays.username.textContent = quizState.username;
    if (quizState.isLoggedIn) {
        displays.userDisplay.style.display = 'flex';
        buttons.logout.style.display = 'block';
        buttons.signup.style.display = 'none';
        displays.userDisplay.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>${quizState.username}</span>
        `;
    } else {
        displays.userDisplay.style.display = 'flex';
        buttons.logout.style.display = 'none';
        buttons.signup.style.display = 'block';
        displays.userDisplay.innerHTML = `
            <i class="fas fa-user"></i>
            <span>Guest</span>
        `;
    }
}

// Show message modal
function showMessage(title, text, type = 'info') {
    messageElements.title.textContent = title;
    messageElements.text.textContent = text;
    
    // Set icon based on type
    const icon = messageElements.icon.querySelector('i');
    icon.className = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    }[type] || 'fas fa-info-circle';
    
    // Set icon color based on type
    messageElements.icon.style.color = {
        'success': 'var(--success)',
        'error': 'var(--danger)',
        'warning': 'var(--warning)',
        'info': 'var(--primary)'
    }[type] || 'var(--primary)';
    
    openModal('message');
}

// Modal functions
function openModal(modalName) {
    modals[modalName].style.display = 'flex';
}

function closeModal(modalName) {
    modals[modalName].style.display = 'none';
}

function closeAllModals() {
    Object.values(modals).forEach(modal => {
        modal.style.display = 'none';
    });
}

// Open signup modal
function openSignupModal() {
    openModal('signup');
    document.getElementById('signup-form').reset();
}

// Open login modal
function openLoginModal() {
    openModal('login');
    document.getElementById('login-form').reset();
}

// Handle signup form submission
function handleSignupSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const fullname = inputs.fullname.value.trim();
    const email = inputs.email.value.trim();
    const username = inputs.modalUsername.value.trim();
    const password = inputs.modalPassword.value.trim();
    const confirmPassword = inputs.confirmPassword.value.trim();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Validation
    let hasError = false;
    
    if (username.length < 3) {
        document.getElementById('username-error').textContent = 'Username must be at least 3 characters';
        document.getElementById('username-error').style.display = 'block';
        hasError = true;
    }
    
    if (users.find(user => user.username === username)) {
        document.getElementById('username-error').textContent = 'Username already exists';
        document.getElementById('username-error').style.display = 'block';
        hasError = true;
    }
    
    if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
        document.getElementById('password-error').style.display = 'block';
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('confirm-error').textContent = 'Passwords do not match';
        document.getElementById('confirm-error').style.display = 'block';
        hasError = true;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        document.getElementById('email-error').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Create new user
    const newUser = {
        username,
        password,
        fullname,
        email,
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('qalicode-users', JSON.stringify(users));
    
    // Auto-login the new user
    loginUser(username, password);
    
    // Show success message
    showMessage('Success!', `Welcome to QALICODE, ${username}! Your account has been created successfully.`, 'success');
    
    // Close modal
    closeModal('signup');
}

// Handle login form submission
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = inputs.loginUsername.value.trim();
    const password = inputs.loginPassword.value.trim();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Attempt login
    if (loginUser(username, password)) {
        closeModal('login');
    } else {
        document.getElementById('login-password-error').textContent = 'Invalid username or password';
        document.getElementById('login-password-error').style.display = 'block';
    }
}

// Login function
function loginUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        quizState.username = username;
        quizState.isLoggedIn = true;
        
        // Save current user to localStorage
        localStorage.setItem('qalicode-current-user', JSON.stringify({
            username: user.username,
            fullname: user.fullname,
            email: user.email
        }));
        
        // Update UI
        updateUserDisplay();
        inputs.username.value = username;
        
        // Show welcome message
        showMessage('Welcome Back!', `Great to see you again, ${user.fullname || username}!`, 'success');
        
        return true;
    }
    
    return false;
}

// Logout function
function logoutUser() {
    quizState.username = 'Guest';
    quizState.isLoggedIn = false;
    
    // Remove current user from localStorage
    localStorage.removeItem('qalicode-current-user');
    
    // Update UI
    updateUserDisplay();
    inputs.username.value = '';
    
    // Show message
    showMessage('Logged Out', 'You have been successfully logged out.', 'info');
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
    
    // Check if user is logged in or using guest mode
    const username = inputs.username.value.trim();
    const password = inputs.password.value.trim();
    
    // If username is provided, attempt to login or use as guest
    if (username) {
        if (!quizState.isLoggedIn) {
            // Try to login if password is provided
            if (password) {
                if (!loginUser(username, password)) {
                    showMessage('Login Failed', 'Invalid username or password. Please try again or continue as guest.', 'error');
                    return;
                }
            } else {
                // Use as guest
                quizState.username = username;
                quizState.isLoggedIn = false;
                displays.username.textContent = username;
            }
        }
    } else {
        // No username provided
        showMessage('Username Required', 'Please enter a username to start the quiz.', 'warning');
        return;
    }
    
    // Get questions based on selected language
    if (quizState.selectedLanguage === 'all') {
        quizState.questions = [
            ...questionsDatabase.html.slice(0, 3),
            ...questionsDatabase.css.slice(0, 3),
            ...questionsDatabase.js.slice(0, 4)
        ];
        quizState.questions = shuffleArray(quizState.questions);
    } else {
        quizState.questions = [...questionsDatabase[quizState.selectedLanguage]];
    }
    
    // Reset quiz state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.userAnswers = new Array(quizState.questions.length).fill(null);
    quizState.quizStarted = true;
    quizState.hintsUsed = 0;
    quizState.questionsSkipped = 0;
    
    // Update quiz topic display
    const languageNames = {
        html: 'HTML',
        css: 'CSS',
        js: 'JavaScript',
        all: 'Web Development'
    };
    
    displays.quizTopic.textContent = `${languageNames[quizState.selectedLanguage]} Quiz`;
    
    // Update quiz topic icon
    const topicIcon = document.querySelector('.topic-icon');
    topicIcon.innerHTML = getLanguageIcon(quizState.selectedLanguage);
    topicIcon.style.background = getLanguageGradient(quizState.selectedLanguage);
    
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
    displays.progressPercentage.textContent = '0%';
    
    // Update score display
    displays.scoreDisplay.textContent = quizState.score;
    
    // Set up timer display
    displays.timer.textContent = `${quizState.timer}s`;
    displays.timer.style.color = 'var(--dark)';
    
    // Reset navigation buttons
    buttons.prev.disabled = true;
    buttons.next.disabled = false;
    buttons.submit.style.display = 'none';
    buttons.hint.style.display = 'block';
    buttons.skip.style.display = 'block';
    
    // Update question counter
    updateQuestionCounter();
}

// Display current question
function displayQuestion() {
    console.log(`Displaying question ${quizState.currentQuestionIndex + 1}`);
    
    const question = quizState.questions[quizState.currentQuestionIndex];
    
    // Update question text
    displays.questionText.innerHTML = question.question;
    displays.currentQuestion.textContent = quizState.currentQuestionIndex + 1;
    
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
    displays.progressPercentage.textContent = `${Math.round(progressPercentage)}%`;
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
    
    // Enable next button
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
    const hasAnswer = quizState.userAnswers[quizState.currentQuestionIndex] !== null;
    
    buttons.next.disabled = !hasAnswer;
    buttons.submit.style.display = isLastQuestion && hasAnswer ? 'block' : 'none';
    
    // Hint and skip buttons
    buttons.hint.disabled = false;
    buttons.skip.disabled = isLastQuestion;
}

// Show hint
function showHint() {
    const question = quizState.questions[quizState.currentQuestionIndex];
    showMessage('Hint', question.explanation, 'info');
    quizState.hintsUsed++;
    buttons.hint.disabled = true;
}

// Skip question
function skipQuestion() {
    quizState.questionsSkipped++;
    showNextQuestion();
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
        if (quizState.userAnswers[quizState.currentQuestionIndex] !== null) {
            submitQuiz();
        }
    }
}

// Start the quiz timer
function startTimer() {
    if (quizState.timerInterval) {
        clearInterval(quizState.timerInterval);
    }
    
    quizState.timer = 60;
    displays.timer.textContent = `${quizState.timer}s`;
    
    quizState.timerInterval = setInterval(() => {
        quizState.timer--;
        displays.timer.textContent = `${quizState.timer}s`;
        
        if (quizState.timer <= 10) {
            displays.timer.style.color = 'var(--danger)';
        }
        
        if (quizState.timer <= 0) {
            clearInterval(quizState.timerInterval);
            showMessage('Time\'s Up!', 'The quiz timer has expired. Your answers will be submitted.', 'warning');
            setTimeout(submitQuiz, 2000);
        }
    }, 1000);
}

// Submit the quiz
function submitQuiz() {
    console.log("Submitting quiz...");
    
    clearInterval(quizState.timerInterval);
    
    // Calculate score
    calculateScore();
    
    // Save highscore if logged in
    if (quizState.isLoggedIn) {
        saveHighscore();
    }
    
    // Show results screen
    showResults();
}

// Calculate final score
function calculateScore() {
    let correctCount = 0;
    
    quizState.questions.forEach((question, index) => {
        if (quizState.userAnswers[index] === question.correctAnswer) {
            correctCount++;
        }
    });
    
    const baseScore = correctCount * 10;
    const timeBonus = Math.floor(quizState.timer * 0.5);
    const hintPenalty = quizState.hintsUsed * 5;
    const skipPenalty = quizState.questionsSkipped * 3;
    
    quizState.score = baseScore + timeBonus - hintPenalty - skipPenalty;
    
    // Ensure score doesn't go below 0
    quizState.score = Math.max(0, quizState.score);
    
    console.log(`Score: ${quizState.score} (${baseScore} base + ${timeBonus} time - ${hintPenalty} hints - ${skipPenalty} skips)`);
    
    return { correctCount, total: quizState.questions.length };
}

// Show results screen
function showResults() {
    const { correctCount, total } = calculateScore();
    
    // Update results displays
    displays.finalScore.textContent = quizState.score;
    displays.correctAnswers.textContent = `${correctCount}/${total}`;
    displays.timeUsed.textContent = `${60 - quizState.timer}s`;
    
    // Set performance rating
    const percentage = (correctCount / total) * 100;
    let performance = "";
    let message = "";
    
    if (percentage >= 90) {
        performance = "Expert";
        message = "Outstanding! You're a coding expert! 🎉";
    } else if (percentage >= 70) {
        performance = "Advanced";
        message = "Great job! You have strong coding knowledge! 👍";
    } else if (percentage >= 50) {
        performance = "Intermediate";
        message = "Good effort! Keep practicing to improve! 💪";
    } else {
        performance = "Beginner";
        message = "Keep learning! Every expert was once a beginner. 📚";
    }
    
    // Add login reminder if not logged in
    if (!quizState.isLoggedIn) {
        message += "\n\nCreate an account to save your scores and track your progress!";
    }
    
    displays.performance.textContent = performance;
    displays.resultsMessage.textContent = message;
    
    // Animate the score circle
    const circle = document.querySelector('.score-circle-progress');
    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (percentage / 100) * circumference;
    
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
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
    
    highscores.push(highscore);
    highscores.sort((a, b) => b.score - a.score);
    
    if (highscores.length > 10) {
        highscores = highscores.slice(0, 10);
    }
    
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
}

// Start a new quiz
function newQuiz() {
    console.log("Starting new quiz...");
    switchScreen('welcome');
}

// Utility functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function getLanguageIcon(language) {
    switch (language) {
        case 'html': return '<i class="fab fa-html5"></i>';
        case 'css': return '<i class="fab fa-css3-alt"></i>';
        case 'js': return '<i class="fab fa-js-square"></i>';
        default: return '<i class="fas fa-code"></i>';
    }
}

function getLanguageGradient(language) {
    switch (language) {
        case 'html': return 'linear-gradient(135deg, var(--html-color), #FF6B35)';
        case 'css': return 'linear-gradient(135deg, var(--css-color), #2965F1)';
        case 'js': return 'linear-gradient(135deg, var(--js-color), #F0DB4F)';
        default: return 'var(--gradient-primary)';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
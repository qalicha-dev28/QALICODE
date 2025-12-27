// Enhanced Neomorphic QALICODE Quiz Application

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const buttons = {
    startQuiz: document.getElementById('start-quiz-btn'),
    quickStart: document.getElementById('quick-start-btn'),
    login: document.getElementById('login-btn'),
    demo: document.getElementById('demo-btn'),
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    submit: document.getElementById('submit-btn'),
    retake: document.getElementById('retake-btn'),
    newQuiz: document.getElementById('new-quiz-btn'),
    share: document.getElementById('share-btn'),
    signup: document.getElementById('signup-btn'),
    logout: document.getElementById('logout-btn'),
    hint: document.getElementById('hint-btn'),
    skip: document.getElementById('skip-btn'),
    flag: document.getElementById('flag-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    messageOk: document.getElementById('message-ok-btn'),
    messageCancel: document.getElementById('message-cancel-btn'),
    confirmYes: document.getElementById('confirm-yes-btn'),
    confirmNo: document.getElementById('confirm-no-btn'),
    clearHighscores: document.getElementById('clear-highscores-btn'),
    viewAnalysis: document.getElementById('view-analysis-btn'),
    saveResults: document.getElementById('save-results-btn'),
    exportHighscores: document.getElementById('export-highscores'),
    pauseQuiz: document.getElementById('pause-quiz'),
    quizHelp: document.getElementById('quiz-help'),
    review: document.getElementById('review-btn'),
    learnMore: document.getElementById('learn-more-btn')
};

const inputs = {
    username: document.getElementById('username-input'),
    password: document.getElementById('password-input'),
    modalUsername: document.getElementById('modal-username'),
    modalPassword: document.getElementById('modal-password'),
    fullname: document.getElementById('fullname'),
    email: document.getElementById('email'),
    loginUsername: document.getElementById('login-username'),
    loginPassword: document.getElementById('login-password')
};

const displays = {
    username: document.getElementById('username-display'),
    userStatus: document.getElementById('user-status'),
    questionCounter: document.getElementById('question-counter'),
    scoreDisplay: document.getElementById('score-display'),
    timer: document.getElementById('timer'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    quizTopicBadge: document.getElementById('quiz-topic-badge'),
    progressFill: document.getElementById('progress-fill'),
    currentQuestion: document.getElementById('current-question'),
    finalScore: document.getElementById('final-score'),
    correctAnswers: document.getElementById('correct-answers'),
    timeUsed: document.getElementById('time-used'),
    performance: document.getElementById('performance'),
    quizLanguage: document.getElementById('quiz-language'),
    scoreRank: document.getElementById('score-rank'),
    resultsSubtitle: document.getElementById('results-subtitle'),
    highscoresTable: document.getElementById('highscores-table'),
    highscoreCount: document.getElementById('highscore-count'),
    totalUsers: document.getElementById('total-users'),
    totalQuizzes: document.getElementById('total-quizzes'),
    footerUserCount: document.getElementById('footer-user-count'),
    footerQuizCount: document.getElementById('footer-quiz-count')
};

const modals = {
    signup: document.getElementById('signup-modal'),
    login: document.getElementById('login-modal'),
    message: document.getElementById('message-modal'),
    confirm: document.getElementById('confirm-modal')
};

const messageElements = {
    title: document.getElementById('message-title'),
    icon: document.getElementById('message-icon'),
    text: document.getElementById('message-text')
};

const confirmElements = {
    title: document.getElementById('confirm-title'),
    icon: document.getElementById('confirm-icon'),
    text: document.getElementById('confirm-text')
};

const languageCards = document.querySelectorAll('.language-card');
const languageSelectBtns = document.querySelectorAll('.language-select-btn');

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
    questionsSkipped: 0,
    flaggedQuestions: new Set(),
    isPaused: false,
    quizStartTime: null,
    currentTheme: 'dark'
};

// User System
const users = JSON.parse(localStorage.getItem('qalicode-users')) || [
    { username: 'demo', password: 'demo123', fullname: 'Demo User', email: 'demo@qalicode.com' }
];

// Enhanced Questions Database
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
            explanation: "HTML stands for Hyper Text Markup Language, the standard markup language for creating web pages and web applications.",
            difficulty: "beginner",
            category: "basics",
            points: 10
        },
        {
            question: "Which HTML5 element represents the main content of a document?",
            options: ["&lt;main&gt;", "&lt;content&gt;", "&lt;body&gt;", "&lt;article&gt;"],
            correctAnswer: 0,
            explanation: "The &lt;main&gt; element represents the dominant content of the &lt;body&gt; of a document.",
            difficulty: "beginner",
            category: "semantics",
            points: 10
        },
        {
            question: "What is the correct HTML for inserting an image?",
            options: [
                '&lt;img href="image.jpg" alt="My Image"&gt;',
                '&lt;image src="image.jpg" alt="My Image"&gt;',
                '&lt;img src="image.jpg" alt="My Image"&gt;',
                '&lt;picture src="image.jpg" alt="My Image"&gt;'
            ],
            correctAnswer: 2,
            explanation: "The &lt;img&gt; tag uses the 'src' attribute to specify the image source and 'alt' for alternative text.",
            difficulty: "beginner",
            category: "multimedia",
            points: 10
        },
        {
            question: "Which attribute is used to provide a unique name for an HTML element?",
            options: ["class", "id", "type", "name"],
            correctAnswer: 1,
            explanation: "The 'id' attribute provides a unique identifier for an HTML element, while 'class' can be used for multiple elements.",
            difficulty: "intermediate",
            category: "attributes",
            points: 15
        },
        {
            question: "What is the purpose of the &lt;meta charset='UTF-8'&gt; tag?",
            options: [
                "To define the document's character encoding",
                "To set the page description",
                "To specify the viewport settings",
                "To link external CSS files"
            ],
            correctAnswer: 0,
            explanation: "It specifies the character encoding for the HTML document. UTF-8 supports all Unicode characters.",
            difficulty: "intermediate",
            category: "metadata",
            points: 15
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
            explanation: "CSS stands for Cascading Style Sheets, used to describe the presentation of a document written in HTML.",
            difficulty: "beginner",
            category: "basics",
            points: 10
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["font-style", "text-size", "font-size", "text-style"],
            correctAnswer: 2,
            explanation: "The 'font-size' property controls the size of text in CSS. It can be set using various units like px, em, rem, or percentages.",
            difficulty: "beginner",
            category: "typography",
            points: 10
        },
        {
            question: "How do you make a list not display bullet points?",
            options: [
                "list-style-type: none",
                "list: none",
                "bullet-points: none",
                "list-type: no-bullet"
            ],
            correctAnswer: 0,
            explanation: "The 'list-style-type: none' property removes bullet points from lists.",
            difficulty: "beginner",
            category: "lists",
            points: 10
        },
        {
            question: "What is the CSS Box Model composed of?",
            options: [
                "Margin, Border, Padding, Content",
                "Header, Body, Footer, Content",
                "Top, Right, Bottom, Left",
                "Width, Height, Depth, Volume"
            ],
            correctAnswer: 0,
            explanation: "The CSS Box Model consists of margin (outermost), border, padding, and content (innermost).",
            difficulty: "intermediate",
            category: "layout",
            points: 15
        },
        {
            question: "Which CSS property is used to create rounded corners?",
            options: ["border-round", "corner-radius", "border-radius", "round-corner"],
            correctAnswer: 2,
            explanation: "The 'border-radius' property is used to create rounded corners. You can specify one value for all corners or different values for each corner.",
            difficulty: "intermediate",
            category: "effects",
            points: 15
        }
    ],
    js: [
        {
            question: "Which of the following is a JavaScript data type?",
            options: ["Number", "Array", "Boolean", "All of the above"],
            correctAnswer: 3,
            explanation: "JavaScript has several data types including Number, String, Boolean, Object, Array, Function, Undefined, and Null.",
            difficulty: "beginner",
            category: "basics",
            points: 10
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
            explanation: "The alert() function displays an alert box with a specified message and an OK button.",
            difficulty: "beginner",
            category: "functions",
            points: 10
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
            difficulty: "beginner",
            category: "functions",
            points: 10
        },
        {
            question: "What will 'console.log(typeof null)' output?",
            options: ["null", "undefined", "object", "string"],
            correctAnswer: 2,
            explanation: "In JavaScript, typeof null returns 'object'. This is considered a historical bug in the language that cannot be fixed without breaking existing code.",
            difficulty: "advanced",
            category: "types",
            points: 20
        },
        {
            question: "Which method adds new elements to the end of an array?",
            options: ["push()", "append()", "addToEnd()", "insert()"],
            correctAnswer: 0,
            explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
            difficulty: "intermediate",
            category: "arrays",
            points: 15
        }
    ]
};

// Highscores System
let highscores = JSON.parse(localStorage.getItem('qalicode-highscores')) || [];

// Leaderboard Data
let leaderboard = JSON.parse(localStorage.getItem('qalicode-leaderboard')) || [];

// Initialize App
function initApp() {
    console.log("🚀 Initializing Enhanced QALICODE Quiz App...");
    
    // Create particle background
    createParticles();
    
    // Setup theme
    setupTheme();
    
    // Check for saved user session
    const savedUser = localStorage.getItem('qalicode-current-user');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            quizState.username = user.username;
            quizState.isLoggedIn = true;
            updateUserDisplay();
        } catch (e) {
            console.error("Error parsing saved user:", e);
        }
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize language selection
    initLanguageSelection();
    
    // Update statistics
    updateStatistics();
    
    // Load highscores
    loadHighscores();
    
    // Load leaderboard
    loadLeaderboard();
    
    // Show welcome screen
    switchScreen('welcome');
}

// Setup theme
function setupTheme() {
    const savedTheme = localStorage.getItem('qalicode-theme') || 'dark';
    quizState.currentTheme = savedTheme;
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        buttons.themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    } else {
        document.body.classList.remove('light-mode');
        buttons.themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    }
}

// Toggle theme
function toggleTheme() {
    if (quizState.currentTheme === 'dark') {
        quizState.currentTheme = 'light';
        document.body.classList.add('light-mode');
        localStorage.setItem('qalicode-theme', 'light');
        buttons.themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    } else {
        quizState.currentTheme = 'dark';
        document.body.classList.remove('light-mode');
        localStorage.setItem('qalicode-theme', 'dark');
        buttons.themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    }
}

// Create particle background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 10;
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.2 + 0.05};
            animation: floatParticle ${duration}s infinite linear ${delay}s;
            filter: blur(${Math.random() * 2}px);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(90deg) scale(${Math.random() * 0.5 + 0.75});
            }
            50% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(180deg) scale(${Math.random() * 0.5 + 0.75});
            }
            75% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(270deg) scale(${Math.random() * 0.5 + 0.75});
            }
        }
    `;
    document.head.appendChild(style);
}

// Setup event listeners
function setupEventListeners() {
    console.log("🔧 Setting up event listeners...");
    
    // Theme toggle
    buttons.themeToggle.addEventListener('click', toggleTheme);
    
    // Quiz buttons
    buttons.startQuiz.addEventListener('click', startQuiz);
    buttons.quickStart.addEventListener('click', quickStart);
    buttons.login.addEventListener('click', openLoginModal);
    buttons.demo.addEventListener('click', tryDemo);
    buttons.learnMore.addEventListener('click', showLearnMore);
    buttons.prev.addEventListener('click', showPreviousQuestion);
    buttons.next.addEventListener('click', showNextQuestion);
    buttons.submit.addEventListener('click', submitQuiz);
    
    // Results buttons
    buttons.retake.addEventListener('click', retakeQuiz);
    buttons.newQuiz.addEventListener('click', newQuiz);
    buttons.share.addEventListener('click', shareScore);
    buttons.viewAnalysis.addEventListener('click', showAnalysis);
    buttons.saveResults.addEventListener('click', saveResults);
    buttons.exportHighscores.addEventListener('click', exportHighscores);
    
    // Auth buttons
    buttons.signup.addEventListener('click', openSignupModal);
    buttons.logout.addEventListener('click', () => showConfirmModal(
        'Logout',
        'Are you sure you want to logout?',
        logoutUser
    ));
    
    // Quiz control buttons
    buttons.hint.addEventListener('click', showHint);
    buttons.skip.addEventListener('click', skipQuestion);
    buttons.flag.addEventListener('click', toggleFlag);
    buttons.pauseQuiz.addEventListener('click', togglePause);
    buttons.quizHelp.addEventListener('click', showQuizHelp);
    buttons.review.addEventListener('click', showReview);
    
    // Modal events
    document.querySelectorAll('.close-modal-neo').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    document.getElementById('signup-form').addEventListener('submit', handleSignupSubmit);
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
    
    // Modal navigation
    document.getElementById('switch-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signup');
        openLoginModal();
    });
    
    document.getElementById('switch-to-signup').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('login');
        openSignupModal();
    });
    
    // Message modal buttons
    buttons.messageOk.addEventListener('click', () => closeModal('message'));
    buttons.messageCancel.addEventListener('click', () => closeModal('message'));
    
    // Confirm modal buttons
    buttons.confirmYes.addEventListener('click', handleConfirmYes);
    buttons.confirmNo.addEventListener('click', () => closeModal('confirm'));
    
    // Highscores actions
    buttons.clearHighscores.addEventListener('click', () => showConfirmModal(
        'Clear All Highscores',
        'Are you sure you want to clear ALL highscores? This action cannot be undone.',
        clearHighscores
    ));
    
    // Enter key for username
    inputs.username.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startQuiz();
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-neo')) {
            closeAllModals();
        }
    });
}

// Initialize language selection
function initLanguageSelection() {
    languageCards.forEach(card => {
        card.addEventListener('click', () => {
            selectLanguage(card.dataset.language);
        });
    });
    
    languageSelectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectLanguage(btn.dataset.language);
            startQuiz();
        });
    });
}

// Select language
function selectLanguage(language) {
    // Remove active class from all cards
    languageCards.forEach(c => c.classList.remove('active'));
    
    // Add active class to selected card
    const selectedCard = document.querySelector(`[data-language="${language}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // Update selected language
    quizState.selectedLanguage = language;
    
    console.log(`📚 Language selected: ${language}`);
    
    // Animate selection
    if (selectedCard) {
        selectedCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            selectedCard.style.transform = 'scale(1)';
        }, 150);
    }
}

// Update user display
function updateUserDisplay() {
    displays.username.textContent = quizState.username;
    
    if (quizState.isLoggedIn) {
        displays.userStatus.textContent = 'Logged In';
        displays.userStatus.style.color = 'var(--accent-success)';
        buttons.logout.style.display = 'flex';
        buttons.signup.style.display = 'none';
    } else {
        displays.userStatus.textContent = 'Guest Mode';
        displays.userStatus.style.color = 'var(--accent-warning)';
        buttons.logout.style.display = 'none';
        buttons.signup.style.display = 'flex';
    }
}

// Update statistics
function updateStatistics() {
    // Update total users count
    const totalUsers = users.length + Math.floor(Math.random() * 1000) + 1000;
    displays.totalUsers.textContent = `${totalUsers.toLocaleString()}+`;
    displays.footerUserCount.textContent = `${totalUsers.toLocaleString()}+`;
    
    // Update total quizzes count
    const totalQuizzes = highscores.length + Math.floor(Math.random() * 500) + 2000;
    displays.totalQuizzes.textContent = `${totalQuizzes.toLocaleString()}+`;
    displays.footerQuizCount.textContent = `${totalQuizzes.toLocaleString()}+`;
}

// Load highscores
function loadHighscores() {
    highscores = JSON.parse(localStorage.getItem('qalicode-highscores')) || [];
    updateHighscoresDisplay();
}

// Load leaderboard
function loadLeaderboard() {
    leaderboard = JSON.parse(localStorage.getItem('qalicode-leaderboard')) || [];
    updateLeaderboardPreview();
}

// Update leaderboard preview
function updateLeaderboardPreview() {
    const leaderboardList = document.querySelector('.leaderboard-list');
    
    if (leaderboard.length === 0) {
        // Generate sample leaderboard if empty
        const sampleUsers = [
            { username: 'CodeMaster', score: 980, language: 'all' },
            { username: 'WebWizard', score: 950, language: 'js' },
            { username: 'StyleGuru', score: 920, language: 'css' },
            { username: 'HTMLHero', score: 890, language: 'html' },
            { username: 'DevPro', score: 850, language: 'all' }
        ];
        
        leaderboardList.innerHTML = sampleUsers.map((user, index) => `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">${index + 1}</div>
                <div class="leaderboard-user">
                    <div class="leaderboard-username">${user.username}</div>
                    <div class="leaderboard-language">${user.language.toUpperCase()}</div>
                </div>
                <div class="leaderboard-score">${user.score} pts</div>
            </div>
        `).join('');
    } else {
        // Display actual leaderboard
        const topScores = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
        
        leaderboardList.innerHTML = topScores.map((score, index) => `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">${index + 1}</div>
                <div class="leaderboard-user">
                    <div class="leaderboard-username">${score.username}</div>
                    <div class="leaderboard-language">${score.language.toUpperCase()}</div>
                </div>
                <div class="leaderboard-score">${score.score} pts</div>
            </div>
        `).join('');
    }
}

// Update highscores display
function updateHighscoresDisplay() {
    const tableBody = displays.highscoresTable;
    tableBody.innerHTML = '';
    
    if (highscores.length === 0) {
        tableBody.innerHTML = `
            <div class="no-highscores-message">
                <i class="fas fa-trophy" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 25px;"></i>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">No highscores yet. Complete a quiz to see your scores here!</p>
                <button id="start-from-highscores" class="btn-neo-primary btn-medium" style="margin-top: 20px;">
                    <i class="fas fa-play"></i> Start Your First Quiz
                </button>
            </div>
        `;
        
        // Add event listener to the new button
        document.getElementById('start-from-highscores')?.addEventListener('click', () => {
            switchScreen('welcome');
        });
        
        displays.highscoreCount.textContent = '0';
        return;
    }
    
    // Sort by score (descending)
    const sortedHighscores = [...highscores].sort((a, b) => b.score - a.score);
    
    // Display top 20
    sortedHighscores.slice(0, 20).forEach((highscore, index) => {
        const row = document.createElement('div');
        row.className = `highscore-row ${highscore.username === quizState.username ? 'current-user' : ''}`;
        
        // Determine rank badge
        let rankClass = 'normal';
        let rankText = index + 1;
        if (index === 0) rankClass = 'gold';
        else if (index === 1) rankClass = 'silver';
        else if (index === 2) rankClass = 'bronze';
        
        // Determine language badge
        const languageName = highscore.language === 'html' ? 'HTML' : 
                            highscore.language === 'css' ? 'CSS' : 
                            highscore.language === 'js' ? 'JavaScript' : 'Mixed';
        
        const languageClass = highscore.language === 'html' ? 'html' :
                             highscore.language === 'css' ? 'css' :
                             highscore.language === 'js' ? 'js' : 'mixed';
        
        row.innerHTML = `
            <div class="rank-badge ${rankClass}">${rankText}</div>
            <div class="language-badge ${languageClass}">
                <i class="fab fa-${highscore.language === 'html' ? 'html5' : highscore.language === 'css' ? 'css3-alt' : highscore.language === 'js' ? 'js' : 'random'}"></i>
                ${languageName}
            </div>
            <div class="username-cell">${highscore.username}</div>
            <div class="score-value-cell">${highscore.score}</div>
            <div class="date-cell">${highscore.date}</div>
            <div class="action-buttons">
                <button class="btn-neo-small delete-highscore" data-id="${highscore.timestamp}" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
                ${highscore.username === quizState.username ? `
                    <button class="btn-neo-small share-highscore" data-id="${highscore.timestamp}" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                ` : ''}
            </div>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners for action buttons
    tableBody.querySelectorAll('.delete-highscore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const timestamp = parseInt(btn.dataset.id);
            showConfirmModal(
                'Delete Highscore',
                'Are you sure you want to delete this highscore?',
                () => deleteHighscore(timestamp)
            );
        });
    });
    
    tableBody.querySelectorAll('.share-highscore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const timestamp = parseInt(btn.dataset.id);
            shareHighscore(timestamp);
        });
    });
    
    // Update count
    displays.highscoreCount.textContent = highscores.length.toLocaleString();
}

// Delete a highscore
function deleteHighscore(timestamp) {
    highscores = highscores.filter(hs => hs.timestamp !== timestamp);
    localStorage.setItem('qalicode-highscores', JSON.stringify(highscores));
    updateHighscoresDisplay();
    showMessage('Success', 'Highscore deleted successfully!', 'success');
}

// Clear all highscores
function clearHighscores() {
    highscores = [];
    localStorage.setItem('qalicode-highscores', JSON.stringify(highscores));
    updateHighscoresDisplay();
    showMessage('Cleared', 'All highscores have been cleared.', 'info');
}

// Share a highscore
function shareHighscore(timestamp) {
    const highscore = highscores.find(hs => hs.timestamp === timestamp);
    if (!highscore) return;
    
    const shareText = `I scored ${highscore.score} points in ${highscore.language.toUpperCase()} quiz on QALICODE! 🚀 Try to beat my score!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My QALICODE Score',
            text: shareText,
            url: window.location.href
        }).catch(() => {
            // Fallback to clipboard
            copyToClipboard(shareText, 'Score copied to clipboard!');
        });
    } else {
        copyToClipboard(shareText, 'Score copied to clipboard! Share it with your friends!');
    }
}

// Export highscores
function exportHighscores() {
    if (highscores.length === 0) {
        showMessage('No Data', 'There are no highscores to export.', 'info');
        return;
    }
    
    const csvContent = highscores.map(hs => 
        `${hs.username},${hs.score},${hs.language},${hs.date}`
    ).join('\n');
    
    const blob = new Blob([`Username,Score,Language,Date\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qalicode-highscores.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Exported', 'Highscores have been exported as CSV file.', 'success');
}

// Copy to clipboard
function copyToClipboard(text, successMessage) {
    navigator.clipboard.writeText(text)
        .then(() => showMessage('Copied!', successMessage, 'success'))
        .catch(() => showMessage('Error', 'Could not copy to clipboard.', 'error'));
}

// Modal functions
function showMessage(title, text, type = 'info') {
    messageElements.title.textContent = title;
    messageElements.text.textContent = text;
    
    // Set icon based on type
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const colorMap = {
        success: 'var(--accent-success)',
        error: 'var(--accent-secondary)',
        warning: 'var(--accent-warning)',
        info: 'var(--accent-primary)'
    };
    
    messageElements.icon.innerHTML = `<i class="${iconMap[type] || iconMap.info}"></i>`;
    messageElements.icon.style.color = colorMap[type] || colorMap.info;
    
    // Show/hide cancel button
    buttons.messageCancel.style.display = type === 'warning' ? 'inline-flex' : 'none';
    
    openModal('message');
}

function showConfirmModal(title, text, onConfirm) {
    confirmElements.title.textContent = title;
    confirmElements.text.textContent = text;
    confirmElements.icon.innerHTML = '<i class="fas fa-question-circle"></i>';
    confirmElements.icon.style.color = 'var(--accent-warning)';
    
    // Store the confirmation callback
    window.confirmCallback = onConfirm;
    
    openModal('confirm');
}

function handleConfirmYes() {
    if (window.confirmCallback) {
        window.confirmCallback();
        window.confirmCallback = null;
    }
    closeModal('confirm');
}

function openModal(modalName) {
    modals[modalName].style.display = 'flex';
}

function closeModal(modalName) {
    modals[modalName].style.display = 'none';
}

function closeAllModals() {
    Object.values(modals).forEach(modal => modal.style.display = 'none');
}

// Auth functions
function openSignupModal() {
    openModal('signup');
    document.getElementById('signup-form').reset();
}

function openLoginModal() {
    openModal('login');
    document.getElementById('login-form').reset();
}

function handleSignupSubmit(e) {
    e.preventDefault();
    
    const fullname = inputs.fullname.value.trim();
    const email = inputs.email.value.trim();
    const username = inputs.modalUsername.value.trim();
    const password = inputs.modalPassword.value.trim();
    
    // Validation
    if (username.length < 3) {
        showMessage('Invalid Username', 'Username must be at least 3 characters long.', 'error');
        return;
    }
    
    if (users.find(u => u.username === username)) {
        showMessage('Username Taken', 'This username is already taken. Please choose another.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Weak Password', 'Password must be at least 6 characters long.', 'error');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Create user
    const newUser = {
        username,
        password,
        fullname,
        email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('qalicode-users', JSON.stringify(users));
    
    // Auto-login
    loginUser(username, password);
    
    showMessage('Welcome!', `Account created successfully! Welcome to QALICODE, ${fullname || username}!`, 'success');
    closeModal('signup');
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const username = inputs.loginUsername.value.trim();
    const password = inputs.loginPassword.value.trim();
    
    if (loginUser(username, password)) {
        closeModal('login');
    } else {
        showMessage('Login Failed', 'Invalid username or password. Please try again.', 'error');
    }
}

function loginUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        quizState.username = username;
        quizState.isLoggedIn = true;
        
        // Update user's last login
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('qalicode-users', JSON.stringify(users));
        
        // Save session
        localStorage.setItem('qalicode-current-user', JSON.stringify({
            username: user.username,
            fullname: user.fullname,
            email: user.email
        }));
        
        updateUserDisplay();
        inputs.username.value = username;
        
        showMessage('Welcome Back!', `Great to see you again, ${user.fullname || username}!`, 'success');
        return true;
    }
    
    return false;
}

function logoutUser() {
    quizState.username = 'Guest';
    quizState.isLoggedIn = false;
    
    localStorage.removeItem('qalicode-current-user');
    updateUserDisplay();
    inputs.username.value = '';
    
    showMessage('Logged Out', 'You have been successfully logged out.', 'info');
    
    // Redirect to home screen
    setTimeout(() => {
        switchScreen('welcome');
    }, 1000);
}

// Quick start function
function quickStart() {
    inputs.username.value = 'QuickPlayer' + Math.floor(Math.random() * 1000);
    selectLanguage('html');
    startQuiz();
}

// Try demo function
function tryDemo() {
    inputs.username.value = 'DemoUser';
    selectLanguage('all');
    startQuiz();
}

// Show learn more
function showLearnMore() {
    showMessage('About QALICODE', 
        'QALICODE is an interactive quiz platform designed to help you master web development through challenging quizzes. ' +
        'Features include:\n\n' +
        '• Three difficulty levels\n' +
        '• Detailed explanations for every answer\n' +
        '• Progress tracking\n' +
        '• Highscores and leaderboards\n' +
        '• Dark/Light mode\n\n' +
        'Start your learning journey today!', 
        'info'
    );
}

// Screen management
function switchScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    quizState.currentScreen = screenName;
    
    if (screenName === 'quiz') {
        setupQuiz();
    } else if (screenName === 'welcome') {
        updateStatistics();
        updateLeaderboardPreview();
    }
}

// Start quiz
function startQuiz() {
    const username = inputs.username.value.trim();
    const password = inputs.password.value.trim();
    
    // Username validation
    if (!username) {
        showMessage('Username Required', 'Please enter a username to start the quiz.', 'warning');
        return;
    }
    
    // Handle login if password provided
    if (password) {
        if (!loginUser(username, password)) {
            showMessage('Login Failed', 'Invalid credentials. Please try again or continue as guest.', 'error');
            return;
        }
    } else {
        // Guest mode
        quizState.username = username;
        quizState.isLoggedIn = false;
        updateUserDisplay();
    }
    
    // Get questions
    if (quizState.selectedLanguage === 'all') {
        quizState.questions = [
            ...questionsDatabase.html.slice(0, 4),
            ...questionsDatabase.css.slice(0, 3),
            ...questionsDatabase.js.slice(0, 3)
        ];
        quizState.questions = shuffleArray(quizState.questions);
    } else {
        quizState.questions = [...questionsDatabase[quizState.selectedLanguage]];
    }
    
    // Reset state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.userAnswers = new Array(quizState.questions.length).fill(null);
    quizState.quizStarted = true;
    quizState.hintsUsed = 0;
    quizState.questionsSkipped = 0;
    quizState.flaggedQuestions.clear();
    quizState.isPaused = false;
    quizState.quizStartTime = Date.now();
    
    // Update UI
    updateQuizHeader();
    switchScreen('quiz');
    startTimer();
    displayQuestion();
}

// Setup quiz screen
function setupQuiz() {
    displays.progressFill.style.width = '0%';
    displays.scoreDisplay.textContent = '0';
    displays.timer.textContent = '60s';
    displays.timer.style.color = 'var(--text-primary)';
    
    buttons.prev.disabled = true;
    buttons.next.disabled = false;
    buttons.submit.style.display = 'none';
    buttons.hint.style.display = 'flex';
    buttons.skip.style.display = 'flex';
    buttons.flag.style.display = 'flex';
    buttons.pauseQuiz.innerHTML = '<i class="fas fa-pause"></i> Pause';
    
    updateQuestionCounter();
    createProgressDots();
}

// Update quiz header
function updateQuizHeader() {
    const languageNames = {
        html: 'HTML',
        css: 'CSS',
        js: 'JavaScript',
        all: 'Full Stack'
    };
    
    const languageIcons = {
        html: 'fab fa-html5',
        css: 'fab fa-css3-alt',
        js: 'fab fa-js',
        all: 'fas fa-random'
    };
    
    const languageColors = {
        html: 'var(--html-color)',
        css: 'var(--css-color)',
        js: 'var(--js-color)',
        all: 'var(--mixed-color)'
    };
    
    displays.quizTopicBadge.innerHTML = `
        <i class="${languageIcons[quizState.selectedLanguage]}"></i>
        <span>${languageNames[quizState.selectedLanguage]} Quiz</span>
    `;
    
    displays.quizTopicBadge.style.color = languageColors[quizState.selectedLanguage];
}

// Create progress dots
function createProgressDots() {
    const dotsContainer = document.querySelector('.progress-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < quizState.questions.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
}

// Update progress dots
function updateProgressDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === quizState.currentQuestionIndex);
    });
}

// Display question
function displayQuestion() {
    const question = quizState.questions[quizState.currentQuestionIndex];
    
    displays.questionText.innerHTML = question.question;
    displays.currentQuestion.textContent = quizState.currentQuestionIndex + 1;
    
    // Clear and create options
    displays.optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-neo';
        
        if (quizState.userAnswers[quizState.currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-prefix-neo">${String.fromCharCode(65 + index)}</div>
            <div class="option-text-neo">${option}</div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index));
        displays.optionsContainer.appendChild(optionElement);
    });
    
    updateNavigationButtons();
    updateProgress();
    updateProgressDots();
}

// Select option
function selectOption(index) {
    const options = document.querySelectorAll('.option-neo');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    
    quizState.userAnswers[quizState.currentQuestionIndex] = index;
    buttons.next.disabled = false;
}

// Update navigation
function updateNavigationButtons() {
    buttons.prev.disabled = quizState.currentQuestionIndex === 0;
    
    const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;
    const hasAnswer = quizState.userAnswers[quizState.currentQuestionIndex] !== null;
    
    buttons.next.disabled = !hasAnswer;
    buttons.submit.style.display = isLastQuestion && hasAnswer ? 'block' : 'none';
    
    buttons.hint.disabled = false;
    buttons.skip.disabled = isLastQuestion;
    
    // Update flag button
    const isFlagged = quizState.flaggedQuestions.has(quizState.currentQuestionIndex);
    buttons.flag.innerHTML = isFlagged ? 
        '<i class="fas fa-flag"></i> <span class="action-label">Unflag</span>' :
        '<i class="far fa-flag"></i> <span class="action-label">Flag</span>';
}

// Update progress
function updateProgress() {
    const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;
    displays.progressFill.style.width = `${progress}%`;
}

// Update question counter
function updateQuestionCounter() {
    displays.questionCounter.textContent = 
        `${quizState.currentQuestionIndex + 1}/${quizState.questions.length}`;
}

// Show hint
function showHint() {
    const question = quizState.questions[quizState.currentQuestionIndex];
    showMessage('Hint 💡', question.explanation, 'info');
    quizState.hintsUsed++;
    buttons.hint.disabled = true;
}

// Skip question
function skipQuestion() {
    quizState.questionsSkipped++;
    showNextQuestion();
}

// Toggle flag
function toggleFlag() {
    if (quizState.flaggedQuestions.has(quizState.currentQuestionIndex)) {
        quizState.flaggedQuestions.delete(quizState.currentQuestionIndex);
    } else {
        quizState.flaggedQuestions.add(quizState.currentQuestionIndex);
    }
    updateNavigationButtons();
}

// Toggle pause
function togglePause() {
    quizState.isPaused = !quizState.isPaused;
    
    if (quizState.isPaused) {
        clearInterval(quizState.timerInterval);
        buttons.pauseQuiz.innerHTML = '<i class="fas fa-play"></i> Resume';
        showMessage('Quiz Paused', 'The quiz has been paused. Click Resume to continue.', 'info');
    } else {
        startTimer();
        buttons.pauseQuiz.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
}

// Show quiz help
function showQuizHelp() {
    showMessage('Quiz Help', 
        'How to use the quiz:\n\n' +
        '• Read each question carefully\n' +
        '• Click on an option to select it\n' +
        '• Use the Hint button for explanations\n' +
        '• Flag questions for review later\n' +
        '• Skip questions if needed\n' +
        '• Manage your time wisely\n\n' +
        'Good luck! 🍀', 
        'info'
    );
}

// Show review
function showReview() {
    const flaggedCount = quizState.flaggedQuestions.size;
    const answeredCount = quizState.userAnswers.filter(a => a !== null).length;
    const totalQuestions = quizState.questions.length;
    
    let reviewText = `Quiz Progress:\n\n`;
    reviewText += `• Questions answered: ${answeredCount}/${totalQuestions}\n`;
    reviewText += `• Flagged questions: ${flaggedCount}\n`;
    reviewText += `• Time remaining: ${quizState.timer}s\n\n`;
    
    if (flaggedCount > 0) {
        reviewText += `Flagged questions: ${Array.from(quizState.flaggedQuestions).map(q => q + 1).join(', ')}`;
    } else {
        reviewText += `No questions flagged for review.`;
    }
    
    showMessage('Quiz Review', reviewText, 'info');
}

// Navigate questions
function showPreviousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayQuestion();
    }
}

function showNextQuestion() {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        quizState.currentQuestionIndex++;
        displayQuestion();
    } else if (quizState.userAnswers[quizState.currentQuestionIndex] !== null) {
        submitQuiz();
    }
}

// Timer
function startTimer() {
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    
    quizState.timer = 60;
    displays.timer.textContent = `${quizState.timer}s`;
    
    quizState.timerInterval = setInterval(() => {
        if (!quizState.isPaused) {
            quizState.timer--;
            displays.timer.textContent = `${quizState.timer}s`;
            
            if (quizState.timer <= 10) {
                displays.timer.style.color = 'var(--accent-secondary)';
            }
            
            if (quizState.timer <= 0) {
                clearInterval(quizState.timerInterval);
                showMessage('Time\'s Up!', 'The quiz timer has expired. Your answers will be submitted.', 'warning');
                setTimeout(submitQuiz, 2000);
            }
        }
    }, 1000);
}

// Submit quiz
function submitQuiz() {
    clearInterval(quizState.timerInterval);
    calculateScore();
    
    if (quizState.isLoggedIn) {
        saveHighscore();
        updateLeaderboard();
    }
    
    showResults();
}

// Calculate score
function calculateScore() {
    let correctCount = 0;
    let totalPoints = 0;
    
    quizState.questions.forEach((question, index) => {
        if (quizState.userAnswers[index] === question.correctAnswer) {
            correctCount++;
            totalPoints += question.points || 10;
        }
    });
    
    const timeBonus = Math.floor(quizState.timer * 0.5);
    const hintPenalty = quizState.hintsUsed * 5;
    const skipPenalty = quizState.questionsSkipped * 3;
    
    quizState.score = Math.max(0, totalPoints + timeBonus - hintPenalty - skipPenalty);
    
    console.log(`📊 Score: ${quizState.score} (${correctCount}/${quizState.questions.length} correct)`);
    
    return { correctCount, total: quizState.questions.length };
}

// Save highscore
function saveHighscore() {
    const highscore = {
        username: quizState.username,
        score: quizState.score,
        language: quizState.selectedLanguage,
        date: new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }),
        timestamp: Date.now()
    };
    
    highscores.push(highscore);
    highscores.sort((a, b) => b.score - a.score);
    
    if (highscores.length > 50) {
        highscores = highscores.slice(0, 50);
    }
    
    localStorage.setItem('qalicode-highscores', JSON.stringify(highscores));
    console.log('💾 Highscore saved:', highscore);
}

// Update leaderboard
function updateLeaderboard() {
    const leaderboardEntry = {
        username: quizState.username,
        score: quizState.score,
        language: quizState.selectedLanguage,
        date: new Date().toISOString()
    };
    
    leaderboard.push(leaderboardEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    
    if (leaderboard.length > 100) {
        leaderboard = leaderboard.slice(0, 100);
    }
    
    localStorage.setItem('qalicode-leaderboard', JSON.stringify(leaderboard));
}

// Show results
function showResults() {
    const { correctCount, total } = calculateScore();
    
    // Update displays
    displays.finalScore.textContent = quizState.score;
    displays.correctAnswers.textContent = `${correctCount}/${total}`;
    displays.timeUsed.textContent = `${60 - quizState.timer}s`;
    
    const languageName = quizState.selectedLanguage === 'html' ? 'HTML' :
                        quizState.selectedLanguage === 'css' ? 'CSS' :
                        quizState.selectedLanguage === 'js' ? 'JavaScript' : 'Full Stack';
    displays.quizLanguage.textContent = languageName;
    
    // Calculate performance
    const percentage = (correctCount / total) * 100;
    let performance = '';
    let rank = '';
    let subtitle = '';
    
    if (percentage >= 90) {
        performance = 'Expert';
        rank = 'Master Coder';
        subtitle = 'Absolutely phenomenal! 🎯';
    } else if (percentage >= 70) {
        performance = 'Advanced';
        rank = 'Code Ninja';
        subtitle = 'Impressive skills! ⚡';
    } else if (percentage >= 50) {
        performance = 'Intermediate';
        rank = 'Code Explorer';
        subtitle = 'Great progress! 🚀';
    } else {
        performance = 'Beginner';
        rank = 'Code Learner';
        subtitle = 'Keep practicing! 📚';
    }
    
    displays.performance.textContent = performance;
    displays.scoreRank.textContent = rank;
    displays.resultsSubtitle.textContent = subtitle;
    
    // Animate score circle
    const progressCircle = document.querySelector('.ring-progress');
    const circumference = 2 * Math.PI * 100;
    const offset = circumference - (percentage / 100) * circumference;
    
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
    }, 300);
    
    // Update highscores
    updateHighscoresDisplay();
    
    // Show results screen
    switchScreen('results');
}

// Show analysis
function showAnalysis() {
    const { correctCount, total } = calculateScore();
    const percentage = (correctCount / total) * 100;
    
    let analysisText = `Detailed Analysis:\n\n`;
    analysisText += `• Final Score: ${quizState.score} points\n`;
    analysisText += `• Correct Answers: ${correctCount}/${total} (${Math.round(percentage)}%)\n`;
    analysisText += `• Time Used: ${60 - quizState.timer}s\n`;
    analysisText += `• Hints Used: ${quizState.hintsUsed}\n`;
    analysisText += `• Questions Skipped: ${quizState.questionsSkipped}\n\n`;
    
    if (quizState.hintsUsed > 0) {
        analysisText += `Tip: Try using fewer hints next time to maximize your score!\n\n`;
    }
    
    if (percentage >= 80) {
        analysisText += `🎉 Excellent performance! You're mastering ${quizState.selectedLanguage.toUpperCase()}!`;
    } else if (percentage >= 60) {
        analysisText += `👍 Good job! With a bit more practice, you'll be an expert!`;
    } else {
        analysisText += `💪 Keep learning! Review the questions you missed and try again!`;
    }
    
    showMessage('Quiz Analysis', analysisText, 'info');
}

// Save results
function saveResults() {
    const results = {
        username: quizState.username,
        score: quizState.score,
        language: quizState.selectedLanguage,
        date: new Date().toISOString(),
        correctAnswers: displays.correctAnswers.textContent,
        timeUsed: displays.timeUsed.textContent,
        performance: displays.performance.textContent
    };
    
    const savedResults = JSON.parse(localStorage.getItem('qalicode-saved-results')) || [];
    savedResults.push(results);
    localStorage.setItem('qalicode-saved-results', JSON.stringify(savedResults));
    
    showMessage('Results Saved', 'Your quiz results have been saved successfully!', 'success');
}

// Share score
function shareScore() {
    const shareText = `I scored ${quizState.score} points in ${quizState.selectedLanguage.toUpperCase()} quiz on QALICODE! 🎯 My performance: ${displays.performance.textContent}. Try to beat my score!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Quiz Result',
            text: shareText,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(shareText, 'Score copied to clipboard! Share it with your friends!');
        });
    } else {
        copyToClipboard(shareText, 'Score copied to clipboard! Share it with your friends!');
    }
}

// Retake quiz
function retakeQuiz() {
    startQuiz();
}

// New quiz
function newQuiz() {
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

// Initialize app
document.addEventListener('DOMContentLoaded', initApp);
// QALICODE - Enhanced Quiz Application

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const buttons = {
    getStarted: document.getElementById('get-started-btn'),
    demoBtn: document.getElementById('demo-btn'),
    loginHeader: document.getElementById('login-btn-header'),
    logout: document.getElementById('logout-btn'),
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    submit: document.getElementById('submit-btn'),
    retake: document.getElementById('retake-btn'),
    newQuiz: document.getElementById('new-quiz-btn'),
    share: document.getElementById('share-btn'),
    viewAnalysis: document.getElementById('view-analysis-btn'),
    saveResults: document.getElementById('save-results-btn'),
    exportHighscores: document.getElementById('export-highscores'),
    pauseQuiz: document.getElementById('pause-quiz'),
    quizHelp: document.getElementById('quiz-help'),
    hint: document.getElementById('hint-btn'),
    flag: document.getElementById('flag-btn'),
    messageOk: document.getElementById('message-ok-btn'),
    confirmYes: document.getElementById('confirm-yes-btn'),
    confirmNo: document.getElementById('confirm-no-btn')
};

const inputs = {
    loginUsername: document.getElementById('login-username'),
    loginPassword: document.getElementById('login-password'),
    signupUsername: document.getElementById('signup-username'),
    signupEmail: document.getElementById('signup-email'),
    signupPassword: document.getElementById('signup-password'),
    confirmPassword: document.getElementById('confirm-password'),
    recoverEmail: document.getElementById('recover-email')
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
    scoreRank: document.getElementById('score-rank'),
    resultsSubtitle: document.getElementById('results-subtitle'),
    highscoresTable: document.getElementById('highscores-table'),
    highscoreCount: document.getElementById('highscore-count'),
    totalQuizzes: document.getElementById('total-quizzes'),
    footerQuizCount: document.getElementById('footer-quiz-count'),
    passwordStrengthBar: document.getElementById('password-strength-bar'),
    passwordStrengthText: document.getElementById('password-strength-text')
};

const modals = {
    auth: document.getElementById('auth-modal'),
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

// Quiz State
let quizState = {
    currentScreen: 'welcome',
    username: 'Guest',
    isLoggedIn: false,
    selectedLanguage: null,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: 60,
    timerInterval: null,
    userAnswers: [],
    quizStarted: false,
    hintsUsed: 0,
    flaggedQuestions: new Set(),
    isPaused: false,
    quizStartTime: null
};

// User System
let users = JSON.parse(localStorage.getItem('qalicode-users')) || [
    { username: 'demo', password: 'Demo@123', email: 'demo@qalicode.com', createdAt: new Date().toISOString() }
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
            points: 10
        },
        {
            question: "Which HTML5 element represents the main content of a document?",
            options: ["&lt;main&gt;", "&lt;content&gt;", "&lt;body&gt;", "&lt;article&gt;"],
            correctAnswer: 0,
            explanation: "The &lt;main&gt; element represents the dominant content of the &lt;body&gt; of a document.",
            difficulty: "beginner",
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
            points: 10
        },
        {
            question: "Which attribute is used to provide a unique name for an HTML element?",
            options: ["class", "id", "type", "name"],
            correctAnswer: 1,
            explanation: "The 'id' attribute provides a unique identifier for an HTML element, while 'class' can be used for multiple elements.",
            difficulty: "intermediate",
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
            points: 10
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["font-style", "text-size", "font-size", "text-style"],
            correctAnswer: 2,
            explanation: "The 'font-size' property controls the size of text in CSS. It can be set using various units like px, em, rem, or percentages.",
            difficulty: "beginner",
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
            points: 15
        },
        {
            question: "Which CSS property is used to create rounded corners?",
            options: ["border-round", "corner-radius", "border-radius", "round-corner"],
            correctAnswer: 2,
            explanation: "The 'border-radius' property is used to create rounded corners.",
            difficulty: "intermediate",
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
            points: 10
        },
        {
            question: "What will 'console.log(typeof null)' output?",
            options: ["null", "undefined", "object", "string"],
            correctAnswer: 2,
            explanation: "In JavaScript, typeof null returns 'object'. This is considered a historical bug in the language.",
            difficulty: "advanced",
            points: 20
        },
        {
            question: "Which method adds new elements to the end of an array?",
            options: ["push()", "append()", "addToEnd()", "insert()"],
            correctAnswer: 0,
            explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
            difficulty: "intermediate",
            points: 15
        }
    ]
};

// Highscores System
let highscores = JSON.parse(localStorage.getItem('qalicode-highscores')) || [];

// Initialize App
function initApp() {
    console.log("🚀 Initializing QALICODE Quiz App...");
    
    // Create particle background
    createParticles();
    
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
    
    // Update statistics
    updateStatistics();
    
    // Load highscores
    loadHighscores();
    
    // Show welcome screen
    switchScreen('welcome');
}

// Create particle background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.15 + 0.05};
            animation: floatParticle ${duration}s infinite linear ${delay}s;
            filter: blur(${Math.random()}px);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(90deg) scale(${Math.random() * 0.5 + 0.75});
            }
            50% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(180deg) scale(${Math.random() * 0.5 + 0.75});
            }
            75% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(270deg) scale(${Math.random() * 0.5 + 0.75});
            }
        }
    `;
    document.head.appendChild(style);
}

// Setup event listeners
function setupEventListeners() {
    console.log("🔧 Setting up event listeners...");
    
    // Navigation buttons
    buttons.getStarted.addEventListener('click', showAuthModal);
    buttons.demoBtn.addEventListener('click', tryDemo);
    buttons.loginHeader.addEventListener('click', showAuthModal);
    buttons.logout.addEventListener('click', logoutUser);
    
    // Quiz buttons
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
    
    // Quiz control buttons
    buttons.hint.addEventListener('click', showHint);
    buttons.flag.addEventListener('click', toggleFlag);
    buttons.pauseQuiz.addEventListener('click', togglePause);
    buttons.quizHelp.addEventListener('click', showQuizHelp);
    
    // Modal events
    document.querySelectorAll('.close-modal-neo').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Auth form submissions
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
    document.getElementById('signup-form').addEventListener('submit', handleSignupSubmit);
    document.getElementById('recover-form').addEventListener('submit', handleRecoverSubmit);
    
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchAuthTab(tabName);
        });
    });
    
    // Password strength checker
    inputs.signupPassword?.addEventListener('input', checkPasswordStrength);
    inputs.confirmPassword?.addEventListener('input', checkPasswordMatch);
    
    // Language selection
    document.querySelectorAll('.language-start-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const language = btn.dataset.language;
            selectLanguage(language);
        });
    });
    
    document.querySelectorAll('.language-card-simple').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.language-start-btn')) {
                const language = card.dataset.language;
                selectLanguage(language);
            }
        });
    });
    
    // Message modal buttons
    buttons.messageOk.addEventListener('click', () => closeModal('message'));
    
    // Confirm modal buttons
    buttons.confirmYes.addEventListener('click', handleConfirmYes);
    buttons.confirmNo.addEventListener('click', () => closeModal('confirm'));
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-neo')) {
            closeAllModals();
        }
    });
    
    // Enter key for login
    inputs.loginPassword?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('login-form').requestSubmit();
        }
    });
}

// Switch auth tab
function switchAuthTab(tabName) {
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.dataset.form === tabName);
    });
}

// Check password strength
function checkPasswordStrength() {
    const password = inputs.signupPassword.value;
    let strength = 0;
    
    // Check length
    if (password.length >= 8) strength += 20;
    
    // Check for uppercase
    if (/[A-Z]/.test(password)) strength += 20;
    
    // Check for lowercase
    if (/[a-z]/.test(password)) strength += 20;
    
    // Check for numbers
    if (/[0-9]/.test(password)) strength += 20;
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    // Update strength bar
    displays.passwordStrengthBar.style.width = `${strength}%`;
    
    // Update strength text and color
    let strengthText = '';
    let color = '';
    
    if (strength <= 40) {
        strengthText = 'Weak';
        color = '#FF6584';
    } else if (strength <= 80) {
        strengthText = 'Good';
        color = '#FFCC00';
    } else {
        strengthText = 'Strong';
        color = '#4CD964';
    }
    
    displays.passwordStrengthText.textContent = strengthText;
    displays.passwordStrengthBar.style.background = color;
    
    // Update requirement checks
    updatePasswordRequirements(password);
}

// Update password requirements
function updatePasswordRequirements(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    for (const [key, isValid] of Object.entries(requirements)) {
        const element = document.getElementById(`req-${key}`);
        if (element) {
            element.classList.toggle('valid', isValid);
        }
    }
}

// Check password match
function checkPasswordMatch() {
    const password = inputs.signupPassword.value;
    const confirm = inputs.confirmPassword.value;
    const feedback = document.getElementById('confirm-feedback');
    
    if (!confirm) {
        feedback.textContent = '';
        return;
    }
    
    if (password === confirm) {
        feedback.textContent = '✓ Passwords match';
        feedback.style.color = '#4CD964';
    } else {
        feedback.textContent = '✗ Passwords do not match';
        feedback.style.color = '#FF6584';
    }
}

// Update user display
function updateUserDisplay() {
    displays.username.textContent = quizState.username;
    
    if (quizState.isLoggedIn) {
        displays.userStatus.textContent = 'Logged In';
        displays.userStatus.style.color = '#4CD964';
        buttons.logout.style.display = 'flex';
        buttons.loginHeader.style.display = 'none';
    } else {
        displays.userStatus.textContent = 'Guest Mode';
        displays.userStatus.style.color = '#FFCC00';
        buttons.logout.style.display = 'none';
        buttons.loginHeader.style.display = 'flex';
    }
}

// Update statistics
function updateStatistics() {
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

// Update highscores display
function updateHighscoresDisplay() {
    const tableBody = displays.highscoresTable;
    tableBody.innerHTML = '';
    
    if (highscores.length === 0) {
        tableBody.innerHTML = `
            <div class="no-highscores-message">
                <i class="fas fa-trophy"></i>
                <p>No highscores yet. Complete a quiz to see your scores here!</p>
            </div>
        `;
        displays.highscoreCount.textContent = '0';
        return;
    }
    
    // Sort by score (descending)
    const sortedHighscores = [...highscores].sort((a, b) => b.score - a.score);
    
    // Display top 10
    sortedHighscores.slice(0, 10).forEach((highscore, index) => {
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
                <i class="fab fa-${highscore.language === 'html' ? 'html5' : highscore.language === 'css' ? 'css3-alt' : 'js'}"></i>
                ${languageName}
            </div>
            <div class="username-cell">${highscore.username}</div>
            <div class="score-value-cell">${highscore.score}</div>
            <div class="date-cell">${highscore.date}</div>
        `;
        
        tableBody.appendChild(row);
    });
    
    displays.highscoreCount.textContent = highscores.length.toLocaleString();
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

// Modal functions
function showMessage(title, text, type = 'info') {
    messageElements.title.textContent = title;
    messageElements.text.textContent = text;
    
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const colorMap = {
        success: '#4CD964',
        error: '#FF6584',
        warning: '#FFCC00',
        info: '#6C63FF'
    };
    
    messageElements.icon.innerHTML = `<i class="${iconMap[type] || iconMap.info}"></i>`;
    messageElements.icon.style.color = colorMap[type] || colorMap.info;
    
    openModal('message');
}

function showConfirmModal(title, text, onConfirm) {
    confirmElements.title.textContent = title;
    confirmElements.text.textContent = text;
    confirmElements.icon.innerHTML = '<i class="fas fa-question-circle"></i>';
    confirmElements.icon.style.color = '#FFCC00';
    
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
    document.body.style.overflow = 'hidden';
}

function closeModal(modalName) {
    modals[modalName].style.display = 'none';
    document.body.style.overflow = '';
}

function closeAllModals() {
    Object.values(modals).forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = '';
}

// Auth functions
function showAuthModal() {
    switchAuthTab('login');
    openModal('auth');
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const usernameOrEmail = inputs.loginUsername.value.trim();
    const password = inputs.loginPassword.value.trim();
    
    if (!usernameOrEmail || !password) {
        showMessage('Missing Information', 'Please enter both username/email and password.', 'error');
        return;
    }
    
    // Try to login
    if (loginUser(usernameOrEmail, password)) {
        closeModal('auth');
    } else {
        showMessage('Login Failed', 'Invalid username/email or password. Please try again.', 'error');
    }
}

function handleSignupSubmit(e) {
    e.preventDefault();
    
    const username = inputs.signupUsername.value.trim();
    const email = inputs.signupEmail.value.trim();
    const password = inputs.signupPassword.value.trim();
    const confirm = inputs.confirmPassword.value.trim();
    
    // Validation
    if (username.length < 3) {
        showMessage('Invalid Username', 'Username must be at least 3 characters long.', 'error');
        return;
    }
    
    if (users.find(u => u.username === username)) {
        showMessage('Username Taken', 'This username is already taken. Please choose another.', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showMessage('Email Taken', 'This email is already registered. Please use another email or login.', 'error');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Check password strength
    const passwordStrength = checkPasswordComplexity(password);
    if (passwordStrength < 80) {
        showMessage('Weak Password', 'Please use a stronger password that meets all requirements.', 'error');
        return;
    }
    
    if (password !== confirm) {
        showMessage('Password Mismatch', 'Passwords do not match. Please confirm your password.', 'error');
        return;
    }
    
    // Create user
    const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('qalicode-users', JSON.stringify(users));
    
    // Auto-login
    loginUser(username, password);
    
    showMessage('Welcome!', `Account created successfully! Welcome to QALICODE, ${username}!`, 'success');
    closeModal('auth');
}

function checkPasswordComplexity(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    return strength;
}

function handleRecoverSubmit(e) {
    e.preventDefault();
    
    const email = inputs.recoverEmail.value.trim();
    
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
    }
    
    const user = users.find(u => u.email === email);
    
    if (user) {
        showMessage('Recovery Email Sent', `A password reset link has been sent to ${email}. Please check your inbox.`, 'success');
        closeModal('auth');
    } else {
        showMessage('Email Not Found', 'No account found with this email address. Please check and try again.', 'error');
    }
}

function loginUser(usernameOrEmail, password) {
    const user = users.find(u => 
        (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
        u.password === password
    );
    
    if (user) {
        quizState.username = user.username;
        quizState.isLoggedIn = true;
        
        // Update user's last login
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('qalicode-users', JSON.stringify(users));
        
        // Save session
        localStorage.setItem('qalicode-current-user', JSON.stringify({
            username: user.username,
            email: user.email
        }));
        
        updateUserDisplay();
        
        showMessage('Welcome Back!', `Great to see you again, ${user.username}!`, 'success');
        return true;
    }
    
    return false;
}

function logoutUser() {
    showConfirmModal(
        'Logout',
        'Are you sure you want to logout?',
        () => {
            quizState.username = 'Guest';
            quizState.isLoggedIn = false;
            
            localStorage.removeItem('qalicode-current-user');
            updateUserDisplay();
            
            showMessage('Logged Out', 'You have been successfully logged out.', 'info');
            switchScreen('welcome');
        }
    );
}

// Try demo function
function tryDemo() {
    if (!quizState.isLoggedIn) {
        showMessage('Login Required', 'Please login or create an account to try the demo.', 'info');
        showAuthModal();
        return;
    }
    
    quizState.selectedLanguage = 'html';
    startQuiz();
}

// Select language
function selectLanguage(language) {
    if (!quizState.isLoggedIn) {
        showMessage('Login Required', 'Please login or create an account to start a quiz.', 'info');
        showAuthModal();
        return;
    }
    
    quizState.selectedLanguage = language;
    startQuiz();
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
    }
    
    closeAllModals();
}

// Start quiz
function startQuiz() {
    if (!quizState.selectedLanguage) {
        showMessage('Language Required', 'Please select a quiz language first.', 'warning');
        return;
    }
    
    // Get questions for selected language
    quizState.questions = [...questionsDatabase[quizState.selectedLanguage]];
    
    // Reset state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.userAnswers = new Array(quizState.questions.length).fill(null);
    quizState.quizStarted = true;
    quizState.hintsUsed = 0;
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
    displays.timer.style.color = '#FFFFFF';
    
    buttons.prev.disabled = true;
    buttons.next.disabled = true;
    buttons.submit.style.display = 'none';
    
    updateQuestionCounter();
    createProgressDots();
}

// Update quiz header
function updateQuizHeader() {
    const languageNames = {
        html: 'HTML',
        css: 'CSS',
        js: 'JavaScript'
    };
    
    const languageIcons = {
        html: 'fab fa-html5',
        css: 'fab fa-css3-alt',
        js: 'fab fa-js'
    };
    
    const languageColors = {
        html: '#E34F26',
        css: '#1572B6',
        js: '#F7DF1E'
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
    
    if (window.innerWidth >= 768) {
        for (let i = 0; i < quizState.questions.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
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
    updateNavigationButtons();
}

// Update navigation
function updateNavigationButtons() {
    const isFirstQuestion = quizState.currentQuestionIndex === 0;
    const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;
    const hasAnswer = quizState.userAnswers[quizState.currentQuestionIndex] !== null;
    
    buttons.prev.disabled = isFirstQuestion;
    buttons.next.disabled = !hasAnswer;
    
    if (isLastQuestion && hasAnswer) {
        buttons.submit.style.display = 'block';
        buttons.next.style.display = 'none';
    } else {
        buttons.submit.style.display = 'none';
        buttons.next.style.display = 'flex';
    }
    
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
        buttons.pauseQuiz.innerHTML = '<i class="fas fa-play"></i> <span class="btn-text">Resume</span>';
        showMessage('Quiz Paused', 'The quiz has been paused. Click Resume to continue.', 'info');
    } else {
        startTimer();
        buttons.pauseQuiz.innerHTML = '<i class="fas fa-pause"></i> <span class="btn-text">Pause</span>';
    }
}

// Show quiz help
function showQuizHelp() {
    showMessage('Quiz Help', 
        'How to use the quiz:\n\n' +
        '• Read each question carefully\n' +
        '• Click on an option to select it\n' +
        '• Use the Hint button for explanations\n' +
        '• Flag questions for review\n' +
        '• Manage your time wisely\n\n' +
        'Good luck! 🍀', 
        'info'
    );
}

// Navigate questions
function showPreviousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayQuestion();
    }
}

function showNextQuestion() {
    const hasAnswer = quizState.userAnswers[quizState.currentQuestionIndex] !== null;
    const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;
    
    if (isLastQuestion && hasAnswer) {
        submitQuiz();
        return;
    }
    
    if (isLastQuestion && !hasAnswer) {
        showMessage('Answer Required', 'Please select an answer before proceeding.', 'warning');
        return;
    }
    
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        quizState.currentQuestionIndex++;
        displayQuestion();
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
                displays.timer.style.color = '#FF6584';
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
    
    quizState.score = Math.max(0, totalPoints + timeBonus - hintPenalty);
    
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

// Show results
function showResults() {
    const { correctCount, total } = calculateScore();
    
    displays.finalScore.textContent = quizState.score;
    displays.correctAnswers.textContent = `${correctCount}/${total}`;
    displays.timeUsed.textContent = `${60 - quizState.timer}s`;
    
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
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;
    
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
    }, 300);
    
    updateHighscoresDisplay();
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
    analysisText += `• Flagged Questions: ${quizState.flaggedQuestions.size}\n\n`;
    
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
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showMessage('Copied!', 'Score copied to clipboard! Share it with your friends!', 'success'))
        .catch(() => showMessage('Error', 'Could not copy to clipboard.', 'error'));
}

// Retake quiz
function retakeQuiz() {
    startQuiz();
}

// New quiz
function newQuiz() {
    quizState.selectedLanguage = null;
    switchScreen('welcome');
}

// Initialize app
document.addEventListener('DOMContentLoaded', initApp);
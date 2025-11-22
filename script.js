const words = [
  // HTML
  "<div class=\"container\"></div>",
  "<button class=\"btn\">Click</button>",
  "<img src=\"image.jpg\" alt=\"image\">",
  "<input type=\"text\" placeholder=\"Enter\">",
  "<a href=\"#\">Link</a>",
  "<p>Hello world</p>",
  "<section class=\"wrapper\"></section>",
  "<header class=\"site-header\"></header>",
  "<footer class=\"site-footer\"></footer>",
  "<nav class=\"nav-bar\"></nav>",
  "<ul class=\"list\"></ul>",
  "<li class=\"item\"></li>",

  // HTML patterns
  "<div id=\"app\"></div>",
  "<main class=\"content\"></main>",
  "<span class=\"tag\">New</span>",
  "<form action=\"#\"></form>",
  "<h1 class=\"title\">Title</h1>",

  // CSS selectors
  ".container {",
  "  display: flex;",
  "}",
  ".btn {",
  "  padding: 8px 16px;",
  "}",
  "#app {",
  "  max-width: 600px;",
  "  margin: 0 auto;",
  "}",

  // CSS properties
  "color: #fff;",
  "background: #000;",
  "font-size: 1rem;",
  "margin: 0;",
  "padding: 16px;",
  "border-radius: 8px;",
  "display: flex;",
  "justify-content: center;",
  "align-items: center;",
  "gap: 12px;",
  "cursor: pointer;",
  "width: 100%;",
  "height: 100%;",

  // CSS patterns
  "position: relative;",
  "position: absolute;",
  "top: 0;",
  "left: 0;",
  "box-shadow: 0 4px 12px rgba(0,0,0,0.2);",

  // JS basics
  "const count = 0;",
  "let value = 10;",
  "var ready = false;",
  "if (count > 0) {",
  "  console.log(count);",
  "}",
  "for (let i = 0; i < 5; i++) {",
  "  console.log(i);",
  "}",
  "function greet(name) {",
  "  return `Hello ${name}`;",
  "}",
  "const add = (a, b) => a + b;",

  // JS DOM
  "const app = document.getElementById(\"app\");",
  "const btn = document.querySelector(\".btn\");",
  "btn.addEventListener(\"click\", () => {",
  "  console.log(\"clicked\");",
  "});",
  "const item = document.createElement(\"div\");",
  "item.textContent = \"Hello\";",
  "document.body.appendChild(item);",

  // JS patterns you’ll use constantly
  "console.log(\"ready\");",
  "return value;",
  "items.push(value);",
  "[...items]",
  "JSON.stringify(data)",
  "Math.random()",
  "Math.floor(Math.random() * 10)",

  // Combined tiny blocks
  "<div class=\"card\">\n  <h2>Title</h2>\n</div>",
  "function init() {\n  console.log(\"init\");\n}",
  "const user = {\n  name: \"Nick\",\n};"
];



const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');

let totalTyped = '';
let currentCharIndex = 0;
let errors = 0;
let longText = generateLongText();
let timeLeft = 30;
let timerInterval;
let typingStarted = false;



// Shuffle the words array

function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Combine shuffled words into one long string with spaces

function generateLongText() {
    const shuffledWords = shuffleArray([...words]);
    return shuffledWords.join(' ');

}

// Starting countdown timer

function startTimer() {
    if (!typingStarted) {
        typingStarted = true;
        timerInterval = setInterval(() => {
            timeLeft --;
            timerElement.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endTest();
            }
        }, 1000);
    }
}


// Calculate words-per-minute wuth error adjustment 

function calculateWPM() {
    const wordsTyped = totalTyped.trim().split(/\s+/).length;
    const baseWPM = Math.round((wordsTyped/ 30) * 60);
    const adjustedWPM = Math.max(baseWPM - errors, 0);
    return adjustedWPM;
     

}


// End the test and display the final score
function endTest() {
    timerElement.textContent = `Time's up!`;
    finalScoreElement.textContent = `Final WPM: ${calculateWPM()}`;
    textContainer.style.display = 'none';
    tryAgainButton.style.display = 'block';
};

// Handle Typing over the displayed text and scrolling

document.addEventListener('keydown', (e) => {
    
    
    startTimer();
    
    if (e.key === 'Backspace') {
        if (totalTyped.length >0) {
            currentCharIndex = Math.max(currentCharIndex -1, 0);
            totalTyped = totalTyped.slice(0, -1);
        }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        totalTyped += e.key;
        currentCharIndex ++;
    }


    const textArray = longText.split('');
    textContainer.innerText = '';

    errors = 0;

    for (let i = 0; i < textArray.length; i ++) {
        const span = document.createElement('span');

        if ( i < totalTyped.length) {
            if (totalTyped [i] === textArray[i]) {
                span.classList.add('correct');
            } else {
                span.classList.add('error')
                errors++;
            }
        }

        span.textContent = textArray[i];
        textContainer.appendChild(span);
    }

    // Scroll the container only after 20 characters
    if (totalTyped.length >= 20) {
        const scrollAmount = (totalTyped.length - 20) * 14;
        textContainer.scrollLeft = scrollAmount;
    }

});



// Reset the test 

function resetTest() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    finalScoreElement.textContent = '';
    textContainer.style.display = 'block';
    tryAgainButton.style.display = 'none';
    totalTyped = '';
    currentCharIndex = 0;
    errors = 0;
    textContainer.scrollLeft = 0;
    longText = generateLongText();
    init();
}

// Initialize the test

function init() {
    if (isMobileDevice()) {
        showMobileMessage();
    } else {
        const textArray = longText.split('');
        textContainer.innerText = '';

        errors = 0;

        for (let i = 0; i < textArray.length; i ++) {
            const span = document.createElement('span');

            if ( i < totalTyped.length) {
                if (totalTyped [i] === textArray[i]) {
                    span.classList.add('correct');
                } else {
                    span.classList.add('error')
                    errors++;
                }
            }

            span.textContent = textArray[i];
            textContainer.appendChild(span);
            }
        
        timerElement.textContent = `Time left: ${timeLeft}s`;
    }
}


// Try again button listener

tryAgainButton.addEventListener('click', resetTest);


// Detect if device is mobile

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}

// Show message for mobile users
function showMobileMessage() {
    textContainer.textContent = 'This typing test is designed for desktop use only.';
}

// Startup
init();
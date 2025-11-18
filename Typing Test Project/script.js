const words = [
  // Basic HTML tags
  "<div>", "</div>", "<span>", "</span>",
  "<p>", "</p>", "<h1>", "</h1>", "<h2>", "</h2>",
  "<ul>", "</ul>", "<li>", "</li>",
  "<img>", "<br>", "<hr>",
  "<button>", "</button>",
  "<input>", "<label>", "</label>",
  "<form>", "</form>",
  "<a>", "</a>",
  "<section>", "</section>",
  "<header>", "</header>",
  "<footer>", "</footer>",

  // Attributes
  "class=\"box\"", "id=\"main\"",
  "src=\"image.png\"", "href=\"#\"",
  "alt=\"text\"", "type=\"text\"",
  "type=\"button\"", "value=\"\"",
  "placeholder=\"enter text\"",
  "name=\"username\"",

  // Simple HTML combos
  "<div class=\"container\">",
  "<button class=\"btn\">",
  "<img src=\"img.png\" alt=\"\">",
  "<a href=\"#\">link</a>",
  "<input type=\"text\">",
  "<ul><li>item</li></ul>",

  // Basic CSS selectors
  "div {}", ".box {}", "#main {}",
  "button {}", "img {}", "p {}",

  // Basic CSS properties
  "color:", "background:", "font-size:",
  "font-weight:", "margin:", "padding:",
  "border:", "border-radius:",
  "width:", "height:",
  "display:", "flex:", "grid:",
  "justify-content:", "align-items:",
  "text-align:", "cursor:",

  // Simple CSS values
  "red", "blue", "black", "white",
  "1rem", "2rem", "16px", "100px",
  "auto", "center", "flex-start",
  "flex-end", "space-between",

  // Friendly CSS combos
  "display: flex;", "display: grid;",
  "margin: 0 auto;", "padding: 1rem;",
  "color: white;", "background: black;",
  "border-radius: 8px;",
  "text-align: center;",
  "width: 100%;", "height: 100%;",

  // Basic JavaScript keywords
  "let", "const", "var", "function",
  "return", "if", "else",
  "true", "false", "null",

  // Simple JS expressions
  "let x = 0;", "const y = 1;",
  "if (x > 0) {}", "else {}",

  // Basic JS operators
  "+", "-", "*", "/", "%",
  "==", "===", "!=", "!==",
  ">", "<", ">=", "<=",

  // Very simple JS strings
  "\"hello\"", "\"world\"",

  // Basic functions
  "function test() {}", "() => {}",

  // Basic arrays & objects
  "[1, 2, 3]", "{ name: \"Nick\" }",

  // DOM basics
  "document", "window", "console.log",
  "document.querySelector", "textContent",
  "innerHTML", "addEventListener",

  // Simple DOM combos
  "console.log(\"hello\")",
  "document.querySelector(\"div\")",
  "element.textContent = \"hi\";",
  "button.addEventListener(\"click\")",

  // Events
  "\"click\"", "\"input\"", "\"change\"",

  // Beginner-friendly fetch snippet
  "fetch(url)", "then()", "catch()",

  // Misc web basics
  "HTML", "CSS", "JavaScript",
  "script", "style", "head", "body",
  "<!DOCTYPE html>",
  "meta", "title", "link",
  "stylesheet", "class", "id"
];


const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');

let totalTyped = '';
let currentCharIndex = 0;
let errors = 0;
let longText = generateLongText();

textContainer.textContent= longText;

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

// Handle Typing over the displayed text and scrolling

document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        if (totalTyped.length >0) {
            currentCharIndex = Math.max(currentCharIndex -1, 0);
            totalTyped = totalTyped.slice(0, -1);
        }
    }
});




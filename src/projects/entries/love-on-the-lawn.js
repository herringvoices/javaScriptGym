// Project entry for Love on the Lawn
// Defines starter files and sandbox entry. Functions now start in a working state; the first step focuses on setting up the project structure.

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Love on the Lawn</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/main.js"></script>
</body>
</html>`;

const MAIN_JS = `// Main entry point for Love on the Lawn
console.log('Welcome to Love on the Lawn!');`;

const STYLES_CSS = `/* Base styles for Love on the Lawn */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
    color: #333;
}

#app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}`;

const DATABASE_JS = `// Placeholder for database logic
export const data = [];
`;

const FUNCTIONS_JS = `// Placeholder for utility functions
export const utils = {};
`;

export default {
    id: "love-on-the-lawn",
    title: "Love on the Lawn",
    files: [
        { path: "/index.html", content: INDEX_HTML, active: false },
        { path: "/main.js", content: MAIN_JS, active: true },
        { path: "/styles.css", content: STYLES_CSS, readOnly: false, hidden: false },
        { path: "/database.js", content: DATABASE_JS, readOnly: false, hidden: true },
        { path: "/functions.js", content: FUNCTIONS_JS, readOnly: false, hidden: true },
    ],
    entry: "/index.html",
};
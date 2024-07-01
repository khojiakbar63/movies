// SELECTORS
// One
function $(s) {
    return document.querySelector(s)
}

// More
function $$(s) {
    return document.querySelectorAll(s)
}

// Create New Element
function createElement(tagName, classList, content) {
    const element = document.createElement(tagName);
    if(classList) {
        element.setAttribute('class', classList)
    }
    if(content) {
        element.innerHTML = content
    }

    return element;
}





























// -------------------- ORIGINAL FUNCTIONS --------------------

// Selectors
// function $(s) {
//     return document.querySelector(s);
// }
// function $$(s) {
//     return document.querySelectorAll(s);
// }
//
// // Create element
// function createElement(tagName, classList, content) {
//     const el = document.createElement(tagName);
//     if(classList) {
//         el.setAttribute('class', classList);
//     }
//     if(content) {
//         el.innerHTML = content;
//     }
//     return el;
// }
//






































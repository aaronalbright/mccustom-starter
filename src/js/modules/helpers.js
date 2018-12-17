/**
 * querySelector with optional context (defualt is document)
 */

const q$1 = (selector, context = document) => context.querySelector(selector);

/**
 * querySelectorAll with optional context (defualt is document)
 */

const q$ = (selector, context = document) => context.querySelectorAll(selector);

/**
 * Creates element with optional class (via className)
 * @param {string} element Element to createElement
 * @param {string} class Class name(s) to add to element
 */

const createElement = (el, cl) => {
    let x = document.createElement(el)
    if (cl != undefined) x.className = cl;
    return x
}

/**
 * Elenables share buttons by adding window location to href of each link.
 * @param {string} selector CSS selector string
 */
const enableShareButtons = selector => {
    let shareLinks = document.querySelectorAll('.'+selector);
    for (let i = 0; i < shareLinks.length; i++) {
        shareLinks[i].href =
            shareLinks[i].href + encodeURIComponent(window.location);
    }
}

export { q$, q$1, createElement, enableShareButtons}
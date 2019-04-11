/**
 * querySelector with optional context (defualt is document)
 */

const q$1 = (selector, context = document) => context.querySelector(selector);

/**
 * querySelectorAll with optional context (defualt is document)
 */

const q$ = (selector, context = document) => context.querySelectorAll(selector);

/**
 * Elenables share buttons by adding window location to href of each link.
 * @param {string} selector CSS selector string
 */
const enableShareButtons = selector => {
    let shareLinks = document.querySelectorAll(selector);
    for (let i = 0; i < shareLinks.length; i++) {
        shareLinks[i].href =
            shareLinks[i].href + encodeURIComponent(window.location);
    }
}

/**
 * Insets drop cap to first paragraph
 * @param {string} selection CSS selector string
 */
const insertDropCap = selection => {
  let firstGraph = document.querySelector(selection);
  let firstLetter = firstGraph.innerHTML.substring(0, 1);
  let dropCap = `<span class="drop-cap">${firstLetter}</span>${firstGraph.innerHTML.substring(
    1
  )}`;
  firstGraph.innerHTML = dropCap;
}

export {q$1, q$, enableShareButtons, insertDropCap}
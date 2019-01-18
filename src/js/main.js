import { enableShareButtons } from './modules/helpers';
import FuseNav from './modules/fuse-nav';

// Adds dropcap to first paragraph
let firstGraph = document.querySelector('.content-body > p:not(:empty)');
let firstLetter = firstGraph.innerHTML.substring(0, 1);
let dropCap = `<span class="drop-cap">${firstLetter}</span>${firstGraph.innerHTML.substring(1)}`;
firstGraph.innerHTML = dropCap;

document.addEventListener('DOMContentLoaded', function () {
    let fuseMore = document.querySelector('.fuse-read-more');
    new FuseNav(fuseMore);

    enableShareButtons('share-link')
});
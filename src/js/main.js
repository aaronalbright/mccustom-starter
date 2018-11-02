import { q$, q$1, createElement, enableShareButtons } from './modules/helpers';

document.addEventListener('DOMContentLoaded', function () {

    enableShareButtons('share-link')

    createNav();

    // Get active chapter
    let sourceURL = q$1('meta[name=original-source]').content;
    let navItems = q$('.fuse-nav-item > a');
    let regex = /\d+(?=\.html)/;

    for (let item of navItems) {
        if (item.href.match(regex)[0] === sourceURL.match(regex)[0]) {
            item.classList.add('fuse-active-item')
        }
    }

    let scrollBtn = q$1('.mob-read-more');
    scrollBtn.addEventListener('click', scrollToEnd);

});

function scrollToEnd() {
    $([
        document.documentElement,
        document.body
    ]).animate({ scrollTop: $('.fuse-read-more').offset().top - 70 }, 500);
}

function createNav() {
    let navBar = createElement('div', 'fuse-nav-bar');
    let readMore = q$1('.fuse-read-more');
    navBar.innerHTML = `
     <img src="https://www.miamiherald.com/wps/build/images/miamiherald/logo.svg" alt="Miami Herald Logo" class="nav-logo">
    <nav></nav>
    <div class="mob-read-more">The series<span class="glyphicon glyphicon-chevron-down"></span></div>
    `;

    // Clones related stories
    let articles = q$('.fuse-read-more article');
    let nav = navBar.querySelector('nav');
    for (let i = 0; i < articles.length; i++) {
        let info = articles[i].querySelector('.card__info a');
        let c = info.cloneNode(true);
        let navItem = createElement('div', 'fuse-nav-item');

        c.innerHTML = `<span>${
            c.dataset.chapter
            }</span>`;

        navItem.appendChild(c);
        nav.appendChild(navItem);
    }

    readMore.parentNode.insertBefore(navBar, readMore.nextSibling);

    window.addEventListener('scroll', debounce(() => toggleBar(), 50));

    function toggleBar() {
        let bar = navBar;
        if (window.scrollY < window.innerHeight / 2) {
            bar.classList.remove('fuse-nav-bar--visible');
        } else if (!bar.classList.contains('fuse-nav-bar--visible')) {
            bar.classList.add('fuse-nav-bar--visible');
        }
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}
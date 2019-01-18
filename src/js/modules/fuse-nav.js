import { q$, q$1, createElement } from './helpers';
export default class FuseNav {
  /**
   * Creates Fuse-style navigation
   * @param {Element} element The target element to append the navigation
   */
  constructor(element) {
    this.navBar = createElement('div', 'fuse-nav-bar');
    this.element = element;
    this.market = this.element.getAttribute('data-market');


    this.init();
    this.toggleNav();
    this.getCurrentURL();
  }
  init() {
    let navBar = this.navBar;
    navBar.innerHTML = `
     <img src="https://www.miamiherald.com/wps/build/images/${this.market}/logo.svg" alt="Miami Herald Logo" class="fuse-nav-logo">
    <nav></nav>
    <div class="mob-read-more">The series<span class="glyphicon glyphicon-chevron-down"></span></div>
    `;

    let articles = this.element.querySelectorAll('.card');
    let nav = navBar.querySelector('nav');
    for (let i = 0; i < articles.length; i++) {
      let info = articles[i].querySelector('.card__info a');
      let clone = info.cloneNode(true);
      let navItem = createElement('div', 'fuse-nav-item');

      clone.innerHTML = `<span>${clone.dataset.chapter}</span>`;

      navItem.appendChild(clone);
      nav.appendChild(navItem);
    }

    this.element.parentNode.insertBefore(navBar, this.element.nextSibling);

    window.addEventListener('scroll', debounce(() => this.toggleBar(), 50));
  }
  getCurrentURL() {
    let sourceURL = q$1('meta[name=original-source]').content;
    let navItems = q$('.fuse-nav-item > a');
    let regex = /\d+(?=\.html)/;
    for (let item of navItems) {
      if (item.href.match(regex)[0] === sourceURL.match(regex)[0]) {
        item.classList.add('fuse-active-item')
      }
    }
  }
  toggleNav() {
    q$1('.mob-read-more').addEventListener('click', function () {
      q$1('.fuse-nav-bar nav').classList.toggle('nav-mob-shown')
      this.classList.toggle('mob-read-more--on');
    });
    
  }
  toggleBar() {
    let bar = this.navBar;
    let mobNav = q$1('.fuse-nav-bar nav')
    let mobReadMore = q$1('.mob-read-more')
    if (window.scrollY < window.innerHeight / 2) {
      bar.classList.remove('fuse-nav-bar--visible');
      mobNav.classList.remove('nav-mob-shown');
      mobReadMore.classList.remove('mob-read-more--on')
    } else if (!bar.classList.contains('fuse-nav-bar--visible')) {
      bar.classList.add('fuse-nav-bar--visible');
    }
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

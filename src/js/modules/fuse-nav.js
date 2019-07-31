import { q$, q$1 } from './helpers';
import logo from '../../assets/logo.svg';
export default class FuseNav {
  /**
   * Creates sticky navigation
   * @param {Element} element The target element to append the navigation
   * @param {Object} opts Options that control nav rendering
   * @param {boolean}  [opts.seriesSequence=false] If true, adds Part 1+ headings to slugs
   * @param {boolean} [opts.removeCards=false] If true, removes end-of-story cards after render
   */
  constructor(element, { seriesSequence = false, removeCards = false }) {
    this.navBar = createElement('div', 'fuse-nav-bar');
    this.element = element;
    this.market = this.element.getAttribute('data-market');
    this.series = seriesSequence;
    this.removeCards = removeCards;
  }
  init() {
    let navBar = this.navBar;
    navBar.innerHTML = `
     <img src="${logo}" alt="Miami Herald Logo" class="fuse-nav-logo">
    <nav></nav>
    <div class="mob-read-more">Read more<span class="glyphicon glyphicon-chevron-down"></span></div>
    `;

    const articles = this.element.querySelectorAll('.card');
    const nav = navBar.querySelector('nav');

    const isLive = (clone, index) => {
      if (clone.dataset.head == "Coming Soon") {
        return 'Coming Soon'
      } else if (clone.localName == 'div') {
        return clone.dataset.head
      } else {
        return `Part ${index + 1}`
      }
    }

    for (let i = 0; i < articles.length; i++) {
      let info = articles[i].querySelector('.card__info .nav-link');

      let clone = info.cloneNode(true);
      let navItem = createElement('div', 'fuse-nav-item');

      if (clone.localName == 'div') {
        clone.classList.add('no-link');
      }

      if (this.series && clone.dataset.title !== "Explore") {
        clone.innerHTML = `<span class="nav-chapter">${isLive(clone, i)}</span><span class="nav-title">${clone.dataset.title}</span>`;
      } else if (this.series) {
        clone.innerHTML = `<span class="nav-chapter">&nbsp;</span><span class="nav-title">${
          clone.dataset.title
        }</span>`;
      }
       else {
        clone.innerHTML = `<span class="nav-title">${
          clone.dataset.title
        }</span>`;
      }

      navItem.appendChild(clone);
      nav.appendChild(navItem);
    }

    this.element.parentNode.insertBefore(navBar, this.element.nextSibling);

    window.addEventListener('scroll', debounce(() => this.toggleBar(), 50));

    this.toggleNav();
    // Removes story cards if true
    if (this.removeCards) this.element.remove();
  }
  getCurrentURL() {
    let sourceURL = q$1('meta[name=original-source]').content || undefined;
    let navItems = q$('.fuse-nav-item > a');
    let regex = /\d+(?=\.html)/;
    for (let item of navItems) {
      if (item.href.match(regex)[0] === sourceURL.match(regex)[0]) {
        item.classList.add('fuse-active-item');
      } else {
        break;
      }
    }
  }
  toggleNav() {
    q$1('.mob-read-more').addEventListener('click', function() {
      q$1('.fuse-nav-bar nav').classList.toggle('nav-mob-shown');
      this.classList.toggle('mob-read-more--on');
    });
  }
  toggleBar() {
    let bar = this.navBar;
    let mobNav = q$1('.fuse-nav-bar nav');
    let mobReadMore = q$1('.mob-read-more');
    if (window.scrollY < window.innerHeight / 2) {
      bar.classList.remove('fuse-nav-bar--visible');
      mobNav.classList.remove('nav-mob-shown');
      mobReadMore.classList.remove('mob-read-more--on');
    } else if (!bar.classList.contains('fuse-nav-bar--visible')) {
      bar.classList.add('fuse-nav-bar--visible');
    }
  }
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function createElement(selector, cl) {
  let el = document.createElement(selector);
  if (cl) el.classList.add(cl);
  return el;
}

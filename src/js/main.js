import './modules/bling';
import FuseNav from './modules/fuse-nav';

// Rearranges headers from lead image to story body
// let immersive = document.querySelector('.immersive');
// let headline = immersive.querySelector('.title');
// let h6 = immersive.querySelector('h2.caps.h6');
// let storyBody = document.querySelector('.story-body');
// let header = storyBody.querySelector('.header');

// header.insertBefore(headline, header.firstElementChild);
// header.insertBefore(h6, header.firstElementChild);

document.addEventListener('DOMContentLoaded', function() {
  const readMore = $1('.fuse-read-more');
  const nav = new FuseNav(readMore, {
    seriesSequence: false,
    removeCards: true
  });

  nav.init();
});

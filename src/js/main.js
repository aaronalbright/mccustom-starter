import FuseNav from './modules/fuse-nav';

document.addEventListener('DOMContentLoaded', function() {

  const readMore = document.querySelector('.fuse-read-more');
  const nav = new FuseNav(readMore, {
    seriesSequence: false
  });
  
  nav.init();

  let immersive = document.querySelector('.immersive');
  let headline = immersive.querySelector('.title');
  let h6 = immersive.querySelector('h2.caps.h6');
  let storyBody = document.querySelector('.story-body');
  let header = storyBody.querySelector('.header');

  headline.classList.add('h1');
  header.insertBefore(headline, header.firstElementChild);
  header.insertBefore(h6, header.firstElementChild);

});

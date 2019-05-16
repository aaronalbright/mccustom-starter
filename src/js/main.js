import FuseNav from './modules/fuse-nav';

document.addEventListener('DOMContentLoaded', function() {

  const readMore = document.querySelector('.fuse-read-more');
  new FuseNav(readMore, {
    removeCards: true,
    seriesSequence: true
  });
});

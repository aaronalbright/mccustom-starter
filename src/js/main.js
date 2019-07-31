import FuseNav from './modules/fuse-nav';

document.addEventListener('DOMContentLoaded', function() {

  const readMore = document.querySelector('.fuse-read-more');
  const nav = new FuseNav(readMore);
  
  nav.init();

});

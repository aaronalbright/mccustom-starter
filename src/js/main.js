import './modules/bling.js';
import FuseNav from './components/FuseNav.svelte'

document.addEventListener('DOMContentLoaded', function () {
  new FuseNav({
    target: $1('#FuseNav')
  })
});

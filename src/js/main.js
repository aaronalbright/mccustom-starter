import { enableShareButtons, insertDropCap } from './modules/helpers';
import FuseNav from './modules/fuse-nav';

document.addEventListener('DOMContentLoaded', function() {

  insertDropCap('.content-body > p:not(:empty)');
  
  enableShareButtons('.share-link');
});

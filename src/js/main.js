import { enableShareButtons, insertDropCap } from './modules/helpers';

document.addEventListener('DOMContentLoaded', function() {

  insertDropCap('.content-body > p:not(:empty)');
  
  enableShareButtons('.share-link');
});

import { enableShareButtons } from './modules/helpers';
import FuseNav from './modules/fuse-nav';

document.addEventListener('DOMContentLoaded', function () {

    let fuseMore = document.querySelector('.fuse-read-more');

    new FuseNav(fuseMore);

    enableShareButtons('share-link')
});
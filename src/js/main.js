import FuseNav from './modules/fuse-nav';

let immersive = document.querySelector('.immersive');
let headline = immersive.querySelector('.title');
let h6 = immersive.querySelector('h2.caps.h6');
let storyBody = document.querySelector('.story-body');
let header = storyBody.querySelector('.header');

header.insertBefore(headline, header.firstElementChild);
header.insertBefore(h6, header.firstElementChild);

let sourceURL = document.querySelector('meta[name=original-source]').content;

let matches;

if (sourceURL.includes('236413328') || sourceURL.includes('236413708')) {
  matches = /\d+(?=\.html)/.exec(sourceURL);
}

if (matches) {
  // main and sidebar story ID keyd to video ID
  let ids = {
    236413328: '236566228',
    236413708: '236567588'
  };

  placeLeadVideo(
    `https://www.mcclatchydc.com/latest-news/article${ids[matches[0]]}.html/video-embed`
  );
}

document.addEventListener('DOMContentLoaded', function() {
  const readMore = document.querySelector('.fuse-read-more');
  const nav = new FuseNav(readMore, {
    seriesSequence: false,
    removeCards: true
  });

  nav.init();
});

function placeLeadVideo(url) {
  let media = document.querySelector('.immersive .media.impact');
  let iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.width = 640;
  iframe.height = 400;
  iframe.allowFullscreen = true;
  iframe.frameBorder = 0;

  media.classList.add('mcclatchy-embed');
  media.style = '';
  media.firstElementChild.remove();
  media.appendChild(iframe);
}

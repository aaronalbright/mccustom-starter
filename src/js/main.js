// import { addCSS } from './modules/helpers';
import FilterSections from './modules/filterSections';

$(function() {
  $.get(
    'https://media.miamiherald.com/static/media/projects/2018/florence-lp/sc-data.json',
    stories => {
      let sections = ['all'];

      // stories.sort((a,b) => new Date(b.date) - new Date(a.date));

      for (let each of stories) {
        if (each.section.toUpperCase() == 'HERO') {
          let imgWrapper = `
            <div class="hero--img-wrapper">
              <img class="hero--img" src="${each.img}" alt="">
            </div>
          `;

          let vidWrapper = `
            <div class="mcclatchy-embed">
              <iframe src="${
                each.hero.video
              }/video-embed" frameborder="0" allowfullscreen="true"></iframe>
            </div>
          `;

          let hero = `
            ${each.hero.video !== undefined ? vidWrapper : imgWrapper}
            <div class="hero__head-wrapper">
              <h2 class="title hero__title">
              <a href="${each.url}">${each.title}</a>
              </h2>
              <time class="timestamp">${each.date}</time>
              <p class="hero__intro">${each.hero.preview}</p>
            </div>`;

          $('.lp-hero').append(hero);
        } else if (each.section.toUpperCase() == 'LEAD') {
          let lead = `
          <div class="header__image-wrapper">
          <img src="${each.img}" alt="">
          </div>
          <div class="header__text-wrapper">
          <h1>${each.headline}</h1>
          <p>${each.intro}</p>
          </div>
          `;

          $('.lp-header').append(lead);
        } else {
          if (!sections.includes(each.section)) sections.push(each.section);
          let story = `
            <article class="lp-card" data-section="${each.section}">
            <div class="card__img-wrapper">
              <a href="${each.url}">
                <img class="card__img" src="${each.img}" alt="" />
              </a>
            </div>
            <div class="card__article-wrapper">
              <div class="lp-kicker">${each.section}</div>
              <h4 class="title card__title">
                <a href="${each.url}">${each.title}</a>
              </h4>
              <time class="timestamp">${each.date}</time>
              </div>
            </article>
            `;

          $('.lp-story-cards').append(story);
        }
      }

      for (let i of sections) {
        let sectionButton = `
            <button class="selector-btn" id="${i}">${i.toUpperCase()}</button>
          `;

        $('.selector-wrapper').append(sectionButton);
      }

      new FilterSections(sections);
    }
  );
});

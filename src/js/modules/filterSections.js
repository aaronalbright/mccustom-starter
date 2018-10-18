export default class FilterSections {
  constructor(sections) {
    this.sections = sections;
    this.filter();
  }
  filter() {
    $('#all').addClass('selector-btn--active');
    // this.addSubscribe();
    $('.selector-btn').click(e => {
      let el = $(e.target);
      let id = el.attr('id');

      // Removes class from all, adds active button to clicked
      $('.selector-btn').removeClass('selector-btn--active');
      el.addClass('selector-btn--active');

      $(`.lp-card[data-section]`).removeClass('slide-in-right');
      $(`.lp-card[data-section]`).addClass('slide-out-left');

      if (id == 'all') {
        setTimeout(() => {
          $(`.lp-card[data-section]`).removeClass('slide-out-left');
          $(`.lp-card[data-section]`).addClass('slide-in-right');
          $(`.lp-card[data-section]`).removeClass('hidden');
        }, 200);
        // this.addSubscribe();
      } else {
        // Loops through sections,
        for (let section of this.sections) {
          // Element with section attribute
          let el = $(`.lp-card[data-section="${section}"]`);
          if (id !== section) {
            // el.addClass('slide-out-left');
            setTimeout(() => {
              el.addClass('hidden');
            }, 200);
          } else {
            el.removeClass('slide-out-left');
            el.addClass('slide-in-right');
            setTimeout(() => {
              el.removeClass('hidden');
            }, 200);
            // this.addSubscribe();
          }
        }
      }
    });
  }
  addSubscribe() {
    let subBox = $('.subscribe-box');
    let visibleArticles = $('.lp-card:not(.hidden)');
    $(visibleArticles[0]).after(subBox);
  }
}

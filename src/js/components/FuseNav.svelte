<script>
  import home from '../../assets/home.svg?raw';

  export let titles = 'One|Two|Three|Four|Five|Siz';
  export let textlogo = 'NO_TEXT_LOGO_SET';
  export let homeurl = '#';

  $: links = getNavLinks(titles.split('|'));

  let scrollY;
  let navVisible;
  let mobOn = false;
  let currentY = 0;

  $: {
    // shows up scroll up only
    navVisible = scrollY > currentY ? false : true;
    currentY = scrollY <= 0 ? 0 : scrollY;
  }

  // Determines which kind of scroll trigger to use based on window width
  const mobileNavCheck = (scrollY, navVisible) => {
    if (window.innerWidth >= 768) {
      if (scrollY > window.innerHeight) mobOn = false;
      return scrollY > window.innerHeight;
    } else {
      return scrollY > 0 && navVisible == true;
    }
  };

  // Gathers all links in series nav
  function getNavLinks(titles) {
    let links = document.querySelectorAll('.series-nav a');
    if (links.length == 0) {
      links = document.querySelectorAll('.series-content h3 a');
    }
    if (!links || links.length <= 0) {
      return titles.map((d, i) => ({
        title: d,
        active: i == 0 ? true : false,
      }));
    }
    let sourceURL = document.querySelector(
      'meta[name=original-source]'
    ).content;
    const regex = /\d+(?=\.html)/;
    // Fallback if original source source isn't a proper story URL or empty.
    if (!sourceURL.match(regex)) sourceURL = '/000000.html';
    return links.map((d, i) => {
      const headline = d.querySelector('h4')?.innerText || d.innerText;
      const isActive = d.href.match(regex)[0] == sourceURL.match(regex)[0];
      return {
        url: d.href,
        headline,
        title: titles[i] || `Story${i + 1}`,
        active: isActive,
      };
    });
  }

  function handleClick() {
    // Disabled scrolling on mobile when the "Read More" button is clicked
    // Not ideal. This should be handled with a state change to ensure consistent behaviro
    if (window.innerWidth < 768) {
      document.body.classList.toggle('noscroll');
    }
  }
</script>

<svelte:window bind:scrollY />

<div class="fuse-nav-bar" class:visible={mobileNavCheck(scrollY, navVisible)}>
  <div class="fuse-nav-logo" class:fuse-nav-logo--no-image={textlogo !== null}>
    {#if textlogo !== null}
      <span class="nav-logo__text">{textlogo}</span><a
        class="nav-home-btn"
        href={homeurl}>{@html home}</a
      >
    {/if}
  </div>
  <nav
    class:nav-mob-shown={mobOn == true}
    class:dropdown-enabled={titles.length > 4 || window.innerWidth < 767}
  >
    {#each links as link, i}
      <div
        class="fuse-nav-item"
        on:click|stopPropagation={e => handleClick(e, i + 1)}
      >
        <a
          class="nav-link"
          class:nav-link--active={link.active}
          title={link.headline}
          href={link.url}
          ><span class="nav-title">
            {link.title}
          </span></a
        >
      </div>
    {/each}
  </nav>
  <div
    class="mob-read-more"
    class:mob-read-more--on={mobOn == true}
    on:click={() => (mobOn = !mobOn)}
    on:click|stopPropagation={e => handleClick(e)}
  >
    {!mobOn ? 'Read more' : 'Close'}
    <div class="icon">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="chevron-down"
        class="svg-inline--fa fa-chevron-down fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        ><path
          fill="currentColor"
          d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
        /></svg
      >
    </div>
  </div>
</div>

<style lang="postcss">
  .fuse-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background-color: var(--nav-bg, #373737);
    padding: 0 25px;
    margin: 0 !important;
    box-sizing: border-box;
    color: var(--nav-tc, #fff);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
    transition: transform 500ms 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateY(-60px);
    &.visible {
      transform: translateY(0);
    }
    & .fuse-nav-logo {
      display: flex;
      align-items: center;
      flex: 0 1 250px;
      max-width: 255px;
      padding-right: 5px;
      &.fuse-nav-logo--no-image {
        flex: 0 1 auto;
        max-width: unset;
      }
    }
    & .fuse-nav-logo--no-image > .nav-logo__text {
      font-family: 'Noto Serif', serif;
      font-size: 1.2em;
      font-weight: 700;
    }
    & nav {
      display: flex;
      flex: 0 0 auto;
      color: var(--nav-tc, #fff);
      align-self: stretch;
    }
    & a {
      box-sizing: border-box;
      color: inherit;
      cursor: pointer;
      text-decoration: none;
    }
  }

  .nav-home-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5em;
  }

  .fuse-nav-item {
    font-family: 'Noto Sans', sans-serif;
    & .nav-link,
    & a {
      height: 100%;
      display: flex;
      align-items: flex-start;
      flex-flow: column wrap;
      justify-content: center;
      padding: 0 10px;
      color: var(--nav-tc, #fff);
      transition: 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      border-bottom: 0px solid rgba(0, 0, 0, 0);
      will-change: margin-top, border-bottom;
      & span:first-child {
        transition: margin 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    }
    & a {
      will-change: transform;
    }
    & a:hover {
      background: rgba(34, 34, 34, 0.5);
      border-bottom: 5px solid var(--accent, #5169b8);
    }
    & a:hover span:first-child {
      transform: translateY(3px);
    }
  }

  nav:not(.dropdown-enabled) .fuse-nav-item .nav-link--active {
    background: #222;
    border-bottom: 5px solid var(--accent, #5169b8);
    & span:first-child {
      margin-top: 5px;
    }
  }

  .mob-read-more {
    font-family: 'Noto Sans', sans-serif;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    line-height: 1;
    cursor: pointer;
    z-index: 2;
    & .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 23px;
      height: 23px;
      margin-left: 5px;
      color: var(--accent, #5169b8);
      background-color: #fff;
      border-radius: 100%;
      padding: 3px;
      z-index: 10;
    }
    & svg {
      transform: translateY(2px);
      max-width: 90%;
      width: 90%;
      height: 100%;
      max-height: 100%;
      transition: transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    &.mob-read-more--on {
      & svg {
        transform: rotate(180deg);
      }
    }
  }

  @media (min-width: 768px) {
    .mob-read-more:hover {
      background-color: rgba(34, 34, 34, 0.5);
    }
  }

  .fuse-nav-bar nav.dropdown-enabled {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 50px;
    background-color: hsla(0, 0%, 10%, 0.97);
    max-height: 0;
    transition: max-height 375ms ease, visibility 0.2s 0.25s linear,
      opacity 0.2s 0.25s linear;
    overflow: hidden;
    box-shadow: inset 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
    opacity: 0;
    visibility: hidden;
    & .fuse-nav-item a,
    & .fuse-nav-item .nav-link {
      padding: 15px;
    }
    & a:not(.nav-link--active) {
      margin-left: 5px;
    }
    & .nav-link--active {
      border-left: 5px solid var(--accent, #5169b8);
      background: none;
      border-bottom: none;
      & span {
        margin: 0;
      }
    }
    & .fuse-nav-item a:hover {
      border-bottom: none;
      border-left: 5px solid var(--accent, #5169b8);
      margin-left: 0;
      & span {
        margin: 0;
      }
    }
    &.nav-mob-shown {
      opacity: 1;
      visibility: visible;
      max-height: 100vh;
      transition: max-height 1s ease, visibility 0.1s 130ms linear,
        opacity 0.1s 130ms linear;
    }
  }

  /* DESKTOP + TABLET ONLY STYLES */
  @media (min-width: 600px) {
    .fuse-nav-bar nav.dropdown-enabled {
      background-color: var(--nav-bg, #373737);
      max-width: 30%;
      left: 70%;
      top: 50px;
      padding-top: 0;
    }
    .fuse-nav-bar nav:not(.dropdown-enabled) + .mob-read-more {
      display: none;
    }
  }

  /* MOBILE STYLES */
  @media (max-width: 767px) {
    .fuse-nav-bar {
      padding: 0 15px;
    }
    .fuse-nav-bar .fuse-nav-logo {
      height: auto;
      max-width: 200px;
    }
    .fuse-nav-bar .fuse-nav-logo--no-image > .nav-logo__text {
      font-size: 0.88em;
      text-transform: uppercase;
      font-weight: 700;
    }

    .fuse-nav-bar nav {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      top: 0;
      padding-top: 50px;
      background-color: hsla(0, 0%, 10%, 0.97);
      max-height: 0;
      transition: max-height 375ms ease, visibility 0.2s 0.25s linear,
        opacity 0.2s 0.25s linear;
      overflow: hidden;
      box-shadow: inset 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
      opacity: 0;
      visibility: hidden;
      & .fuse-nav-item a,
      & .fuse-nav-item .nav-link {
        padding: 15px;
      }
      & a:not(.nav-link--active) {
        margin-left: 5px;
      }
      & .nav-link--active {
        border-left: 5px solid var(--accent, #5169b8);
        border-bottom: none !important;
        background: none;
        border-bottom: none;
        & span {
          margin: 0;
        }
      }
      & .fuse-nav-item a:hover {
        border-bottom: none;
        border-left: 5px solid var(--accent, #5169b8);
        margin-left: 0;
        & span {
          margin: 0;
        }
      }
      &.nav-mob-shown {
        opacity: 1;
        visibility: visible;
        max-height: 100vh;
        transition: max-height 1s ease, visibility 0.1s 130ms linear,
          opacity 0.1s 130ms linear;
      }
    }
  }
</style>

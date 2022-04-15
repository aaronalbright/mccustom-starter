<script>
  import sun from '../../assets/sun.svg?raw';
  import moon from '../../assets/moon.svg?raw';

  let isDarkMode = true;

  const qs = document.querySelector.bind(document);

  function darkMode(node) {
    if (isDarkMode) node.classList.add('dark');
  }

  function moveToTop(node, kind) {
    if (kind == 'themeToggle' && qs('.story-body .series-nav')) {
      qs('.story-body .series-nav').parentElement.insertAdjacentElement(
        'beforebegin',
        node
      );
    } else if (kind == 'themeToggle') {
      qs(
        '.story-body .dateline, .story-body > p:first-of-type'
      ).insertAdjacentElement('beforebegin', node);
    } else {
      qs(
        '.story-body .dateline, .story-body > p:first-of-type'
      ).insertAdjacentElement('beforebegin', node);
    }
  }

  function handleClick() {
    document.body.classList.toggle('dark');
    isDarkMode = !isDarkMode;
  }
</script>

<svelte:body use:darkMode />

<div use:moveToTop={'themeToggle'}>
  <button title="Toggle color theme" class="theme-toggle" on:click={handleClick}
    >{@html isDarkMode ? sun : moon}</button
  >
</div>

<style>
  :global(.story-body) {
    transition: all 200ms ease-in;
  }
  .theme-toggle {
    --size: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--size);
    height: var(--size);
    box-sizing: border-box;
    border: 2px solid var(--tc, #222);
    border-radius: 100%;
    background-color: var(--tc);
  }

  :global(.dark) .theme-toggle:hover {
    color: var(--lc);
    border-color: var(--lc);
  }

  .theme-toggle:hover {
    color: var(--lhc);
    border-color: var(--lhc);
  }

  .theme-toggle :global(svg) {
    fill: var(--lc);
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    .theme-toggle {
      box-sizing: content-box;
      --size: 26px !important;
      padding: 5px;
    }
    :global(.theme-toggle svg) {
      width: 100%;
    }
  }
</style>

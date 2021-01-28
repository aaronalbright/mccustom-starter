 <script>
    import '../../scss/fuse-nav.scss'
    // import logo from '../../assets/birth-betrayal_reversed-logo_12-2020.png';

    export let titles = ['One','Two','Three','Four']
    export let textLogo = 'Hello World';

    let links  = getNavLinks(titles);

    let scrollY;
    let navVisible;
    let mobOn = false;
    let currentY = 0;

    // reactive 
    $: {
        // shows up scroll up only
        navVisible = scrollY > currentY ? false : true;
        currentY = scrollY <= 0 ? 0 : scrollY;
    }

    // Determines which kind of scroll trigger to use based on window width
    const mobileNavCheck = (scrollY, navVisible) => {
        if (window.innerWidth > 600) {
            return scrollY > window.innerHeight;
        } else {
            return scrollY > 0 && navVisible == true
        }
    }

    // Gathers all links in series nav
    function getNavLinks(titles) {
        const links = document.querySelectorAll('.series-nav a, .series-content a');
        if (!links) return {};
        let sourceURL = document.querySelector('meta[name=original-source]').content;
        const regex = /\d+(?=\.html)/;
        // Fallback if original source source isn't a proper story URL or empty.
        if (!sourceURL.match(regex)) sourceURL = '/000000.html';
        return links.map((d, i) => {
            const headline = d.querySelector('h4').innerText;
            const articleID = d.href.match(regex);
            const isActive = articleID?.[0] == sourceURL.match(regex)[0];
            return {
                url: d.href,
                headline,
                title: titles[i] || `Story${i+1}`,
                active: isActive
            }
        })
    }
</script>

<svelte:window bind:scrollY />

<div class="fuse-nav-bar" class:fuse-nav-bar--visible={mobileNavCheck(scrollY, navVisible)}>
    <div class="fuse-nav-logo" class:fuse-nav-logo--no-image="{textLogo !== null}">
        {#if textLogo !== null}
            <span class="nav-logo__text">{textLogo}</span>
        {:else}
            <img class="nav-logo__iamge" src={logo} alt="Series Logo" />
        {/if}
    </div>
    <nav class:nav-mob-shown="{mobOn == true}" class:dropdown-enabled="{titles.length > 5 || window.innerWidth < 767}">
        {#each links as link}
            <div class="fuse-nav-item">
                <a class="nav-link" class:nav-link--active="{link.active}" title={link.headline} href={link.url}><span class="nav-title">
                    {link.title}
                </span></a>
            </div>
        {/each}
    </nav>
    <div class="mob-read-more" class:mob-read-more--on="{mobOn == true}" on:click="{() => mobOn = !mobOn}">
        Read more<span class="glyphicon glyphicon-chevron-down" />
    </div>
</div>

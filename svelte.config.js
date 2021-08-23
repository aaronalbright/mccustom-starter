const sveltePreprocess = require('svelte-preprocess');
const preprocessOptions = {
    defaults: {
        style: 'postcss'
    },
    postcss: {
        plugins: [require('postcss-nesting')()]
    }
};

module.exports = {
    preprocess: sveltePreprocess(preprocessOptions),
}
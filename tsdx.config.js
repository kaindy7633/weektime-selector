const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: false,
        extract: !!options.writeMeta,
        extensions: ['.less', '.css'],
      })
    );
    return config;
  },
};

const rewireAlias = require('react-app-rewire-alias');

module.exports = function override(config, env) {
  config = rewireAlias.alias({
    '@': './src',
    '@C': './src/components',
    '@HC': './src/pages/Homepage/components',
    '@DC': './src/pages/Dashboard/components',
  })(config, env);

  return config;
};

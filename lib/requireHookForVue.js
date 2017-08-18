const fs = require('fs');
const compiler = require('vue-template-compiler');

const transformSource = require('./sourceTransformer');

/**
 * Require hook for .vue files.
 * @param {Module} module
 * @param {string} filename
 * @return {*}
 */
require.extensions['.vue'] = function (module, filename) {
  const componentName = path.basename(filename, '.vue');

  const source = fs.readFileSync(filename, 'utf8');
  const parsedComponent = compiler.parseComponent(source);
  const scriptContent = parsedComponent.script ? parsedComponent.script.content : '';

  const transformedSource = transformSource(componentName, scriptContent);
  return module._compile(transformedSource.code, filename);
};
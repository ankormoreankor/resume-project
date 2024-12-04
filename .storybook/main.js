import { dirname, join } from 'path';
const path = require('path');
const { loadConfigFromFile, mergeConfig } = require('vite');
const turbosnap = require('vite-plugin-turbosnap');

module.exports = {
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  stories: ['../src/**/*.stories.tsx'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-addon-pseudo-states'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],

  viteFinal: async (config, { configType }) => {
    const { config: userConfig } = await loadConfigFromFile(path.resolve(__dirname, '../vite.config.js'));
    userConfig.build.outDir = 'storybook-static';
    userConfig.build.sourcemap = false;
    if (!userConfig.define) userConfig.define = {};
    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins:
        configType === 'PRODUCTION'
          ? [
              turbosnap({
                // This should be the base path of your storybook.  In monorepos, you may only need process.cwd().
                rootDir: config.root ?? process.cwd(),
              }),
            ]
          : [],
    });
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

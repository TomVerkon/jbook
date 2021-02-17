import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',

    setup(build: esbuild.PluginBuild) {

      // handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, ({ path, resolveDir }: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: new URL(path, 'https://unpkg.com' + resolveDir + '/').href,
        }
      });

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async ({ path }: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${path}`,
        }

      });
    },
  };
};

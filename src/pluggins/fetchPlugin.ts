import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'fileCache',
});

// localForage testing code
// (async () => {
//   await fileCache.setItem('color', 'red');
//   const color = await fileCache.getItem('color');
//   console.log(color);
// })()


export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',

    setup(build: esbuild.PluginBuild) {

      // bundle initial file
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      // Do i have the requested resource in cache? If so just getit and return it
      build.onLoad({ filter: /.*/ }, async ({ path }: esbuild.OnLoadArgs) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(path);
        if (cachedResult) {
          return cachedResult;
        }
      });

      // bundle 
      build.onLoad({ filter: /.css$/ }, async ({ path }: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
            `;
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async ({ path }: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(path, result);
        return result;
      });

    },
  };
};


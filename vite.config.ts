import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        devserver: resolve(__dirname, 'src/devserver/index.ts'),
        index: resolve(__dirname, 'src/index.ts')
      },
      name: 'MRLM.NET.VSTS DevStack',
      // the proper extensions will be added
      fileName: 'indvsts-extension-devstack',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['node'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          node: 'node',
        },
      },
    },
  },
  plugins: [dts({
    rollupTypes: true,
    insertTypesEntry: true,
  })],
})
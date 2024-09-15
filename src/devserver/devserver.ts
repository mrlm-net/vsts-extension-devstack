import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export const DEFAULT_PORT = "8765";
export const DEFAULT_HOST = "localhost";
export const DEFAULT_PROTOCOL = "https";
export const DEFAULT_DIST_DIR = "dist";
export const DEFAULT_STATIC_DIR = "static";
export const DEFAULT_HTTP_SERVER = "spdy";
export const DEFAULT_REWRITE_PATTERN = `\^/${DEFAULT_DIST_DIR}`;

export const DEV_SERVER_WEBPACK_CONFIG = createWebpackDevServerConfig();

export function createWebpackDevServerConfig(config?: DevServerConfiguration): DevServerConfiguration {
    return {
      server: DEFAULT_HTTP_SERVER,
      static: {
          serveIndex: false,
          directory: DEFAULT_STATIC_DIR,
          publicPath: `/${DEFAULT_STATIC_DIR}`
      },
      proxy: [
          {
            context: [`/${DEFAULT_DIST_DIR}`],
            secure: false,
            target: `${DEFAULT_PROTOCOL}://${DEFAULT_HOST}:${DEFAULT_PORT}`,
            pathRewrite: { DEFAULT_REWRITE_PATTERN: '' }
          },
        ],
      hot: true,
      port: DEFAULT_PORT, 
      // Destruct override
      ...config, 
    }
};
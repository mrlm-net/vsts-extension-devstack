import { createWebpackConfig, WEBPACK_CONFIG, WEBPACK_CONFIG_WITH_DEV_SERVER } from "./build";
import { createWebpackDevServerConfig, DEV_SERVER_WEBPACK_CONFIG } from "./devserver";
import { fetchEntries, DEFAULT_SRC_DIR } from "./entries";

export { 
    // Defaults
    DEV_SERVER_WEBPACK_CONFIG,
    DEFAULT_SRC_DIR,
    WEBPACK_CONFIG,
    WEBPACK_CONFIG_WITH_DEV_SERVER,
    // Helpers
    createWebpackDevServerConfig,
    createWebpackConfig,
    fetchEntries,
};
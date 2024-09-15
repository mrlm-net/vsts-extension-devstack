import * as path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import type { Configuration } from "webpack";
import { DEV_SERVER_WEBPACK_CONFIG } from "./devserver";
import { DEFAULT_SRC_DIR, fetchEntries } from "./entries";

export const DEFAULT_NAME = "extension";
export const DEFAULT_MODE = "development";
export const DEFAULT_OUTPUT_MASK = "[name]/[name].js";
export const DEFAULT_COPY_MASK = "**/*.html";
export const DEFAULT_EXTENSIONS = [".ts", ".tsx", ".js"];

const SDK_NAME = "azure-devops-extension-sdk";


export const WEBPACK_CONFIG = createWebpackConfig({
    entry: fetchEntries(DEFAULT_SRC_DIR)
});

export const WEBPACK_CONFIG_WITH_DEV_SERVER = createWebpackConfig({
    devServer: DEV_SERVER_WEBPACK_CONFIG,
    entry: fetchEntries(DEFAULT_SRC_DIR)
});

export function createWebpackConfig(config?: Configuration): Configuration {
    return{
        name: DEFAULT_NAME,
        mode: DEFAULT_MODE,
        output: {
            filename: DEFAULT_OUTPUT_MASK
        },
        resolve: {
            extensions: DEFAULT_EXTENSIONS,
            alias: {
                SDK_NAME: path.resolve(`node_modules/${SDK_NAME}`)
            },
        },
        stats: {
            warnings: false
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    // TODO test if needed
                    exclude: [
                        path.join(__dirname, "dev")
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", 
                        "css-loader", 
                        "azure-devops-ui/buildScripts/css-variables-loader", 
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader", 
                        "css-loader"
                    ],
                },
                {
                    test: /\.woff$/,
                    type: 'asset/inline'
                },
                {
                    test: /\.html$/,
                    loader: "file-loader"
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{ 
                    context: DEFAULT_SRC_DIR,
                    from: DEFAULT_COPY_MASK
                }]
            })
        ], ...config
    };

}
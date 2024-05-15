"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var path_1 = require("path");
var vite_plugin_eslint_1 = require("vite-plugin-eslint");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, '/src'),
            '@C': path_1.default.resolve(__dirname, '/src/components'),
            '@HC': path_1.default.resolve(__dirname, '/src/pages/Homepage/components'),
            '@DC': path_1.default.resolve(__dirname, '/src/pages/Dashboard/components'),
            '@DL': path_1.default.resolve(__dirname, '/src/pages/Dashboard/lib'),
        },
    },
    plugins: [
        (0, plugin_react_1.default)(),
        (0, vite_plugin_eslint_1.default)(),
    ],
});

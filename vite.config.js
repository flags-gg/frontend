import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
            '@C': path.resolve(__dirname, '/src/components'),
            '@HC': path.resolve(__dirname, '/src/Homepage/components'),
            '@H': path.resolve(__dirname, '/src/Homepage'),
        },
    },
    plugins: [
        react(),
        eslint(),
    ],
});

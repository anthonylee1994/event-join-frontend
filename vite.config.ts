import {defineConfig} from "vite";
import React from "@vitejs/plugin-react";
import MKCert from "vite-plugin-mkcert";
import CommonJS from "vite-plugin-commonjs";

export default defineConfig({
    server: {https: true},
    plugins: [React(), MKCert(), CommonJS()],
});

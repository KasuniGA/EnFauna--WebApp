import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(), // Enables React Fast Refresh and JSX support
  ],
  resolve: {
    alias: {
      // Aliases for cleaner imports
      "/Backend": path.resolve(__dirname, "Backend"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    // Development server settings
    port: 3000, // Change the default port if needed
    open: true, // Automatically opens the app in the browser
    hmr: {
      protocol: "ws", // Ensures Hot Module Reloading works over WebSocket
    },
  },
  build: {
    // Build-specific optimizations
    outDir: "dist", // Specifies the output directory
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]", // Custom asset file naming
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
      },
    },
  },
  css: {
    // CSS Preprocessor options
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`, // Import global SCSS variables/mixins
      },
    },
  },
});

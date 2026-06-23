import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Site is 100% SSG. Prerendered pages are served straight from the ASSETS
// binding (no R2/KV needed) — this cache is what makes /tin-tuc/[slug] etc.
// resolve instead of 404ing.
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});

// Next.js 16 defaults `next build` to Turbopack, whose server chunk layout
// OpenNext can't load at runtime (ChunkLoadError). Force the webpack build.
config.buildCommand = "npx --no-install next build --webpack";

export default config;

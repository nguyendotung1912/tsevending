import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Site is 100% SSG (no ISR/revalidate), so no incremental cache / R2 needed.
export default defineCloudflareConfig();

import "carbon-components-svelte/css/g100.css";
import App from "./App.svelte";

import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";

// Initialize the Sentry SDK here
Sentry.init({
  dsn: "https://132f66686e95436a80431c21cbb8c637@o572617.ingest.sentry.io/4504159840960512",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;

// Use the standard Playwright fixture
import { test as base, expect } from "@playwright/test";

// Re-export the base fixture
// You can extend 'base' here if you need custom fixtures later
export { base as test, expect };
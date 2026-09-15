import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

/**
 * Lightweight overflow probe using Playwright if available,
 * otherwise skips gracefully after build verification.
 */
async function main() {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.log("Playwright not installed — skipping browser overflow probe.");
    process.exit(0);
  }

  const widths = [320, 360, 375, 390, 414, 430, 768, 1280];
  const base = process.env.PORTFOLIO_URL || "http://localhost:3000";

  const browser = await playwright.chromium.launch({ headless: true });
  const results = [];

  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
    });
    await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(800);

    const report = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
      const clientWidth = doc.clientWidth;
      const overflowing = [];

      for (const el of document.querySelectorAll("body *")) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue;
        if (rect.right > clientWidth + 1 || rect.left < -1) {
          const tag = el.tagName.toLowerCase();
          const cls = typeof el.className === "string" ? el.className.slice(0, 80) : "";
          overflowing.push({
            tag,
            cls,
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          });
        }
      }

      return {
        scrollWidth,
        clientWidth,
        hasPageOverflow: scrollWidth > clientWidth + 1,
        overflowing: overflowing.slice(0, 12),
      };
    });

    results.push({ width, ...report });
    await page.close();
  }

  await browser.close();

  let failed = false;
  for (const r of results) {
    const status = r.hasPageOverflow ? "FAIL" : "ok";
    if (r.hasPageOverflow) failed = true;
    console.log(
      `[${status}] ${r.width}px — scrollWidth=${r.scrollWidth} clientWidth=${r.clientWidth}`,
    );
    if (r.overflowing.length) {
      for (const o of r.overflowing) {
        console.log(`  → <${o.tag} class="${o.cls}"> left=${o.left} right=${o.right}`);
      }
    }
  }

  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

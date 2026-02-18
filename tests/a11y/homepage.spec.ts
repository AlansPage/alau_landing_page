import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test("homepage has no detectable WCAG 2.2 AA violations", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")

  const results = await new AxeBuilder({ page }).analyze()

  const summary = results.violations
    .map((violation) => `${violation.id} (${violation.impact}) - ${violation.nodes.length} node(s)`)
    .join("\n")

  expect(results.violations, summary).toEqual([])
})

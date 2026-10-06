import { test, expect } from "@playwright/test";
test("project dialogs, filters and keyboard navigation", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Mohamed Samhi." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Machine learning", exact: true })
    .last()
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "View case study", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "System architecture" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
});
test("contact validation and real API persistence response", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();
  await page.getByLabel("Your name").fill("Portfolio browser check");
  await page.getByLabel("Email address").fill("test@example.com");
  await page
    .getByLabel("What’s on your mind?")
    .fill("Integration verification");
  await page
    .getByLabel("Your message")
    .fill(
      "This is an automated integration verification of the portfolio contact form.",
    );
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Message sent successfully.")).toBeVisible({
    timeout: 15000,
  });
});
test("responsive layouts and mobile navigation", async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Mohamed Samhi." })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBe(false);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("API failure is honest and retryable", async ({ page }) => {
  await page.route("**/api/v1/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "Unavailable" }),
    }),
  );
  await page.goto("/#contact");
  await page.getByLabel("Your name").fill("Error handling check");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("What’s on your mind?").fill("Failure behavior");
  await page
    .getByLabel("Your message")
    .fill(
      "This request verifies graceful error handling when the backend is unavailable.",
    );
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(
    page.getByText("Your message couldn’t be sent.", { exact: false }),
  ).toBeVisible();
});

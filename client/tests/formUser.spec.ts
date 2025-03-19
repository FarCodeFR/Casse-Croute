import { expect, test } from "@playwright/test";

test("Étape d'inscription, de connexion et enfin de déconnexion d'un utilisateur", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/register");

  await page.fill("input[name='email']", "thomas-45@email.fr");
  await page.fill("input[name='pseudo']", "Lecuisinier44");
  await page.fill("input[name='password']", "Supersuper2");
  await page.fill("input[name='passwordConfirm']", "Supersuper2");

  await page.click("input[type='checkbox'][name='legal-notices']");

  await page.waitForSelector("button[type='submit']");
  await page.click("button[type='submit']");
  await expect(page.locator("text=Inscription réussie")).toBeVisible();

  await expect(page).toHaveURL("http://localhost:3000/login");

  await expect(page.locator("text=Heureux de vous revoir")).toBeVisible();

  await page.fill("input[name='email']", "thomas-45@email.fr");
  await page.fill("input[name='password']", "Supersuper2");

  await page.waitForSelector("button[type='submit']");
  await page.click("button[type='submit']");

  await expect(page.locator("text=Connexion réussie")).toBeVisible();

  await expect(page).toHaveURL("http://localhost:3000/view-profile/profile");
  await expect(page.locator("text=profil")).toBeVisible();

  await page.click(".hamburger-react");

  await expect(page.locator("text=Déconnexion")).toBeVisible();

  await page.click('a[href="/"]');

  await page.goto("http://localhost:3000");
});

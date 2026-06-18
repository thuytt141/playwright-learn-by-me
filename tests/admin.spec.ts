import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

const VALID_USER = 'admin';
const VALID_PASS = 'Bdsv@2026';

test('login successful', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASS);

  const dashboard = new DashboardPage(page);
  await expect(dashboard.heading).toBeVisible();
});

test('login failed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USER, 'wrong-password');

  await expect(loginPage.errorMessage).toBeVisible();
});

test.describe('Admin Dashboard', { tag: '@Lead-menu' }, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASS);

    const dashboard = new DashboardPage(page);
    await dashboard.waitForLoad();
  });

  test('click on lead menu', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.waitForLoad();
    await dashboard.openLeadList();
    await expect(page.getByRole('button', { name: 'Tạo Lead' })).toBeVisible();
  });

  test('click on Deal menu', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.waitForLoad();
    await dashboard.openDealList();
    await expect(page.getByRole('button', { name: 'Tạo Deal' })).toBeVisible();
  });

  test('click on Tiến trình pipeline', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.waitForLoad();
    await dashboard.openPipeline();
    await expect(page.getByText('Kanban Pipeline')).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test('login successful', async ({ page }) => {
    
  await page.goto('https://admin-bdsv.hexigon.tech/');
  await page.getByLabel('Tài khoản').click();
    await page.getByLabel('Tài khoản').fill('admin');
    await page.getByLabel('Mật khẩu').click();
    await page.getByLabel('Mật khẩu').fill('Bdsv@2026');
    await page.click('button:has-text("Đăng nhập")');


  // Expect a title "to contain" a substring.
  //await expect(page).tocontain('Tông quan');
  await expect(page.getByRole('heading', { name: 'Tổng quan' })).toBeVisible();
});

test('login failed', async ({ page }) => {
  await page.goto('https://admin-bdsv.hexigon.tech/');
  await page.getByLabel('Tài khoản').click();
    await page.getByLabel('Tài khoản').fill('admin');
    await page.getByLabel('Mật khẩu').click();
    await page.getByLabel('Mật khẩu').fill('Bdsv@20265');
    await page.click('button:has-text("Đăng nhập")');

  // Expect an error message to be visible.
  await expect(page.getByText('Account not found')).toBeVisible();
});

test.describe('Admin Dashboard', { tag: '@Lead-menu' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://admin-bdsv.hexigon.tech/');
    await page.getByLabel('Tài khoản').click();
    await page.getByLabel('Tài khoản').fill('admin');
    await page.getByLabel('Mật khẩu').click();
    await page.getByLabel('Mật khẩu').fill('Bdsv@2026');
    await page.click('button:has-text("Đăng nhập")');
    
    // Wait for the dashboard to load
    await page.waitForLoadState('networkidle');
    });


test('click on lead menu', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByRole('menuitem', { name: 'Lead' }).click();
    
    // Click on Danh sách Lead
    await page.getByRole('menuitem', { name: 'Danh sách lead' }).click();
    
    // Verify Tạo Lead button is visible
    await expect(page.getByRole('button', { name: 'Tạo Lead' })).toBeVisible();
});

test('click on Deal menu', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByRole('menuitem', { name: 'Lead' }).click();
    
    // Click on Danh sách Lead
    await page.getByRole('menuitem', { name: 'Danh sách Deal' }).click();
    
    // Verify Tạo Deal button is visible
    await expect(page.getByRole('button', { name: 'Tạo Deal' })).toBeVisible();
});

test('click on Tiến trình pipeline', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByRole('menuitem', { name: 'Lead' }).click();
    
    // Click on Tiến trình Pipeline
    await page.getByRole('menuitem', { name: 'Tiến trình Pipeline' }).click();
    
    // Verify page has loaded with Kanban Pipeline content
    await expect(page.getByText('Kanban Pipeline')).toBeVisible();
});
});




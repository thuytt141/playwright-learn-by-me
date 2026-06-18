import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Tổng quan' });
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async openLeadList() {
    await this.page.getByRole('menuitem', { name: 'Lead' }).click();
    await this.page.getByRole('menuitem', { name: 'Danh sách lead' }).click();
  }

  async openDealList() {
    await this.page.getByRole('menuitem', { name: 'Lead' }).click();
    await this.page.getByRole('menuitem', { name: 'Danh sách Deal' }).click();
  }

  async openPipeline() {
    await this.page.getByRole('menuitem', { name: 'Lead' }).click();
    await this.page.getByRole('menuitem', { name: 'Tiến trình Pipeline' }).click();
  }
}

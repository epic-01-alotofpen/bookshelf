import { test, expect } from '@playwright/test'

test('蔵書一覧が表示される', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('list', { name: '蔵書一覧' })).toBeVisible()
    await expect(page.getByText('吾輩は猫である', { exact: false })).toBeVisible()
})
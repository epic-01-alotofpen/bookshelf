import { test, expect } from '@playwright/test'

test('ステータスで蔵書を絞り込める', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('全2件')).toBeVisible()
    await page.getByRole('button', { name: '読了' }).click()
    await expect(page.getByText('1件表示 / 全2件')).toBeVisible()
})
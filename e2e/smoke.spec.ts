import { test, expect } from '@playwright/test'

test('トップページにアプリ名が表示される', async ({ page }) => {
    await page.goto('/')
    await expect(
        page.getByRole('heading', { name: '蔵書管理' }),
    ).toBeVisible()
})
import { test, expect } from '@playwright/test'

test('検索フォームに入力すると結果が表示される', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('書籍検索').fill('漱石')
    await page.getByRole('button', { name: '検索' }).click()
    await expect(page.getByText('吾輩は猫である', { exact: false })).toBeVisible()
})
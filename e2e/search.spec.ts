import { test, expect } from '@playwright/test'

test('検索フォームに入力すると結果が表示される', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('書名・著者で検索').fill('漱石')
    await page.getByRole('button', { name: '検索' }).click()
    const results = page.getByRole('list', { name: '検索結果' })
    await expect(results.getByText('吾輩は猫である', { exact: false })).toBeVisible()
})
import { test, expect } from '@playwright/test'

test('蔵書のステータスを変更できる', async ({ page }) => {
    await page.goto('/')
    const select = page.getByRole('combobox', { name: '人間失格のステータス' })
    await select.selectOption('read')
    await expect(select).toHaveValue('read')
})
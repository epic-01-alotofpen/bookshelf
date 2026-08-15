import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookShelf } from './BookShelf'

async function renderShelf() {
    await act(async () => {
        render(<BookShelf />)
    })
    await screen.findByText(/吾輩は猫である/)
}

test('ステータスを変更すると選択が反映される', async () => {
    const user = userEvent.setup()
    await renderShelf()

    const select = screen.getByRole('combobox', { name: '人間失格のステータス' })
    expect(select).toHaveValue('reading')

    await user.selectOptions(select, 'read')

    await waitFor(() => expect(select).toHaveValue('read'))
})

test('変更は他の本に影響しない', async () => {
    const user = userEvent.setup()
    await renderShelf()

    const target = screen.getByRole('combobox', { name: '人間失格のステータス' })
    const other = screen.getByRole('combobox', { name: '吾輩は猫であるのステータス' })

    // 異なる値に変更し、他方が元の値を保つことを確認する
    await user.selectOptions(target, 'unread')
    await waitFor(() => expect(target).toHaveValue('unread'))

    expect(other).toHaveValue('read')
})
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookShelf } from './BookShelf'

async function renderShelf() {
    await act(async () => { render(<BookShelf />) })
    await screen.findByText(/吾輩は猫である/)
}

test('初期表示で全件数が表示される', async () => {
    await renderShelf()
    expect(screen.getByText('全2件')).toBeInTheDocument()
})

test('ステータスで絞り込むと該当書籍だけ表示される', async () => {
    const user = userEvent.setup()
    await renderShelf()

    await user.click(screen.getByRole('button', { name: '読了' }))

    expect(screen.getByText(/吾輩は猫である/)).toBeInTheDocument()
    expect(screen.queryByText(/人間失格/)).not.toBeInTheDocument()
    expect(screen.getByText('1件表示 / 全2件')).toBeInTheDocument()
})

test('該当がない絞り込みではメッセージを表示する', async () => {
    const user = userEvent.setup()
    await renderShelf()

    await user.click(screen.getByRole('button', { name: '未読' }))

    expect(screen.getByText('条件に合う本がありません。')).toBeInTheDocument()
})
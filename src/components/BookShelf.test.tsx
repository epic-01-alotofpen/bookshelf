import { render, screen, act } from '@testing-library/react'
import { BookShelf } from './BookShelf'

// 初期表示でサスペンドするコンポーネントは、
// render を await act(async) でラップして解決を待つ必要がある
async function renderBookShelf() {
    await act(async () => {
        render(<BookShelf />)
    })
}

test('蔵書一覧が表示される', async () => {
    await renderBookShelf()

    expect(await screen.findByText(/吾輩は猫である/)).toBeInTheDocument()
    expect(screen.getByText(/人間失格/)).toBeInTheDocument()
})

test('各書籍に読書ステータスの選択メニューが表示される', async () => {
    await renderBookShelf()

    expect(
        await screen.findByRole('combobox', { name: '吾輩は猫であるのステータス' }),
    ).toHaveValue('read')
    expect(
        screen.getByRole('combobox', { name: '人間失格のステータス' }),
    ).toHaveValue('reading')
})
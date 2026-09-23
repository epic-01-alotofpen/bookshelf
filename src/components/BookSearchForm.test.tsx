import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookSearchForm } from './BookSearchForm'

test('検索すると件数と結果が表示される', async () => {
    const user = userEvent.setup()
    render(<BookSearchForm />)

    await user.type(screen.getByLabelText('書名・著者で検索'), '漱石')
    await user.click(screen.getByRole('button', { name: '検索' }))

    expect(await screen.findByText('2件見つかりました')).toBeInTheDocument()
    const results = screen.getByRole('list', { name: '検索結果' })
    expect(within(results).getByText(/吾輩は猫である/)).toBeInTheDocument()
})

test('該当なしの検索ではメッセージを表示する', async () => {
    const user = userEvent.setup()
    render(<BookSearchForm />)

    await user.type(screen.getByLabelText('書名・著者で検索'), '存在しない書名')
    await user.click(screen.getByRole('button', { name: '検索' }))

    expect(await screen.findByText('該当する本がありません')).toBeInTheDocument()
})
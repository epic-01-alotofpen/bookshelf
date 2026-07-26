import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookSearchForm } from './BookSearchForm'

test('キーワードで検索すると一致する書籍が表示される', async () => {
    const user = userEvent.setup()
    render(<BookSearchForm />)

    await user.type(screen.getByLabelText('書籍検索'), '漱石')
    await user.click(screen.getByRole('button', { name: '検索' }))

    expect(await screen.findByText(/吾輩は猫である/)).toBeInTheDocument()
    expect(screen.getByText(/こころ/)).toBeInTheDocument()
    expect(screen.queryByText(/人間失格/)).not.toBeInTheDocument()
})

test('空欄で検索するとエラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<BookSearchForm />)

    await user.click(screen.getByRole('button', { name: '検索' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
        'キーワードを入力してください',
    )
})
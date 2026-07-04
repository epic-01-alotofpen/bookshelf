import { render, screen } from '@testing-library/react'
import { AppHeader } from './AppHeader'

test('アプリ名が見出しとして表示される', () => {
    render(<AppHeader />)
    expect(
        screen.getByRole('heading', { name: '蔵書管理' }),
    ).toBeInTheDocument()
})
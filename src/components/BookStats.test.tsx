import { render, screen } from '@testing-library/react'
import { BookStats } from './BookStats'
import type { UserBook } from '../types'

function makeBook(status: UserBook['status']): UserBook {
    return { book: { id: crypto.randomUUID(), title: 't', authors: ['a'] }, status, tags: [], memo: '', addedAt: '2026-01-01' }
}

test('ステータス別の冊数を表示する', () => {
    const books = [makeBook('read'), makeBook('read'), makeBook('reading')]
    render(<BookStats books={books} />)

    expect(screen.getByText('読了 2 冊')).toBeInTheDocument()
    expect(screen.getByText('読書中 1 冊')).toBeInTheDocument()
    expect(screen.getByText('未読 0 冊')).toBeInTheDocument()
})

import { use } from 'react'
import type { UserBook } from '../types'

const STATUS_LABEL: Record<UserBook['status'], string> = {
    unread: '未読',
    reading: '読書中',
    read: '読了',
}

type Props = { booksPromise: Promise<UserBook[]> }

export function BookList({ booksPromise }: Props) {
    const userBooks = use(booksPromise)

    if (userBooks.length === 0) {
        return <p className="empty">登録された本はありません。</p>
    }

    return (
        <ul className="shelf-list" aria-label="蔵書一覧">
            {userBooks.map((ub) => (
                <li key={ub.book.id}>
                    <span className="shelf-list__title">
                        {ub.book.title}（{ub.book.authors.join(', ')}）
                    </span>
                    <span className={`status status--${ub.status}`}>
                        {STATUS_LABEL[ub.status]}
                    </span>
                </li>
            ))}
        </ul>
    )
}
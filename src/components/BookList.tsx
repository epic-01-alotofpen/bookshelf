import { use, useState, useOptimistic, useTransition } from 'react'
import type { UserBook, ReadingStatus } from '../types'
import { updateUserBookStatus } from '../api/updateUserBookStatus'

type Props = { booksPromise: Promise<UserBook[]> }

type StatusUpdate = { id: string; status: ReadingStatus }

export function BookList({ booksPromise }: Props) {
    // use で読み込んだデータを useState に移し、更新可能な状態にする
    const loaded = use(booksPromise)
    const [books, setBooks] = useState(loaded)
    const [isPending, startTransition] = useTransition()

    // books をベースに、楽観的なステータス上書きを重ねる
    const [optimisticBooks, applyOptimistic] = useOptimistic(
        books,
        (current, update: StatusUpdate) =>
            current.map((ub) =>
                ub.book.id === update.id ? { ...ub, status: update.status } : ub,
            ),
    )

    function handleStatusChange(id: string, status: ReadingStatus) {
        startTransition(async () => {
            applyOptimistic({ id, status })         // 画面を即座に更新
            await updateUserBookStatus(id, status)  // サーバー（モック）へ送信
            setBooks((prev) =>                       // 本物の状態を確定
                prev.map((ub) => (ub.book.id === id ? { ...ub, status } : ub)),
            )
        })
    }

    if (optimisticBooks.length === 0) {
        return <p className="empty">登録された本はありません。</p>
    }

    return (
        <ul className="shelf-list" aria-label="蔵書一覧">
            {optimisticBooks.map((ub) => (
                <li key={ub.book.id}>
                    <span className="shelf-list__title">
                        {ub.book.title}（{ub.book.authors.join(', ')}）
                    </span>
                    <select
                        className={`status-select status-select--${ub.status}`}
                        aria-label={`${ub.book.title}のステータス`}
                        value={ub.status}
                        disabled={isPending}
                        onChange={(e) =>
                            handleStatusChange(ub.book.id, e.target.value as ReadingStatus)
                        }
                    >
                        <option value="unread">未読</option>
                        <option value="reading">読書中</option>
                        <option value="read">読了</option>
                    </select>
                </li>
            ))}
        </ul>
    )
}
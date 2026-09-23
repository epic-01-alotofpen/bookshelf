import { use, useState, useOptimistic, useTransition } from 'react'
import type { UserBook, ReadingStatus } from '../types'
import { updateUserBookStatus } from '../api/updateUserBookStatus'
import { BookStats } from './BookStats'

type Props = { booksPromise: Promise<UserBook[]> }
type StatusUpdate = { id: string; status: ReadingStatus }
type Filter = ReadingStatus | 'all'

const FILTERS: { value: Filter; label: string }[] = [
    { value: 'all', label: 'すべて' },
    { value: 'unread', label: '未読' },
    { value: 'reading', label: '読書中' },
    { value: 'read', label: '読了' },
]

export function BookList({ booksPromise }: Props) {
    const loaded = use(booksPromise)
    const [books, setBooks] = useState(loaded)
    const [filter, setFilter] = useState<Filter>('all')
    const [isPending, startTransition] = useTransition()

    const [optimisticBooks, applyOptimistic] = useOptimistic(
        books,
        (current, update: StatusUpdate) =>
            current.map((ub) =>
                ub.book.id === update.id ? { ...ub, status: update.status } : ub,
            ),
    )

    function handleStatusChange(id: string, status: ReadingStatus) {
        startTransition(async () => {
            applyOptimistic({ id, status })
            await updateUserBookStatus(id, status)
            setBooks((prev) =>
                prev.map((ub) => (ub.book.id === id ? { ...ub, status } : ub)),
            )
        })
    }

    if (optimisticBooks.length === 0) {
        return <p className="empty">登録された本はありません。</p>
    }

    // 派生値：state にせずレンダー時に算出する
    const visibleBooks =
        filter === 'all'
            ? optimisticBooks
            : optimisticBooks.filter((ub) => ub.status === filter)

    const countLabel =
        filter === 'all'
            ? `全${optimisticBooks.length}件`
            : `${visibleBooks.length}件表示 / 全${optimisticBooks.length}件`

    return (
        <>
            <BookStats books={optimisticBooks} />
            <div className="shelf-controls">
                <div className="filter" role="group" aria-label="ステータスで絞り込み">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            type="button"
                            className={filter === f.value ? 'filter__btn is-active' : 'filter__btn'}
                            aria-pressed={filter === f.value}
                            onClick={() => setFilter(f.value)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <p className="shelf-count">{countLabel}</p>
            </div>

            {visibleBooks.length === 0 ? (
                <p className="empty">条件に合う本がありません。</p>
            ) : (
                <ul className="shelf-list" aria-label="蔵書一覧">
                    {visibleBooks.map((ub) => (
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
            )}
        </>
    )
}
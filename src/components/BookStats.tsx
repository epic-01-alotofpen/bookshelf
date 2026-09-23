import type { UserBook } from '../types'
import { countByStatus } from '../lib/stats'

export function BookStats({ books }: { books: UserBook[] }) {
    const s = countByStatus(books)
    return (
        <ul className="stats" aria-label="読書統計">
            <li>{`読了 ${s.read} 冊`}</li>
            <li>{`読書中 ${s.reading} 冊`}</li>
            <li>{`未読 ${s.unread} 冊`}</li>
        </ul>
    )
}
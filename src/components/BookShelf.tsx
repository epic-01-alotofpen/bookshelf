import { Suspense, useState } from 'react'
import { fetchUserBooks } from '../api/fetchUserBooks'
import { BookList } from './BookList'

export function BookShelf() {
    const [booksPromise] = useState(() => fetchUserBooks())
    return (
        <section className="card card--shelf">
            <h2 className="card__title">蔵書一覧</h2>
            <p className="card__desc">登録済みの本の一覧です。ステータスはその場で変更できます。</p>
            <Suspense fallback={<p className="loading">読み込み中…</p>}>
                <BookList booksPromise={booksPromise} />
            </Suspense>
        </section>
    )
}
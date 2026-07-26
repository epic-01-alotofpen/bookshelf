import { useActionState } from 'react'
import { searchBooks } from '../api/searchBooks'
import type { Book } from '../types'

type SearchState = {
    books: Book[]
    error: string | null
}

const initialState: SearchState = { books: [], error: null }

export function BookSearchForm() {
    const [state, formAction, isPending] = useActionState(
        async (_prev: SearchState, formData: FormData): Promise<SearchState> => {
            const query = String(formData.get('query') ?? '').trim()
            if (!query) return { books: [], error: 'キーワードを入力してください' }
            try {
                const books = await searchBooks(query)
                return { books, error: null }
            } catch {
                return { books: [], error: '検索に失敗しました' }
            }
        },
        initialState,
    )

    return (
        <section>
            <form action={formAction}>
                <label htmlFor="query">書籍検索</label>
                <input id="query" name="query" type="text" />
                <button type="submit" disabled={isPending}>
                    {isPending ? '検索中…' : '検索'}
                </button>
            </form>
            {state.error && <p role="alert">{state.error}</p>}
            <ul>
                {state.books.map((book) => (
                    <li key={book.id}>
                        {book.title}（{book.authors.join(', ')}）
                    </li>
                ))}
            </ul>
        </section>
    )
}
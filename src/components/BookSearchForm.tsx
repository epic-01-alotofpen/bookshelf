import { useActionState } from 'react'
import { searchBooks } from '../api/searchBooks'
import type { Book } from '../types'

type SearchState = { books: Book[]; error: string | null }
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
        <section className="card card--search">
            <h2 className="card__title">本を探して登録</h2>
            <p className="card__desc">Google Books から検索して蔵書に追加します。</p>
            <form className="search-form" action={formAction}>
                <label className="search-form__field">
                    <span>書名・著者で検索</span>
                    <input name="query" type="text" placeholder="例：夏目漱石" />
                </label>
                <button type="submit" disabled={isPending}>
                    {isPending ? '検索中…' : '検索'}
                </button>
            </form>
            {state.error && <p className="error" role="alert">{state.error}</p>}
            <ul className="results" aria-label="検索結果">
                {state.books.map((book) => (
                    <li key={book.id}>{book.title}（{book.authors.join(', ')}）</li>
                ))}
            </ul>
        </section>
    )
}
import type { Book } from '../types'

const MOCK_BOOKS: Book[] = [
    { id: '1', title: '吾輩は猫である', authors: ['夏目漱石'], publisher: '岩波書店' },
    { id: '2', title: 'こころ', authors: ['夏目漱石'], publisher: '新潮社' },
    { id: '3', title: '人間失格', authors: ['太宰治'], publisher: '新潮社' },
]

// TODO:フェーズ2以降で実際の Google Books API 呼び出しに差し替える
export async function searchBooks(query: string): Promise<Book[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return MOCK_BOOKS.filter(
        (b) => b.title.includes(query) || b.authors.some((a) => a.includes(query)),
    )
}

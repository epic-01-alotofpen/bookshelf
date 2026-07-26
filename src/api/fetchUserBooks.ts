import type { UserBook } from '../types'

const MOCK_USER_BOOKS: UserBook[] = [
    {
        book: { id: '1', title: '吾輩は猫である', authors: ['夏目漱石'] },
        status: 'read', rating: 5, tags: ['名作'], memo: '', addedAt: '2026-01-10',
        finishedAt: '2026-01-20',
    },
    {
        book: { id: '3', title: '人間失格', authors: ['太宰治'] },
        status: 'reading', tags: [], memo: '', addedAt: '2026-02-01',
    },
]

// フェーズ2以降で実データ取得に差し替える
export async function fetchUserBooks(): Promise<UserBook[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return MOCK_USER_BOOKS
}
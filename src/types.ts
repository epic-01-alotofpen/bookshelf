/** 書籍情報 */
export type Book = {
    id: string
    title: string
    authors: string[]
    isbn?: string
    publisher?: string
    thumbnailUrl?: string
}

/** 読書状態 */
export type ReadingStatus = 'unread' | 'reading' | 'read'

/** ユーザーの書籍情報 */
export type UserBook = {
    book: Book
    status: ReadingStatus
    rating?: number
    tags: string[]
    memo: string
    addedAt: string
    finishedAt?: string
}
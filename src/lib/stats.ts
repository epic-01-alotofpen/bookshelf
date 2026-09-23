import type { UserBook, ReadingStatus } from '../types'

// ステータス別の冊数を集計する
export function countByStatus(books: UserBook[]): Record<ReadingStatus, number> {
    const result: Record<ReadingStatus, number> = { unread: 0, reading: 0, read: 0 }
    for (const ub of books) {
        result[ub.status]++
    }
    return result
}

// 読了した本を、読了年ごとに集計する（finishedAt が無いものは除外）
export function countReadByYear(books: UserBook[]): Record<string, number> {
    const result: Record<string, number> = {}
    for (const ub of books) {
        if (ub.status === 'read' && ub.finishedAt) {
            const year = ub.finishedAt.slice(0, 4)
            result[year] = (result[year] ?? 0) + 1
        }
    }
    return result
}

// タグごとの冊数を集計する
export function countByTag(books: UserBook[]): Record<string, number> {
    const result: Record<string, number> = {}
    for (const ub of books) {
        for (const tag of ub.tags) {
            result[tag] = (result[tag] ?? 0) + 1
        }
    }
    return result
}
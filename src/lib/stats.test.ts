import { countByStatus, countReadByYear, countByTag } from './stats'
import type { UserBook } from '../types'

// テスト用のダミーデータを組み立てるヘルパー
function makeBook(overrides: Partial<UserBook> = {}): UserBook {
    return {
        book: { id: 'x', title: 'タイトル', authors: ['著者'] },
        status: 'unread',
        tags: [],
        memo: '',
        addedAt: '2026-01-01',
        ...overrides,
    }
}

describe('countByStatus', () => {
    test('ステータスごとに冊数を数える', () => {
        const books = [
            makeBook({ status: 'read' }),
            makeBook({ status: 'read' }),
            makeBook({ status: 'reading' }),
        ]
        expect(countByStatus(books)).toEqual({ unread: 0, reading: 1, read: 2 })
    })

    test('空配列ではすべて0を返す', () => {
        expect(countByStatus([])).toEqual({ unread: 0, reading: 0, read: 0 })
    })
})

describe('countReadByYear', () => {
    test('読了かつ finishedAt がある本を年ごとに数える', () => {
        const books = [
            makeBook({ status: 'read', finishedAt: '2025-06-10' }),
            makeBook({ status: 'read', finishedAt: '2026-01-20' }),
            makeBook({ status: 'read', finishedAt: '2026-03-05' }),
        ]
        expect(countReadByYear(books)).toEqual({ '2025': 1, '2026': 2 })
    })

    test('読了でも finishedAt が無ければ除外する', () => {
        const books = [makeBook({ status: 'read' })]
        expect(countReadByYear(books)).toEqual({})
    })

    test('読了以外は数えない', () => {
        const books = [makeBook({ status: 'reading', finishedAt: '2026-01-01' })]
        expect(countReadByYear(books)).toEqual({})
    })
})

describe('countByTag', () => {
    test('タグごとに冊数を数える（1冊が複数タグを持つ場合も加算）', () => {
        const books = [
            makeBook({ tags: ['名作', '和書'] }),
            makeBook({ tags: ['名作'] }),
        ]
        expect(countByTag(books)).toEqual({ 名作: 2, 和書: 1 })
    })

    test('タグが無ければ空オブジェクトを返す', () => {
        expect(countByTag([makeBook({ tags: [] })])).toEqual({})
    })
})
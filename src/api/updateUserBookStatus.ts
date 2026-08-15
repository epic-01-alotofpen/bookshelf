import type { ReadingStatus } from '../types'

// サーバーへの更新リクエストを模したモック。実際にはサーバーが更新結果を返す想定。
export async function updateUserBookStatus(
    id: string,
    status: ReadingStatus,
): Promise<{ id: string; status: ReadingStatus }> {
    await new Promise((r) => setTimeout(r, 400))
    return { id, status }
}
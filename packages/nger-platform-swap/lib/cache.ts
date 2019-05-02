import { Cache } from 'nger-core'
export class NgerSwapCache extends Cache {
    get<T>(key: string): Promise<T> { }
    put<T>(key: string, value: T): Promise<boolean> { }
    remove<T>(key: string): Promise<boolean> { }
    clear(): void { }
}
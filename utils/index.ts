type AsyncResults<T> = [T, null] | [null, Error];

export async function to<T>(promise: Promise<T>): Promise<AsyncResults<T>> {
    try {
        return [await promise, null];
    } catch (err: unknown) {
        return [null, err instanceof Error ? err : new Error(String(err))];
    }
}

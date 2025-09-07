export function delay(n: number): Promise<void> {
	return new Promise((res) => {
		setTimeout(res, n)
	})
}

export function timeout<T>(p: Promise<T>, n: number): Promise<T> {
	return Promise.race([
		p,
		delay(n).then(() => {
			throw new Error(`timeout`)
		}),
	])
}

export function async<T>(fn: () => T): Promise<T> {
	return new Promise((res) => res(fn()))
}

export function sequence<T, U>(
	fn: (v: T) => Promise<U>,
	arr: T[]
): Promise<U[]> {
	return arr.reduce<Promise<U[]>>(async (p, v) => {
		const prev = await p
		const next = await fn(v)
		return prev.concat(next)
	}, Promise.resolve([]))
}
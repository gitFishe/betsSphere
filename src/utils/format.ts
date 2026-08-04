// 154600 to "$154,600"
export function formatUsd(value: number): string {
    return `$${Math.round(value).toLocaleString('en-US')}`
}

// 0.7622 to 76.2
export function toPercent(price: number): number {
    return Math.round(price * 1000) / 10
}

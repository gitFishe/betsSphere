// "2024-03-15T10:00:00Z" | Date | number  to  "Mmm yyyy"
export function formatMonthYear(date: string | number | Date): string {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''

    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
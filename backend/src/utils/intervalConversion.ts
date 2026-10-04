import type { IntervalType } from "../schemas";

export const convertIntervalObjectToString = (intervalData: IntervalType) => {
    if (typeof intervalData == 'string') return intervalData;
    const parts = Object.entries(intervalData)
        .filter(([k, v]) => v !== null && v !== undefined && v != 0)
        .map(([k, v]) => `${v} ${k}`);
    return parts.length > 0 ? parts.join(' ') : '0 days';
}

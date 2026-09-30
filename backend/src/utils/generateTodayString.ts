export default function generateTodayString() {
    // Return format: YYYY-MM-DD
    const formatter = new Intl.DateTimeFormat(
        'en-CA',
        {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }
    );
    const todayStr = formatter.format(new Date());
    return todayStr;
}

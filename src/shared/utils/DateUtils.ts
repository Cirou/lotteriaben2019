export function formatDate(date) {
    return date.toISOString().split('T')[0];
}

export function formatDateTime(date) {
    const formattedDate = date.toISOString().split('T').join(' ').split('Z')[0];
    return formattedDate.substring(0, formattedDate.length - 4);
}

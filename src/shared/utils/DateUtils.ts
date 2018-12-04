export function formatDate(date) {
    return date.toISOString().split('T')[0];
}

export function formatDateTime(date) {
    const formattedDate = date.toISOString().split('T').join(' ').split('Z')[0];
    return formattedDate.substring(0, formattedDate.length - 4);
}

export function formatDateTimezone(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

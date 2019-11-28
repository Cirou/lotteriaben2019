"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date) {
    return date.toISOString().split('T')[0];
}
exports.formatDate = formatDate;
function formatDateTime(date) {
    var formattedDate = date.toISOString().split('T').join(' ').split('Z')[0];
    return formattedDate.substring(0, formattedDate.length - 4);
}
exports.formatDateTime = formatDateTime;
function formatDateTimezone(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}
exports.formatDateTimezone = formatDateTimezone;

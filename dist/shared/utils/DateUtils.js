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

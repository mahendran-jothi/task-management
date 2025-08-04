export const toTitleCase = (text) => text.replace(/_/g, ' ')
    .replace(/\b\w/g, text => text.toUpperCase());
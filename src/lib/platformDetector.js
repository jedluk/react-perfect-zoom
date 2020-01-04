export const touchDevice = 'ontouchstart' in document.documentElement;

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

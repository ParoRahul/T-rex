
export const IS_HIDPI: boolean = window.devicePixelRatio > 1;
export const IS_IOS: boolean = /iPad|iPhone|iPod/.test(window.navigator.platform);
export const IS_MOBILE: boolean = /Android/.test(window.navigator.userAgent) || IS_IOS;
export const IS_TOUCH_ENABLED:boolean = 'ontouchstart' in window;

export function getTimeStamp(): number {
    return IS_IOS ? new Date().getTime() : performance.now();
}

export function getRandomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
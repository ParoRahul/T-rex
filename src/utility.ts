
export const IS_HIDPI: boolean = window.devicePixelRatio > 1;
export const IS_IOS: boolean = /iPad|iPhone|iPod/.test(window.navigator.platform);
export const IS_MOBILE: boolean = /Android/.test(window.navigator.userAgent) || IS_IOS;
export const IS_TOUCH_ENABLED: boolean = 'ontouchstart' in window;
export const FPS = 60;

export const spriteDefinition = {
    HDPI: {
        CACTUS_LARGE: { x: 652, y: 2 },
        CACTUS_SMALL: { x: 446, y: 2 },
        CLOUD: { x: 166, y: 2 },
        HORIZON: { x: 2, y: 104 },
        MOON: { x: 954, y: 2 },
        PTERODACTYL: { x: 260, y: 2 },
        RESTART: { x: 2, y: 2 },
        STAR: { x: 1276, y: 2 },
        TEXT_SPRITE: { x: 1294, y: 2 },
        TREX: { x: 1678, y: 2 },
    },
    LDPI: {
        CACTUS_LARGE: { x: 332, y: 2 },
        CACTUS_SMALL: { x: 228, y: 2 },
        CLOUD: { x: 86, y: 2 },
        HORIZON: { x: 2, y: 54 },
        MOON: { x: 484, y: 2 },
        PTERODACTYL: { x: 134, y: 2 },
        RESTART: { x: 2, y: 2 },
        STAR: { x: 645, y: 2 },
        TEXT_SPRITE: { x: 655, y: 2 },
        TREX: { x: 848, y: 2 },
    },
};

export function getTimeStamp(): number {
    return IS_IOS ? new Date().getTime() : performance.now();
}

export function getRandomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface IDimensions { WIDTH: number; HEIGHT: number; }
export interface IPosition { x: number; y: number; }
export class CollisionBox {

    constructor( public x: number, public y: number, public WIDTH: number, public HEIGHT: number ) { }
}

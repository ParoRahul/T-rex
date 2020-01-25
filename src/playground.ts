import { PlayGroundConfig } from "./playgroundconfig" ;
import { GameObject } from "./gameobject";
import { Canvas } from './canvas'

const enum PlayGroundClass  {
    CANVAS = 'runner-canvas',
    CONTAINER = 'runner-container',
    CRASHED = 'crashed',
    ICON = 'icon-offline',
    INVERTED = 'inverted',
    SNACKBAR = 'snackbar',
    SNACKBAR_SHOW = 'snackbar-show',
    TOUCH_CONTROLLER = 'controller'
};

const enum PlayGroundEvent {
    ANIM_END = 'webkitAnimationEnd',
    CLICK = 'click',
    KEYDOWN = 'keydown',
    KEYUP = 'keyup',
    MOUSEDOWN = 'mousedown',
    MOUSEUP = 'mouseup',
    RESIZE = 'resize',
    TOUCHEND = 'touchend',
    TOUCHSTART = 'touchstart',
    VISIBILITY = 'visibilitychange',
    BLUR = 'blur',
    FOCUS = 'focus',
    LOAD = 'load'
}


export class PlayGround {

    public static getsFPS(): number { return PlayGround.FPS; }
    public static getRandomNum(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public static getTimeStamp(): number {
        return PlayGround.IS_IOS ? new Date().getTime() : performance.now();
    }
    private static readonly FPS: number = 60;
    private static readonly DEFAULT_WIDTH: number = 600;
    private static readonly DEFAULT_HEIGHT: number = 150;
    private static IS_HIDPI: boolean = window.devicePixelRatio > 1;
    private static IS_IOS: boolean = /iPad|iPhone|iPod/.test(window.navigator.platform);
    private static IS_MOBILE: boolean = /Android/.test(window.navigator.userAgent) || PlayGround.IS_IOS;
    private static IS_TOUCH_ENABLED:boolean = 'ontouchstart' in window;

    private config: PlayGroundConfig;
    private distanceMeter: any;
    private msPerFrame: number;
    private currentSpeed: number;
    private containerEl: HTMLDivElement;
    private snackbarEl: any ;
    private detailsButton: any;
    private canvas: Canvas;
    private tRex: any;
    private obstacles: any;
    private audioBuffer: any = null;
    private soundFx: any = {};
    private audioContext: any;
    private images: any;
    private imagesLoaded: any;
    private gameObject: GameObject;

    constructor(private outerContainerEl: string, config?: PlayGroundConfig,
                private dimensions = {'HEIGHT': PlayGround.DEFAULT_HEIGHT, 'WIDTH': PlayGround.DEFAULT_WIDTH },
                private time: number = 0, private runningTime: number = 0,
                private playCount: number = 0,
                private highestScore: number = 0, private distanceRan: number = 0,
                private activated: boolean = false, private playing: boolean = false,
                private crashed: boolean = false, private paused: boolean = false,
                private inverted: boolean = false,
                private invertTimer: number = 0, private resizeTimerId: number = 0 ) {

        this.config = config || new PlayGroundConfig();
        this.outerContainerEl = outerContainerEl;
        this.containerEl = document.createElement('div');
        this.containerEl.className = PlayGroundClass.CONTAINER;
        this.canvas = new Canvas(this.dimensions.WIDTH, this.dimensions.HEIGHT, PlayGroundClass.CANVAS)
        this.containerEl.appendChild(this.canvas.Element)
        this.msPerFrame = 1000 / PlayGround.FPS;
        this.currentSpeed = this.config.SPEED;
        /* this.canvasCtx = this.canvas.getContext('2d'); */
        // this.gameObject = new GameObject(this.canvas)
    }
}

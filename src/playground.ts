import { Observable,fromEvent} from "rxjs"; 
import { IS_HIDPI,IDimensions,spriteDefinition } from './utility'
import { PlayGroundConfig } from "./playgroundconfig" ;
import { GameObject } from "./gameobject";
import { Canvas } from './canvas';
import { Cloud } from './cloud';
import { HorizonLine } from "./horizonline";
import { Obstacle } from "./obstacle";

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
    private static readonly FPS: number = 60;    
    private outerContainer: HTMLElement;
    private container: HTMLDivElement;
    private config: PlayGroundConfig;
    private dimensions: IDimensions;
    //private imageSprite: HTMLImageElement;
    private spriteDef: any;
    private distanceMeter: any;
    private msPerFrame: number;
    private currentSpeed: number;
    private snackbarEl: any ;
    private detailsButton: any;
    private canvas: Canvas;
    private tRex: any;
    private obstacles: any;
    private audioBuffer: any = null;
    private soundFx: any = {};
    private audioContext: any;
    private images: any;
    private imagesLoaded: number;
    private gameObject: GameObject;
    private horizonLine: HorizonLine;
    private clouds: Cloud[];
    private obstacle: Obstacle[];

    constructor(private outerContainerId: string, config?: PlayGroundConfig,
                private time: number = 0, private runningTime: number = 0,
                private playCount: number = 0,
                private highestScore: number = 0, private distanceRan: number = 0,
                private activated: boolean = false, private playing: boolean = false,
                private crashed: boolean = false, private paused: boolean = false,
                private inverted: boolean = false,
                private invertTimer: number = 0, private resizeTimerId: number = 0 ) {

        this.config = config || new PlayGroundConfig();
        this.dimensions =   {   'HEIGHT': this.config.DEFAULT_HEIGHT, 
                                'WIDTH': this.config.DEFAULT_WIDTH 
                            };
        this.outerContainer = document.querySelector(outerContainerId) as HTMLElement;
        this.msPerFrame = 1000 / PlayGround.FPS;
        this.currentSpeed = this.config.SPEED;
        this.loadImages();
        this.setSpeed();
        this.container = document.createElement('div') ;
        this.container.className = PlayGroundClass.CONTAINER;
        this.canvas = new Canvas(this.dimensions.WIDTH, this.dimensions.HEIGHT, PlayGroundClass.CANVAS);
        this.canvas.scaleCanvas();
        this.container.appendChild(this.canvas.element);
        this.outerContainer.appendChild(this.container as HTMLDivElement );
        this.images = {};
        this.imagesLoaded = 0;
        const observable = fromEvent(this.canvas.imageSprite, PlayGroundEvent.LOAD)
        observable.subscribe(() => {
            this.gameObject = new GameObject(this.canvas,this.spriteDef.TREX);
            this.horizonLine = new HorizonLine(this.canvas,this.spriteDef.HORIZON);
        });
    }

    private loadImages(): void {
        if (IS_HIDPI) {
            //this.imageSprite = <HTMLImageElement>document.getElementById('offline-resources-2x');
            this.spriteDef = spriteDefinition.HDPI;
        } else {
            //this.imageSprite = <HTMLImageElement>document.getElementById('offline-resources-1x');
            this.spriteDef = spriteDefinition.LDPI;
        }
    }

    // Reduce the speed on smaller mobile screens.
    private setSpeed(value : number = 0 ): void {
        var speed = value || this.currentSpeed;
        if (this.dimensions.WIDTH < this.config.DEFAULT_WIDTH) {
            var mobileSpeed =   speed * this.dimensions.WIDTH / this.config.DEFAULT_WIDTH *
                                this.config.MOBILE_SPEED_COEFFICIENT;
            this.currentSpeed = mobileSpeed > speed ? speed : mobileSpeed;
        } else if (value) {
            this.currentSpeed = value;
        }
    }
}

import { Observable,fromEvent} from 'rxjs'; 
import { IS_HIDPI,IDimensions,spriteDefinition, getTimeStamp } from './utility'
import { PlayGroundConfig } from './playgroundconfig' ;
import { GameObjectStatus } from './gameobjectconfig';
import { GameObject } from './gameobject';

import { Canvas } from './canvas';
import { Cloud } from './cloud';
import { HorizonLine } from './horizonline';
import { Obstacle } from './obstacle';
import { NightMode } from './nightmode';

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
    private playingIntro: boolean;
    private obstacles: any;
    private audioBuffer: any = null;
    private soundFx: any = {};
    private audioContext: any;
    private images: any;
    private imagesLoaded: number;
    private gameObject: GameObject;
    private horizonLine: HorizonLine;
    private nightMode: NightMode;
    private clouds: Cloud[];
    private obstacle: Obstacle[];
    private updatePending: boolean;

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
        this.playingIntro=false
        const observable = fromEvent(this.canvas.imageSprite, PlayGroundEvent.LOAD)
        observable.subscribe(() => {
            this.gameObject = new GameObject(this.canvas,this.spriteDef.TREX);
            this.horizonLine = new HorizonLine(this.canvas,this.spriteDef.HORIZON);
            this.nightMode = new NightMode(this.canvas, this.spriteDef.MOON,
                this.dimensions.WIDTH);
            this.clouds.push(new Cloud(this.canvas, this.spriteDef.CLOUD,
                this.dimensions.WIDTH));
            this.startListening();        
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

    private addCloud() {
        this.clouds.push(new Cloud(this.canvas, this.spriteDef.CLOUD,
            this.dimensions.WIDTH));
    }

    private startListening() {
        document.addEventListener(PlayGroundEvent.KEYDOWN, this.onKeyDown);
        document.addEventListener(PlayGroundEvent.KEYUP, this.onKeyUp);
        document.addEventListener(PlayGroundEvent.MOUSEDOWN, this.onKeyDown);
        document.addEventListener(PlayGroundEvent.MOUSEUP, this.onKeyUp);
    }

    private stopListening() {
        document.removeEventListener(PlayGroundEvent.KEYDOWN, this);
        document.removeEventListener(PlayGroundEvent.KEYUP, this);
        document.removeEventListener(PlayGroundEvent.MOUSEDOWN, this);
        document.removeEventListener(PlayGroundEvent.MOUSEUP, this);
    }

    private playIntro() {
        if (!this.activated && !this.crashed) {
            this.playingIntro = true;
            this.gameObject.playingIntro = true;

            // CSS animation definition.
            var keyframes = '@-webkit-keyframes intro { ' +
                'from { width:' + this.gameObject.config.WIDTH + 'px }' +
                'to { width: ' + this.dimensions.WIDTH + 'px }' +
                '}';

            // create a style sheet to put the keyframe rule in
            // and then place the style sheet in the html head
            var sheet = document.createElement('style');
            sheet.innerHTML = keyframes;
            document.head.appendChild(sheet);

            this.container.addEventListener(PlayGroundEvent.ANIM_END,
                this.startGame.bind(this));

            this.container.style.webkitAnimation = 'intro .4s ease-out 1 both';
            this.container.style.width = this.dimensions.WIDTH + 'px';

            // if (this.touchController) {
            //     this.outerContainerEl.appendChild(this.touchController);
            // }
            this.playing = true;
            this.activated = true;
        } else if (this.crashed) {
            this.restart();
        }
    }

    private startGame() {
        this.runningTime = 0;
        this.playingIntro = false;
        this.gameObject.playingIntro = false;
        this.container.style.webkitAnimation = '';
        this.playCount++;

        // Handle tabbing off the page. Pause the current game.
        document.addEventListener(PlayGroundEvent.VISIBILITY,
            this.onVisibilityChange.bind(this));

        window.addEventListener(PlayGroundEvent.BLUR,
            this.onVisibilityChange.bind(this));

        window.addEventListener(PlayGroundEvent.FOCUS,
            this.onVisibilityChange.bind(this));
    }

    private onVisibilityChange(event : Event) {
        if (document.hidden || document.webkitHidden || event.type == 'blur' ||
            document.visibilityState != 'visible') {
            this.stop();
        } else if (!this.crashed) {
            this.gameObject.reset();
            this.play();
        }
    }

    private play() {
        if (!this.crashed) {
            this.playing = true;
            this.paused = false;
            this.gameObject.update(0, GameObjectStatus.RUNNING);
            this.time = getTimeStamp();
            //this.update();
        }
    }

    private restart() {
        if (!this.raqId) {
            this.playCount++;
            this.runningTime = 0;
            this.playing = true;
            this.crashed = false;
            this.distanceRan = 0;
            this.setSpeed(this.config.SPEED);
            this.time = getTimeStamp();
            this.container.classList.remove(PlayGroundClass.CRASHED);
            this.canvas.clearCanvas();
            this.distanceMeter.reset(this.highestScore);
            //this.horizon.reset();
            this.gameObject.reset();
            //this.playSound(this.soundFx.BUTTON_PRESS);
            //this.invert(true);
            //this.update();
        }
    }

    private stop() {
        this.playing = false;
        this.paused = true;
            (this.raqId);
        this.raqId = 0;
    }

    private onKeyDown(event: KeyboardEvent) {

    }

    private onKeyUp(event: KeyboardEvent) {

    }
}

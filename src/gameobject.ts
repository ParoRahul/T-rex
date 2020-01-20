import {PlayGroundConfig} from "./config" ;
import {PlayGround} from "./playground" ;

export class GameObject {

    private static config: PlayGroundConfig =new PlayGroundConfig();
    private static readonly validStatus : { [key:string]:string }={
        CRASHED: 'CRASHED',
        DUCKING: 'DUCKING',
        JUMPING: 'JUMPING',
        RUNNING: 'RUNNING',
        WAITING: 'WAITING'
    }
    private canvas :HTMLCanvasElement;
    private canvasCtx :any;
    private spritePos :any;
    private xPos: number = 0;
    private yPos: number = 0;
    private groundYPos: number = 0;
    private currentFrame: number = 0;
    private currentAnimFrames: number[];
    private blinkDelay: number = 0;
    private blinkCount: number = 0;
    private animStartTime: number = 0;
    private timer: number = 0;
    //private msPerFrame :number = 1000 / PlayGround.getsFPS();;
    private status = GameObject.validStatus.WAITING;
    private jumping: boolean = false;
    private ducking: boolean = false;
    private jumpVelocity: number = 0;
    private reachedMinHeight: boolean = false;
    private speedDrop: boolean = false;
    private jumpCount: number = 0;
    private jumpspotX: number = 0;

    constructor( canvas :HTMLCanvasElement,){
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
    }



}
import {PlayGroundConfig} from "./config" ;
import { GameObject } from "./gameobject";

export class PlayGround{

    private config: PlayGroundConfig ;
    private static readonly FPS: number = 60;
    private outerContainerEl: HTMLElement;
    private containerEl: any ;
    private snackbarEl: any ;
    private detailsButton: any;
    private dimensions: {[key:string]: number };
    private canvas:HTMLCanvasElement;
    private canvasCtx: any;
    private tRex: any;
    private distanceMeter: any;
    private distanceRan: number = 0;
    private highestScore: number = 0;
    private time: number = 0;
    private runningTime: number = 0;
    private msPerFrame: number = 1000 / PlayGround.FPS;
    private currentSpeed: number = this.config.SPEED;
    private obstacles: any;
    private activated: boolean = false;
    private playing: boolean = false;
    private crashed: boolean = false;
    private paused: boolean = false;
    private inverted: boolean = false;
    private invertTimer: number = 0;
    private resizeTimerId_: number = 0;
    private playCount: number = 0;
    private audioBuffer: any = null;
    private soundFx: any = {};
    private audioContext: any;
    private images: any;
    private imagesLoaded: any;
    private gameObject :GameObject;

    public static getsFPS():number { return PlayGround.FPS}

    constructor(outerContainerEl:HTMLElement , config:PlayGroundConfig) {
        
        this.config = config || new PlayGroundConfig();
        this.outerContainerEl = outerContainerEl;
        /* this.canvasCtx = this.canvas.getContext('2d'); */
        this.gameObject = new GameObject(this.canvas)

    }



}

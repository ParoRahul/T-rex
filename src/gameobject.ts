import {GameObjectConfig} from "./gameobjectconfig" ;

const enum GameObjectStatus {    CRASHED = 1,
                              DUCKING = 2,
                              JUMPING = 3,
                              RUNNING = 4,
                              WAITING = 5,
                         }

export class GameObject {

    private static config: GameObjectConfig = new GameObjectConfig();
    private spritePos: any;

    // private msPerFrame :number = 1000 / PlayGround.getsFPS();

    constructor( canvas: HTMLCanvasElement ,
                 private xPos: number = 0 , private yPos: number = 0 ,
                 private status: GameObjectStatus = GameObjectStatus.WAITING ,
                 private groundYPos: number = 0 ,
                 private currentFrame: number = 0,
                 private currentAnimFrames: number[] = [],
                 private blinkCount: number = 0, private blinkDelay: number = 0,
                 private jumpCount: number = 0, private jumpspotX: number = 0,
                 private jumpVelocity: number = 0, private speedDrop: boolean = false,
                 private reachedMinHeight: boolean = false,
                 private animStartTime: number = 0,
                 private timer: number = 0 ) {

    }

}

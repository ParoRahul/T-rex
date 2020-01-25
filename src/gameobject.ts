import { PlayGroundConfig } from "./playgroundconfig" ;
import {GameObjectConfig} from "./gameobjectconfig" ;
import { Canvas } from './canvas';

const enum GameObjectStatus {   CRASHED = 1,
                                DUCKING = 2,
                                JUMPING = 3,
                                RUNNING = 4,
                                WAITING = 5,
                            }

export class GameObject {

    // private msPerFrame :number = 1000 / PlayGround.getsFPS();
    private minJumpHeight: number;

    constructor( canvas: Canvas , private spritePos: any = spritePos,  
                 private config: GameObjectConfig = new GameObjectConfig(),
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

        const playGroundConfig:PlayGroundConfig = new PlayGroundConfig()
        this.groundYPos = playGroundConfig.DEFAULT_HEIGHT - this.config.HEIGHT -
                            playGroundConfig.BOTTOM_PAD;
        this.yPos = this.groundYPos;
        this.minJumpHeight = this.groundYPos - this.config.MIN_JUMP_HEIGHT;
        this.draw(0, 0);
        this.update(0, Trex.status.WAITING);             
    }

}

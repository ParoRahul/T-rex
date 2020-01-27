import { Canvas } from './canvas';
import { animtionFrames, GameObjectConfig, GameObjectStatus } from './gameobjectconfig' ;
import { PlayGroundConfig } from './playgroundconfig' ;
import { getTimeStamp, IS_HIDPI } from './utility';

export class GameObject {

    private msPerFrame: number = 1000 / 60;
    private minJumpHeight: number;

    constructor( private canvas: Canvas , private spritePos: any,
                 private config: GameObjectConfig = new GameObjectConfig(),
                 private playingIntro: boolean = false,
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

        const playGroundConfig: PlayGroundConfig = new PlayGroundConfig();
        this.groundYPos = playGroundConfig.DEFAULT_HEIGHT - this.config.HEIGHT -
                            playGroundConfig.BOTTOM_PAD;
        this.yPos = this.groundYPos;
        this.minJumpHeight = this.groundYPos - this.config.MIN_JUMP_HEIGHT;
        this.draw(0, 0);
        this.update(0, GameObjectStatus.WAITING);
    }

    get jumping() { return (this.status === GameObjectStatus.JUMPING) ? true : false ; }
    get ducking() { return (this.status === GameObjectStatus.DUCKING) ? true : false ; }
    get crashed() { return (this.status === GameObjectStatus.CRASHED) ? true : false ; }

    public setJumpVelocity(setting: number): void {
        this.config.INIITAL_JUMP_VELOCITY = -setting;
        this.config.DROP_VELOCITY = -setting / 2;
    }

    public setBlinkDelay(): void {
        this.blinkDelay = Math.ceil(Math.random() * this.config.BLINK_TIMING);
    }

    public blink(time: number): void {
        const deltaTime = time - this.animStartTime;
        if (deltaTime >= this.blinkDelay) {
            this.draw(this.currentAnimFrames[this.currentFrame], 0);
            if (this.currentFrame === 1) {
                // Set new random delay to blink.
                this.setBlinkDelay();
                this.animStartTime = time;
                this.blinkCount++;
            }
        }
    }

    public startJump(speed: number ): void {
        if (!this.jumping) {
            this.update(0, GameObjectStatus.JUMPING);
            this.jumpVelocity = this.config.INIITAL_JUMP_VELOCITY - (speed / 10);
            this.status = GameObjectStatus.JUMPING ;
            this.reachedMinHeight = false;
            this.speedDrop = false;
        }
    }

    public endJump(): void {
        if (this.reachedMinHeight && this.jumpVelocity < this.config.DROP_VELOCITY) {
            this.jumpVelocity = this.config.DROP_VELOCITY;
        }
    }

    public updateJump(deltaTime: number, speed: number): void {
        // var animtionobj = animtionFrames.get(this.status)
        const msPerFrame = animtionFrames.get(this.status).msPerFrame;
        const framesElapsed = deltaTime / msPerFrame;

        // Speed drop makes Trex fall faster.
        if (this.speedDrop) {
            this.yPos += Math.round(this.jumpVelocity *
                this.config.SPEED_DROP_COEFFICIENT * framesElapsed);
        } else {
            this.yPos += Math.round(this.jumpVelocity * framesElapsed);
        }

        this.jumpVelocity += this.config.GRAVITY * framesElapsed;

        // Minimum height has been reached.
        if (this.yPos < this.minJumpHeight || this.speedDrop) {
            this.reachedMinHeight = true;
        }

        // Reached max height
        if (this.yPos < this.config.MAX_JUMP_HEIGHT || this.speedDrop) {
            this.endJump();
        }

        // Back down at ground level. Jump completed.
        if (this.yPos > this.groundYPos) {
            this.reset();
            this.jumpCount++;
        }
        this.update(deltaTime);
    }

    public setSpeedDrop(): void {
        this.speedDrop = true;
        this.jumpVelocity = 1;
    }

    public setDuck(isDucking: boolean ): void {
        if (isDucking && !this.ducking ) {
            this.update(0, GameObjectStatus.DUCKING);
        } else if (this.ducking) {
            this.update(0, GameObjectStatus.DUCKING);
        }
    }

    public reset(): void {
        this.yPos = this.groundYPos;
        this.jumpVelocity = 0;
        this.update(0, GameObjectStatus.RUNNING);
        this.speedDrop = false;
        this.jumpCount = 0;
    }

    private update(deltaTime: number, status?: GameObjectStatus) {
        this.timer += deltaTime;
        // Update the status.
        if (status) {
            this.status = status;
            this.currentFrame = 0;
            this.msPerFrame = animtionFrames.get(status).msPerFrame;
            this.currentAnimFrames =  animtionFrames.get(status).frames;
            if (status === GameObjectStatus.WAITING) {
                this.animStartTime = getTimeStamp();
                this.setBlinkDelay();
            }
        }
        // Game intro animation, T-rex moves in from the left.
        if (this.playingIntro && this.xPos < this.config.START_X_POS) {
            this.xPos += Math.round((this.config.START_X_POS /
                this.config.INTRO_DURATION) * deltaTime);
        }
        if (this.status === GameObjectStatus.WAITING) {
            this.blink(getTimeStamp());
        } else {
            this.draw(this.currentAnimFrames[this.currentFrame], 0);
        }
        // Update the frame position.
        if (this.timer >= this.msPerFrame) {
            this.currentFrame = this.currentFrame ===
                this.currentAnimFrames.length - 1 ? 0 : this.currentFrame + 1;
            this.timer = 0;
        }
        // Speed drop becomes duck if the down key is still being pressed.
        if (this.speedDrop && this.yPos === this.groundYPos) {
            this.speedDrop = false;
            this.setDuck(true);
        }
    }

    private draw(x: number, y: number): void {
        // console.log('draw called ');
        let sourceX = x;
        let sourceY = y;
        let sourceWidth = (this.ducking && !this.crashed) ? this.config.WIDTH_DUCK : this.config.WIDTH;
        let sourceHeight = this.config.HEIGHT;
        if (IS_HIDPI) {
            sourceX *= 2;
            sourceY *= 2;
            sourceWidth *= 2;
            sourceHeight *= 2;
        }
        // Adjustments for sprite sheet position.
        sourceX += this.spritePos.x;
        sourceY += this.spritePos.y;
        // Ducking.
        if (this.ducking && ! this.crashed) {
            this.canvas.drawImage(sourceX, sourceY,
                sourceWidth, sourceHeight,
                this.xPos, this.yPos,
                this.config.WIDTH_DUCK, this.config.HEIGHT);
        } else {
            // Crashed whilst ducking. Trex is standing up so needs adjustment.
            if (this.ducking && this.crashed) {
                this.xPos++;
            }
            // Standing / running
            // console.log('Standing / running ');
            this.canvas.drawImage(sourceX, sourceY,
                sourceWidth, sourceHeight,
                this.xPos, this.yPos,
                this.config.WIDTH, this.config.HEIGHT);
        }
    }

}

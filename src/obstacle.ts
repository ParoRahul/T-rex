import { Canvas } from './canvas';
import { IObstacle, obstacleConfig, ObstacleType } from './obstacleConfig';
import { CollisionBox, FPS, getRandomNum, IDimensions, IS_HIDPI } from './utility';

export  class Obstacle {

    private static readonly MAX_GAP_COEFFICIENT: number = 1.5;
    private static readonly MAX_OBSTACLE_LENGTH: number = 3;

    private size: number;
    private dimensions: any;
    private remove: boolean;
    private xPos: number;
    private yPos: number;
    private width: number;
    private gap: number;
    private speedOffset: number;
    private collisionBoxes: CollisionBox[];
    private timer: number;
    private currentFrame: number;

    constructor(private canvas: Canvas, private type: ObstacleType,
                private spritePos: any, private dimensions: IDimensions,
                private gapCoefficient: number, private speed: number,
                private xOffset: number) {
        this.size = getRandomNum(1, Obstacle.MAX_OBSTACLE_LENGTH);
        this.remove = false;
        this.xPos = dimensions.WIDTH + (xOffset || 0);
        this.yPos = 0;
        this.width = 0;
        this.collisionBoxes = [];
        this.gap = 0;
        this.speedOffset = 0;

        // For animated obstacles.
        this.currentFrame = 0;
        this.timer = 0;
        const config = obstacleConfig.get(this.type);
        this.collisionBoxes = config.collisionBoxes;
        if (this.size > 1 && config.multipleSpeed > speed) {
            this.size = 1;
        }
        this.width = config.width * this.size;
        if (config.yPos instanceof number[] ) {
            const yPosConfig = config.yPos;
            this.yPos = yPosConfig[getRandomNum(0, yPosConfig.length - 1)];
        } else {
            this.yPos = config.yPos;
        }
        this.draw();
        if (this.size > 1) {
            this.collisionBoxes[1].width = this.width - this.collisionBoxes[0].width -
                this.collisionBoxes[2].width;
            this.collisionBoxes[2].x = this.width - this.collisionBoxes[2].width;
        }
        // For obstacles that go at a different speed from the horizon.
        if (config.speedOffset) {
            this.speedOffset = Math.random() > 0.5 ? config.speedOffset : -config.speedOffset;
        }

        this.gap = this.getGap(this.gapCoefficient, speed);
    }

    public draw(): void {
        const config = obstacleConfig.get(this.type);
        let sourceWidth = config.width;
        let sourceHeight = config.height;

        if (IS_HIDPI) {
            sourceWidth = sourceWidth * 2;
            sourceHeight = sourceHeight * 2;
        }

        // X position in sprite.
        let sourceX = (sourceWidth * this.size) * (0.5 * (this.size - 1)) +
            this.spritePos.x;

        // Animation frames.
        if (this.currentFrame > 0) {
            sourceX += sourceWidth * this.currentFrame;
        }

        this.canvas.drawImage(
            sourceX, this.spritePos.y,
            sourceWidth * this.size, sourceHeight,
            this.xPos, this.yPos,
            config.width * this.size, config.height);
    }

    private getGap(gapCoefficient: number, speed: number): number {
        const minGap = Math.round(this.width * speed +
            obstacleConfig.get(this.type).minGap * gapCoefficient);
        const maxGap = Math.round(minGap * Obstacle.MAX_GAP_COEFFICIENT);
        return getRandomNum(minGap, maxGap);
    }

    private isVisible(): boolean {
        return this.xPos + this.width > 0;
    }

    private update(deltaTime: number, speed: number): void {
        if (this.remove) {
            return ;
        }
        const config = obstacleConfig.get(this.type);
        if (config.speedOffset) {
            speed += this.speedOffset;
        }
        this.xPos -= Math.floor((speed * FPS / 1000) * deltaTime);
        // Update frame
        if (config.numFrames) {
            this.timer += deltaTime;
            if (this.timer >= config.frameRate) {
                this.currentFrame =
                    this.currentFrame === config.numFrames - 1 ?
                        0 : this.currentFrame + 1;
                this.timer = 0;
            }
        }
        this.draw();
        if (!this.isVisible()) {
            this.remove = true;
        }
    }

}

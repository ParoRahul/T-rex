import { Canvas } from './canvas';
import { FPS, getRandomNum, IS_HIDPI } from './utility';

export class Cloud {

    private static readonly HEIGHT: number = 14;
    private static readonly WIDTH: number = 46;
    private static readonly MAX_CLOUD_GAP: number = 400;
    private static readonly MAX_SKY_LEVEL: number = 30;
    private static readonly MIN_CLOUD_GAP: number = 100;
    private static readonly MIN_SKY_LEVEL: number = 71;

    private xPos: number;
    private yPos: number;
    private remove: boolean;
    private cloudGap: number;

    constructor(private canvas: Canvas, private spritePos: any, private containerWidth: number) {
        this.xPos = containerWidth;
        this.yPos = 0;
        this.remove = false;
        this.cloudGap = getRandomNum(Cloud.MIN_CLOUD_GAP, Cloud.MAX_CLOUD_GAP);
        this.yPos = getRandomNum(Cloud.MAX_SKY_LEVEL, Cloud.MIN_SKY_LEVEL);
        this.draw();
    }

    public update(speed: number) {
        if (!this.remove) {
            this.xPos -= Math.ceil(speed);
            this.draw();
            if ( this.xPos + Cloud.WIDTH <= 0 ) {
                this.remove = true;
            }
        }
    }

    private draw(): void {
        this.canvas.save();
        let sourceWidth = Cloud.WIDTH;
        let sourceHeight = Cloud.HEIGHT;
        if (IS_HIDPI) {
            sourceWidth = sourceWidth * 2;
            sourceHeight = sourceHeight * 2;
        }
        this.canvas.drawImage(this.spritePos.x,
            this.spritePos.y,
            sourceWidth, sourceHeight,
            this.xPos, this.yPos,
            Cloud.WIDTH, Cloud.HEIGHT);

        this.canvas.restore();
    }
}

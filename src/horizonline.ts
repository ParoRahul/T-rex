import { Canvas } from './canvas';
import { FPS, IS_HIDPI } from './utility';

export class HorizonLine {

    private static readonly bumpThreshold: number = 0.5;
    private static readonly HEIGHT: number = 12;
    private static readonly WIDTH: number = 600;
    private static readonly YPOS: number = 127;

    private sourceDimensionH: number;
    private sourceDimensionW: number;
    private sourceXPos: number[];
    private xPos: number[];
    private yPos: number;

    constructor( private canvas: Canvas, private spritePos: any) {
        this.sourceXPos = [ this.spritePos.x, this.spritePos.x + HorizonLine.WIDTH ];
        this.xPos = [0, HorizonLine.WIDTH];
        this.yPos = HorizonLine.YPOS;
        if (IS_HIDPI) {
            this.sourceDimensionH = 2 * HorizonLine.HEIGHT ;
            this.sourceDimensionW = 2 * HorizonLine.WIDTH ;
        } else {
            this.sourceDimensionH = HorizonLine.HEIGHT ;
            this.sourceDimensionW = HorizonLine.WIDTH ;
        }
        this.draw();
    }

    public  update(deltaTime: number, speed: number): void {
        const increment = Math.floor(speed * (FPS / 1000) * deltaTime);
        if (this.xPos[0] <= 0) {
            this.updateXPos(0, increment);
        } else {
            this.updateXPos(1, increment);
        }
        this.draw();
    }

    private getRandomType(): number {
        return Math.random() > HorizonLine.bumpThreshold ? HorizonLine.WIDTH : 0 ;
    }

    private updateXPos(position: number, increment: number): void {
        const line1 = position;
        const line2 = position === 0 ? 1 : 0;
        this.xPos[line1] -= increment;
        this.xPos[line2] = this.xPos[line1] + HorizonLine.WIDTH;
        if (this.xPos[line1] <= -HorizonLine.WIDTH ) {
            this.xPos[line1] += HorizonLine.WIDTH * 2;
            this.xPos[line2] = this.xPos[line1] - HorizonLine.WIDTH;
            this.sourceXPos[line1] = this.getRandomType() + this.spritePos.x;
        }
    }

    private reset(): void {
        this.xPos[0] = 0;
        this.xPos[1] = HorizonLine.WIDTH;
    }

    private draw(): void {
        this.canvas.drawImage(this.sourceXPos[0],
            this.spritePos.y,
            this.sourceDimensionW, this.sourceDimensionH,
            this.xPos[0], this.yPos,
            HorizonLine.WIDTH, HorizonLine.HEIGHT);

        this.canvas.drawImage(this.sourceXPos[1],
            this.spritePos.y,
            this.sourceDimensionW, this.sourceDimensionH,
            this.xPos[1], this.yPos,
            HorizonLine.WIDTH, HorizonLine.HEIGHT);
    }
}

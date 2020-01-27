import { Canvas } from './canvas';
import { getRandomNum, ICollisionBox, IDimensions } from './utility';

export abstract class Obstacle {

    protected static readonly MAX_GAP_COEFFICIENT: number = 1.5;
    protected static readonly MAX_OBSTACLE_LENGTH: number = 3;

    private size: number;
    private dimensions: any;
    private remove: boolean;
    private xPos: number;
    private yPos: number;
    private width: number;
    private gap: number;
    private speedOffset: number;
    private collisionBoxes: ICollisionBox[];

    constructor(private canvas: Canvas, private type: number,
                private spritePos: any, private dimensions: IDimensions,
                private gapCoefficient: number, private speed: number,
                private xOffset: number) {
        /* this.size = getRandomNum(1, Obstacle.MAX_OBSTACLE_LENGTH);
        this.remove = false;
        this.xPos = dimensions.WIDTH + (xOffset || 0);
        this.yPos = 0;
        this.width = 0;
        this.collisionBoxes = [];
        this.gap = 0;
        this.speedOffset = 0;

        // For animated obstacles.
        this.currentFrame = 0;
        this.timer = 0; */
    }
}

// tslint:disable-next-line: max-classes-per-file
export class CactusSmall extends Obstacle {


}

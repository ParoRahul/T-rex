import { Canvas } from './canvas';
import { CollisionBox, getRandomNum, IDimensions } from './utility';

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

    constructor(private canvas: Canvas,
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
        private static readonly type: string = 'CACTUS_SMALL';
        private static readonly width: number = 17;
        private static readonly height: number = 35;
        private static readonly yPos: number = 105;
        private static readonly multipleSpeed: number = 4;
        private static readonly minGap: number = 120;
        private static readonly minSpeed: number = 0;
        private static readonly collisionBoxes: CollisionBox[] = [
            new CollisionBox(0, 7, 5, 27),
            new CollisionBox(4, 0, 6, 34),
            new CollisionBox(10, 4, 7, 14),
        ];

}
/* tslint:disable:max-classes-per-file */
export class CactusLarge extends Obstacle {
    private static readonly type: string = 'CACTUS_LARGE';
    private static readonly width: number = 25;
    private static readonly height: number = 50;
    private static readonly yPos: number = 90;
    private static readonly multipleSpeed: number = 7;
    private static readonly minGap: number = 120;
    private static readonly minSpeed: number = 0;
    private static readonly collisionBoxes: CollisionBox[] = [
        new CollisionBox(0, 12, 7, 38),
        new CollisionBox(8, 0, 7, 49),
        new CollisionBox(13, 10, 10, 38),
    ];

}

export class Pterodactyl extends Obstacle {
    private static readonly type: string = 'CACTUS_LARGE';
    private static readonly width: number = 46;
    private static readonly height: number = 40;
    private static readonly yPos: number[] = [100, 75, 50];
    private static readonly yPosMobile: number[] = [100, 50];
    private static readonly multipleSpeed: number = 999;
    private static readonly minGap: number = 8.5;
    private static readonly minSpeed: number = 150;
    private static readonly collisionBoxes: CollisionBox[] = [
        new CollisionBox(15, 15, 16, 5),
        new CollisionBox(18, 21, 24, 6),
        new CollisionBox(2, 14, 4, 3),
        new CollisionBox(6, 10, 4, 7),
        new CollisionBox(10, 8, 6, 9),
    ];
    private static readonly numFrames: number = 2 ;
    private static readonly frameRate: number = 1000 / 6;
    private static readonly speedOffset: number = .8;

}

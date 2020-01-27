# T-rex
Type script conversion of Google Chrome t-rex game
import { Canvas } from './canvas';
import { FPS, getRandomNum, IS_HIDPI  } from './utility';

export class Cloud {

    private static readonly config = new Map<string, number>([
        ['HEIGHT', 14], ['MAX_CLOUD_GAP', 400], ['MAX_SKY_LEVEL', 30],
        ['MIN_CLOUD_GAP', 100], ['MIN_SKY_LEVEL', 71], [ 'WIDTH', 46],
    ]);

    private xPos: number;
    private yPos: number;
    private remove: boolean;
    private cloudGap: number;

    constructor(private canvas: Canvas, private spritePos: any, private containerWidth: number) {
        this.xPos = containerWidth;
        this.yPos = 0;
        this.remove = false;
        this.cloudGap = getRandomNum(Cloud.config.get('MIN_CLOUD_GAP'), Cloud.config.get('MAX_CLOUD_GAP'));
        this.yPos = getRandomNum(Cloud.config.get('MAX_SKY_LEVEL'), Cloud.config.get('MIN_SKY_LEVEL'));
        this.draw();
    }

    public update(speed: number) {
        if (!this.remove) {
            this.xPos -= Math.ceil(speed);
            this.draw();
            if ( this.xPos + Cloud.config.get('WIDTH') <= 0 ) {
                this.remove = true;
            }
        }
    }

    private draw(): void {
        this.canvas.save();
        let sourceWidth = Cloud.config.get('WIDTH');
        let sourceHeight = Cloud.config.get('HEIGHT');
        if (IS_HIDPI) {
            sourceWidth = sourceWidth * 2;
            sourceHeight = sourceHeight * 2;
        }
        this.canvas.drawImage(this.spritePos.x,
            this.spritePos.y,
            sourceWidth, sourceHeight,
            this.xPos, this.yPos,
            Cloud.config.get('WIDTH'), Cloud.config.get('HEIGHT'));

        this.canvas.restore();
    }
}
____________________________________________________
import { Canvas } from './canvas';
import { FPS, IS_HIDPI } from './utility';

export class HorizonLine {

    private static readonly dimensionConfig = new Map<string,  number>([
        ['HEIGHT', 12],
        ['WIDTH', 600],
        ['YPOS', 127],
    ]);

    private static readonly bumpThreshold: number = 0.5;

    private sourceDimensions: Map<string, number>;
    private dimensions: Map<string, number>;
    private sourceXPos: number[];
    private xPos: number[];
    private yPos: number;

    constructor( private canvas: Canvas, private spritePos: any) {
        this.dimensions = HorizonLine.dimensionConfig;
        this.sourceXPos = [ this.spritePos.x, this.spritePos.x + this.dimensions.get('WIDTH') ];
        this.xPos = [0, HorizonLine.dimensionConfig.get('WIDTH')];
        this.yPos = HorizonLine.dimensionConfig.get('YPOS');
        this.sourceDimensions = new Map<string, number>();
        HorizonLine.dimensionConfig.forEach((value: number, key: string) => {
            if (IS_HIDPI) {
                this.sourceDimensions.set(key, 2 * value );
            } else {
                this.sourceDimensions.set(key, value );
            }
        });
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
        return Math.random() > HorizonLine.bumpThreshold ? this.dimensions.get('WIDTH') : 0 ;
    }

    private updateXPos(position: number, increment: number): void {
        const line1 = position;
        const line2 = position === 0 ? 1 : 0;
        this.xPos[line1] -= increment;
        this.xPos[line2] = this.xPos[line1] + this.dimensions.get('WIDTH');
        if (this.xPos[line1] <= -this.dimensions.get('WIDTH') ) {
            this.xPos[line1] += this.dimensions.get('WIDTH') * 2;
            this.xPos[line2] = this.xPos[line1] - this.dimensions.get('WIDTH');
            this.sourceXPos[line1] = this.getRandomType() + this.spritePos.x;
        }
    }

    private reset(): void {
        this.xPos[0] = 0;
        this.xPos[1] = HorizonLine.dimensionConfig.get('WIDTH');
    }

    private draw(): void {
        this.canvas.drawImage(this.sourceXPos[0],
            this.spritePos.y,
            this.sourceDimensions.get('WIDTH'), this.sourceDimensions.get('HEIGHT'),
            this.xPos[0], this.yPos,
            this.dimensions.get('WIDTH'), this.dimensions.get('HEIGHT'));

        this.canvas.drawImage(this.sourceXPos[1],
            this.spritePos.y,
            this.sourceDimensions.get('WIDTH'), this.sourceDimensions.get('HEIGHT'),
            this.xPos[1], this.yPos,
            this.dimensions.get('WIDTH'), this.dimensions.get('HEIGHT'));
    }

}
------------------------------------------------------------------

import { Canvas } from './canvas';
import { getRandomNum, IS_HIDPI, spriteDefinition  } from './utility';

interface IStar {
    x: number;
    y: number;
    sourceY: number;

}

export class NightMode {

    private static readonly config = new Map<string, number>([
        ['FADE_SPEED', 0.035], ['HEIGHT', 40], ['MOON_SPEED', 0.25],
        ['NUM_STARS', 2], ['STAR_SIZE', 9], [ 'STAR_SPEED', 0.3 ],
        ['STAR_MAX_Y', 70 ], ['WIDTH', 20],
    ]);

    private static readonly  phases = [140, 120, 100, 60, 40, 20, 0];

    private xPos: number;
    private yPos: number;
    private currentPhase: number;
    private opacity: number;
    private drawStars: boolean;
    private stars: IStar[];

    constructor(private canvas: Canvas, private spritePos: any, private containerWidth: number) {
        this.xPos = containerWidth - 50;
        this.yPos = 30;
        this.currentPhase = 0;
        this.opacity = 0;
        this.containerWidth = containerWidth;
        this.stars = [];
        this.drawStars = false;
        this.placeStars();
    }

    public update(activated: boolean, delta: number = 0): void {
        if (activated && this.opacity === 0) {
            this.currentPhase++;
            if (this.currentPhase >= NightMode.phases.length) {
                this.currentPhase = 0;
            }
        }
        if (activated && (this.opacity < 1 || this.opacity === 0)) {
            this.opacity += NightMode.config.get('FADE_SPEED');
        } else if (this.opacity > 0) {
            this.opacity -= NightMode.config.get('FADE_SPEED');
        }

        // Set moon positioning.
        if (this.opacity > 0) {
            this.xPos = this.updateXPos(this.xPos, NightMode.config.get('MOON_SPEED'));

            // Update stars.
            if (this.drawStars) {
                for (let i = 0; i < NightMode.config.get('NUM_STARS'); i++) {
                    this.stars[i].x = this.updateXPos(this.stars[i].x,
                        NightMode.config.get('STAR_SPEED'));
                }
            }
            this.draw();
        } else {
            this.opacity = 0;
            this.placeStars();
        }
        this.drawStars = true;
    }

    private updateXPos(currentPos: number, speed: number): number {
        if (currentPos < -NightMode.config.get('WIDTH')) {
            currentPos = this.containerWidth;
        } else {
            currentPos -= speed;
        }
        return currentPos;
    }

    private placeStars() {
        const segmentSize = Math.round(this.containerWidth / NightMode.config.get('NUM_STARS'));

        for (let i = 0; i < NightMode.config.get('NUM_STARS'); i++) {
            const star: IStar = { x: 0, y: 0, sourceY: 0 };
            this.stars[i] = star;
            this.stars[i].x = getRandomNum(segmentSize * i, segmentSize * (i + 1));
            this.stars[i].y = getRandomNum(0, NightMode.config.get('STAR_MAX_Y'));

            if (IS_HIDPI) {
                this.stars[i].sourceY = spriteDefinition.HDPI.STAR.y +
                    NightMode.config.get('STAR_SIZE') * 2 * i;
            } else {
                this.stars[i].sourceY = spriteDefinition.LDPI.STAR.y +
                    NightMode.config.get('STAR_SIZE') * i;
            }
        }
    }

    private draw(): void {
        let moonSourceWidth = (this.currentPhase === 3) ? NightMode.config.get('WIDTH') * 2 :
            NightMode.config.get('WIDTH');
        let moonSourceHeight = NightMode.config.get('HEIGHT');
        let moonSourceX = this.spritePos.x + NightMode.phases[this.currentPhase];
        let starSize = NightMode.config.get('STAR_SIZE');
        let starSourceX = spriteDefinition.LDPI.STAR.x;
        const moonOutputWidth = moonSourceWidth;
        if (IS_HIDPI) {
            moonSourceWidth *= 2;
            moonSourceHeight *= 2;
            moonSourceX = this.spritePos.x +
                (NightMode.phases[this.currentPhase] * 2);
            starSize *= 2;
            starSourceX = spriteDefinition.HDPI.STAR.x;
        }

        this.canvas.save();
        this.canvas.alpha = this.opacity;
        // Stars.
        if (this.drawStars) {
            for (let i = 0; i < NightMode.config.get('NUM_STARS'); i++) {
                this.canvas.drawImage(starSourceX, this.stars[i].sourceY, starSize, starSize,
                                        Math.round(this.stars[i].x), this.stars[i].y,
                                        NightMode.config.get('STAR_SIZE'), NightMode.config.get('STAR_SIZE'));
            }
        }
        // Moon
        this.canvas.drawImage(moonSourceX,
            this.spritePos.y, moonSourceWidth, moonSourceHeight,
            Math.round(this.xPos), this.yPos,
            moonOutputWidth, NightMode.config.get('HEIGHT'));

        this.canvas.alpha = 1;
        this.canvas.restore();
    }

    private reset(): void {
        this.currentPhase = 0;
        this.opacity = 0;
        this.update(false);
    }

}
----------------------------
import { Canvas } from './canvas';
import { getRandomNum, IS_HIDPI, spriteDefinition  } from './utility';

export class Obstacle {

    private static readonly MAX_GAP_COEFFICIENT: number = 1.5;
    private static readonly MAX_OBSTACLE_LENGTH: number = 3;

    private size: number;
    private dimensions: any;
    private remove: boolean;
    private xPos: number;
    private yPos: number;
    private dimensions: any;
    private width: number;
    private gap: number;
    private speedOffset: number;

    constructor(private canvas: Canvas, private type: number,
                private spritePos: any, private dimensions: any,
                private gapCoefficient: number, private speed: number,
                private xOffset: number) {
        this.size = getRandomNum(1, Obstacle.MAX_OBSTACLE_LENGTH);
        this.dimensions = dimensions;
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
    }
}
--------------------------------------
export const FPS = 60;

export const spriteDefinition = {
    HDPI: {
        CACTUS_LARGE: { x: 652, y: 2 },
        CACTUS_SMALL: { x: 446, y: 2 },
        CLOUD: { x: 166, y: 2 },
        HORIZON: { x: 2, y: 104 },
        MOON: { x: 954, y: 2 },
        PTERODACTYL: { x: 260, y: 2 },
        RESTART: { x: 2, y: 2 },
        STAR: { x: 1276, y: 2 },
        TEXT_SPRITE: { x: 1294, y: 2 },
        TREX: { x: 1678, y: 2 },
    },
    LDPI: {
        CACTUS_LARGE: { x: 332, y: 2 },
        CACTUS_SMALL: { x: 228, y: 2 },
        CLOUD: { x: 86, y: 2 },
        HORIZON: { x: 2, y: 54 },
        MOON: { x: 484, y: 2 },
        PTERODACTYL: { x: 134, y: 2 },
        RESTART: { x: 2, y: 2 },
        STAR: { x: 645, y: 2 },
        TEXT_SPRITE: { x: 655, y: 2 },
        TREX: { x: 848, y: 2 },
    },
};


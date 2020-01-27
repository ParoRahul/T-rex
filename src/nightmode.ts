import { Canvas } from './canvas';
import { getRandomNum, IS_HIDPI, spriteDefinition } from './utility';

interface IStar { x: number; y: number; sourceY: number; }

export class NightMode {

    private static readonly PHASES = [140, 120, 100, 60, 40, 20, 0];
    private static readonly HEIGHT: number = 40;
    private static readonly WIDTH: number = 20;
    private static readonly FADE_SPEED: number = 0.035;
    private static readonly MOON_SPEED: number = 0.25;
    private static readonly NUM_STARS: number = 2;
    private static readonly STAR_SIZE: number = 9;
    private static readonly STAR_SPEED: number = 0.3;
    private static readonly STAR_MAX_Y: number = 70;

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
            if (this.currentPhase >= NightMode.PHASES.length) {
                this.currentPhase = 0;
            }
        }
        if (activated && (this.opacity < 1 || this.opacity === 0)) {
            this.opacity += NightMode.FADE_SPEED;
        } else if (this.opacity > 0) {
            this.opacity -= NightMode.FADE_SPEED;
        }

        // Set moon positioning.
        if (this.opacity > 0) {
            this.xPos = this.updateXPos(this.xPos, NightMode.MOON_SPEED);

            // Update stars.
            if (this.drawStars) {
                for (let i = 0; i < NightMode.NUM_STARS; i++) {
                    this.stars[i].x = this.updateXPos(this.stars[i].x,
                        NightMode.STAR_SPEED);
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
        if (currentPos < -NightMode.WIDTH) {
            currentPos = this.containerWidth;
        } else {
            currentPos -= speed;
        }
        return currentPos;
    }

    private placeStars() {
        const segmentSize = Math.round(this.containerWidth / NightMode.NUM_STARS);

        for (let i = 0; i < NightMode.NUM_STARS; i++) {
            const star: IStar = { x: 0, y: 0, sourceY: 0 };
            this.stars[i] = star;
            this.stars[i].x = getRandomNum(segmentSize * i, segmentSize * (i + 1));
            this.stars[i].y = getRandomNum(0, NightMode.STAR_MAX_Y);

            if (IS_HIDPI) {
                this.stars[i].sourceY = spriteDefinition.HDPI.STAR.y +
                    NightMode.STAR_SIZE * 2 * i;
            } else {
                this.stars[i].sourceY = spriteDefinition.LDPI.STAR.y +
                    NightMode.STAR_SIZE * i;
            }
        }
    }

    private draw(): void {
        let moonSourceWidth = (this.currentPhase === 3) ? NightMode.WIDTH * 2 :
            NightMode.WIDTH;
        let moonSourceHeight = NightMode.HEIGHT;
        let moonSourceX = this.spritePos.x + NightMode.PHASES[this.currentPhase];
        let starSize = NightMode.STAR_SIZE;
        let starSourceX = spriteDefinition.LDPI.STAR.x;
        const moonOutputWidth = moonSourceWidth;
        if (IS_HIDPI) {
            moonSourceWidth *= 2;
            moonSourceHeight *= 2;
            moonSourceX = this.spritePos.x +
                (NightMode.PHASES[this.currentPhase] * 2);
            starSize *= 2;
            starSourceX = spriteDefinition.HDPI.STAR.x;
        }

        this.canvas.save();
        this.canvas.alpha = this.opacity;
        // Stars.
        if (this.drawStars) {
            for (let i = 0; i < NightMode.NUM_STARS; i++) {
                this.canvas.drawImage(starSourceX, this.stars[i].sourceY, starSize, starSize,
                                        Math.round(this.stars[i].x), this.stars[i].y,
                                        NightMode.STAR_SIZE, NightMode.STAR_SIZE);
            }
        }
        // Moon
        this.canvas.drawImage(moonSourceX,
            this.spritePos.y, moonSourceWidth, moonSourceHeight,
            Math.round(this.xPos), this.yPos,
            moonOutputWidth, NightMode.HEIGHT);

        this.canvas.alpha = 1;
        this.canvas.restore();
    }

    private reset(): void {
        this.currentPhase = 0;
        this.opacity = 0;
        this.update(false);
    }

}

import {CollisionBox} from './utility';

export  const enum ObstacleType {
    CACTUS_SMALL = 1,
    CACTUS_LARGE = 2,
    PTERODACTYL = 3,
}

export interface IObstacle {
    type: string;
    height: number;
    width: number;
    yPos: number| number[];
    multipleSpeed: number;
    minGap: number;
    minSpeed: number;
    collisionBoxes: CollisionBox[];
    numFrames?: number;
    frameRate?: number;
    speedOffset?: number;
    yPosMobile?: number[];
}

export  const obstacleConfig = new Map<ObstacleType, IObstacle>([
    [
        ObstacleType.CACTUS_SMALL, {
            type: 'CACTUS_SMALL',
            // tslint:disable-next-line: object-literal-sort-keys
            height: 35,
            width: 17,
            yPos: 105,
            multipleSpeed: 4,
            minGap: 120,
            minSpeed: 0,
            collisionBoxes: [
                new CollisionBox(0, 7, 5, 27),
                new CollisionBox(4, 0, 6, 34),
                new CollisionBox(10, 4, 7, 14)
            ],
        },
    ],
    [
        ObstacleType.CACTUS_SMALL, {
            type: 'CACTUS_LARGE',
            // tslint:disable-next-line: object-literal-sort-keys
            height: 50,
            width: 25,
            yPos: 90,
            multipleSpeed: 7,
            minGap: 120,
            minSpeed: 0,
            collisionBoxes: [
                new CollisionBox(0, 12, 7, 38),
                new CollisionBox(8, 0, 7, 49),
                new CollisionBox(13, 10, 10, 38),
            ],
        },
    ],
    [
        ObstacleType.PTERODACTYL, {
            type: 'PTERODACTYL',
            width: 46,
            height: 40,
            yPos: [100, 75, 50],
            yPosMobile: [100, 50], // Variable height mobile.
            multipleSpeed: 999,
            minSpeed: 8.5,
            minGap: 150,
            collisionBoxes: [
                new CollisionBox(15, 15, 16, 5),
                new CollisionBox(18, 21, 24, 6),
                new CollisionBox(2, 14, 4, 3),
                new CollisionBox(6, 10, 4, 7),
                new CollisionBox(10, 8, 6, 9)
            ],
            numFrames: 2,
            frameRate: 1000 / 6,
            speedOffset: .8,
        },
    ],
]) ;

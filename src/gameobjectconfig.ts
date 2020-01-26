export  const enum GameObjectStatus {   
                                CRASHED = 1,
                                DUCKING = 2,
                                JUMPING = 3,
                                RUNNING = 4,
                                WAITING = 5,
}

interface animationObject{
    frames:number[];
    msPerFrame:number;
}

export  const animtionFrames =new Map<GameObjectStatus, animationObject>([
    [
        GameObjectStatus.WAITING ,{
            frames: [44, 0],
            msPerFrame: 1000 / 3
        }
    ],
    [
        GameObjectStatus.RUNNING ,{
            frames:  [88, 132],
            msPerFrame: 1000 /12
        }
    ],
    [
        GameObjectStatus.CRASHED ,{
            frames:  [220],
            msPerFrame: 1000 / 60
        }
    ],
    [
        GameObjectStatus.JUMPING ,{
            frames:  [0],
            msPerFrame: 1000 / 60
        }
    ],
    [
        GameObjectStatus.DUCKING, {
            frames: [264, 323],
            msPerFrame: 1000 / 8
        }
    ]
])

export class GameObjectConfig {

    constructor( private _DROP_VELOCITY: number = -5,
                 public GRAVITY: number = 0.6,
                 public HEIGHT: number = 47,
                 public HEIGHT_DUCK: number = 25,
                 private _INIITAL_JUMP_VELOCITY: number = -10,
                 public INTRO_DURATION: number = 1500,
                 public MAX_JUMP_HEIGHT: number = 30,
                 public MIN_JUMP_HEIGHT: number = 30,
                 public SPEED_DROP_COEFFICIENT: number = 3,
                 public SPRITE_WIDTH: number = 262,
                 public START_X_POS: number = 50,
                 public WIDTH: number = 44,
                 public WIDTH_DUCK: number = 59,
                 public BLINK_TIMING: number = 7000) { }

    set INIITAL_JUMP_VELOCITY(value: number) { this._INIITAL_JUMP_VELOCITY= value; }
    get INIITAL_JUMP_VELOCITY( ) { return this._INIITAL_JUMP_VELOCITY }   
    
    set DROP_VELOCITY(value: number) { this._DROP_VELOCITY= value; }
    get DROP_VELOCITY( ) { return this._DROP_VELOCITY }   
    
}

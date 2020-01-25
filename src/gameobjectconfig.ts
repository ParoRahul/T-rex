export class GameObjectConfig {

    constructor( public DROP_VELOCITY: number = -5,
                 public GRAVITY: number = 0.6,
                 public HEIGHT: number = 47,
                 public HEIGHT_DUCK: number = 25,
                 public INIITAL_JUMP_VELOCITY: number = -10,
                 public INTRO_DURATION: number = 1500,
                 public MAX_JUMP_HEIGHT: number = 30,
                 public MIN_JUMP_HEIGHT: number = 30,
                 public SPEED_DROP_COEFFICIENT: number = 3,
                 public SPRITE_WIDTH: number = 262,
                 public START_X_POS: number = 50,
                 public WIDTH: number = 44,
                 public WIDTH_DUCK: number = 59) { }
}

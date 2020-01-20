export class PlayGroundConfig {

    public ACCELERATION: number = 0.001;
    public BG_CLOUD_SPEED: number = 0.2;
    public BOTTOM_PAD: number = 10;
    public CLEAR_TIME: number = 3000;
    public CLOUD_FREQUENCY: number = 0.5;
    public GAMEOVER_CLEAR_TIME: number = 750;
    public GAP_COEFFICIENT: number = 0.6;
    public GRAVITY: number = 0.6;
    public INITIAL_JUMP_VELOCITY: number = 12;
    public INVERT_FADE_DURATION: number = 12000;
    public INVERT_DISTANCE: number = 700;
    public MAX_BLINK_COUNT: number = 3;
    public MAX_CLOUDS: number = 6;
    public MAX_OBSTACLE_LENGTH: number = 3;
    public MAX_OBSTACLE_DUPLICATION: number = 2;
    public MAX_SPEED: number = 13;
    public MIN_JUMP_HEIGHT: number = 35;
    public MOBILE_SPEED_COEFFICIENT: number = 1.2;
    public RESOURCE_TEMPLATE_ID: string = 'audio-resources';
    public SPEED: number = 6;
    public SPEED_DROP_COEFFICIENT: number = 3

    constructor() { }
}

export class GameObjectConfig {

    public DROP_VELOCITY: number =  -5;
    public GRAVITY: number =  0.6;
    public HEIGHT: number =  47;
    public HEIGHT_DUCK: number =  25;
    public INIITAL_JUMP_VELOCITY: number =  -10;
    public INTRO_DURATION: number =  1500;
    public MAX_JUMP_HEIGHT: number =  30;
    public MIN_JUMP_HEIGHT: number =  30;
    public SPEED_DROP_COEFFICIENT: number =  3;
    public SPRITE_WIDTH: number =  262;
    public START_X_POS: number =  50;
    public WIDTH: number =  44;
    public WIDTH_DUCK: number =  59;

    constructor() { }

}
export class PlayGroundConfig {

    constructor( public ACCELERATION: number = 0.001,
                 public BG_CLOUD_SPEED: number = 0.2,
                 public BOTTOM_PAD: number = 10,
                 public CLEAR_TIME: number = 3000,
                 public CLOUD_FREQUENCY: number = 0.5,
                 public GAMEOVER_CLEAR_TIME: number = 750,
                 public GAP_COEFFICIENT: number = 0.6,
                 public GRAVITY: number = 0.6,
                 public INITIAL_JUMP_VELOCITY: number = 12,
                 public INVERT_FADE_DURATION: number = 12000,
                 public INVERT_DISTANCE: number = 700,
                 public MAX_BLINK_COUNT: number = 3,
                 public MAX_CLOUDS: number = 6,
                 public MAX_OBSTACLE_LENGTH: number = 3,
                 public MAX_OBSTACLE_DUPLICATION: number = 2,
                 public MAX_SPEED: number = 13,
                 public MIN_JUMP_HEIGHT: number = 35,
                 public MOBILE_SPEED_COEFFICIENT: number = 1.2,
                 public RESOURCE_TEMPLATE_ID: string = "audio-resources",
                 public SPEED: number = 6,
                 public SPEED_DROP_COEFFICIENT: number = 3,
                 public DEFAULT_WIDTH: number = 600,
                 public DEFAULT_HEIGHT: number = 150 ) { }
    
    public updateGravity( value: number ){ this.GRAVITY = value; } 

    public updateMIN_JUMP_HEIGHT( value: number ){ this.MIN_JUMP_HEIGHT = value; } 

}

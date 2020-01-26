import { IS_HIDPI, getTimeStamp } from './utility'

export class Canvas {

      private _element: HTMLCanvasElement;
      private _context: CanvasRenderingContext2D;
      private _imageSprite: HTMLImageElement;
      // private _spriteDef:any;

      constructor( width: number ,height: number, classname?:string ,fillStyle : string = '#f7f7f7'){
            this._element = document.createElement('canvas');
            this._element.className = classname;
            this._element.height = height ;
            this._element.width = width;
            this._context = this._element.getContext('2d');
            this._context.fillStyle = fillStyle ;
            this._context.fill();
            //this._context.fillRect( 25,25, 25, 25);
            if (IS_HIDPI) {
                  this._imageSprite = <HTMLImageElement>document.getElementById('offline-resources-2x');
                  // this._spriteDef = spriteDefinition.HDPI;
            } else {
                  this._imageSprite = <HTMLImageElement>document.getElementById('offline-resources-1x');
                  // this._spriteDef = spriteDefinition.LDPI;
            }
            //this._context.drawImage(this._imageSprite,0,0,);
      }

      get element():HTMLCanvasElement { return this._element ;}
      get context():CanvasRenderingContext2D  { return this._context; }
      get imageSprite():HTMLImageElement  { return this._imageSprite; }

      public scaleCanvas(_width: number = 0 , _height: number = 0): boolean {
            //var context =  this.context;
            // Query the various pixel ratios
            // Upscale the canvas if the two ratios don't match
            const devicePixelRatio = Math.floor(window.devicePixelRatio) || 1;
            //var backingStoreRatio = Math.floor(context.webkitBackingStorePixelRatio) || 1;
            var backingStoreRatio =  1;
            var ratio = devicePixelRatio / backingStoreRatio;
            if (devicePixelRatio !== backingStoreRatio) {
                  var oldWidth = _width || this._element.width;
                  var oldHeight = _height || this._element.height;
                  this._element.width = oldWidth * ratio;
                  this._element.height = oldHeight * ratio;
                  this._element.style.width = oldWidth + 'px';
                  this._element.style.height = oldHeight + 'px';
                  this._context.scale(ratio, ratio);
                  return true;
            } else if (devicePixelRatio == 1) {
                  // Reset the canvas width / height. Fixes scaling bug when the page is
                  // zoomed and the devicePixelRatio changes accordingly.
                  this._element.style.width = this._element.width + 'px';
                  this._element.style.height = this._element.height + 'px';
                  return false;
            }
      }

      public clearCanvas(): void {
            this._context.clearRect(0, 0, this._element.width,this._element.height);
      }
      
      public save(): void{ this._context.save(); }

      public drawImage( sourceX: number,sourceY: number, 
                        sourceWidth: number ,sourceHeight: number,
                        xPos: number, yPos: number,
                        width: number, height: number ) :void {
            console.log(sourceX,sourceY,sourceWidth,sourceHeight,xPos,yPos,width,height);                  
            this._context.drawImage(this._imageSprite,sourceX, sourceY,
                  sourceWidth,sourceHeight,xPos, yPos,width, height);
            //this._context.drawImage(this._imageSprite,848,2,44,47,0,93,44,47);
      }
}

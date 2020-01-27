import { getTimeStamp, IS_HIDPI } from './utility';

export class Canvas {

      private _element: HTMLCanvasElement;
      private _context: CanvasRenderingContext2D;
      private _imageSprite: HTMLImageElement;

      constructor( width: number, height: number, classname?: string, fillStyle: string = '#f7f7f7') {
            this._element = document.createElement('canvas');
            this._element.className = classname;
            this._element.height = height ;
            this._element.width = width;
            this._context = this._element.getContext('2d');
            this._context.fillStyle = fillStyle ;
            this._context.fill();
            if (IS_HIDPI) {
                  this._imageSprite = document.getElementById('offline-resources-2x') as HTMLImageElement;
            } else {
                  this._imageSprite = document.getElementById('offline-resources-1x') as HTMLImageElement;
            }
      }

      get element(): HTMLCanvasElement { return this._element ; }
      get context(): CanvasRenderingContext2D  { return this._context; }
      get imageSprite(): HTMLImageElement  { return this._imageSprite; }
      set alpha(value: number ) { this._context.globalAlpha = value; }

      public scaleCanvas(_width: number = 0 , _height: number = 0): boolean {
            const devicePixelRatio = Math.floor(window.devicePixelRatio) || 1;
            // var backingStoreRatio = Math.floor(context.webkitBackingStorePixelRatio) || 1;
            const backingStoreRatio =  1;
            const ratio = devicePixelRatio / backingStoreRatio;
            if (devicePixelRatio !== backingStoreRatio) {
                  const oldWidth = _width || this._element.width;
                  const oldHeight = _height || this._element.height;
                  this._element.width = oldWidth * ratio;
                  this._element.height = oldHeight * ratio;
                  this._element.style.width = oldWidth + 'px';
                  this._element.style.height = oldHeight + 'px';
                  this._context.scale(ratio, ratio);
                  return true;
            } else if (devicePixelRatio === 1) {
                  this._element.style.width = this._element.width + 'px';
                  this._element.style.height = this._element.height + 'px';
                  return false;
            }
      }

      public clearCanvas(): void {
            this._context.clearRect(0, 0, this._element.width, this._element.height);
      }

      public save(): void { this._context.save(); }

      public restore(): void { this._context.restore(); }

      public drawImage( sourceX: number, sourceY: number,
                        sourceWidth: number , sourceHeight: number,
                        xPos: number, yPos: number,
                        width: number, height: number ): void {
            // console.log(sourceX, sourceY, sourceWidth, sourceHeight, xPos, yPos, width, height);
            this._context.drawImage(this._imageSprite, sourceX, sourceY,
                  sourceWidth, sourceHeight, xPos, yPos, width, height);
      }
}

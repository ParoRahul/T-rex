
export class Canvas {

      private _element: HTMLCanvasElement;
      private static fillStyle:string = 'f7f7f7'

      constructor( width: number ,height: number, classname?:string ,fillStyle?: string){
            this._element = document.createElement('canvas');
            this._element.className = classname;
            this._element.height = height ;
            this._element.width = width;
            this._element.getContext('2d').fillStyle = fillStyle || Canvas.fillStyle;
            this._element.getContext('2d').fill();
      }

      get element():HTMLCanvasElement { return this._element ;}
      get context():CanvasRenderingContext2D  { return this._element.getContext('2d'); }

      public scaleCanvas(_width: number = 0 , _height: number = 0): boolean {
            var context =  this.context;
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
                  context.scale(ratio, ratio);
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
            this._element.getContext('2d').clearRect(0, 0, this._element.width,this._element.height);
      }
}

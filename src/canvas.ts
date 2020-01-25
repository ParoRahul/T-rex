
export class Canvas {

      private element: HTMLCanvasElement;
      private static fillStyle:string = 'f7f7f7'

      constructor( width: number ,height: number, classname?:string ,fillStyle?: string){
            this.element = document.createElement('canvas');
            this.element.className = classname;
            this.element.height = height ;
            this.element.width = width;
            this.element.getContext('2d').fillStyle = fillStyle || Canvas.fillStyle;
            this.element.getContext('2d').fill();
      }

      get element():HTMLCanvasElement { return this.element ;}
      get context():CanvasRenderingContext2D  { return this.element.getContext('2d'); }

      public scaleCanvas(_width: number = 0 , _height: number = 0): boolean {
            var context = this.element.getContext('2d');
            // Query the various pixel ratios
            const devicePixelRatio = Math.floor(window.devicePixelRatio) || 1;
            var backingStoreRatio = Math.floor(context.webkitBackingStorePixelRatio) || 1;
            var ratio = devicePixelRatio / backingStoreRatio;
            // Upscale the canvas if the two ratios don't match
            if (devicePixelRatio !== backingStoreRatio) {
                  var oldWidth = _width || this.element.width;
                  var oldHeight = _height || this.element.height;
                  this.element.width = oldWidth * ratio;
                  this.element.height = oldHeight * ratio;
                  this.element.style.width = oldWidth + 'px';
                  this.element.style.height = oldHeight + 'px';
                  context.scale(ratio, ratio);
                  return true;
            } 
            else if (devicePixelRatio == 1) {
                  // Reset the canvas width / height. Fixes scaling bug when the page is
                  // zoomed and the devicePixelRatio changes accordingly.
                  this.element.style.width = this.element.width + 'px';
                  this.element.style.height = this.element.height + 'px';
                  return false;
            }
      }

      public clearCanvas(): void {
            this.element.getContext('2d').clearRect(0, 0, this.element.width,this.element.height);
      }
}

import png100 from './assets/100-offline-sprite.png';
import png200 from './assets/200-offline-sprite.png';
import './css/bootstrap.min.css';
import './css/style.css';
import {PlayGround} from './PlayGround';

function onDocumentLoad() {
    const element100 =  document.getElementById('offline-resources-1x') as HTMLImageElement;
    element100.src = png100;
    element100.classList.add('invisible');
    const element200 =  document.getElementById('offline-resources-2x') as HTMLImageElement;
    element200.src = png200;
    element200.classList.add('invisible');
    const playGround: PlayGround = new PlayGround('.gameContainer');
}

document.addEventListener('DOMContentLoaded', onDocumentLoad);

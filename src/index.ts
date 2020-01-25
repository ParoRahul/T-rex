import './css/bootstrap.min.css';
import './css/style.css';
import png100 from './assets/100-offline-sprite.png';
import png200 from './assets/200-offline-sprite.png';
import {PlayGround} from "./PlayGround";

function onDocumentLoad() {
    var element_100=<HTMLImageElement>document.getElementById('offline-resources-1x');
    element_100.src = png100
    element_100.classList.add('invisible');
    var element_100=<HTMLImageElement>document.getElementById('offline-resources-2x');
    element_100.src = png200
    element_100.classList.add('invisible');
    const playGround: PlayGround = new PlayGround(".gameContainer");
}

document.addEventListener('DOMContentLoaded', onDocumentLoad);
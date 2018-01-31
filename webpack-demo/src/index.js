import _ from 'lodash'
// import './style.css'
import printMe from './print.js'
import Icon from './icon.png'
import { cube } from './math.js'

const component = () => {
    let element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    let btn = document.createElement('button');
    btn.innerHTML = 'clike me and check the console';
    btn.onclick = printMe;
    element.appendChild(btn);

    let pre = document.createElement('pre');
    pre.innerHTML = _.join(['Hello cube', '5 cube is' + cube(5)], ' ');
    element.appendChild(pre);

    let myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}
document.body.appendChild(component());
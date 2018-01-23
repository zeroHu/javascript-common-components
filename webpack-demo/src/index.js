import _ from 'lodash'
import './style.css'
import printMe from './print.js'
import Icon from './icon.png'

const component = () => {
    let element = document.createElement('div');
    let btn = document.createElement('button');
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    btn.innerHTML = 'clike me and check the console';
    btn.onclick = printMe;
    element.appendChild(btn);

    let myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);



    return element;
}
document.body.appendChild(component());
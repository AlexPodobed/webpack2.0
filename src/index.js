// import Button from './button';
// import BmwImg from './image';
// import LogoImg from './logo';
// const btn = Button.init("click me");
const style = require('./style/main.css');
// import {multiply} from './mathStuff';

const app = document.getElementById('app');
// const messages = require('./messages');

// console.log(multiply(3,3));

// let getMessage = () => messages.hi;
/*
app.innerHTML = `
    <div>${getMessage()}</div>
    <div class="${style.box}"></div>
    <br>
    DEV: ${DEVELOPMENT.toString()}<br>
    PROD: ${PRODUCTION.toString()}<br>
`;
*/
app.innerHTML = `
    <div id="menu">
        <button id="loadPage1">page 1</button>
        <button id="loadPage2">page 2</button>
    </div>
    <div id="content">
        <h1>Home</h1>
    </div>
`;
const content = document.getElementById('content');

document.getElementById('loadPage1').addEventListener('click', () => {
    console.log('lloading page 1');
    System.import('./page1')
        .then(pageModule => {
            console.log(pageModule)
            //content.innerHTML = pageModule.default
        })
});

document.getElementById('loadPage2').addEventListener('click', () => {
    console.log('lloading page 2');
});

// app.appendChild(btn);
// app.appendChild(LogoImg);
// app.appendChild(BmwImg);


if(module.hot){
    module.hot.accept()
}


window.onload = function () {
    console.info('doc is loaded')
};
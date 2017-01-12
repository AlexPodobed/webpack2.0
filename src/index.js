import moment from 'moment';
import $ from 'jquery';
import './style/app.scss';

const app = document.getElementById('app');

app.innerHTML = `
    <div id="menu">
        <button class="btn btn-default" id="loadPage1">page 1</button>
        <button class="btn btn-default" id="loadPage2">page 2</button>
    </div>
    <div id="content">
        <h1>Home123</h1>
    </div>
`;
const content = document.getElementById('content');

$('#loadPage1').on('click', () => {
    System.import('./modules/page1').then(pageModule => content.innerHTML = pageModule.default)
});

$('#loadPage2').on('click', () => {
    System.import('./modules/page2').then(pageModule => content.innerHTML = pageModule.default)
});

console.log(moment().format());


if(module.hot){
    module.hot.accept()
}
/**
 * Created by liuhantao on 2018/6/8.
 */
import BgCanvas from 'src/js/bgModel/bgModel';
import BaseModel from 'src/js/baseModel/baseModel';
import EventController from 'src/js/controllerList/baseControl'
import './src/css/base.css';

BgCanvas.setBackground(true,'point');

let baseModel=new BaseModel('app');
let canvas=baseModel.canvas;
let ctx=baseModel.ctx;
baseModel.createNode();

canvas.onmousedown=function(event){
    var x = event.pageX - canvas.getBoundingClientRect().left;
    var y = event.pageY - canvas.getBoundingClientRect().top;
    console.log(x,y,'down');
    BgCanvas.clearBackground();
};
canvas.onmouseup=function(event){
    var x = event.pageX - canvas.getBoundingClientRect().left;
    var y = event.pageY - canvas.getBoundingClientRect().top;
    console.log(x,y,'up');
    BgCanvas.setBackground(true,'line');
};
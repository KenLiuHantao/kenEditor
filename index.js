/**
 * Created by liuhantao on 2018/6/8.
 */
import BaseModel from './src/js/baseModel/baseModel';
import BgModel from './src/js/bgModel/bgModel';
import EventController from './src/js/controllerList/baseControl'
import ControllerList from './src/js/controllerList/controllerList'
import './src/css/base.css';
import './src/css/font.css'
//建立背景canvas
export let bgCanvas=new BgModel('app');
bgCanvas.setBackground(true,'point');
//建立主canvas
export let baseModel=new BaseModel('app');
let canvas=baseModel.canvas;


let ctx=baseModel.ctx;
baseModel.createNode();

canvas.onmousedown=function(event){
    var x = event.pageX - canvas.getBoundingClientRect().left;
    var y = event.pageY - canvas.getBoundingClientRect().top;
    console.log(x,y,'down');
    //bgCanvas.clearBackground();
};
canvas.onmouseup=function(event){
    var x = event.pageX - canvas.getBoundingClientRect().left;
    var y = event.pageY - canvas.getBoundingClientRect().top;
    console.log(x,y,'up');
    //bgCanvas.setBackground(true,'line');
};
export let controllerList=new ControllerList('app');

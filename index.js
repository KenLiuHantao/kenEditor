/**
 * Created by liuhantao on 2018/6/8.
 */
import BaseModel from './src/js/baseModel/baseModel';
import BgModel from './src/js/bgModel/bgModel';
import EventController from './src/js/controllerList/baseControl'
import ControllerList from './src/js/controllerList/controllerList'
import NodeList from './src/js/nodeList/nodeListModel'
import canvasNodeListModel from './src/js/baseModel/canvasNodeListModel'
import canvasLineListModel from './src/js/baseModel/canvasLineListModel'
import './src/css/base.css';
import './src/css/font.css'
//建立背景canvas
export let bgCanvas=new BgModel('app');
//建立主canvas
export let baseModel=new BaseModel('app');
export let canvas=baseModel.canvas;
canvas.onmouseup=function(event){
    var x = event.pageX - canvas.getBoundingClientRect().left;
    var y = event.pageY - canvas.getBoundingClientRect().top;
    console.log(x,y,'up');
    //bgCanvas.setBackground(true,'line');
};
export let controllerList=new ControllerList('app');
export let nodeList=new NodeList('app');
export let canvasNodeList=new canvasNodeListModel();
export let canvasLineList=new canvasLineListModel();

baseModel.renderLine(baseModel);
baseModel.renderNode(baseModel);



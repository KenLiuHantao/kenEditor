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
console.log(0)
let kenEditor={};
kenEditor.init = function (dom, width, height) {
    //建立背景canvas
    kenEditor.bgCanvas = new BgModel('app');
    //建立主canvas
    kenEditor.canvasNodeList = new canvasNodeListModel();
    kenEditor.canvasLineList = new canvasLineListModel();
    kenEditor.baseModel = new BaseModel('app');
    kenEditor.canvas = kenEditor.baseModel.canvas;
    kenEditor.controllerList = new ControllerList('app');
    kenEditor.nodeList = new NodeList('app');

    //临时放着的线条demo数据
    kenEditor.canvasLineList.setCanvasLine([{
        from: kenEditor.canvasNodeList.canvasNodeList[0],
        to: kenEditor.canvasNodeList.canvasNodeList[1],
        active: false,
        complete: true
    }]);
    kenEditor.baseModel.renderLine(kenEditor.baseModel);
    kenEditor.baseModel.renderNode(kenEditor.baseModel);
};
//console.log(2)
//kenEditor.init()
exports.kenEditor=kenEditor;



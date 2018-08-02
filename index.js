/**
 * Created by liuhantao on 2018/6/8.
 */
import BaseModel from './src/js/baseModel/baseModel';
import BgModel from './src/js/bgModel/bgModel';
import EventController from './src/js/controllerList/baseControl'
import ControllerList from './src/js/controllerList/controllerList'
import recordList from './src/js/controllerList/recordList'
import NodeList from './src/js/nodeList/nodeListModel'
import canvasNodeListModel from './src/js/baseModel/canvasNodeListModel'
import canvasLineListModel from './src/js/baseModel/canvasLineListModel'
import './src/css/base.css';
import './src/css/font.css'
let kenEditor={};
kenEditor.init = function (dom, width, height) {
    //建立背景canvas
    kenEditor.bgCanvas = new BgModel(dom);
    //建立主canvas
    kenEditor.canvasNodeList = new canvasNodeListModel();
    kenEditor.canvasLineList = new canvasLineListModel();
    kenEditor.baseModel = new BaseModel(dom);
    kenEditor.canvas = kenEditor.baseModel.canvas;
    kenEditor.controllerList = new ControllerList(dom);
    kenEditor.nodeList = new NodeList(dom);
    kenEditor.EventController=EventController;
    kenEditor.recordList=new recordList();
};
window.$kenEditor=kenEditor;
//kenEditor.init('app');

export default kenEditor



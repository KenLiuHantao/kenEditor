/**
 * Created by liuhantao on 2018/6/12.
 */
import config from './controlConfig'
import ControllerModel from './controllerModel'
class ControllerList {
    constructor(id) {
        this.controllerList=this._loadDefaultControllerConfig();
        this._createControllerList(id);
    }

    _createControllerList(id) {
        if (document.querySelector('#controllerList')) {
            console.warn("Can't build second controllerList");
            return
        }
        var dom = document.createElement('div');
        dom.setAttribute('id', 'controllerList');
        if (document.querySelector('#' + id) === null) {
            console.error("Can't find DOM with #" + id + '!');
            return
        }
        let controller=new ControllerModel();
        for(var i=0;i<this.controllerList.length;i++){
            var controllerDom=controller.createControllerDom(this.controllerList[i]);
            dom.appendChild(controllerDom);
        }
        document.querySelector('#' + id).appendChild(dom);
    }

    _loadDefaultControllerConfig() {
        return config
    }

    addController(controller){
        if(typeof (controller)!='object'){
            console.warn('Wrong parameters!')
        }
        this.controllerList.push(controller)
    }

    changeControllerIndex(from,to){
        let data=this.controllerList[to];
        this.controllerList[to]=this.controllerList[from];
        this.controllerList[from]=data;
    }

    deleteController(index){
        this.controllerList.splice(index,1)
    }
}
export default ControllerList
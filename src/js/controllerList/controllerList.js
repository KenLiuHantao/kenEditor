/**
 * Created by liuhantao on 2018/6/12.
 */
import config from './controlConfig'
import ControllerModel from './controllerModel'
class ControllerList {
    constructor(id) {
        this.id=id;
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
        if(document.querySelector('#' + id).firstChild){
            document.querySelector('#' + id).insertBefore( dom,document.querySelector('#' + id).firstChild);
        }else{
            document.querySelector('#' + id).appendChild( dom);
        }

    }

    _loadDefaultControllerConfig() {
        return config
    }

    addController(controller){
        if(typeof (controller)!='object'){
            console.warn('Wrong parameters!')
        }
        this.controllerList.push(controller);
        this.render();
    }

    changeControllerIndex(from,to){
        let data=this.controllerList[to];
        this.controllerList[to]=this.controllerList[from];
        this.controllerList[from]=data;
        this.render();
    }

    deleteControllerByIndex(index){
        this.controllerList.splice(index,1)
        this.render();
    }
    deleteControllerByName(name){
        var index=null;
        for(var i=0;i<this.controllerList.length;i++){
            if(this.controllerList[i].name==name){
                index=i;
                break;
            }
        }
        if(index || i==0){
            this.controllerList.splice(index,1)
        }
        this.render();
    }
    changeControllerStateByName(name,state){
        var index=null;
        for(var i=0;i<this.controllerList.length;i++){
            if(this.controllerList[i].name==name){
                index=i;
                break;
            }
        }
        if(index || i==0){
            this.controllerList[index].state=state;
            this.controllerList[index].class=state;
            this.singerRender(this.controllerList[index].name,state)
        }
    }
    singerRender(title,className){
        var dom=document.querySelector('i[title='+title+']');
        dom.setAttribute('class','iconfont singleController '+className);
        dom.setAttribute('status',className)
    }
    render(){
        var dom=document.getElementById("controllerList");
        dom.parentNode.removeChild(dom);
        this._createControllerList(this.id);
    }
}
export default ControllerList
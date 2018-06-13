/**
 * Created by liuhantao on 2018/6/12.
 */
class ControllerList{
    constructor(id){
        this._createControllerList(id)
    }
    _createControllerList(id){
        if(document.querySelector('#controllerList')){
            console.warn("Can't build second controllerList");
            return
        }
        var dom=document.createElement('div');
        dom.setAttribute('id','controllerList');
        if (document.querySelector('#' + id) === null) {
            console.error("Can't find DOM with #" + id + '!');
            return
        }
        document.querySelector('#' + id).appendChild(dom);
    }
}
export default ControllerList
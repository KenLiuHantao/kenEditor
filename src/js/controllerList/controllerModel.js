/**
 * Created by liuhantao on 2018/6/13.
 */

class controllerModel {
    constructor(){

    }
    createControllerDom(config={}){
        if(typeof (config)!='object'){
            console.warn('Wrong parameters!')
        }
        console.log(config)
        var dom=document.createElement('i');
        dom.innerHTML=config.icon;
        dom.setAttribute('class','iconfont');
        dom.setAttribute('title',config.popup);
        return dom
    }
}
export  default controllerModel
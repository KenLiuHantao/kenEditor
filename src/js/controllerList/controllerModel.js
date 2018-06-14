/**
 * Created by liuhantao on 2018/6/13.
 */
import EventController from './baseControl'
//加载默认事件
import './defaultEvent'
class controllerModel {
    constructor() {

    }

    createControllerDom(config = {}) {
        if (typeof (config) != 'object') {
            console.warn('Wrong parameters!')
        }
        //分割线单独区分下
        if(config.class=='separator'){
            var dom = document.createElement('span');
            dom.setAttribute('class', config.class);
            return dom
        }else{
            var dom = document.createElement('i');
            dom.innerHTML = config.icon;
            dom.setAttribute('class', 'iconfont singleController '+config.class);
            dom.setAttribute('title', config.popup);
            dom.setAttribute('status', config.status);
            if(config.eventName){
                this.addDomEvent(dom,config.eventName)
            }
            return dom
        }
    }
    addDomEvent(dom,eventName){
        dom.addEventListener('click',function(){
            fn(dom,eventName);
        });
        function  fn(dom,eventName){
            //添加验证 如果status为disable就不执行事件
            if(dom.getAttribute('status')!='disable'){
                EventController.emit(eventName)
            }
        }
    }
}
export default controllerModel
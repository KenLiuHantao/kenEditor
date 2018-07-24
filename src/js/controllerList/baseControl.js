/**
 * Created by liuhantao on 2018/6/12.
 */
/*
 *一个简单的事件控制器
 * listenList 存储已经监听的事件和对应的事件名
 * emit 方法触发存储的事件 第一个参数是事件名 后面的是不定个数的参数
 * addEventListener 方法可以添加事件进入listenList
 * removeEventListener 方法根据name移除listenList
 */
class EventController{
    constructor(){
        this.listenList=[]
    }

    emit(eventName,...arg){
        let flag=true;
        this.listenList.map(function(item,index,arr){
            if(item.name==eventName){
                flag=false;
                item.func(...arg)
            }
        });
        if(flag){
            console.warn(eventName+' not being monitored!')
        }
    }
    addEventListener(name,func){
        if(typeof func !='function'){
            console.warn('The second parameter is not a function');
            return false
        }
        let flag=false;
        this.listenList.map(function(item,index,arr){
            if(item.name==name){
                flag=true;
            }
        });
        if(flag){
            console.warn('Can\'t use same name! ')
        }else{
            this.listenList.push({
                name:name,
                func:func
            })
        }
    }
    changeEventListener(name,func){
        this.listenList.map(function(item,index,arr){
            if(item.name==name){
                item.func=func;
            }
        });
    }
    removeEventListener(name){
        for(var i=0;i>this.listenList.lengthl;i++){
            if(this.listenList.name==name){
                this.listenList.splice(i,1);
                break;
            }
        }
    }
    getListenList(){
        return this.listenList
    }
}
var eventController=new EventController();
export default eventController
/**
 * Created by liuhantao on 2018/6/14.
 */
//这里都是预制的事件
import EventController from './baseControl'
//控制栏一堆事件
//1.后退
EventController.addEventListener('goBack',function(){
    console.log('后退')
});
//2.前进
EventController.addEventListener('goAhead',function(){
    console.log('前进')
});
//3.复制
EventController.addEventListener('copy',function(){
    console.log('复制')
});
//4.粘贴
EventController.addEventListener('paste',function(){
    console.log('粘贴')
});
//5.删除
EventController.addEventListener('delete',function(){
    console.log('删除')
});
//6.放大
EventController.addEventListener('setBig',function(){
    console.log('放大')
});
//7.缩小
EventController.addEventListener('setSmall',function(){
    console.log('缩小')
});
//8.适应画布
EventController.addEventListener('setAuto',function(){
    console.log('适应画布')
});
//9.实际尺寸
EventController.addEventListener('setDefault',function(){
    console.log('实际尺寸');
    //controllerList.deleteControllerByIndex(1);
});
//10.变更背景图为线状
EventController.addEventListener('changeBackgroundLine',function(dom){
    let bgCanvas=$kenEditor.bgCanvas;
    if(dom.getAttribute('class').indexOf('active')!=-1){
        dom.setAttribute('class',dom.getAttribute('class').replace('active','default'));
        bgCanvas.clearBackground()
    }else{
        dom.setAttribute('class',dom.getAttribute('class').replace('default','active'));
        bgCanvas.setBackground('line')
    }
});
//11.变更背景图为点状
EventController.addEventListener('changeBackgroundPoint',function(dom){
    let bgCanvas=$kenEditor.bgCanvas;
    if(dom.getAttribute('class').indexOf('active')!=-1){
        dom.setAttribute('class',dom.getAttribute('class').replace('active','default'));
        bgCanvas.clearBackground()
    }else{
        dom.setAttribute('class',dom.getAttribute('class').replace('default','active'));
        bgCanvas.setBackground('point')
    }
});
//节点加入画布的事件
EventController.addEventListener('addNode',function(config,event){
    event.dataTransfer.setData("icon", config.icon);
    event.dataTransfer.setData("name", config.name);
    event.dataTransfer.setData("type", config.type);
});
//绘制圆角矩形的方法
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) {r = w / 2;}
    if (h < 2 * r){ r = h / 2;}
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
};
//键盘事件
document.addEventListener('keyup',function(e){
    let baseModel=$kenEditor.baseModel;
    let canvasNodeList=$kenEditor.canvasNodeList;
    //删除节点事件
    if(e.keyCode==46){
        if(canvasNodeList.selectNode){
            var nodeList=canvasNodeList.getCanvasNodeList();
            var newList=nodeList.filter(function(node){
                return node.active!=true;
            });
            canvasNodeList.setCanvasNodeList(newList);
            baseModel.clearAll(baseModel);
            baseModel.renderNode(baseModel);
        }
    }
});
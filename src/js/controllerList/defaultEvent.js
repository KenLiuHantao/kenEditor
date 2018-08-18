/**
 * Created by liuhantao on 2018/6/14.
 */
//这里都是预制的事件
import EventController from './baseControl'
//控制栏一堆事件
//0.保存
EventController.addEventListener('saveTask',function(){
    console.log('保存')
});
//1.后退
EventController.addEventListener('goBack',function(){
    console.log('后退')
    $kenEditor.recordList.goBack();
});
//2.前进
EventController.addEventListener('goAhead',function(){
    console.log('前进')
    $kenEditor.recordList.goNext();
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
//12.node双击事件
EventController.addEventListener('doubleClick',function(node){
    console.log(node)
});
//13.添加连线事件
EventController.addEventListener('addLine',function(line){
   console.log(line,1)
});
//节点加入画布的事件
EventController.addEventListener('addNode',function(config,event){
    event.dataTransfer.setData("icon", config.icon);
    event.dataTransfer.setData("name", config.name);
    event.dataTransfer.setData("type", config.type);
    event.dataTransfer.setData("clazz", config.clazz);
    event.dataTransfer.setData("configName", config.configName);
    event.dataTransfer.setData("configType", config.configType);
    event.dataTransfer.setData("configId", config.configId);
    event.dataTransfer.setData("version", config.version);
    event.dataTransfer.setData("groupId", config.groupId);
    event.dataTransfer.setData("artifactId", config.artifactId);
    event.dataTransfer.setData("mark", config.mark);
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
    //只读状态不进入事件
    if($kenEditor.readOnly){
        return
    }
    let baseModel=$kenEditor.baseModel;
    let canvasNodeList=$kenEditor.canvasNodeList;
    let canvasLineList=$kenEditor.canvasLineList;
    if(e.keyCode==46){
        //删除节点事件
        if(canvasNodeList.selectNode){
            var nodeList=canvasNodeList.getCanvasNodeList();
            var deleteNode;
            var newList=nodeList.filter(function(node){
                if(node.active){
                    deleteNode=node;
                }
                return node.active!=true;
            });
            var newLine=canvasLineList.getCanvasLineList().filter(function(line){
                if(line.from!=deleteNode&&line.to!=deleteNode){
                    return line
                }
            });
            canvasNodeList.setCanvasNodeList(newList);
            canvasLineList.setCanvasLineList(newLine);
            baseModel.clearAll(baseModel);
            baseModel.renderLine(baseModel);
            baseModel.renderNode(baseModel);
            //删除节点时记录操作
            $kenEditor.recordList.addRecord($kenEditor.canvasNodeList.canvasNodeList,$kenEditor.canvasLineList.canvasLineList);
        }
        //删除线段事件
        if(canvasLineList.activeLine){
            var newLine=canvasLineList.getCanvasLineList().filter(function(line){
                if(line.active!=true && line!=canvasLineList.activeLine){
                    return line
                }
            });
            canvasLineList.setCanvasLineList(newLine);
            baseModel.clearAll(baseModel);
            baseModel.renderLine(baseModel);
            baseModel.renderNode(baseModel);
            //删除线条时记录操作
            $kenEditor.recordList.addRecord($kenEditor.canvasNodeList.canvasNodeList,$kenEditor.canvasLineList.canvasLineList);
        }
    }
});
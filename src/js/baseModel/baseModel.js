/**
 * Created by liuhantao on 2018/6/11.
 * 基本画布模型
 * 只包含基本样式属性和样式交互
 * 业务逻辑尽量抽出来放baseControl里面去
 */
import Node from './canvasNode';
import Line from './canvasLine';
import EventController from '../controllerList/baseControl'
class baseModel {
    constructor(id) {
        //在传入id的dom下新建一个核心canvas
        //baseModel有且仅有一个 所以新建前检查一下
        if (document.querySelector('#baseCanvas')) {
            console.warn("Can't build second baseModel");
            return
        }
        if (document.querySelector('#' + id) === null) {
            console.error("Can't find DOM with #" + id + '!');
            return
        }
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'baseCanvas');
        //异步添加节点 避免获取不到父节点宽度
        this.build = false;
        var that = this;
        //区分readOnly下的画布
        setTimeout(function () {
            if(!$kenEditor.readOnly){
                canvas.setAttribute('width', document.querySelector('#' + id).offsetWidth - 300);
                canvas.setAttribute('height', document.querySelector('#' + id).offsetHeight - 45);
                document.querySelector('#' + id).appendChild(canvas);
                that.build = true;
                that._addDragListener();
                that._addMouseDownListener();
                that._addMouseMoveListener();
                that._addMouseUpListener();
            }else{
                canvas.setAttribute('width', document.querySelector('#' + id).offsetWidth - 40);
                canvas.setAttribute('height', document.querySelector('#' + id).offsetHeight - 20);
                document.querySelector('#' + id).appendChild(canvas);
                that.build = true;
                that._addDragListener();
                that._addMouseDownListener();
                that._addMouseMoveListener();
                that._addMouseUpListener();
                canvas.setAttribute('class','readOnly');
            }
        }, 100);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.addOnce = false;
        this.isdragging = false;
        this.isLineing = false;
        this.isDbclick=false;
        this.isdraggingAll=false;
        this.draggingOffsetX = 0;
        this.draggingOffsetY = 0;
        this.isdraggingAllOffsetX = 0;
        this.isdraggingAllOffsetY = 0;
        this.lastDragX=0;
        this.lastDragY=0;
        this.clickTime=new Date();
    }

    clearAll(that) {
        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height)
    }

    renderNode(that) {
        let canvasNodeList = $kenEditor.canvasNodeList;
        if (that.build) {
            for (var i = 0; i < canvasNodeList.canvasNodeList.length; i++) {
                let node = new Node(canvasNodeList.canvasNodeList[i]);
                node.render();
            }
        } else {
            setTimeout(function () {
                that.renderNode(that)
            }, 200)
        }
    }

    renderLine(that) {
        let canvasLineList = $kenEditor.canvasLineList;
        if (that.build) {
            for (var i = 0; i < canvasLineList.canvasLineList.length; i++) {
                let line = new Line(canvasLineList.canvasLineList[i]);
                line.render();
            }
        } else {
            setTimeout(function () {
                that.renderLine(that)
            }, 200)
        }
    }

    _addDragListener() {
        let canvasNodeList = $kenEditor.canvasNodeList;
        let that=this;
        if (!this.addOnce) {
            document.addEventListener('dragover', function (e) {
                e.preventDefault();
            });
            this.canvas.addEventListener('drop', function (e) {
                if (!e.dataTransfer.getData('name')) {
                    e.preventDefault();
                    return
                }
                //为了项目需求临时加一个验证 数据源和目的地只能存在一个 其实我觉得不应该放在这里的
                var nodeList=canvasNodeList.getCanvasNodeList();
                if(e.dataTransfer.getData('type')=='sourceData'){
                    var flag=false;
                    for(var i=0;i<nodeList.length;i++){
                        if(nodeList[i].type=='sourceData'){
                            flag=true;
                            break
                        }
                    }
                    if(flag){
                        EventController.emit('dragError','数据源只能存在一个');
                        return
                    }
                }
                if(e.dataTransfer.getData('type')=='targetData'){
                    var flag=false;
                    for(var i=0;i<nodeList.length;i++){
                        if(nodeList[i].type=='targetData'){
                            flag=true;
                            break
                        }
                    }
                    if(flag){
                        EventController.emit('dragError','目的地只能存在一个');
                        return
                    }
                }
                var config = {
                    id:that.setId(),
                    icon: e.dataTransfer.getData('icon'),
                    name: e.dataTransfer.getData('name'),
                    type: e.dataTransfer.getData('type'),
                    clazz: e.dataTransfer.getData('clazz'),
                    configName: e.dataTransfer.getData('configName'),
                    configType: e.dataTransfer.getData('configType'),
                    configId: e.dataTransfer.getData('configId'),
                    version: e.dataTransfer.getData('version'),
                    groupId: e.dataTransfer.getData('groupId'),
                    artifactId: e.dataTransfer.getData('artifactId'),
                    mark: e.dataTransfer.getData('mark'),
                    x: e.offsetX,
                    y: e.offsetY
                };
                canvasNodeList.addCanvasNode(config);
                //拖入节点时记录操作
                $kenEditor.recordList.addRecord($kenEditor.canvasNodeList.canvasNodeList,$kenEditor.canvasLineList.canvasLineList);
            });
            this.addOnce = true;
        }
    }

    _addMouseDownListener() {
        var that = this;
        let canvasNodeList = $kenEditor.canvasNodeList;
        let canvasLineList = $kenEditor.canvasLineList;
        this.canvas.onmousedown = function (event) {
            let clickX = event.offsetX, clickY = event.offsetY;
            let nodeList = canvasNodeList.canvasNodeList;
            let lineList = canvasLineList.canvasLineList;

            //临时记录之前激活的node 用来判断双击时间
            let selectNode;
            if (canvasNodeList.selectNode != null){
                selectNode=canvasNodeList.selectNode
            }

            //临时记录之前激活的Line 用来判断双击时间
            let activeLine;
            if (canvasLineList.activeLine != null){
                activeLine=canvasLineList.activeLine
            }
            //每次有效的点击都最好先去除之前的激活状态
            if (canvasNodeList.selectNode != null) {
                canvasNodeList.selectNode.active = false;
                canvasNodeList.selectNode = null;

            }
            //每次有效的点击都最好先去除之前的新增线条和激活线条
            if (canvasLineList.selectLine != null) {
                canvasLineList.selectLine.active=false;
                canvasLineList.selectLine = null;
            }
            if (canvasLineList.activeLine != null) {
                canvasLineList.activeLine.active=false;
                canvasLineList.activeLine = null;
            }
            that.clearAll(that);
            that.renderLine(that);
            that.renderNode(that);
            //判断节点边拉线选中后的事件
            for (var i = nodeList.length - 1; i >= 0; i--) {
                var rect = nodeList[i];
                //目的地没有拉线
                if (rect.type == 'targetData') {

                } else {
                    // 判断这个点是否在节点中
                    if (rect.x + 85 >= clickX && clickX >= rect.x + 65 && rect.y - 10 <= clickY && clickY <= rect.y + 10) {
                        var newLine = {
                            from: rect,
                            to: {x: rect.x + 95, y: rect.y},
                            active: false,
                            complete: false,
                            attr: []
                        };
                        canvasLineList.addCanvasLine(newLine);
                        canvasLineList.selectLine = newLine;
                        that.isLineing = true;
                        return
                    }
                }
            }
            //判断节点选中后的事件
            for (var i = nodeList.length - 1; i >= 0; i--) {
                var rect = nodeList[i];
                //使用坐标计算这个点与中心坐标之间的关系
                // 判断这个点是否在节点中
                if (rect.x - 75 <= clickX && clickX <= rect.x + 75 && rect.y - 50 <= clickY && clickY <= rect.y + 50) {
                    //判断双击时间
                    let clickTime=new Date();
                    if(clickTime-that.clickTime<=300 && rect==selectNode){
                        that.isDbclick=true;
                        EventController.emit('doubleClick',selectNode);
                        break;
                    }else{
                        that.clickTime=clickTime;
                    }
                    // 清除之前选择的节点
                    if (canvasNodeList.selectNode != null) canvasNodeList.selectNode.active = false;
                    canvasNodeList.selectNode = rect;
                    //记录选点和中心点的偏移量
                    that.draggingOffsetX = clickX - rect.x;
                    that.draggingOffsetY = clickY - rect.y;
                    //选择新节点
                    rect.active = true;
                    that.isdragging = true;
                    //改变nodeList顺序来让激活的节点位于最上面
                    canvasNodeList.changeCanvasNodeListIndex(i, nodeList.length - 1);
                    //更新显示
                    that.clearAll(that);
                    that.renderLine(that);
                    that.renderNode(that);
                    //停止搜索
                    break;
                }
            }
            //判断线条选中后事件
            var choiceLine=false;
            for(var i=lineList.length-1;i>=0;i--){
                let line=lineList[i];
                //下面这一大堆是为了判断点击位置在不在线上
                let ctx=that.ctx;
                var controlPoint1={
                    x:(line.from.x+line.to.x)/2,
                    y:line.from.y
                };
                var controlPoint2={
                    x:(line.from.x+line.to.x)/2,
                    y:line.to.y
                };
                var beginPoint={
                    x:line.from.x+75,
                    y:line.from.y
                };
                var endPoint={
                    x:line.to.x-75,
                    y:line.to.y
                };
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.moveTo(beginPoint.x, beginPoint.y);
                if(endPoint.x>beginPoint.x){
                    ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y,endPoint.x-20,endPoint.y);
                }else{
                    ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y,endPoint.x+20,endPoint.y);
                }
                var flag=false;
                //直接判断范围太小很难选中 加上3px的容错让线条好选一点
                for(var j=-3;j<=3;j++){
                    if(flag){
                        break;
                    }
                    for(var k=-3;k<=3;k++){
                        if(ctx.isPointInPath(clickX+j,clickY+k)){
                            flag=true;
                            break;
                        }
                    }
                }
                if(flag){
                    choiceLine=true;
                    //判断双击时间
                    let clickTime=new Date();
                    if(clickTime-that.clickTime<=300 && line==activeLine){
                        EventController.emit('doubleClickLine',activeLine);
                        break;
                    }else{
                        that.clickTime=clickTime;
                    }
                    if (canvasLineList.activeLine != null) canvasLineList.activeLine.active = false;
                    canvasLineList.activeLine = line;
                    canvasLineList.activeLine.active=true;
                    //更新显示
                    that.clearAll(that);
                    that.renderLine(that);
                    that.renderNode(that);
                    //停止搜索
                    break;
                }
            }
            //当既没有选择点也没有选择线 啥都没有选择的时候才有全局移动
            if(!that.isdragging && !that.isLineing && !choiceLine && !that.isDbclick){
                that.isdraggingAll=true;
                that.isdraggingAllOffsetX=clickX;
                that.isdraggingAllOffsetY=clickY;
            }
        }
    }

    _addMouseMoveListener() {
        var that = this;
        let canvasNodeList = $kenEditor.canvasNodeList;
        let canvasLineList = $kenEditor.canvasLineList;
        this.canvas.onmousemove = function (event) {
            //选中状态下选中节点跟着鼠标移动就行
            if (that.isdragging) {
                let moveX = event.offsetX, moveY = event.offsetY;
                canvasNodeList.selectNode.x = moveX - that.draggingOffsetX;
                canvasNodeList.selectNode.y = moveY - that.draggingOffsetY;
                that.clearAll(that);
                that.renderLine(that);
                that.renderNode(that);
            }
            //新增线条跟随移动
            if (that.isLineing) {
                let moveX = event.offsetX, moveY = event.offsetY;
                canvasLineList.selectLine.to = {
                    x: moveX + 95,
                    y: moveY
                };
                that.clearAll(that);
                that.renderLine(that);
                that.renderNode(that);
            }
            //没有选中任何东西的时候 鼠标拖拽移动全局
            if(that.isdraggingAll){
                let moveX = event.offsetX, moveY = event.offsetY;
                let changeX=moveX-that.isdraggingAllOffsetX-that.lastDragX,changeY=moveY-that.isdraggingAllOffsetY-that.lastDragY;
                let nodeList=canvasNodeList.getCanvasNodeList();
                //遍历移动所有的点的坐标
                for(var i=0;i<nodeList.length;i++){
                    nodeList[i].x+=changeX;
                    nodeList[i].y+=changeY;
                }
                //覆盖lastDragX
                that.lastDragX=moveX-that.isdraggingAllOffsetX;
                that.lastDragY=moveY-that.isdraggingAllOffsetY;
                that.clearAll(that);
                that.renderLine(that);
                that.renderNode(that);
            }
        }
    }

    _addMouseUpListener() {
        var that = this;
        let canvasLineList = $kenEditor.canvasLineList;
        let canvasNodeList = $kenEditor.canvasNodeList;
        this.canvas.onmouseup = function (event) {
            let clickX = event.offsetX, clickY = event.offsetY;
            //区分拖拽节点和拉线
            if (that.isdragging) {
                that.isdragging = false;
                that.draggingOffsetX = 0;
                that.draggingOffsetY = 0;
            }
            if (that.isLineing) {
                let nodeList = canvasNodeList.canvasNodeList;
                that.isLineing = false;
                //判断拉线拉到位没，没拉对的线直接删除
                for (var i = nodeList.length - 1; i >= 0; i--) {
                    var rect = nodeList[i];
                    //数据源不能被拉
                    if (rect.type == 'sourceData') {

                    } else {
                        // 判断这个点是否在节点中
                        if (clickX >= rect.x - 85 && clickX <= rect.x - 65 && rect.y - 10 <= clickY && clickY <= rect.y + 10) {
                            //拉到了也要检查是不是有重复的
                            if(!canvasLineList.selectLine){
                                break;
                            }
                            canvasLineList.selectLine.to = rect;
                            var hasSame=false;
                            for (var j = 0; j < canvasLineList.canvasLineList.length - 1; j++) {
                                if(canvasLineList.canvasLineList[j].from==canvasLineList.selectLine.from && canvasLineList.canvasLineList[j].to==canvasLineList.selectLine.to ){
                                    hasSame=true;
                                }
                            }
                            if(!hasSame){
                                canvasLineList.selectLine.complete = true;
                                EventController.emit('addLine',canvasLineList.canvasLineList[canvasLineList.canvasLineList.length-1]);
                                that.clearAll(that);
                                that.renderLine(that);
                                that.renderNode(that);
                                //添加线条时记录操作
                                $kenEditor.recordList.addRecord($kenEditor.canvasNodeList.canvasNodeList,$kenEditor.canvasLineList.canvasLineList);
                                return
                            }
                        }
                    }
                }
                canvasLineList.canvasLineList.splice(canvasLineList.canvasLineList.length - 1, 1);
                that.clearAll(that);
                that.renderLine(that);
                that.renderNode(that);
            }
            if(that.isdraggingAll){
                that.isdraggingAll=false;
                that.lastDragX=0;
                that.lastDragY=0;
            }
            that.isDbclick=false;
        }
    }

    setId(){
        var id=parseInt(Math.random()*1008611);
        var flag=true;
        var canvasNodeList = $kenEditor.canvasNodeList.canvasNodeList;
        for(var i=0;i<canvasNodeList.length;i++){
            if(canvasNodeList[i].id==id){
                flag=false;
                break
            }
        }
        if(flag){
            return id
        }else{
            return this.setId();
        }
    }
}
export default baseModel
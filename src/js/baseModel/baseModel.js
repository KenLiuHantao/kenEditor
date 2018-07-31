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
        setTimeout(function () {
            canvas.setAttribute('width', document.querySelector('#' + id).offsetWidth - 200);
            canvas.setAttribute('height', '600');
            document.querySelector('#' + id).appendChild(canvas);
            that.build = true;
            that._addDragListener();
            that._addMouseDownListener();
            that._addMouseMoveListener();
            that._addMouseUpListener();
        }, 100);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.addOnce = false;
        this.isdragging = false;
        this.isLineing = false;
        this.draggingOffsetX = 0;
        this.draggingOffsetY = 0;
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
                    x: e.offsetX,
                    y: e.offsetY
                };
                canvasNodeList.addCanvasNode(config)
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

            //临时记录之前激活的node 用来判断双击时间
            let selectNode;
            if (canvasNodeList.selectNode != null){
                selectNode=canvasNodeList.selectNode
            }

            //每次有效的点击都最好先去除之前的激活状态
            if (canvasNodeList.selectNode != null) {
                canvasNodeList.selectNode.active = false;
                canvasNodeList.selectNode = null;

            }
            if (canvasLineList.selectLine != null) {
                canvasLineList.selectLine.active = false;
                canvasLineList.selectLine = null;
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
                            attr: {}
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
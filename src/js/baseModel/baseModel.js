/**
 * Created by liuhantao on 2018/6/11.
 * 基本画布模型
 * 只包含基本样式属性和样式交互
 * 业务逻辑尽量抽出来放baseControl里面去
 */
import Node from './canvasNode';
import {canvasNodeList} from'../../../index'
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
        this.build=false;
        var that=this;
        setTimeout(function () {
            canvas.setAttribute('width', document.querySelector('#' + id).offsetWidth - 400);
            canvas.setAttribute('height', '600');
            document.querySelector('#' + id).appendChild(canvas);
            that.build=true;
            that._addDragListener();
            that._addMouseDownListener();
            that._addMouseMoveListener();
            that._addMouseUpListener();
        }, 100);
        this.canvas = canvas;
        this.ctx=canvas.getContext('2d');
        this.addOnce=false;
        this.isdragging=false;
    }
    clearAll(that){
        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height)
    }
    renderNode(that) {
        if(that.build){
            for (var i = 0; i < canvasNodeList.canvasNodeList.length; i++) {
                let node = new Node(canvasNodeList.canvasNodeList[i]);
                node.render();
            }
        }else{
            setTimeout(function(){
                that.renderNode(that)
            },200)
        }
    }
    _addDragListener(){
        if(!this.addOnce){
            document.addEventListener('dragover',function(e){
                e.preventDefault();
            });
            this.canvas.addEventListener('drop',function(e){
                if(!e.dataTransfer.getData('name')) {
                    e.preventDefault();
                }
                var config={
                    icon:e.dataTransfer.getData('icon'),
                    name:e.dataTransfer.getData('name'),
                    type:e.dataTransfer.getData('type'),
                    x:e.offsetX,
                    y:e.offsetY
                };
                canvasNodeList.addCanvasNode(config)
            });
            this.addOnce=true;
        }
    }
    _addMouseDownListener(){
        var that=this;
        this.canvas.onmousedown= function (event) {
            let clickX=event.offsetX,clickY=event.offsetY;
            let nodeList=canvasNodeList.canvasNodeList;
            let flag=false;
            for(var i=nodeList.length-1; i>=0; i--) {
                var rect = nodeList[i];
                //使用坐标计算这个点与中心坐标之间的关系
                // 判断这个点是否在节点中
                if ( rect.x-75<=clickX && clickX<= rect.x+75 && rect.y-50<=clickY  && clickY <= rect.y+50) {
                    flag=true;
                    // 清除之前选择的节点
                    if (canvasNodeList.selectNode != null) canvasNodeList.selectNode.active = false;
                    canvasNodeList.selectNode = rect;

                    //选择新节点
                    rect.active = true;
                    that.isdragging=true;
                    //改变nodeList顺序来让激活的节点位于最上面
                    canvasNodeList.changeCanvasNodeListIndex(i,nodeList.length-1);
                    //更新显示
                    that.clearAll(that);
                    that.renderNode(that);

                    //停止搜索
                    break;
                }
            }
            //没选中任何的话清除激活状态 有激活才清空避免无效渲染
            if(!flag){
                if (canvasNodeList.selectNode != null){
                    canvasNodeList.selectNode.active = false;
                    canvasNodeList.selectNode = null;
                    that.clearAll(that);
                    that.renderNode(that);
                }
            }
        }
    }
    _addMouseMoveListener(){
        var that=this;
        this.canvas.onmousemove= function (event) {
            //选中状态下选中节点跟着鼠标移动就行
            if(that.isdragging){
                let clickX=event.offsetX,clickY=event.offsetY;
                canvasNodeList.selectNode.x=clickX;
                canvasNodeList.selectNode.y=clickY;
                that.clearAll(that);
                that.renderNode(that);
            }
        }
    }
    _addMouseUpListener(){
        var that=this;
        this.canvas.onmouseup=function(){
            that.isdragging=false;
        }
    }
}
export default baseModel
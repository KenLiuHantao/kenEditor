/**
 * Created by liuhantao on 2018/6/11.
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
            that.addDragListener()
        }, 100);
        this.canvas = canvas;
        this.addOnce=false;
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
    addDragListener(){
        if(!this.addOnce){
            document.addEventListener('dragover',function(e){
                e.preventDefault();
            });
            this.canvas.addEventListener('drop',function(e){
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
}
export default baseModel
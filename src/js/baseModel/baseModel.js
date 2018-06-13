/**
 * Created by liuhantao on 2018/6/11.
 */
import $ from 'jquery'
import Node from './node';
class baseModel {
    constructor(id) {
        //在传入id的dom下新建一个核心canvas
        //baseModel有且仅有一个 所以新建前检查一下
        if(document.querySelector('#baseCanvas')){
            console.warn("Can't build second baseModel");
            return
        }
        if (document.querySelector('#' + id) === null) {
            console.error("Can't find DOM with #" + id + '!');
            return
        }

        var canvas=document.createElement('canvas');
        canvas.setAttribute('id','baseCanvas');
        //异步添加节点 避免获取不到父节点宽度
        setTimeout(function(){
            canvas.setAttribute('width',document.querySelector('#' + id).offsetWidth-400);
            canvas.setAttribute('height','600');
            document.querySelector('#' + id).appendChild(canvas);
        },100);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodeList=[];
    }

    createNode() {
        var node=new Node();
        this.nodeList.push(node);
    }
}
export default baseModel
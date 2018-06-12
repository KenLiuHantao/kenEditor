/**
 * Created by liuhantao on 2018/6/11.
 */
import Node from './node';
class baseModel {
    constructor(id) {
        //在传入id的dom下新建一个核心canvas
        var canvas=document.createElement('canvas');
        document.querySelector('#' + id).appendChild(canvas);
        this.canvas = document.querySelector('#' + id);
        if (this.canvas === null) {
            console.error("Can't find DOM with #" + id + '!');
            return
        }
        this.ctx = canvas.getContext('2d');
        this.nodeList=[];
    }

    createNode() {
        var node=new Node();
        this.nodeList.push(node);
    }
}
export default baseModel
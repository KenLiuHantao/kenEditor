import canvasNode from './canvasNode'
class canvasNodeListModel {
    constructor() {
        this.canvasNodeList = [
        ];
        this.selectLine=null;
    }

    setCanvasNodeList(arr) {
        this.canvasNodeList = arr;
    }

    getCanvasNodeList() {
        return this.canvasNodeList;
    }
    changeCanvasNodeListIndex(from,to){
        let data=this.canvasNodeList[to];
        this.canvasNodeList[to]=this.canvasNodeList[from];
        this.canvasNodeList[from]=data;
    }

    addCanvasNode(obj) {
        this.canvasNodeList.push(obj);
        let node=new canvasNode(obj);
        node.render();
    }
}
export default canvasNodeListModel
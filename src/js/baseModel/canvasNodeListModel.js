import canvasNode from './canvasNode'
class canvasNodeListModel {
    constructor() {
        this.canvasNodeList = [
            {x: 200, y: 200, name: 'Hive',icon:'&#xe601;',active:false,type:'sourceData'},
            {x: 400, y: 400, name: 'KAFKA',icon:'&#xe65a;',active:false,type:'targetData'}
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
        this.canvasNodeList.push({
            name: obj.name,
            icon: obj.icon,
            x: obj.x,
            y: obj.y,
            type: obj.type,
            active:false,
            attr: {}
        });
        let node=new canvasNode(obj);
        node.render();
    }
}
export default canvasNodeListModel
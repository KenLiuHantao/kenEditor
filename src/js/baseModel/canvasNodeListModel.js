import canvasNode from './canvasNode'
class canvasNodeListModel {
    constructor() {
        this.canvasNodeList = [
            {x: 200, y: 200, name: 'Hive',icon:'&#xe601;'},
            {x: 400, y: 400, name: 'KAFKA',icon:'&#xe65a;'}
        ]
    }

    setCanvasNodeList(arr) {
        this.canvasNodeList = arr;
    }

    getCanvasNodeList() {
        return this.canvasNodeList;
    }

    addCanvasNode(obj) {
        this.canvasNodeList.push({
            name: obj.name,
            icon: obj.icon,
            x: obj.x,
            y: obj.y,
            type: obj.type,
            attr: {}
        });
        let node=new canvasNode(obj);
        node.render();
    }
}
export default canvasNodeListModel
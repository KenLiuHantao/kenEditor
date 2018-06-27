class canvasNodeListModel {
    constructor() {
        this.canvasNodeList = [
            {x: 200, y: 200, name: 'Hive',icon:'&#xe601;'}
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
        })
    }
}
export default canvasNodeListModel
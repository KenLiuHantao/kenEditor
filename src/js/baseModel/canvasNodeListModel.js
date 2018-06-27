class canvasNodeListModel {
    constructor(){
        this.canvasNodeList=[{}]
    }
    setCanvasNodeList(arr){
        this.canvasNodeList=arr;
    }
    addCanvasNode(obj){
        this.canvasNodeList.push({
            name:obj.name,
            icon:obj.icon,
            x:obj.x,
            y:obj.y,
            type:obj.type,
            attr:{

            }
        })
    }
}
export default canvasNodeListModel
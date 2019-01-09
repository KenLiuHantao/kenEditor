/**
 * Created by liuhantao on 2018/6/29.
 */
import canvasLine from './canvasLine';
//selectLine是新增的画线  activeLine是选中的画线
class canvasLineListModel {
    constructor() {
        this.canvasLineList = [];
        this.selectLine = null;
        this.activeLine = null;
    }

    //线段的起始点要保存对应节点的引用
    //所以在set的时候要根据id去查找node并用对应的引用进行替换
    setCanvasLineList(arr) {
        if(arr){
            //先将传入的参数脱离引用
            var arrData = JSON.parse(JSON.stringify(arr));
            //根据id查找引用
            for (var i = 0; i < arrData.length; i++) {
                var fromNodeId = arrData[i].from.id;
                var toNodeId = arrData[i].to.id;
                var canvasNodeList=$kenEditor.canvasNodeList.getCanvasNodeList();
                for(var j=0;j<canvasNodeList.length;j++){
                    if(fromNodeId==canvasNodeList[j].id){
                        arrData[i].from=canvasNodeList[j]
                    }
                    if(toNodeId==canvasNodeList[j].id){
                        arrData[i].to=canvasNodeList[j]
                    }
                }
            }
            this.canvasLineList=arrData;
        }
    }

    getCanvasLineList() {
        return this.canvasLineList;
    }

    addCanvasLine(obj) {
        this.canvasLineList.push(obj);
        //let line = new canvasLine(obj);
        //line添加的场景不一样，不需要在这里添加渲染
        //line.render();
    }
}
export default canvasLineListModel
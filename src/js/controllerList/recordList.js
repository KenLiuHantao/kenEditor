/**
 * Created by liuhantao on 2018/7/31.
 */
class recordList {
    constructor(){
        this.recordList=[];
        this.activeIndex=-1;
    }
    addRecord(nodeList,lineList){
        //检查index的位置 把index后面的无用数据给干掉
        if(this.activeIndex!=-1 && this.activeIndex!=this.recordList.length-1) {
            var newList = [];

            for (var j = 0; j <= this.activeIndex; j++) {
                newList.push(JSON.parse(JSON.stringify(this.recordList[j])));
            }
            this.recordList=newList;
        }
        //在当前位置插入新数据  要脱离引用对象
        this.recordList.push({
            nodeList:JSON.parse(JSON.stringify(nodeList)),
            lineList:JSON.parse(JSON.stringify(lineList))
        });
        this.activeIndex++;
        //暂时只记录5步，怕数据量过大
        if(this.recordList.length>5){
            this.recordList.splice(0,1);
            if(this.activeIndex!=0){
                this.activeIndex--
            }
        }
        $kenEditor.controllerList.changeControllerStateByName('后退','default');
        $kenEditor.controllerList.changeControllerStateByName('前进','disable')
    }
    goBack(){
        if(this.activeIndex>0){
            this.activeIndex--;
            if(this.activeIndex==0){
                $kenEditor.controllerList.changeControllerStateByName('后退','disable')
            }
            $kenEditor.controllerList.changeControllerStateByName('前进','default')

            let baseModel=$kenEditor.baseModel;
            let canvasNodeList = $kenEditor.canvasNodeList;
            let canvasLineList = $kenEditor.canvasLineList;
            canvasLineList.setCanvasLineList(JSON.parse(JSON.stringify(this.recordList[this.activeIndex].lineList)));
            canvasNodeList.setCanvasNodeList(JSON.parse(JSON.stringify(this.recordList[this.activeIndex].nodeList)));
            baseModel.clearAll(baseModel);
            baseModel.renderLine(baseModel);
            baseModel.renderNode(baseModel);
        }
    }
    goNext(){
        if(this.activeIndex<this.recordList.length-1){
            this.activeIndex++;
            if(this.activeIndex==this.recordList.length-1){
                $kenEditor.controllerList.changeControllerStateByName('前进','disable')
            }
            $kenEditor.controllerList.changeControllerStateByName('后退','default');
            let baseModel=$kenEditor.baseModel;
            let canvasNodeList = $kenEditor.canvasNodeList;
            let canvasLineList = $kenEditor.canvasLineList;
            canvasLineList.setCanvasLineList(JSON.parse(JSON.stringify(this.recordList[this.activeIndex].lineList)));
            canvasNodeList.setCanvasNodeList(JSON.parse(JSON.stringify(this.recordList[this.activeIndex].nodeList)));
            baseModel.clearAll(baseModel);
            baseModel.renderLine(baseModel);
            baseModel.renderNode(baseModel);
        }
    }
}
export default recordList
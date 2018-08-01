/**
 * Created by liuhantao on 2018/7/31.
 */
class recordList {
    constructor(){
        this.recordList=[];
        this.activeIndex=-1;
    }
    addRecord(nodeList,lineList){
        //在当前位置插入新数据
        this.recordList.splice(this.activeIndex,this.recordList-this.activeIndex-1,{
            nodeList:nodeList,
            lineList:lineList
        });
        this.activeIndex++;
        //暂时只记录5步，怕数据量过大
        if(this.recordList.length>5){
            this.recordList.splice(0,1);
            if(this.activeIndex!=0){
                this.activeIndex--
            }
        }
    }
    goBack(){
        if(this.activeIndex>0){
            this.activeIndex--;
            let baseModel=$kenEditor.baseModel;
            let canvasNodeList = $kenEditor.canvasNodeList;
            let canvasLineList = $kenEditor.canvasLineList;
            canvasLineList.setCanvasLineList(this.recordList[this.activeIndex].lineList);
            canvasNodeList.setCanvasNodeList(this.recordList[this.activeIndex].nodeList);
            baseModel.clearAll(baseModel);
            baseModel.renderLine(baseModel);
            baseModel.renderNode(baseModel);
        }
    }
}
export default recordList
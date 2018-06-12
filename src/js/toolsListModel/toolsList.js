/**
 * Created by liuhantao on 2018/6/8.
 */
class ToolsList {
    constructor(){
        this.tools=[];
        this.clickEvent=function(){
            console.log('default')
        }
    }
    addTool(tool){
        if(tool.name || tool.type=='tool'){

        }else{
            this.tools.push(tool);
        }

    }
    getToolsList(){
        return this.tools;
    }
    onMouseDown(fn){
        if(typeof (fn)=='function'){
            this.clickEvent=fn;
        }
    }
    onClick(e){
        this.clickEvent(e,this);
    }
}
export default ToolsList
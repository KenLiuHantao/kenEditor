/**
 * Created by liuhantao on 2018/6/29.
 */
import canvasLine from './canvasLine';
class canvasLineListModel {
    constructor() {
        this.canvasLineList = [];
        this.selectLine = null;
    }

    setCanvasLineList(arr) {
        this.canvasLineList = arr;
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
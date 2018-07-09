/**
 * Created by liuhantao on 2018/6/29.
 */
import {canvas} from '../../../index.js'
let defaultConfig = {};
class canvasLine {
    constructor(config = defaultConfig) {
        this.from = config.from ? config.from : {x: 0, y: 0};
        this.to = config.to ? config.to : {x: 0, y: 0};
        this.active = config.active ? config.active : false;
        this.attr = config.attr ? config.attr : {};
    }

    render() {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(this.from.x+75, this.from.y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#8a8787";
        var controlPoint1={
            x:(this.from.x+this.to.x)/2,
            y:this.from.y
        };
        var controlPoint2={
            x:(this.from.x+this.to.x)/2,
            y:this.to.y
        };
        ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, this.to.x-75,this.to.y);
        ctx.stroke();
    }
}
export default canvasLine
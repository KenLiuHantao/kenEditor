/**
 * Created by liuhantao on 2018/6/29.
 */
let defaultConfig = {};
class canvasLine {
    constructor(config = defaultConfig) {
        this.from = config.from ? config.from : {x: 0, y: 0};
        this.to = config.to ? config.to : {x: 0, y: 0};
        this.active = config.active ? config.active : false;
        this.complete=config.complete?config.complete:false;
        this.attr = config.attr ? config.attr : {};
    }

    render() {
        let canvas=$kenEditor.canvas;
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
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
        var beginPoint={
            x:this.from.x+75,
            y:this.from.y
        };
        var endPoint={
            x:this.to.x-75,
            y:this.to.y
        };
        ctx.moveTo(beginPoint.x, beginPoint.y);
        if(endPoint.x>beginPoint.x){
            ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y,endPoint.x-20,endPoint.y);
        }else{
            ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y,endPoint.x+20,endPoint.y);
        }
        ctx.stroke();
        //线画完了画箭头 已经完成的线条才有箭头
        if(this.complete){
            ctx.beginPath();
            if(endPoint.x>beginPoint.x){
                ctx.moveTo(endPoint.x-10,endPoint.y);
                ctx.lineTo(endPoint.x-25,endPoint.y+10);
                ctx.lineTo(endPoint.x-25,endPoint.y-10);
            }else{
                ctx.moveTo(endPoint.x+10,endPoint.y);
                ctx.lineTo(endPoint.x+25,endPoint.y+10);
                ctx.lineTo(endPoint.x+25,endPoint.y-10);
            }
            ctx.closePath();
            ctx.fillStyle="#8a8787";
            ctx.fill();
        }
    }
}
export default canvasLine
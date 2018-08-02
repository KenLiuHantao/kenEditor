/**
 * Created by liuhantao on 2018/6/11.
 */
/*
 *单独的画布背景 目前支持线和点两种模式  很多东西还没支持配置
 */
class bgModel {

    constructor(id) {
        //在传入id的dom下新建一个核心canvas
        //baseModel有且仅有一个 所以新建前检查一下
        if (document.querySelector('#canvasBg')) {
            console.warn("Can't build second bgModel");
            return
        }
        if (document.querySelector('#' + id) === null) {
            console.error("Can't find DOM with #" + id + '!');
            return
        }
        this.style='line';
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'canvasBg');
        var clear = document.createElement('div');
        clear.setAttribute('id', 'editor-clear');
        //异步添加节点 避免获取不到父节点宽度
        var that = this;
        setTimeout(function () {
            canvas.setAttribute('width', document.querySelector('#' + id).offsetWidth - 200);
            canvas.setAttribute('height',document.querySelector('#' + id).offsetHeight - 100);
            document.querySelector('#' + id).appendChild(canvas);
            document.querySelector('#' + id).appendChild(clear);
            that.setBackground(that.style)
        }, 200);
        this.canvas = canvas;
    }

    setBackground(type = 'line') {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        let canvasWidth = canvas.getAttribute('width');
        let canvasHeight = canvas.getAttribute('height');
        ctx.beginPath();
        ctx.save();
        ctx.translate(0.5, 0.5);
        ctx.lineWidth = 1;
        if(type){
            this.style=type
        }
        switch (this.style) {
            case "line":
                ctx.strokeStyle = "rgba(0,0,0,0.05)";
                for (var i = 1; i < (canvasWidth / 20); i++) {
                    ctx.beginPath();
                    ctx.moveTo(20 * i, 0);
                    ctx.lineTo(20 * i, canvasHeight);
                    ctx.stroke();
                }
                for (var i = 1; i < (canvasHeight / 20); i++) {
                    ctx.beginPath();
                    ctx.moveTo(0, 20 * i);
                    ctx.lineTo(canvasWidth, 20 * i);
                    ctx.stroke();
                }
                break;
            case "point":
                ctx.fillStyle = "rgba(0,0,0,0.25)";
                for (var i = 1; i < (canvasWidth / 20); i++) {
                    for (var j = 1; j < (canvasHeight / 20); j++) {
                        ctx.beginPath();
                        ctx.arc(20 * i, 20 * j, 1, 0, 360, true);
                        ctx.fill();
                    }
                }
                break;
            default:
                console.warn("At this version,We only support backGround for line or point")
        }
        ctx.restore();
    }

    clearBackground() {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
    };
}
export default bgModel
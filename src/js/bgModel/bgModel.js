/**
 * Created by liuhantao on 2018/6/11.
 */
/*
 *单独的画布背景 目前支持线和点两种模式  很多东西还没支持配置
 */
var canvas = document.querySelector('#canvasBg');
var ctx = canvas.getContext('2d');
canvas.setBackground = function (boolean = true, type = 'line') {
    if (boolean) {
        let canvasWidth = canvas.getAttribute('width');
        let canvasHeight = canvas.getAttribute('height');
        ctx.beginPath();
        ctx.save();
        ctx.translate(0.5, 0.5);
        ctx.lineWidth = 1;
        switch (type) {
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
                    ctx.moveTo(0, 20*i);
                    ctx.lineTo(canvasWidth, 20*i);
                    ctx.stroke();
                }
                break;
            case "point":
                ctx.fillStyle = "rgba(0,0,0,0.25)";
                for (var i = 1; i < (canvasWidth / 20); i++){
                    for(var j=1;j<(canvasHeight/20);j++){
                        ctx.beginPath();
                        ctx.arc(20*i,20*j,1,0,360,true);
                        ctx.fill();
                    }
                }
                break;
            default:
                console.warn("At this version,We only support backGround for line or point")
        }
        ctx.restore();
    }
};
canvas.clearBackground=function(){
    ctx.clearRect(0,0,canvas.getAttribute('width'),canvas.getAttribute('height'));
};
export default canvas
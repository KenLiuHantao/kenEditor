/**
 * Created by liuhantao on 2018/6/11.
 */
let defaultConfig = {};
class Node {
    constructor(config = defaultConfig) {
        this.id= config.id ? config.id : '';
        this.name = config.name ? config.name : '';
        this.clazz = config.clazz ? config.clazz : '';
        this.configName = config.configName ? config.configName : '';
        this.configType = config.configType ? config.configType : '';
        this.Alias = config.Alias ? config.Alias:'';
        this.icon = config.icon ? config.icon : null;
        this.x = config.x ? config.x : 0;
        this.y = config.y ? config.y : 0;
        this.type = config.type ? config.type : 0;
        this.active= config.active ? config.active : false;
        this.attr = config.attr ? config.attr : {};
    }

    render() {
        let canvas=$kenEditor.canvas;
        let ctx=canvas.getContext('2d');
        ctx.lineWidth = 2;
        if(!this.active){
            ctx.fillStyle = "#ccc";
        }else{
            ctx.fillStyle = "rgba(66,139,202,0.3)";
        }
        ctx.roundRect(this.x-75,this.y-50,150,100,10).fill();
        ctx.strokeStyle = "#8a8787";
        ctx.roundRect(this.x-75,this.y-50,150,100,10).stroke();
        ctx.font="35px iconfont";
        let icon=document.createElement('i');
        icon.innerHTML=this.icon;
        let content = icon.textContent;
        ctx.fillStyle = "black";
        if(this.icon!=null && this.icon!='null'){
            ctx.fillText(content,this.x-ctx.measureText(content).width/2,this.y);
            ctx.font="18px Arial bold";
            ctx.fillText(this.name,this.x-ctx.measureText(this.name).width/2,this.y+30);
        }else{
            ctx.font="18px Arial bold";
            ctx.fillText(this.name,this.x-ctx.measureText(this.name).width/2,this.y+10);
        }

        //画可供链接的圆
        ctx.beginPath();
        if(this.type=='sourceData'){
            ctx.arc(this.x+75,this.y,10,0,2*Math.PI);
        }else if(this.type=='targetData'){
            ctx.arc(this.x-75,this.y,10,0,2*Math.PI);
        }else{
            ctx.arc(this.x+75,this.y,10,0,2*Math.PI);
            ctx.stroke();
            ctx.fillStyle="#fff";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-75,this.y,10,0,2*Math.PI);
        }
        ctx.stroke();
        ctx.fillStyle="#fff";
        ctx.fill();
        ctx.closePath();
    }
}
export default Node
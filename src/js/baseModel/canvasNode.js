/**
 * Created by liuhantao on 2018/6/11.
 */
import {canvas} from '../../../index.js'
let defaultConfig = {};
class Node {
    constructor(config = defaultConfig) {
        this.name = config.name ? config.name : '';
        this.Alias = config.Alias ? config.Alias:'';
        this.icon = config.icon ? config.icon : null;
        this.x = config.x ? config.x : 0;
        this.y = config.y ? config.y : 0;
        this.type = config.type ? config.type : 0;
        this.active= config.active ? config.active : false;
        this.attr = config.attr ? config.attr : {};
    }

    render() {
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
        ctx.fillText(content,this.x-ctx.measureText(content).width/2,this.y);
        ctx.font="18px Arial bold";
        ctx.fillText(this.name,this.x-ctx.measureText(this.name).width/2,this.y+30);
    }
}
export default Node
/**
 * Created by liuhantao on 2018/6/11.
 */
import {canvas} from '../../../index.js'
let defaultConfig = {};
class Node {
    constructor(config = defaultConfig) {
        this.name = config.name ? config.name : '';
        this.icon = config.icon ? config.icon : null;
        this.x = config.x ? config.x : 0;
        this.y = config.y ? config.y : 0;
        this.type = config.type ? config.type : 0;
        this.attr = config.attr ? config.attr : {};
    }

    render() {
        let ctx=canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#8a8787";
        ctx.roundRect(this.x-75,this.y-50,150,100,10).stroke();
        ctx.fillStyle = "#ccc";
        ctx.roundRect(this.x-75,this.y-50,150,100,10).fill();
        ctx.font="35px iconfont";
        let icon=document.createElement('i');
        icon.innerHTML=this.icon;
        let content = icon.textContent;
        ctx.fillStyle = "black";
        ctx.fillText(content,this.x-20,this.y);
        ctx.font="18px Arial bold";
        ctx.fillText(this.name,this.x-20,this.y+30);
    }
}
export default Node
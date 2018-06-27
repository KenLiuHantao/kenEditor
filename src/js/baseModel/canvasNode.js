/**
 * Created by liuhantao on 2018/6/11.
 */
import {canvas} from '../../../index.js'
let defaultConfig = {};
class Node {
    constructor(config = defaultConfig) {
        this.name = config.name ? config.name : null;
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
        ctx.roundRect(50,50,200,150,10).stroke();
        ctx.fillStyle = "#ccc";
        ctx.roundRect(50,50,200,150,10).fill();
        console.log(123)
    }
}
export default Node
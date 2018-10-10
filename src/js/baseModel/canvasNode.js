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
        this.configId = config.configId ? config.configId : '';
        this.version = config.version ? config.version : '';
        this.groupId = config.groupId ? config.groupId : '';
        this.artifactId = config.artifactId ? config.artifactId : '';
        this.mark = config.mark ? config.mark : '';
        this.Alias = config.Alias ? config.Alias:'';
        this.icon = config.icon ? config.icon : null;
        this.x = config.x ? config.x : 0;
        this.y = config.y ? config.y : 0;
        this.type = config.type ? config.type : 0;
        this.active= config.active ? config.active : false;
        this.background= config.background ? config.background : null;
        this.backgroundImage= config.backgroundImage ? config.backgroundImage : null;
        this.attr = config.attr ? config.attr : {};
    }

    render() {
        let canvas=$kenEditor.canvas;
        let ctx=canvas.getContext('2d');
        ctx.lineWidth = 2;
        //新需求 如果节点有背景色的时候优先用节点的背景色 没有再用默认的
        if(this.background!='undefined' && this.background!='null'&& this.background!=''&& this.background!=null){
            if(!this.active){
                ctx.fillStyle = this.background;
            }else{
                ctx.fillStyle = "rgba(66,139,202,0.3)";
            }
        }else{
            if(!this.active){
                ctx.fillStyle = "#ccc";
            }else{
                ctx.fillStyle = "rgba(66,139,202,0.3)";
            }
        }
        ctx.roundRect(this.x-75,this.y-50,150,100,10).fill();
        ctx.strokeStyle = "#8a8787";
        ctx.roundRect(this.x-75,this.y-50,150,100,10).stroke();
        ctx.font="35px iconfont";
        let icon=document.createElement('i');
        icon.innerHTML=this.icon;
        let content = icon.textContent;
        ctx.fillStyle = "black";
        //新需求 如果有图片优先图片 没有图片才icon
        if(this.backgroundImage!='undefined' && this.backgroundImage!='null'&& this.backgroundImage!=''&& this.backgroundImage!=null){
            var Img = new Image();
            var that=this;
            Img.onload = function() {
                draw(this);
            };
            Img.src = that.backgroundImage;
            function draw(obj){
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(obj,that.x-ctx.measureText(content).width,that.y-30,30,30);
            }
            ctx.font="18px Arial bold";
            //新需求 有别名的时候优先展示别名
            if(this.Alias){
                ctx.fillText(this.Alias,this.x-ctx.measureText(this.Alias).width/2,this.y+30);
            }else{
                ctx.fillText(this.name,this.x-ctx.measureText(this.name).width/2,this.y+30);
            }
        }else{
            if(this.icon!=null && this.icon!='null'){
                ctx.fillText(content,this.x-ctx.measureText(content).width/2,this.y);
                ctx.font="18px Arial bold";
                //新需求 有别名的时候优先展示别名
                if(this.Alias){
                    ctx.fillText(this.Alias,this.x-ctx.measureText(this.Alias).width/2,this.y+30);
                }else{
                    ctx.fillText(this.name,this.x-ctx.measureText(this.name).width/2,this.y+30);
                }
            }else{
                ctx.font="18px Arial bold";
                //新需求 有别名的时候优先展示别名
                if(this.Alias){
                    ctx.fillText(this.Alias,this.x-ctx.measureText(this.Alias).width/2,this.y+30);
                }else{
                    ctx.fillText(this.name,this.x-ctx.measureText(this.name).width/2,this.y+30);
                }
            }
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
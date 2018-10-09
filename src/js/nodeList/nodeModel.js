/**
 * Created by liuhantao on 2018/6/8.
 */
import EventController from '../controllerList/baseControl'
class nodeModel {
    constructor() {

    }

    createNodeDom(config = {}) {
        if (typeof (config) != 'object') {
            console.warn('Wrong parameters!')
        }
        var dom = document.createElement('li');
        var title= document.createElement('div');
        if(config.icon!=null){
            title.innerHTML = config.icon+config.name;
        }else{
            title.innerHTML = config.name;
        }
        title.setAttribute('class', 'iconfont nodeIcon ');
        title.setAttribute('title', config.name);
        title.setAttribute('type', config.type);
        dom.appendChild(title);
        if (config.child) {
            var icon=document.createElement('i');
            icon.setAttribute('class','menu-submenu-arrow');
            title.appendChild(icon);
            var secUl=document.createElement('ul');
            for(var i=0;i<config.child.length;i++){
                var secLi=document.createElement('li');
                //新需求 先找图片 没有图片才找icon
                if(config.child[i].backgroundImage){
                    secLi.innerHTML = "<img class='nodeImage' src="+config.child[i].backgroundImage+">"+"</img></br>"+ "<span class='secTitle'>"+config.child[i].name+"</span>";
                } else if(config.child[i].icon){
                    secLi.innerHTML = "<span class='icon'>"+config.child[i].icon+"</span></br>"+ "<span class='secTitle'>"+config.child[i].name+"</span>";
                }else{
                    secLi.innerHTML = "<span class='icon'>"+"&#xe629;"+"</span></br>"+ "<span class='secTitleOnly'>"+config.child[i].name+"</span>";
                }
                secLi.setAttribute('class', 'iconfont secLiIcon ');
                secLi.setAttribute('title', config.child[i].name);
                secLi.setAttribute('_type', config.child[i].type);
                secLi.setAttribute('draggable', true);
                if(config.child[i].background){
                    secLi.style.background=config.child[i].background;
                }
                if(config.child[i].iconColor){
                    secLi.firstChild.style.color=config.child[i].iconColor;
                }
                secUl.appendChild(secLi);
                let liConfig=config.child[i];
                //单独添加事件
                secLi.addEventListener('dragstart',function(e){
                    EventController.emit('addNode',liConfig,e)
                });
            }
            dom.appendChild(secUl);
        }
        title.addEventListener('click',function(e){
            if(e.target.getAttribute('class')=='menu-submenu-arrow'){
                return
            }
            if(e.target.parentNode.getAttribute('class') && e.target.parentNode.getAttribute('class').indexOf('unable')!=-1){
                e.target.parentNode.setAttribute('class','')
            }else{
                e.target.parentNode.setAttribute('class','unable')
            }
        });

        return dom
    }
}
export default nodeModel
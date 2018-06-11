import '../css/test1.css'
import ToolsList from './toolsList'
import BgCanvas from './modelClass/bgModel'
import Node from './modelClass/node'

var ss=new ToolsList();
ss.onMouseDown(function(e,that){
    console.log(e,that)
});

var canvas=document.querySelector('#canvas');
var ctx=canvas.getContext('2d');
canvas.onmousedown=function(event){
    var x = event.pageX - canvas.getBoundingClientRect().left;
    var y = event.pageY - canvas.getBoundingClientRect().top;
    console.log(x,y,'down');
    ss.onClick(event);
    BgCanvas.clearBackground();
};
canvas.onmouseup=function(event){
    var x = event.pageX - canvas.getBoundingClientRect().left;
    var y = event.pageY - canvas.getBoundingClientRect().top;
    console.log(x,y,'up');
    BgCanvas.setBackground(true,'line');
};
//canvas.onmousemove=function(event){
//    var x = event.pageX - canvas.getBoundingClientRect().left;
//    var y = event.pageY - canvas.getBoundingClientRect().top;
//    console.log(x,y,'move');
//};
var node1=new Node({

});
BgCanvas.setBackground(true,'point');
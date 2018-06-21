/**
 * Created by liuhantao on 2018/6/14.
 */
//这里都是预制的事件
import EventController from './baseControl'

//控制栏一堆事件
//1.后退
EventController.addEventListener('goBack',function(){
    console.log('后退')
});
//2.前进
EventController.addEventListener('goAhead',function(){
    console.log('前进')
});
//3.复制
EventController.addEventListener('copy',function(){
    console.log('复制')
});
//4.粘贴
EventController.addEventListener('paste',function(){
    console.log('粘贴')
});
//5.删除
EventController.addEventListener('delete',function(){
    console.log('删除')
});
//6.放大
EventController.addEventListener('setBig',function(){
    console.log('放大')
});
//7.缩小
EventController.addEventListener('setSmall',function(){
    console.log('缩小')
});
//8.适应画布
EventController.addEventListener('setAuto',function(){
    console.log('适应画布')
});
//9.实际尺寸
EventController.addEventListener('setDefault',function(){
    console.log('实际尺寸')
});
//10.变更背景图为线状

//11.变更背景图为点状
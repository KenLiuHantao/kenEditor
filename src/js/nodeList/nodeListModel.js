/**
 * Created by liuhantao on 2018/6/8.
 */
import config from './nodeConfig';
import typeConfig from './nodeTypeConfig'
import nodeModel from './nodeModel'
class nodeListModel {
    constructor(id) {
        this.id=id;
        this.type='all';
        this.keyword='';
        this.nodeList = this._loadDefaultListConfig();
        this._createNodeList(id)
    }
    _createNodeList(id){
        if (document.querySelector('#nodeList')) {
            console.warn("Can't build second nodeList");
            return
        }
        var dom = document.createElement('div');
        dom.setAttribute('id', 'nodeList');
        if (document.querySelector('#' + id) === null) {
            console.error("Can't find DOM with #" + id + '!');
            return
        }
        //添加下拉搜索
        var search=document.createElement('select');
        for(var i=0;i<typeConfig.length;i++){
            var option=document.createElement('option');
            option.setAttribute('value',typeConfig[i]);
            option.appendChild(document.createTextNode(typeConfig[i]));
            search.appendChild(option)
        }
        dom.appendChild(search);
        if(document.querySelector('#' + id).firstChild){
            document.querySelector('#' + id).insertBefore( dom,document.querySelector('#' + id).firstChild);
        }else{
            document.querySelector('#' + id).appendChild( dom);
        }
        var that=this;
        search.addEventListener('change',function(){
            that.changeType(search.value)
        });
        //添加关键字搜索
        var inputDom=document.createElement('input');
        inputDom.setAttribute('type','text');
        inputDom.setAttribute('placeholder','请输入关键字');
        dom.appendChild(inputDom);
        //遍历添加节点
        let ulDom=document.createElement('ul');
        let node=new nodeModel();
        for(var i=0;i<this.controllerList.length;i++){
            var nodeDom=node.createNodeDom(this.nodeList[i]);
            ulDom.appendChild(nodeDom);
        }
    }
    _loadDefaultListConfig() {
        return config
    }
    render(){

    }
    addNode(node) {

    }
    changeType(type){
        this.type=type;
        console.log(this.type)
    }

}
export default nodeListModel
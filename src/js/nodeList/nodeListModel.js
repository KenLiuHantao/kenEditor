/**
 * Created by liuhantao on 2018/6/8.
 */
import config from './nodeConfig';
import typeConfig from './nodeTypeConfig'
class nodeListModel {
    constructor(id) {
        this.id=id;
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
        console.log(search)
    }
    _loadDefaultListConfig() {
        return config
    }
    render(){

    }
    addNode(node) {

    }


}
export default nodeListModel
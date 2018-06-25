/**
 * Created by liuhantao on 2018/6/8.
 */
class nodeModel {
    constructor() {

    }

    createNodeDom(config = {}) {
        if (typeof (config) != 'object') {
            console.warn('Wrong parameters!')
        }
        var dom = document.createElement('i');
        dom.innerHTML = config.icon;
        dom.setAttribute('class', 'iconfont singleController ' + config.class);
        dom.setAttribute('title', config.popup);
        dom.setAttribute('status', config.status);
        if (config.eventName) {
            this.addDomEvent(dom, config.eventName)
        }
        return dom
    }
}
export default nodeModel
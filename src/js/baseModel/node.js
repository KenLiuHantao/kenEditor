/**
 * Created by liuhantao on 2018/6/11.
 */

let defaultConfig = {};
class Node {
    constructor(config = defaultConfig) {
        this.id = config.id ? config.id : parseInt(Math.random() * 100000);
        this.name = config.name ? config.name : null;
    }

    render() {

    }
}
export default Node
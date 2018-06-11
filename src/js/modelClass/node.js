/**
 * Created by liuhantao on 2018/6/11.
 */
class Node {
    constructor(config){
        this.id=config.id?config.id:parseInt(Math.random()*100000);
        this.name=config.name?config.name:null;
        console.log(123)
    }
    render(){

    }
}
export default Node
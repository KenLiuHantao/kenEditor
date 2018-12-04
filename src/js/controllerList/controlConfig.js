/**
 * Created by liuhantao on 2018/6/13.
 */
let config=[
    {
        name:'保存',
        icon:'&#xe688;',
        popup:'保存',
        class:'default',
        eventName:'saveTask',
        status:''
    },
    {
        name:'后退',
        icon:'&#xe63a;',
        popup:'后退',
        class:'disable',
        eventName:'goBack',
        status:'disable'
    },
    {
        name:'前进',
        icon:'&#xe63b;',
        popup:'前进',
        class:'disable',
        eventName:'goAhead',
        status:'disable'
    },
    {
        class:'separator'
    },
    {
        name:'上传',
        icon:'&#xe63e;',
        popup:'上传',
        class:'default',
        eventName:'upload',
        status:''
    },
    //{
    //    name:'粘贴',
    //    icon:'&#xe62b;',
    //    popup:'粘贴',
    //    class:'disable',
    //    eventName:'paste',
    //    status:'disable'
    //},{
    //    name:'删除',
    //    icon:'&#xe61e;',
    //    popup:'删除',
    //    class:'disable',
    //    eventName:'delete',
    //    status:'disable'
    //},{
    //    class:'separator'
    //},{
    //    name:'放大',
    //    icon:'&#xe600;',
    //    popup:'放大',
    //    class:'default',
    //    eventName:'setBig',
    //    status:''
    //},{
    //    name:'缩小',
    //    icon:'&#xe69a;',
    //    popup:'缩小',
    //    class:'default',
    //    eventName:'setSmall',
    //    status:''
    //},{
    //    name:'适应画布',
    //    icon:'&#xe61d;',
    //    popup:'适应画布',
    //    class:'default',
    //    eventName:'setAuto',
    //    status:''
    //},{
    //    name:'实际尺寸',
    //    icon:'&#xe62a;',
    //    popup:'实际尺寸',
    //    class:'default',
    //    eventName:'setDefault',
    //    status:''
    //},
    {
        class:'separator'
    },{
        name:'网格背景',
        icon:'&#xe9bd;',
        popup:'网格背景',
        class:'active',
        eventName:'changeBackgroundLine',
        status:''
    },{
        name:'点线背景',
        icon:'&#xe74b;',
        popup:'点线背景',
        class:'default',
        eventName:'changeBackgroundPoint',
        status:''
    }
];
export default config
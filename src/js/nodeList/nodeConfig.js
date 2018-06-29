/**
 * Created by liuhantao on 2018/6/15.
 */
let config=[
    {
        name:'数据源',
        icon:'',
        type:'firstLv',
        child:[
            {
                name:'KAFKA',
                icon:'&#xe65a;',
                type:'sourceData'
            },
            {
                name:'ElasticSearch',
                icon:'&#xe80f;',
                type:'sourceData'
            },{
                name:'Hive',
                icon:'&#xe601;',
                type:'sourceData'
            },{
                name:'Hbase',
                icon:'&#xe6e7;',
                type:'sourceData'
            }
        ]
    },
    {
        name:'算子',
        icon:'',
        type:'firstLv',
        child:[
            {
                name:'算子1',
                icon:'',
                type:'tools'
            },{
                name:'算子2',
                icon:'',
                type:'tools'
            },{
                name:'算子3',
                icon:'',
                type:'tools'
            },{
                name:'算子4',
                icon:'',
                type:'tools'
            }
        ]
    },
    {
        name:'目的地',
        icon:'',
        type:'firstLv',
        child:[
            {
                name:'KAFKA',
                icon:'&#xe65a;',
                type:'targetData'
            },
            {
                name:'ElasticSearch',
                icon:'&#xe80f;',
                type:'targetData'
            },{
                name:'Hive',
                icon:'&#xe601;',
                type:'targetData'
            },{
                name:'Hbase',
                icon:'&#xe6e7;',
                type:'targetData'
            }
        ]
    }
];
export default config
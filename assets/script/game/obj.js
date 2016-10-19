var initObj=require('initObj'); 
cc.Class({
    extends: cc.Component,

    properties: { 
        gold1:{
            default:null,
            type:cc.Prefab
        },
        gold2:{
            default:null,
            type:cc.Prefab
        },
        gold3:{
            default:null,
            type:cc.Prefab
        },
        gold4:{
            default:null,
            type:cc.Prefab
        },
        stone0:{
            default:null,
            type:cc.Prefab
        },
        stone1:{
            default:null,
            type:cc.Prefab
        }
    }, 
    init:function(){
        this.node.removeAllChildren();
        var obj=initObj.getobj();
        var item,tPrefab; 
        for(var i=0;i<obj.length;i++){
            item=obj[i];
            tPrefab = cc.instantiate(this[item.name]);
            tPrefab.parent = this.node;
            tPrefab.setPosition(item.x,item.y); 
        }    
    } 
});

var initObj=require('initObj'); 
cc.Class({
    extends: cc.Component,

    properties: { 
        bg1:{
            default:null,
            type:cc.Node
        },
        bg2:{
            default:null,
            type:cc.Node
        }
    }, 
    init:function(){  
        var level=initObj.player.level;
        if(level>1){
            this['bg'+(level-1)].active=false;
        }
        this['bg'+level].active=true; 
    } 
});

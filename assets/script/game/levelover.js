cc.Class({
    extends: cc.Component,

    properties: {
        stateNode:{
             default:null,
             type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.stateLabel=this.stateNode.getComponent(cc.Label);
    },
    success:function(){ 
        this.stateLabel.string='通关成功';
        
    },
    fail:function(){ 
       this.stateLabel.string='通关失败'; 
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

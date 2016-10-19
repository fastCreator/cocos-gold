var config=require('config')
var obj=config.obj;
var player=config.player

cc.Class({
    extends: cc.Component, 
    properties: {
       minerNode:{
            default:null,
            type:cc.Node
       },
       objNode:{
           default:null,
           type:cc.Node
       }
    },
    onLoad:function(){
        this.miner=this.minerNode.getComponent('miner');
    }, 
    onCollisionEnter: function (other, self) {    
        if(this.miner.state!='down'){
            return false;
        } 
          var aobj=obj['tag'+other.tag];   
          this.miner.state='up';
          this.miner.getAnimation(aobj.speed); 
          player.preMoney=aobj.money; 
          if(aobj.money!==0){
              this.miner.clawClose();
              var objNode = this.objNode;
              var objsprite=other.node.getComponent(cc.Sprite)
              objNode.getComponent(cc.Sprite).spriteFrame=objsprite.spriteFrame;
              objNode.width=other.node.width;
              objNode.height=other.node.height; 
              this.objShow();
              other.node.destroy(); 
          } 
    }, 
    objShow:function(){
        this.objNode.opacity=255;
    },
    objHide:function(){
        this.objNode.opacity=0;
    }
});

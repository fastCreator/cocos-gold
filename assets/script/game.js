var initObj=require('initObj');
var player=initObj.player;
cc.Class({
    extends: cc.Component, 
    properties: {
        levelmusic:{
             default: null,
             url: cc.AudioClip 
        },
        bgNode:{
            default:null,
            type:cc.Node
        }, 
        stateNode:{
            default:null,
            type:cc.Node
        }, 
        objNode:{
            default:null,
            type:cc.Node
        }, 
        minerNode:{
            default:null,
            type:cc.Node
        },
        leveloverNode:{
            default:null,
            type:cc.Node
        },
        clawNode:{
            default:null,
            type:cc.Node
        }
    }, 
    onLoad: function () { 
        this.init(); 
        this.setCollision(); 
        this.listenclick();  
        this.scheduleOnce(function(){
            this.goLevel();
         },0.1);
    }, 
    init:function(){
        this.bg=this.bgNode.getComponent("bg");
        this.state=this.stateNode.getComponent("state");
        this.obj=this.objNode.getComponent("obj");
        this.miner=this.minerNode.getComponent("miner");
        this.claw=this.clawNode.getComponent("claw");
        this.levelover=this.leveloverNode.getComponent("levelover"); 
        this.menuNode=cc.find("menu");
        this.menu=this.menuNode.getComponent("menu"); 
    },
    setLevelmusic:function(){
        this.menu.setcurrentbgAudio(this.levelmusic);
    },
    setCollision:function(){
         var manager = cc.director.getCollisionManager(); 
          manager.enabled = true; 
    },
    goLevel:function(){
        player.pause=false;
        this.setLevelmusic();
        this.bg.init(); 
        this.state.init();
        this.obj.init();
        this.miner.init(); 
    }, 
    gameEnd:function(){
         player.gameEnd();
         player.preMoney=0;
          this.leveloverNode.active=true;
         if(player.isSuccess()){
            this.levelover.success();
         }else{
             this.levelover.fail();
         }
    },
    goNext:function(){
        this.leveloverNode.active=false;
        if(player.isSuccess()){
                      player.level++;
                      this.goLevel();
           }else{  
                      player.level=1; 
                      cc.director.loadScene('index');
                      
           }
    },
    gameRun:function(){ 
         player.gameRun(); 
    },
    minerUp:function(){
         this.claw.objHide();
         this.state.addMoney();
    },
    listenclick:function(){ 
       this.node.on('touchend', function ( event ) {  
            if(this.miner.state=='rotate'&&!player.pause){
              this.miner.state='down';
            } 
       },this);
    },
    pause:function(){ 
         this.menu.menushow();
    },   
    run:function(){ 
    },
});

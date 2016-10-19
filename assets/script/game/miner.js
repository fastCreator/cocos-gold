var initObj=require('initObj');
var player=initObj.player;
cc.Class({
    extends: cc.Component, 
    properties: { 
        gameNode:{
            default:null,
            type:cc.Node
        }, 
        ropeNode:{
            default:null,
            type:cc.Node
        },
        clawNode:{
            default:null,
            type:cc.Node
        },
        claw0Node:{
            default:null,
            type:cc.Node
        },
        claw1Node:{
            default:null,
            type:cc.Node
        }
    },  
    onLoad:function(){ 
        this.animation=this.node.getComponent(cc.Animation); 
        this.game=this.gameNode.getComponent('game');
        this.rope=this.ropeNode.getComponent('rope');
        this.claw=this.clawNode.getComponent('claw');
        this.claw0=this.claw0Node.getComponent('claw0');
        this.claw1=this.claw1Node.getComponent('claw1'); 
    },
    init: function () {    
         this.texture=this.getComponent(cc.Sprite).spriteFrame;  
         this.minerToRight();  
    }, 
    minerToRight:function(){  
        var delay=1;
        var minerAction =cc.moveTo(delay, cc.p(0, initObj.miner.position.y));
         
        this.node.setPosition(initObj.miner.position);
        this.node.runAction(minerAction);   
        this.animation.play('miner-appear');
        this.scheduleOnce(function() {
           this.animation.stop(); 
           this.getComponent(cc.Sprite).spriteFrame=this.texture;
           this.ropeRotate();  
           this.game.gameRun();
        }, delay,this); 
    },
    minerToleft:function(){   
        
        var finished = cc.callFunc(function(target) {
            this.animation.stop(); 
            this.game.goNext();
        }, this); 
        var minerAction =cc.moveTo(1.5,initObj.miner.position);
        this.node.runAction(cc.sequence(minerAction,finished));
    },
    getAnimation:function(speed){ 
         this.animationType='miner-pull-'+speed.type;
         this.animation.play(this.animationType);  
         this.getSpeend=speed.numb;
    },
    ropeRotate:function(){
        var rope=this.ropeNode;
        var rote=75;
        var drictive=1;
        var y=this.clawNode.y; 
        var height=this.ropeNode.height; 
        var hasPause=false;
        var endAnimation=false;
        this.state='rotate';
        this.callback=function(){
            if(!player.isgamerun()){  
                if(this.state=='rotate'){
                    player.preMoney=0;
                    this.minerToleft();
                    this.unschedule(this.callback);
                }else{   
                    if(!endAnimation){
                        this.clawOpen();
                        this.claw.objHide();
                        this.state='up';
                        this.animation.stop();    
                        this.getAnimation(initObj.fastSpeed)
                        this.animation.play(this.animationType);
                        endAnimation=true;  
                    } 
                     up.call(this);
                }
            }else{
                if(!player.pause){
                switch(this.state)
                    {
                        case 'down':
                            down.call(this)
                        break;
                        case 'up':
                            if(hasPause){
                                this.animation.play(this.animationType); 
                                hasPause=false;
                            } 
                            up.call(this);
                        break;
                        default:
                            roate.call(this);
                    }  
                }else{
                 if(this.state=='up'){
                     this.animation.pause(); 
                     hasPause=true;
                 } 
                }
            }
        }
        this.schedule(this.callback, 0.01); 
        function up(){  
            var speend=this.getSpeend; 
            this.ropeNode.height-=speend;
            this.clawNode.y+=speend;  
            if(this.clawNode.y>=y){  
                this.state='rotate';
                this.clawNode.y=y;
                this.ropeNode.height=height; 
                this.animation.stop(); 
                this.getComponent(cc.Sprite).spriteFrame=this.texture;
                this.clawOpen(); 
                this.game.minerUp(); 
            }
        }
        
        function down(){ 
            var speend=10;
            this.ropeNode.height+=speend;
            this.clawNode.y-=speend;  
        }
        
        function roate(){
            rope.rotation+=drictive;
            if(rope.rotation>rote){
             drictive=-1;
            }
            if(rope.rotation<-rote){
                drictive=1;
            } 
        }
    }, 
    clawOpen:function(){ 
        var action1 = cc.rotateTo(0.2, 0); 
        var action2 = cc.rotateTo(0.2, 0); 
        this.claw0Node.runAction(action1);
        this.claw1Node.runAction(action2);
    },
    clawClose:function(){ 
         var action1 = cc.rotateTo(0.1, -15); 
         var action2 = cc.rotateTo(0.1, 15); 
         this.claw0Node.runAction(action1);
         this.claw1Node.runAction(action2);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

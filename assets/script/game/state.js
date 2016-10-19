var initObj=require('initObj'); 
var player=initObj.player;
cc.Class({
    extends: cc.Component, 
    properties: {
        gameNode:{
            type:cc.Node,
            default:null 
        },
        levelTimeBanner:{
            type:cc.Node,
            default:null
        },
        target:{
            type:cc.Node,
            default:null 
        },
        money:{
            type:cc.Node,
            default:null 
        }, 
        level:{
            type:cc.Node,
            default:null 
        },
        timer:{
            type:cc.Node,
            default:null 
        } 
    }, 
    onLoad:function(){
        this.game=this.gameNode.getComponent('game');
    },
    init:function(){
        this.setLevel();
        this.setTarget();
        this.rMenuToBtn();
        this.timeRun();
    },
    rMenuToBtn:function(){
        var toBtnAction=cc.moveBy(0.8, cc.p(0, -127));
        this.levelTimeBanner.setPosition(initObj.levelTimeBanner.position);
        this.scheduleOnce(function() {
           this.levelTimeBanner.runAction(toBtnAction); 
        }, 0.8); 
    },
    timeRun:function(){
        var timei=initObj.time; 
        this.callback=function(){ 
            if(!player.pause){ 
             timei--;
             this.timer.getComponents(cc.Label)[0].string=timei;
             if(timei<=0){
                this.game.gameEnd(); 
                this.unschedule(this.callback);
             }
           }
        }
       this.schedule(this.callback, 1);
    }, 
    setLevel:function(){
        this.level.getComponents(cc.Label)[0].string=player.level;
    },
    setTarget:function(){
        this.target.getComponents(cc.Label)[0].string=player.getTarget();
    }, 
    addMoney:function(){ 
        var money=player.money-0+player.preMoney;
         player.money=money;
        this.money.getComponents(cc.Label)[0].string=money;
    }
});

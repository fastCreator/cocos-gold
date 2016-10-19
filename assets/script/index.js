var initObj=require('initObj');
var player=initObj.player;
cc.Class({
    extends: cc.Component,

    properties: {  
         // 首页背景音效资源
        menubgAudio: {
            default: null,
            url: cc.AudioClip
        }, 
        //云
        cloud:{
            type:cc.Node,
            default:null 
        },
        //人物
        miner:{
            type:cc.Node,
            default:null 
        },
        leg:{
            type:cc.Node,
            default:null 
        },
        face:{
            type:cc.Node,
            default:null 
        },
        //延长时间
        minerdelayTime:{
            type:cc.Number,
            default:null
        },
        clouddelayTime:{
            type:cc.Number,
            default:null
        },
        //设置按钮
        settingbutton:{
            type:cc.Node,
            default:null
        },
        //开始游戏
        startgame:{
            type:cc.Node,
            default:null
        },
        
    },
    settingbuttonClick:function(){
           cc.find("menu").getComponent("menu").menushow();
    }, 
    startgameClick:function(){ 
        cc.director.loadScene('LeaveScene');
    },
    // use this for initialization
    onLoad: function () {  
        var minerDT=this.minerdelayTime
        this.cloudMove();
        this.minerRightAction(minerDT); 
            //计时器 
        this.scheduleOnce(function() {
            this.minerAction();
        }, minerDT); 
        cc.find("menu").getComponent("menu").setcurrentbgAudio(this.menubgAudio);
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // }, 
    cloudMove:function(){
         // 创建一个移动容器（重复）
        var cloudAction =cc.repeatForever(
                cc.sequence(
                 cc.moveBy(this.clouddelayTime, 1200, 0), 
                 cc.moveBy(0, -1200, 0)
        ));
        this.cloud.runAction(cloudAction);
    },
   
    minerRightAction:function(minerDT){
        //隐藏脸部
            this.face.opacity=0;
        // 创建一个移动动作 
            var minerAction =cc.moveBy(minerDT, cc.p(340, 0)); 
        //缓动动作
            // minerAction.easing(cc.easeIn(2.0)); 
        // 执行动作
            this.miner.runAction(minerAction);  
    },
    minerAction:function(){
         //执行动画
            this.leg.getComponent(cc.Animation).play('miner_leg');
            this.face.getComponent(cc.Animation).play('miner_face');
        //显示脸部 
            this.face.opacity=255;  
    }
});

var initObj=require('initObj');
var player=initObj.player;
cc.Class({
    extends: cc.Component,

    properties: {
        clicksound:{
            default: null,
            url: cc.AudioClip
        },
         isSound:{
             type:cc.Boolean,
             default:true
         },
         isMusic:{
             type:cc.Boolean,
             default:true
         },
        menu:{
            type:cc.Node,
            default:null
        },
        //蒙版
        mask:{
            type:cc.Node,
            default:null
        }, 
          // 游戏背景音效资源
        currentbgAudio: null,
         //菜单关闭按钮
        closeMenubutton:{
            type:cc.Node,
            default:null
        },
        soundonbtn:{
            type:cc.Node,
            default:null
        },
        soundoffbtn:{
            type:cc.Node,
            default:null
        },
        musiconbtn:{
            type:cc.Node,
            default:null
        },
        musicoffbtn:{
            type:cc.Node,
            default:null
        }, 
        //开始游戏
        outgame:{
             type:cc.Node,
             default:null
        }
    }, 
    onLoad: function () {
        cc.game.addPersistRootNode(this.node); 
        this.listeninit(); 
    }, 
    soundonbtnClick:function(){  
        this.soundCtrl(false);
        this.playClickSound();
    },
    soundoffbtnClick:function(){  
        this.soundCtrl(true);
        this.playClickSound();
    },
    musiconbtnClick:function(){  
        this.musciCtrl(false); 
        this.playClickSound();
    },
    musicoffbtnClick:function(){  
        this.musciCtrl(true); 
        this.playClickSound();
    },
    initsound:function(){  
        
       this.soundCtrl(player.isSound!=='false');
       this.musciCtrl(player.isMusic!=='false');  
    }, 
    playClickSound:function(){  
        if(player.isSound){   
            cc.audioEngine.playEffect(this.clicksound,false,true); 
        } 
    },
    //声音控制(true 播放)
    soundCtrl:function(isplay){
            console.log(isplay)
            player.isSound=isplay; 
            this.soundonbtn.active=isplay;
            this.soundoffbtn.active=!isplay;  
    },
    musciCtrl:function(isplay){  
            player.isMusic=isplay;  
            this.musiconbtn.active=isplay;
            this.musicoffbtn.active=!isplay; 
            this.menuSoundCtrl(isplay);
    },
    //设置现在背景音乐
    setcurrentbgAudio:function(currentbgAudio){ 
        this.currentbgAudio&&cc.audioEngine.stopMusic();
        this.currentbgAudio=currentbgAudio;
        this.initsound();
    },
    menuSoundCtrl: function (isplay) {
        // 调用声音引擎播放声音
        if(isplay){
            cc.audioEngine.playMusic(this.currentbgAudio,true); 
        }else{
            cc.audioEngine.stopMusic(); 
        }
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    listeninit:function(){  
        this.closeMenubutton.on('touchend', function (event) {  
              this.menuhide(); 
        }, this);
        
        this.outgame.on('touchend', function (event) { 
              cc.log('退出游戏');
        }, this); 
    },
    menushow:function(){ 
        player.pause=true;
         // 创建一个移动容器（重复）
        var action1=cc.moveTo(0.2, 40, 0);
        var action2=cc.moveTo(0.5, -10, 0);
        var action3=cc.moveTo(0.3, -0, 0); 
        
        action1.easing(cc.easeOut(2));  
        // action2.easing(cc.easeIn(2));
        // action3.easing(cc.easeOut(2));
        
        var menushowAction =cc.sequence(action1,action2,action3);
        this.menu.runAction(menushowAction); 
        this.mask.active=true; 
    },
    menuhide:function(){
        player.pause=false;
         // 创建一个移动容器（重复）
        var action1=cc.moveTo(0.3, -30, 0);
        var action2=cc.moveTo(0.3, 500, 0);
        var action3=cc.moveTo(0, -648, 0);
        var finished = cc.callFunc(function(target,numb){
            this.mask.active=false;
        }, this,0);
        
        action1.easing(cc.easeOut(1.5)); 
        action2.easing(cc.easeIn(5.0)); 
        var menushowAction =cc.sequence(action1,action2,finished,action3);
        this.menu.runAction(menushowAction);  
    },
});

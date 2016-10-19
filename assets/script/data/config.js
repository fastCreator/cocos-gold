const heavySpeed={
    type:'heavy',
    numb:1
};
const lightSpeed={
    type:'light',
    numb:2
}; 
const nullSpeed={
    type:'light',
    numb:3
}; 
const fastSpeed={
    type:'fast',
    numb:4
};

var isMusic,isSound;

const player={
    money:0,
    level:1, 
    state:[],//'bone' 拥有炸弹 strong
    pause:true,
    gameState:'run', //start 准备开始 run 正在游戏中 end 结束  
    preMoney:0, //准备加的钱
    minerState:'rotate',
    isgamerun:function(){
      return this.gameState=='run';
    },
    getTarget:function(){
        console.log(level['level'+this.level].money)
      return level['level'+this.level].money;
    },
    isSuccess:function(){
         return this.money>=this.getTarget();
    },
    gameEnd:function(){
        this.gameState='end';
    },
    gameRun:function(){
        this.gameState='run';
    },
    get isSound(){
	    return cc.sys.localStorage.getItem("isSound")!=='false';
    },
    set isSound(value){
	    cc.sys.localStorage.setItem("isSound",value);
    },
    get isMusic(){
	    return cc.sys.localStorage.getItem("isMusic")!=='false';
    },
    set isMusic(value){
	    cc.sys.localStorage.setItem("isMusic",value);
    }
    
}
var obj = {
     tag1:{
         name:'kong',
         speed:nullSpeed,
         money:0
     }, 
     tag2:{
         name:'gold1',
         speed:lightSpeed,
         money:50
     },  
     tag3:{
         name:'gold2',
         speed:lightSpeed,
         money:100
     },  
     tag4:{
         name:'gold3',
         speed:heavySpeed,
         money:250
     },  
     tag5:{
         name:'gold4',
         speed:heavySpeed,
         money:500
     },  
     tag6:{
         name:'boneBody',
         speed:lightSpeed,
         money:7
     },  
     tag7:{
         name:'boneHead',
         speed:lightSpeed,
         money:20
     },  
     tag8:{
         name:'stone0',
         speed:lightSpeed,
         money:11
     },  
     tag9:{
         name:'stone1',
         speed:heavySpeed,
         money:20
     }, 
     tag10:{
         name:'mouse',
         speed:lightSpeed,
         money:2 
     }, 
     tag10:{
         name:'bag',
         speed:lightSpeed,
         get money(){
             return Math.ceil(Math.random()*800);
         }
     },
     tag11:{
         name:'diamonds',
         speed:lightSpeed,
         money:600 
     }
}; 
//960~425
var obj1={
    tag2:[[100,100],[150,150]],
    tag3:[[100,300],[200,400]],
    tag4:[[700,30],[780,60],[180,100]],
    tag5:[[500,30],[680,160],[280,120]],
    tag8:[[700,400],[80,380],[880,100]],
    tag9:[[500,230]],
} 
var obj2={
    tag2:[[0,0],[100,100],[150,110]],
    tag4:[[-100,-20],[100,20]]
}

var level={
    level1:{
        money:500, 
        obj:getlevel(obj1)
    }, 
    level2:{
        money:5000, 
        obj:getlevel(obj2)
    }
}
 
function getlevel(objs){
    var i,j,item,array=[],tag;
    for(i in objs){ 
        item=objs[i]; 
        for(j=0;j<item.length;j++){
            tag=JSON.parse(JSON.stringify(obj[i]));
            tag.x=item[j][0];
            tag.y=item[j][1];  
            array.push(tag); 
        }
    }  
    return array;
}
function outproto(obj){
    return JSON.parse(JSON.stringify(obj));
}

 
module.exports = {
    level:level, 
    player:player,
    obj:obj,
    get fastSpeed(){
        return fastSpeed;
    },
    set fastSpeed(numb){
        cc.warn('无法设置fastSpeed为'+numb);
    }
};
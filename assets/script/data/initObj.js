var config=require('config');
var player=config.player;
var level=config.level;
module.exports = { 
    player:player, 
    time:60,
    levelTimeBanner:{
        position:cc.v2(263, 391)
    },
    miner:{
        position:cc.v2(554, 129)
    },
    getobj:function(){
        return level['level'+player.level].obj;
    },
    fastSpeed:config.fastSpeed
};
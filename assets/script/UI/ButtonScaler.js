cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 0.85,
        transDuration: 0.1
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        // var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng')
        // if (audioMng) {
        //     audioMng = audioMng.getComponent('AudioMng');
        // }
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown (event) { 
            //if (audioMng) audioMng.playButton(); 
            this.node.runAction(self.scaleDownAction);
        }
        function onTouchUp (event) { 
            this.node.runAction(self.scaleUpAction); 
        }
        this.node.on('touchstart', onTouchDown, this);
        this.node.on('touchend', onTouchUp, this);
        this.node.on('touchcancel', onTouchUp, this);
    }
});

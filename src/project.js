require=function t(e,c,i){function n(s,r){if(!c[s]){if(!e[s]){var h="function"==typeof require&&require;if(!r&&h)return h(s,!0);if(o)return o(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var d=c[s]={exports:{}};e[s][0].call(d.exports,function(t){var c=e[s][1][t];return n(c?c:t)},d,d.exports,t,e,c,i)}return c[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({Btn:[function(t,e,c){"use strict";cc._RFpush(e,"a770cpR3dtIwLDLVYKIYdQm","Btn");var i=t("mainGame");cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},startGame:function(){cc.game.welcome.closeTimer(),cc.audioEngine.stopAll(),cc.director.loadScene("game")},restartGame:function(){i.restart()}}),cc._RFpop()},{mainGame:"mainGame"}],bg:[function(t,e,c){"use strict";cc._RFpush(e,"ee5f1h3A+5OTLECNra1Vf1/","bg"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){var t="bg",e=Math.floor(3*cc.random0To1())+1;t+=e;var c=this.getComponent(cc.Sprite);cc.loader.loadRes("hero/"+t,cc.SpriteFrame,function(t,e){c.spriteFrame=e}),cc.log("onLoad() str:",t)}}),cc._RFpop()},{}],mainGame:[function(t,e,c){"use strict";cc._RFpush(e,"ff74bpM3XBKe5B96v4dB+ti","mainGame");var i=t("spriteCreator"),n=t("storageManager"),o=new StateMachine({data:{gameDirector:null},init:"hold",transitions:[{name:"stickLengthen",from:"hold",to:"stickLenthened"},{name:"heroTick",from:"stickLenthened",to:"heroTicked"},{name:"stickFall",from:"heroTicked",to:"stickFalled"},{name:"heroMoveToLand",from:"stickFalled",to:"heroMovedToLand"},{name:"landMove",from:"heroMovedToLand",to:"hold"},{name:"heroMoveToStickEnd",from:"stickFalled",to:"heroMovedToStickEnd"},{name:"shortMove",from:"heroMovedToStickEnd",to:"hold"},{name:"heroMoveToStickEndToFall",from:"stickFalled",to:"heroMovedToStickEndToFall"},{name:"heroDown",from:"heroMovedToStickEndToFall",to:"heroDowned"},{name:"gameOver",from:"heroDowned",to:"end"},{name:"restart",from:"end",to:"hold"}],methods:{onLeaveHeroTicked:function(){s.unregisterEvent()},onStickLengthen:function(){s.stickLengthen=!0,s.stick=s.createStick()},onHeroTick:function(){s.stickLengthen=!1,s.ani.play("heroTick")},onStickFall:function(){var t=cc.rotateBy(.5,90);t.easing(cc.easeIn(3));var e=cc.callFunc(function(){var t=s.firstLand.getPosition().x+s.firstLand.getContentSize().width,e=s.hero.getPosition().x,c=t-e,i=s.stick.height+s.stick.width*s.stick.anchorX,n=s.secondLand.center.getContentSize().width,r=c+s.space+.5*s.secondLand.width-.5*n,h=c+s.space+.5*s.secondLand.width+.5*n;cc.log("移动前判断 1平台x坐标",s.firstLand.getPosition().x,"1平台宽度",s.firstLand.getContentSize().width,"英雄坐标",e,"棍子长度",s.stick.height,"中心点宽度",n,"棍子裁剪宽度",s.stick.width*s.stick.anchorX,"d1",c,"间隔",s.space,"2平台宽度",s.secondLand.width,"运行长度",s.runLength,"落下棍子长度",i,"最小",r,"最大",h),i<c?(o.heroMoveToStickEnd(),cc.log("移动")):i<c+s.space||i>c+s.space+s.secondLand.width?(o.heroMoveToStickEndToFall(),cc.log("落下")):(cc.log("移动到下一平台"),o.heroMoveToLand(),i>c+s.space+.5*s.secondLand.width-.5*n&&i<c+s.space+.5*s.secondLand.width+.5*n?(cc.log("完美"),++s.perfect,s.getScore(s.perfect),s.perfectShow(s.perfect)):s.perfect=0)}),c=cc.sequence(t,e);s.stick.runAction(c)},onHeroMoveToLand:function(){var t=cc.callFunc(function(){s.ani.stop("heroRun"),s.getScore(),cc.log("heroMoved:1平台x坐标",s.firstLand.getPosition().x,"1平台宽度",s.firstLand.getContentSize().width,"英雄坐标",s.hero.getPosition().x),o.landMove()});s.ani.play("heroRun"),s.heroMove(s.hero,{length:s.stick.height,callFunc:t})},onLandMove:function(){s.landMoveAndCreate()},onHeroMoveToStickEnd:function(){var t=cc.callFunc(function(){s.ani.stop("heroRun"),s.shortStickLength+=s.stick.height,o.shortMove()});s.ani.play("heroRun"),s.heroMove(s.hero,{length:s.stick.height,callFunc:t})},onShortMove:function(){cc.log("onShortMove()"),s.registerEvent()},onHeroMoveToStickEndToFall:function(){var t=cc.callFunc(function(){s.ani.stop("heroRun"),o.heroDown()});s.ani.play("heroRun"),s.heroMove(s.hero,{length:s.stick.height,callFunc:t})},onHeroDown:function(){var t=cc.callFunc(function(){o.gameOver()});s.stickAndHeroDownAction(t)},onGameOver:function(){s.overLay.active=!0},onRestart:function(){cc.audioEngine.stopAll(),cc.director.loadScene("game")}}}),s=null,r=[1,.9,.8,.7,.6,.5];cc.Class({"extends":cc.Component,properties:{firstLand:cc.Node,secondLand:cc.Node,hero:cc.Node,currentScore:cc.Label,highScore:cc.Label,overLay:cc.Node,perfectLabel:cc.Node,canvas:cc.Node,distance:cc.v2(0,0),width:cc.v2(0,0),perfectPointWidth:0,stickWidth:0,stickSpeed:0,heroMoveSpeed:0,moveDuration:0,levelUp:0,gameBgm:cc.AudioClip},onLoad:function(){s=this,this.ani=this.hero.getComponent(cc.Animation),this.stick=null,this.stickLengthen=!1,this.runLength=0,this.shortStickLength=0,this.worldLength=0,this.score=0,this.perfect=0,this.space=0,this.lv=0,this.landNum=0,this.changeHighestScoreLabel(),this.ani.on("stop",function(t){"heroTick"===t.target.name&&o.stickFall()})},start:function(){this.ani.play("waitting"),this.createNewLand(),this.gameBgm&&cc.audioEngine.play(this.gameBgm,!0,1)},heroMove:function(t,e){var c=e.length/this.heroMoveSpeed,i=cc.moveBy(c,cc.p(e.length,0));if(e.callFunc){var n=cc.sequence(i,e.callFunc);this.hero.runAction(n)}else this.hero.runAction(i)},landMoveAndCreate:function(){var t=this.stick.height+this.shortStickLength;this.runLength+=this.stick.height+this.shortStickLength,this.shortStickLength=0,this.node.runAction(cc.moveBy(this.moveDuration,cc.p(-t,0))),this.firstLand=this.secondLand,this.createNewLand()},stickAndHeroDownAction:function(t){var e=cc.rotateBy(.5,90);e.easing(cc.easeIn(3)),this.stick.runAction(e);var c=cc.moveBy(.5,cc.p(0,-300-this.hero.height));c.easing(cc.easeIn(3));var i=cc.sequence(c,t);this.hero.runAction(i)},getScore:function(t){t?this.score+=t:++this.score,n.getHighestScore()<this.score&&(n.setHighestScore(this.score),this.changeHighestScoreLabel()),this.currentScore.string="得分:"+this.score,this.lv=Math.floor(this.score/this.levelUp),this.lv>=r.length?this.lv=r.length-1:this.lv},changeHighestScoreLabel:function(){this.highScore.string="最高分:"+n.getHighestScore()},getGameLevel:function(){return this.lv},getWidth:function(){var t=this.getGameLevel(),e=this.width.y-this.width.x,c=Math.random()*e+this.width.x|0;return c=Math.floor(c*r[t])},getSpace:function(){var t=this.getGameLevel(),e=this.distance.y-this.distance.x,c=Math.random()*e+this.distance.x|0;return c=Math.floor(c*(2-r[t])),this.space=c,c},getPerfectPointWidth:function(){var t=this.getGameLevel(),e=Math.floor(this.perfectPointWidth*r[t]);return cc.log("getPerfectPointWidth()",e),e},registerEvent:function(){this.canvas.on(cc.Node.EventType.TOUCH_START,this.touchStart.bind(this),this.node),this.canvas.on(cc.Node.EventType.TOUCH_END,this.touchEnd.bind(this),this.node),this.canvas.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel.bind(this),this.node),cc.log("registerEvent-on")},unregisterEvent:function(){this.canvas.targetOff(this.node),cc.log("unregisterEvent-off")},touchStart:function(){o.stickLengthen()},touchEnd:function(){o.heroTick()},touchCancel:function(){this.touchEnd()},createStick:function(){this.stick=i.createStick(this.stickWidth),cc.log("createStick()",this.hero.getContentSize().width*(1-this.hero.anchorX),this.stick.width*this.stick.anchorX);var t=this.hero.x+this.hero.getContentSize().width*(1-this.hero.anchorX)+this.stick.width*this.stick.anchorX;return this.stick.setPosition(t,this.firstLand.height),this.stick.parent=this.node,this.stick},createNewLand:function(){var t=cc.director.getVisibleSize(),e=this.getWidth(),c=this.getPerfectPointWidth();this.secondLand=i.createSecondLand(e,c),this.secondLand.parent=this.node,this.space=this.getSpace(),this.worldLength+=this.space+this.firstLand.width;var n=this.worldLength+t.width;this.secondLand.setPosition(n,0);var o=cc.moveBy(this.moveDuration,cc.p(-t.width,0)),s=cc.callFunc(this.registerEvent.bind(this)),r=cc.sequence(o,s);this.secondLand.runAction(r),++this.landNum,cc.log("createNewLand(): 平台:",this.landNum,"新平台宽度",e,"前平台宽度",this.firstLand.width,"间隔",this.space,"x",n-t.width,"运行长度",this.runLength)},perfectShow:function(t){cc.log("perfectShow()",t),this.perfectLabel.getComponent(cc.Label).string="perfect *"+t;var e=cc.fadeIn(.01),c=cc.moveBy(1,cc.p(0,0)),i=cc.fadeOut(.3),n=cc.sequence(e,c,i);this.perfectLabel.runAction(n)},update:function(t){this.stickLengthen&&(this.stick.height+=t*this.stickSpeed)}}),e.exports=o,cc._RFpop()},{spriteCreator:"spriteCreator",storageManager:"storageManager"}],perfect:[function(t,e,c){"use strict";cc._RFpush(e,"a87ecWOGklKbJCstZQLZQcK","perfect"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},hide:function(){this.active=!1}}),cc._RFpop()},{}],spriteCreator:[function(t,e,c){"use strict";cc._RFpush(e,"9e067GQ1jBJYKvl74MzutP4","spriteCreator");var i=(cc.Enum({BLACK:-1,RED:-1,GREEN:-1,BLUE:-1}),function(){var t=null,e=0;return{createSecondLand:function(c,i){var n=[cc.Color.WHITE,cc.Color.GRAY,cc.Color.YELLOW,cc.Color.ORANGE,cc.Color.CYAN,cc.Color.GREEN,cc.Color.RED];c||(c=Math.floor(80*cc.random0To1())+120),i||(i=10);var o=new cc.Node("newLand");o.anchorX=0,o.anchorY=0;var s=o.addComponent(cc.Sprite);s.sizeMode=cc.Sprite.SizeMode.CUSTOM,o.color=cc.Color.BLACK,o.height=300,o.width=c,o.zIndex=0;var r=new cc.Node("perfactPoint");r.anchorX=.5,r.anchorY=1;var h=r.addComponent(cc.Sprite);return h.sizeMode=cc.Sprite.SizeMode.CUSTOM,r.color=n[e],++e>n.length-1?e-=n.length:e,r.parent=o,r.height=i,r.width=i,r.setPosition(o.width/2,o.height),r.zIndex=100,t?(s.spriteFrame=t,h.spriteFrame=t):cc.loader.loadRes("hero/blank",cc.SpriteFrame,function(e,c){t=c,s.spriteFrame=c,h.spriteFrame=c}),o.center=r,o},createStick:function(e){var c=new cc.Node("stick");c.anchorY=0;var i=c.addComponent(cc.Sprite);return i.sizeMode=cc.Sprite.SizeMode.CUSTOM,i.spriteFrame=t,c.color=cc.Color.BLACK,c.height=0,c.width=e,c}}}());e.exports=i,cc._RFpop()},{}],storageManager:[function(t,e,c){"use strict";cc._RFpush(e,"5cd40lk3JhDg4KyFqjIJQ3q","storageManager");var i=function(){return cc.sys.localStorage.highestScore||(cc.sys.localStorage.highestScore=0),{getHighestScore:function(){return cc.sys.localStorage.highestScore},setHighestScore:function(t){cc.sys.localStorage.highestScore=t}}}();e.exports=i,cc._RFpop()},{}],utils:[function(t,e,c){"use strict";cc._RFpush(e,"0377a/8XgRCTphLrzkp2zNx","utils");var i=function(){return{sthlog:function(){}}}();e.exports=i,cc._RFpop()},{}],welcome:[function(t,e,c){"use strict";cc._RFpush(e,"ba37ePF+JROIox5deENfAjP","welcome");var i=t("spriteCreator");cc.Class({"extends":cc.Component,properties:{firstLand:cc.Node,hero:cc.Node,secondLand:cc.Node,stickWidth:0,stickSpeed:0,heroMoveSpeed:0,moveDuration:0,welcomeBgm:cc.AudioClip,startLabel:cc.Label},onLoad:function(){cc.log("welcome onload()"),this.stick=null,this.stickLength=0,this.space=0,this.runLength=0,this.setTimeout1=null,this.setTimeout2=null,cc.game.welcome=this},start:function(){cc.log("start()"),this.ani=this.hero.getComponent(cc.Animation),this.ani.play("waitting"),this.welcomeBgm&&cc.audioEngine.play(this.welcomeBgm,!0,1),this.createSecondLand()},closeTimer:function(){this.setTimeout1&&clearTimeout(this.setTimeout1),this.setTimeout2&&clearTimeout(this.setTimeout2)},createSecondLand:function(){var t=this,e=cc.director.getWinSize();this.secondLand=i.createSecondLand(),this.secondLand.parent=this.node,this.space=Math.floor(100*cc.random0To1())+50,this.secondLand.setPosition(this.space+this.firstLand.width+this.runLength+e.width,0),this.secondLand.runAction(cc.moveBy(this.moveDuration,cc.p(-e.width,0)));var c=this.firstLand.getContentSize().width,n=this.hero.getPosition().x-this.runLength,o=c-n;this.stickLength=o+this.space+.5*this.secondLand.width,this.setTimeout1=setTimeout(function(){t.ani.play("stick"),t.createStick(t.stickWidth),t.setTimeout1=null},3e3)},landMoveAndCreate:function(){cc.log("landMove()"),this.node.runAction(cc.moveBy(this.moveDuration,cc.p(-this.stickLength,0))),this.firstLand=this.secondLand,this.createSecondLand()},createStick:function(t){cc.log("createStick()"),this.stick=i.createStick(t);var e=this.hero.x+this.hero.getContentSize().width*(1-this.hero.anchorX)+this.stick.width*this.stick.anchorX;this.stick.setPosition(e,this.firstLand.height),this.stick.parent=this.node,this.schedule(this.updateStick,.2)},updateStick:function(){this.stick.height<this.stickLength&&(this.stick.height+=.1*this.stickSpeed,this.stick.height>this.stickLength&&(this.stick.height=this.stickLength,this.unschedule(this.updateStick),this.stickFall()))},stickFall:function(){cc.log("stickFall()"),this.ani.stop("stick");var t=cc.rotateBy(.5,90);t.easing(cc.easeIn(3));var e=cc.callFunc(this.heroMove.bind(this)),c=cc.sequence(t,e);this.stick.runAction(c)},heroMove:function(){var t=this;cc.log("heroMove()");var e=cc.callFunc(function(){t.ani.stop("heroRun"),t.ani.play("waitting"),t.setTimeout2=setTimeout(function(){t.landMoveAndCreate(),t.setTimeout2=null},5e3)});this.ani.play("heroRun"),this.runLength+=this.stickLength,this.runLength>=1e3&&(this.startLabel.node.active=!0);var c=this.stickLength/this.heroMoveSpeed,i=cc.moveBy(c,cc.p(this.stickLength,0)),n=cc.sequence(i,e);this.hero.runAction(n)}}),cc._RFpop()},{spriteCreator:"spriteCreator"}]},{},["Btn","bg","mainGame","perfect","spriteCreator","storageManager","utils","welcome"]);
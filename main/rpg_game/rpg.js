
"use strict";
var C = {
  background: {
    image: 'rpg_background.png',
    scale: 1
  };
  player: {
    image: 'turtle1.png',
    width: 36,
    height: 36,
    frames: 1,
    startx: 400,
    starty: 400,
    bounce: 0.3,
    drag: 3000,
    speed: 300
  },
  
};



class BootState {

  init() {
    console.log("%c~~~ Booting RPG ~~~\n Compliments of Smlucas13",
                "color:#fdf6e3; background:#073642");
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  create() {
    game.state.start('Preload')
  }

}

class PreloadState {

  create() {
    game.state.start('Start')
  }

}

class StartState {

  init() {
  }

  preload() {
    this.load.image('background',C.background.image);
  }

  create() {
    game.state.start('Play')
  }

}

class PlayState {

  create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    // background
    this.background = this.add.tileSprite(0,0,800,800,'background');
    //this.background.autoScroll(0,C.background.scroll);
    this.background.scale.set(C.background.scale);
    
    this.right = game.input.keyboard.addKey(Phaser.KeyCode.D);
    this.left = game.input.keyboard.addKey(Phaser.KeyCode.A);
    this.up = game.input.keyboard.addKey(Phaser.KeyCode.W);
    this.down = game.input.keyboard.addKey(Phaser.KeyCode.S);
  }

  update() {
    this.player.body.velocity.x = 0;
    
    if (this.left.isDown) {
        this.player.body.velocity.x = -300;
    }
    else if (this.right.isDown) {
        this.player.body.velocity.x = 300;
    }
    else if (this.up.isDown) {
        this.player.body.velocity.y = 300;
    }
    else if (this.down.isDown) {
        this.player.body.velocity.y = -300;
    }
  handleCollision() {
    game.state.start('End')
  }

}

class EndState {

  create() {
    game.state.start('Start')
  }

}

var game = new Phaser.Game(800,800);
game.state.add('Boot', BootState);
game.state.add('Preload', PreloadState);
game.state.add('Start', StartState);
game.state.add('Play', PlayState);
game.state.add('End', EndState);
game.state.start('Boot');

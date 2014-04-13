var load_state = {  
    preload: function() { 
        // this.game.stage.backgroundColor = '#71c5cf';
        game.load.image('sky', 'assets/sky.png');
        game.load.spritesheet('rain', 'assets/drops.png', 10, 10);
        this.game.load.image('bird', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');  
        this.game.load.audio('jump', 'assets/jump.wav');
        this.game.load.audio('hit_pipe', 'assets/fart.wav');


    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};
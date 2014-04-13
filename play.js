var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() { 
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);

        this.game.input.onDown.add(this.jump, this);

        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');  
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
               

        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(-0.2, 0.5);

        // No 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        this.jump_sound = this.game.add.audio('jump');
        this.hit_sound = this.game.add.audio('hit_pipe')

        this.game.add.image(0, 0, 'sky');

        var emitter = this.game.add.emitter(game.world.centerX, 0, 400);

        emitter.width = this.game.world.width;
        // emitter.angle = 30; // uncomment to set an angle for the rain.

        emitter.makeParticles('rain');

        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;

        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

        emitter.start(false, 1600, 5, 0);



    },

    update: function() {
        if (this.bird.inWorld == false)
            this.restart_game(); 

        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
    },

    jump: function() {
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        this.jump_sound.play();
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
        this.hit_sound.play();
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.add_one_pipe(400, i*60+10);   

        // No 'this.score', but just 'score'
        score += 1; 
        this.label_score.content = score; 
   }
};
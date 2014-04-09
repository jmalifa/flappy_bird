var menu_state = {  
    create: function() {
        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        this.game.input.onDown.add(this.start, this);


        function gofull(){
            Phaser.StageScaleMode.EXACT_FIT = 0;
            game.stage.scale.startFullScreen();
            alert('full screen');
        }

        // Defining variables
        var style = { font: "20px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y-50, "Click, Touch or press Spacebar to Start", style);
        text.anchor.setTo(0.5, 0.5); 

        // If the user already played
        if (score > 0) {
            // Display its score
            var score_label = this.game.add.text(x, y+50, "score: " + score, style);
            score_label.anchor.setTo(0.5, 0.5); 
        }

    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};
Platform.GameOver = function(game) {
};

Platform.GameOver.prototype = {

    init: function(levelData) {
        if (!levelData) {
            levelData = {
                score: 0
            };
        }
        this.levelData = levelData;
    },

    create: function() {
        var text = "Game over!\nYou scored " + this.levelData.score;

        if (this.levelData.score > localStorage.getItem("highscore")) {
            localStorage.setItem("highscore", this.levelData.score);
            "Game over!\nWell done, a new high score!\nYou scored " + this.levelData.score;
        }

        this.text = this.add.text(this.world.centerX, this.world.centerY-30, text, {
            font: "25px Arial",
            fill: "#fff",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);

        this.playAgain = this.add.text(this.world.centerX, this.world.centerY+40, "Play again", {
            font: "20px Arial",
            fill: "#fff",
            align: "center"
        });
        this.playAgain.anchor.setTo(0.5, 0.5);
    },

    update: function() {
        if (this.input.activePointer.isDown) {
            this.levelData.score = 0;
            this.state.start('Game');
        }
    }

};

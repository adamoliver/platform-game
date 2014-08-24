Platform.Game = function(game) {
    this.levelData = {
        score: 0
    }
};

Platform.Game.prototype = {

    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add audio
        this.hit = this.add.audio('hit');
        this.jump = this.add.audio('jump');

        this.add.image(0, 0, 'sky');
        this.createPlatforms();
        this.baddies = this.add.group();
        this.baddies.enableBody = true;
        this.createPlayer();
        this.createScoreText();

        this.timer = this.time.events.loop(Phaser.Timer.SECOND, this.createBaddies, this);

    },

    update: function() {
        this.physics.arcade.collide(this.baddies, this.platforms, this.moveBaddie, null, this);
        this.physics.arcade.collide(this.player, this.platforms);
        this.physics.arcade.overlap(this.player, this.baddies, this.killPlayer, null, this);

        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.frame = 0;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.frame = 2;
        }
        else {
            this.player.frame = 1;
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.jump.play();
            this.player.body.velocity.y = -300;
        }
    },

    createPlayer: function() {
        this.player = this.add.sprite(370, this.world.height - 300, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.1;
        this.player.body.gravity.y = 500;
        this.player.events.onOutOfBounds.add(this.killPlayer, this);
    },

    createPlatforms: function() {
        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        this.ground = this.platforms.create(120, this.world.height -200, 'ground');
        this.ground.scale.setTo(1, 1);
        this.ground.body.immovable = true;
    },

    createBaddies: function() {
        // Random position between 150 and 600
        var xPosition = Math.floor(Math.random()*(600-150+1)+150);
        var baddie = this.baddies.create(xPosition, 0, 'baddie');
        baddie.body.gravity.y = 500;
        baddie.body.bounce.y = 0.2;
        baddie.checkWorldBounds = true;
        baddie.frame = 1;
        baddie.moved = false;
        baddie.events.onOutOfBounds.add(this.baddieOutOfBounds, this);
    },

    createScoreText: function() {
        this.scoreText = this.add.text(10, 10, "Score: "+this.levelData.score, {
            font: "25px Arial",
            fill: "#fff",
        });

        if (!localStorage.getItem("highscore")) {
            localStorage.setItem("highscore", 0);
        }

        this.highScoreText = this.add.text(this.world.width-10, 10, "High score: "+localStorage.getItem("highscore"), {
            font: "25px Arial",
            fill: "#fff",
        });
        this.highScoreText.anchor.setTo(1, 0);
    },

    moveBaddie: function(baddie) {
        if (!baddie.moved) {
            var velocityX = Math.random() < 0.5 ? 200 : -200;
            if (velocityX>0) {
                baddie.frame = 2;
            } else {
                baddie.frame = 0;
            }
            baddie.body.velocity.x = velocityX;
        }
        baddie.moved = true;
    },

    killPlayer: function() {
        this.hit.play();
        this.player.kill();
        this.state.start('GameOver', true, false, this.levelData);
    },

    baddieOutOfBounds: function(baddie) {
        this.levelData.score ++;
        this.scoreText.setText("Score: "+this.levelData.score);
    }
};




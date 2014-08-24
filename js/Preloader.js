Platform.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

Platform.Preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('ground', 'assets/platform.png');
        this.load.image('sky', 'assets/sky.jpg');

        this.load.spritesheet('dude', 'assets/dude.png', 30, 28);
        this.load.spritesheet('baddie', 'assets/baddie.png', 30, 28);

        this.load.audio('hit', 'assets/hit.mp3');
        this.load.audio('jump', 'assets/jump.mp3');
    },

    create: function () {
        this.preloadBar.cropEnabled = false;
    },

    update: function () {
        if (this.cache.isSoundDecoded('jump') && this.ready == false) {
            this.ready = true;
            this.state.start('Game');
        }
    }
};

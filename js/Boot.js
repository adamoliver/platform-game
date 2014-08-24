var Platform = {};

Platform.Boot = function(game) {};

Platform.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'assets/loadbar.png');
    },

    create: function() {
        this.input.maxPointers = 1;
        this.input.addPointer();
        this.stage.backgroundColor = '#000';

        this.state.start('Preloader');
    }
};

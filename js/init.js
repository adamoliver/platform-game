window.onload = function() {
    var game = new Phaser.Game(800, 450, Phaser.AUTO, 'gameContainer');
    game.state.add('Boot', Platform.Boot);
    game.state.add('Preloader', Platform.Preloader);
    game.state.add('Game', Platform.Game);
    game.state.add('GameOver', Platform.GameOver);
    game.state.start('Boot');
}
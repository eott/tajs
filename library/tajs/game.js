var TajsGame = function() {
    this.activeScene = false;
    this.config = {};
};

TajsGame.prototype.setActiveScene = function(scene) {
    this.activeScene = scene;
};

TajsGame.prototype.setConfig = function(config) {
    this.config = config;

    this.scenes = {};
    for (var s in config.scenes) {
        var name = config.scenes[s];
        $.getJSON(
            "assets/scenes/" + name + ".json",
            function(json) {
                this.scenes[name] = new Scene(json);
                if (this.config["start_scene"] == name) {
                    this.setActiveScene(this.scenes[name])
                }
            }.bind(this)
        );
    }
};

var _game = _game || new TajsGame();

$.getJSON("config.json", function(json) {
    _game.setConfig(json);
});
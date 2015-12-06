var TajsGame = function() {
    this.activeScene = false;
    this.config = {};
    this.menu = new Menu();
};

TajsGame.prototype.setActiveScene = function(scene) {
    this.activeScene = scene;
    this.menu.loadScene(scene);
};

TajsGame.prototype.optionSelected = function(sceneName) {
    if (this.scenes[sceneName] != undefined) {
        this.setActiveScene(this.scenes[sceneName]);
    } else {
        alert("Oops! You're not supposed to see this, but we tried to load scene "
            + sceneName + ", which does not exist. Do you mind telling the developer "
            + "about this? Thanks!");
    }
}

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
                    this.setActiveScene(this.scenes[name]);
                }
            }.bind(this)
        );
    }
};

var _game = _game || new TajsGame();

$.getJSON("config.json", function(json) {
    _game.setConfig(json);
});
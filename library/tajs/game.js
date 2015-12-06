var TajsGame = function() {
    this.activeScene = false;
    this.config = {};
    this.menu = new Menu();
    this.scenes = {};
};

TajsGame.prototype.setActiveScene = function(scene) {
    this.activeScene = scene;
    this.menu.loadScene(scene);
};

TajsGame.prototype.optionSelected = function(sceneName) {
    if (this.scenes[sceneName] == undefined) {
        this.fetchScene(sceneName, true);
    }
}

TajsGame.prototype.fetchScene = function(sceneName, setActive) {
    $.getJSON(
        "assets/scenes/" + sceneName + ".json",
        function(json) {
            this.scenes[sceneName] = new Scene(json);
            if (setActive) {
                this.setActiveScene(this.scenes[sceneName]);
            }
        }.bind(this)
    ).fail(function () {
        alert("Oops! Something went wrong during loading of scene " + sceneName
            + ". This is not supposed to happen. Do you mind telling the developer about "
            + "this? Thanks!");
    });
}

TajsGame.prototype.setConfig = function(config) {
    this.config = config;
    this.fetchScene(config["start_scene"], true)
};

var _game = _game || new TajsGame();

$.getJSON("config.json", function(json) {
    _game.setConfig(json);
});
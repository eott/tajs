/**
 * Represents the running game. It holds all components together and communicates
 * where there are no direct connections between them. The game instance should
 * also be the only global variable that's not a function definition.
 */
var TajsGame = function() {
    this.activeScene = false;
    this.lastScene = false;
    this.config = {};
    this.menu = new Menu();
    this.scenes = {};
    this.flags = {};
};

/**
 * Sets the given scene as the active one. Updates the internal pointer to the
 * active scene and calls the other components to update the display.
 *
 * @param Scene scene The new active scene
 */
TajsGame.prototype.setActiveScene = function(scene) {
    this.activeScene = scene;
    this.menu.loadScene(scene);
};

/**
 * Is called when an option was selected. The event handling of the click on the
 * HTML elements is handled by the menu. This method triggers the update cycle
 * necessary to render the new scene.
 * NOTE: As the scene loading is asynchronous, the requested scene will not be
 * available immediately.
 *
 * @param string sceneName The scene's name, including path
 * @param int optionNr The number of the selected option within the currently
 *    active scene.
 */
TajsGame.prototype.optionSelected = function(sceneName, optionNr) {
    // First, handle the option's effects
    if (this.activeScene.options[optionNr] != undefined) {
        this.activeScene.options[optionNr].applyEffects();
    }

    // Save current scene (we may need this for a back button)
    this.lastScene = this.activeScene;

    // Now load the new scene
    if (this.scenes[sceneName] == undefined) {
        this.fetchScene(sceneName, true);
    } else {
        this.setActiveScene(this.scenes[sceneName]);
    }
}

/**
 * Fetches the scene with the given name and, if the corresponding flag was
 * given, sets it as the active scene. The scene is loaded in the internal
 * scene list and not returned, as the loading happends asynchronously. This
 * also means that the scene will not be available immediately.
 *
 * @param string sceneName The scene's name, including path
 * @param boolean setActive If true, set the loaded scene as active
 */
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

/**
 * Sets the given config as the config used for the game instance. This method
 * automatically will requested the start scene defined in the config as start scene.
 *
 * @param object config The config to use
 */
TajsGame.prototype.setConfig = function(config) {
    this.config = config;
    this.fetchScene(config["start_scene"], true)
};


// Now, do the thing
var _game = _game || new TajsGame();

$.getJSON("config.json", function(json) {
    _game.setConfig(json);
});
$.extend({
    /**
     * Returns the value for the given key from the given data. If there is no
     * entry for the key, returns a default value instead. For most keys this
     * is an empty string, for certain other keys (used in scene and scene
     * option construction) other types are returned as default values, such as
     * empty arrays or booleans.
     *
     * @param name The key to look for
     * @param data The JSON data containing the desired value
     */
    getDefault: function(name, data) {
        if (data[name] != undefined) {
            return data[name];
        } else {
            switch (name) {
                case 'options':
                case 'conditions':
                case 'effects':
                    return [];
                case 'color_scheme': return false;
                default: return "";
            }
        }
    }
});

/**
 * Represents a scene. Wraps around the raw json data from the scene file.
 *
 * @param data The JSON data from the scene file
 */
var Scene = function(data) {
    this.name = $.getDefault("name", data);
    this.image = $.getDefault("image", data);
    this.description = $.getDefault("description", data);
    this.altText = $.getDefault("alt_text", data);
    this.colorScheme = $.getDefault("color_scheme", data);

    this.options = [];
    var optionData = $.getDefault("options", data);
    for (var i = 0; i < optionData.length; i++) {
        this.options[i] = new Option(optionData[i]);
    }
};

/**
 * Represents an option to a scene. Contains the text displayed for that option,
 * which scene is loaded if the option is selected and the conditions and
 * effects of that option (e.g. setting flags).
 *
 * @param data The JSON data from the scene file for that option
 */
var Option = function(data) {
    this.proceed = $.getDefault("proceed", data);
    this.text = $.getDefault("text", data);
    this.conditions = $.getDefault("conditions", data);
    this.effects = $.getDefault("effects", data);
};

/**
 * Checks if the option applies to the current state of the game and returns
 * if all conditions of the option are met (or there are no conditions).
 *
 * @return boolean True if all conditions are met or there are no conditions.
 *    Returns false otherwise.
 */
Option.prototype.optionApplies = function() {
    var applies = true;

    for (var i = 0; i < this.conditions.length; i++) {
        var cond = this.conditions[i];
        var isVal = _game.flags[cond.flag];

        switch (cond.operator) {
            case '>':
                applies = applies && isVal > cond.val;
                break;
            case '>=':
                applies = applies && isVal >= cond.val;
                break;
            case '<':
                applies = applies && isVal < cond.val;
                break;
            case '<=':
                applies = applies && isVal <= cond.val;
                break;
            case '=':
            case '==':
                applies = applies && isVal == cond.val;
                break;
            default:
                // Unknown op? Can't be true!
                applies = false;
        }
    }

    return applies;
};

/**
 * Applies the effect of an option to the game flags. E.g. an option might
 * set or increment a flag so another scene might check against the value
 * and offer different options.
 *
 * Supported effect actions: set, add, sub
 */
Option.prototype.applyEffects = function() {
    for (var i = 0; i < this.effects.length; i++) {
        var effect = this.effects[i];

        if (_game.flags[effect.flag] == undefined) {
            _game.flags[effect.flag] = 0;
        }

        switch (effect.action.toLowerCase()) {
            case 'set':
                _game.flags[effect.flag] = effect.val;
                break;
            case 'add':
                _game.flags[effect.flag] += parseFloat(effect.val);
                break;
            case 'sub':
                _game.flags[effect.flag] -= parseFloat(effect.val);
                break;
            default:
                // Unknown action? Just do nothing
        }
    }
};
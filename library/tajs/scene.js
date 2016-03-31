/**
 * Represents a scene. Wraps around the raw json data from the scene file.
 *
 * @param data The JSON data from the scene file
 */
var Scene = function(data) {
    // Internal function used to avoid variables being undefined
    var getDefault = function(name) {
        if (data[name] != undefined) {
            return data[name];
        } else {
            switch (name) {
                case 'options': return [];
                case 'color_scheme': return false;
                default: return "";
            }
        }
    };

    this.name = getDefault("name");
    this.image = getDefault("image");
    this.description = getDefault("description");
    this.altText = getDefault("alt_text");
    this.options = getDefault("options");
    this.colorScheme = getDefault("color_scheme");
};

/**
 * Represents an option to a scene. Contains the text displayed for that option,
 * which scene is loaded if the option is selected and the conditions and
 * effects of that option (e.g. setting flags).
 *
 * @param data The JSON data from the scene file for that option
 */
var Option = function(data) {
    // Internal function used to avoid variables being undefined
    var getDefault = function(name) {
        if (data[name] != undefined) {
            return data[name];
        } else {
            switch (name) {
                case 'conditions':
                case 'effects':
                    return [];
                default: return "";
            }
        }
    };

    this.proceed = getDefault("proceed");
    this.text = getDefault("text");
    this.conditions = getDefault("conditions");
    this.effects = getDefault("effects");
}
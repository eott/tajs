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
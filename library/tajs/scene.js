var Scene = function(data) {
    var getDefault = function(name) {
        if (data[name] != undefined) {
            return data[name];
        } else {
            return "";
        }
    };

    this.name = getDefault("name");
    this.image = getDefault("image");
    this.description = getDefault("description");
    this.altText = getDefault("alt_text");
};
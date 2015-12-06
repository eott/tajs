/**
 * Provides functionality to render scenes in the DOM.
 */
var Menu = function() {};

/**
 * Loads the given scene and updates the scene display to render the
 * scene.
 *
 * @param Scene scene The scene to display
 */
Menu.prototype.loadScene = function (scene) {
    $('#gameView').data('scene_name', scene.name);

    // Add image if given
    var html = "";
    if (scene.image != "") {
        html += '<img class="sceneImage" src="'
            + scene.image + '" alt="'
            + scene.altText + '"/>';
    }

    // Add description
    html += scene.description;

    // Construct option list
    html += '<ul class="optionList">';
    for (var i in scene.options) {
        var option = scene.options[i];
        html += '<li class="option" data-proceed="'
            + option.proceed + '"><span>' + option.text
            + '</span></li>';
    }
    html += '</ul>';

    // All done, update the DOM
    $('#sceneDescription').html(html);

    // Add event listener for click on options
    $('.option').on('click', function (e) {
        var name = $(this).data('proceed');
        _game.optionSelected(name);
    });
};

// Attach necessary event listener
$(document).ready(function() {
    // Mute/unmute button
    $('#mute').on('click', function (e) {
        if ($(this).hasClass('unmute')) {
            $(this).removeClass('unmute')
                .attr('alt', 'mute')
                .attr('src', 'assets/images/icons/mute.png');
        } else {
            $(this).addClass('unmute')
                .attr('alt', 'unmute')
                .attr('src', 'assets/images/icons/unmute.png');
        }
    });

    // Expand/minize the credits
    $('.expand').on('click', function (e) {
        var $elements = $('.creditAttributions');
        if ($elements.hasClass('visible')) {
            $elements.removeClass('visible');
        } else {
            $elements.addClass('visible');
        }
    });
});
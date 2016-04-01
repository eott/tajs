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
        if (option.optionApplies()) {
            html += '<li class="option" data-proceed="'
                + option.proceed + '" data-onr="'
                + i + '"><span>' + option.text
                + '</span></li>';
        }
    }
    html += '</ul>';

    // All done, update the DOM
    $('#sceneDescription').html(html);

    // Add event listener for click on options
    $('.option').on('click', function (e) {
        var name = $(this).data('proceed');
        var nr = $(this).data('onr');
        _game.optionSelected(name, nr);
    });

    // Change color scheme if one was given, else change back to default
    var schemeName;
    if (scene.colorScheme) {
        schemeName = scene.colorScheme;
    } else {
        schemeName = _game.config['default_color_scheme'];
    }
    var color = _game.config['color_schemes'][schemeName];

    $('html').css('background-color', color['b_light']);
    $('html').css('color', color['f_normal']);
    $('#gameView').css('background-color', color['b_medium']);
    $('#gameView').css('box-shadow', '4px 4px 5px 3px ' + color['b_dark']);
    $('.option:hover span').css('background-color', color['b_dark']);
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
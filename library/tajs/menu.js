var Menu = function() {

};

Menu.prototype.loadScene = function (scene) {
    $('#gameView').data('scene_name', scene.name);

    var html = "";
    if (scene.image != "") {
        html += '<img class="sceneImage" src="'
            + scene.image + '" alt="'
            + scene.altText + '"/>';
    }

    html += scene.description;

    html += '<ul class="optionList">';
    for (var i in scene.options) {
        var option = scene.options[i];
        html += '<li class="option" data-proceed="'
            + option.proceed + '"><span>' + option.text
            + '</span></li>';
    }
    html += '</ul>';

    $('#sceneDescription').html(html);

    // Add event listener for click on options
    $('.option').on('click', function (e) {
        var name = $(this).data('proceed');
        _game.optionSelected(name);
    });
};

$(document).ready(function() {
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

    $('.expand').on('click', function (e) {
        var $elements = $('.creditAttributions');
        if ($elements.hasClass('visible')) {
            $elements.removeClass('visible');
        } else {
            $elements.addClass('visible');
        }
    });
});
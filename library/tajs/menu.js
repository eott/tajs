var Menu = function() {

};

Menu.prototype.loadScene = function (scene) {
    $('#gameView').data('scene_name', scene.name);
    $('#sceneDescription').html(scene.description);
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
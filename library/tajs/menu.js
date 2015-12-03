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
});
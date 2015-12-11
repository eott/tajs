$.extend({
    prepareText: function(txt) {
        return ('' + txt).replace('\r', '')
            .replace(/[\r\n]/g, '<br/>')
            .replace('"','\\"');
    }
});

$(document).ready(function() {
    // Attach event listener for adding options
    $('button[name="addOption"]').on('click', function(event) {
        // Buttons want to submit the form. Not on my watch!
        event.preventDefault();

        // Get values
        var text = $('input[name="optionText"]').val();
        var proceed = $('input[name="optionProceed"]').val();

        // Create option element for scene option
        var element = document.createElement('option');
        $(element).attr('value', proceed);
        $(element).data('text', text);
        $(element).data('proceed', proceed);
        $(element).html(text + ' - ' + proceed);

        // Done, append
        $('select[name="options"]').append(element);
    });

    // Attach event listener for creating the output
    $('button[name="createOutput"]').on('click', function(event) {
        // Buttons want to submit the form. Not on my watch!
        event.preventDefault();

        // The following get's a bit ugly, we basically just want a reasonably
        // pretty and escaped string to dump into the output textarea
        var template = '{' + "\n"
            +'    "name": "%name%",' + "\n"
            +'    "description": "%desc%",' + "\n"
            +'    "options": [' + "\n"
            +'        %options%' + "\n"
            +'    ]' + "\n"
            +'}' + "\n";

        template = template.replace('%name%', $('input[name="sceneName"]').val());
        template = template.replace('%desc%', $.prepareText($('textarea[name="description"]').val()));

        var opts = "";
        $('select[name="options"]').children().each(function(i, child) {
            if (opts.length > 0) {
                opts += ',';
            }
            opts += '{"text":"' + $.prepareText($(child).data('text'))
                + '","proceed":' + $.prepareText($(child).data('proceed'))
                + '"}';
        });
        opts = opts.replace('/.*,$/gm', '');
        template = template.replace('%options%', opts);

        $('textarea[name="output"]').val(template);
    });
});
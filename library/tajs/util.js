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
        var effect = $('input[name="optionEffect"]').val();
        var condition = $('input[name="optionCondition"]').val();

        // Create option element for scene option
        var element = document.createElement('option');
        $(element).attr('value', proceed);
        $(element).data('text', text);
        $(element).data('proceed', proceed);
        $(element).data('effect', effect);
        $(element).data('condition', condition);
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
                opts += ',' + "\n";
            }
            opts += '{' + "\n"
                + '            "text":"' + $.prepareText($(child).data('text')) + '",' + "\n"
                + '            "proceed":"' + $.prepareText($(child).data('proceed')) + '"';


            var eff = $(child).data('effect');
            if (eff != '') {
                eff = eff.split(' ');
                opts += ",\n"
                    + '            "effects": [{"action":"' + $.prepareText(eff[0]) + '",'
                    + '"flag":"' + $.prepareText(eff[1]) + '",'
                    + '"val":"' + $.prepareText(eff[2]) + '"}]';
            }

            var cond = $(child).data('condition');
            if (cond != '') {
                cond = cond.split(' ');
                opts += ",\n"
                    + '            "conditions": [{"flag":"' + $.prepareText(cond[0]) + '",'
                    + '"operator":"' + $.prepareText(cond[1]) + '",'
                    + '"val":"' + $.prepareText(cond[2]) + '"}]';
            }

            opts += "\n" + '        }';
        });

        template = template.replace('%options%', opts);

        $('textarea[name="output"]').val(template);
    });
});
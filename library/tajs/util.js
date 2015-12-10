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
});
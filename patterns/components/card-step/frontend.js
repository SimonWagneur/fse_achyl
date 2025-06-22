
(function($) {
    $(document).ready(function() {
        console.log('card-step');
        // Trouver tous les section-steps
        $('.section-steps').each(function() {
            // Trouver tous les card-step dans cette section
            $(this).find('.card-step').each(function(index) {
                // Numéroter chaque step
                $(this).find('.step-number').text(index + 1);
            });
        });
    });
})(jQuery);
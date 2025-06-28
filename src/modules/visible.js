$(function() {
    if (document.fonts) {
        document.fonts.ready.then(function() {
            $('.visible').each(function(){
                var $t = $(this);
                $t.css('opacity', '1');
                $t.css('transform', 'translateY(0)');
            });
        });
    } else {
        // Fallback si FontFaceSet n’est pas supporté
        $('.visible').each(function(){
            var $t = $(this);
            $t.css('opacity', '1');
            $t.css('transform', 'translateY(0)');
        });
    }
});

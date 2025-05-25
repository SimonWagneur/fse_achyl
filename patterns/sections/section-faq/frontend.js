(function($){
    $(document).ready(function(){
        // console.log('FAQ');
        var question = $('.section-faq .card-faq');

        // EVENTS
        question.on('click', toggleQuestion);
        $('.section-faq .card-faq:first').find('p').slideToggle(200);
        $('.section-faq .card-faq:first').toggleClass('active');

        // FUNCTIONS
        function toggleQuestion(){
            var text = $(this).find('p');
            text.slideToggle(200);
            $(this).toggleClass('active');
        }
});
})(jQuery);
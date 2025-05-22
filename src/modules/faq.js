import $ from 'jquery';

function FAQ(){
    // VARIABLES
    var question = $('.faq .question');

    // EVENTS
    question.on('click', toggleQuestion);
    $('.faq .question:first').find('p').slideToggle(200);
    $('.faq .question:first').toggleClass('active');

    // FUNCTIONS
    function toggleQuestion(){
        var text = $(this).find('p');
        text.slideToggle(200);
        $(this).toggleClass('active');
    }
}

export default FAQ;
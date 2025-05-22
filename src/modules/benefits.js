import $ from 'jquery';

function Benefits(){
    
    var sectionBenefits = $('section.benefits-carousel');
    sectionBenefits.each(function(){

        // VARIABLES
        var t = $(this);
        var slide = $(this).find('.slide');
        var prev = $(this).find('.prev');
        var next = $(this).find('.next');;
        var state = $(this).find('.left .state');
        var h2 = $(this).find('.left h2');
        var p = $(this).find('.left p');
        var img = $(this).find('#heroBackground');
        var nbrOfSlides = slide.length;
        var currentPosition = 1;
        var currentSlide;
        var stateContent;
        var h2Content;
        var pContent;
        var imgContent;

        // EVENTS
        setContent();
        prev.on('click', prevSlide);
        next.on('click', nextSlide);

        // FUNCTIONS
        function setContent(){
            currentSlide = t.find('.slides .slide[data-position="'+currentPosition+'"]');
            stateContent = currentPosition + ' / ' + nbrOfSlides;
            h2Content = currentSlide.find('.title').text();
            pContent = currentSlide.find('.text').html();
            imgContent = currentSlide.find('.img').text();

            state.html(stateContent);
            h2.html(h2Content);
            p.html(pContent);

            img.addClass('blurring');
            setTimeout(function() {
                img.attr('src', imgContent);
                img.on('load', function() {
                    img.removeClass('blurring');
                });
            }, 200);
            
        }
        function prevSlide(){
            if(currentPosition > 1){
                currentPosition--;
                setContent();
            }
            if(currentPosition == 1){
                prev.addClass('disabled');
            }
            if(currentPosition == nbrOfSlides - 1){
                next.removeClass('disabled');
            }

        }
        function nextSlide(){
            if(currentPosition < nbrOfSlides){
                currentPosition++;
                setContent();
            }
            if(currentPosition == nbrOfSlides){
                next.addClass('disabled');
                prev.removeClass('disabled');
            }
            if(currentPosition == 2){
                prev.removeClass('disabled');
            }
        }

    })


}

export default Benefits;
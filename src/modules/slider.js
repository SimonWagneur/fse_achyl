(function($){
    $(document).ready(function(){


        $('.section-steps').each(function() {
            // Trouver tous les card-step dans cette section
            $(this).find('.card-step').each(function(index) {
                // Numéroter chaque step
                $(this).find('.step-number').text(index + 1);
            });
        });
        
        // var isEditor = document.body.classList.contains('block-editor-page');

        // if (isEditor) {
        //     function checkEditorWrapper() {
        //         if ($('.editor-styles-wrapper .slider-container').length === 0) {
        //             // console.log('Editor wrapper not found, retrying in 1s...');
        //             setTimeout(checkEditorWrapper, 1000);
        //             return;
        //         }
        //         // console.log('Success: Editor wrapper found!');
        //         initSlider();
        //     }
        //     checkEditorWrapper();
        //     return;
        // }else{
        //     initSlider();
        // }

        // function initSlider(){
            var sliderContainer = $('.slider-container');
            sliderContainer.each(function(){
                
                // VARIABLES
                var slider = $(this).find('.slider');
                var sliderWidth = slider.outerWidth(true);
                var slide = $(this).find('.slide');
                var slideWidth = slide.outerWidth(true);
                var nbrOfSlides = slide.length;
                var currentSlide = 0;
                var prev = $(this).find('.prev');
                var next = $(this).find('.next');;
                var touchStartX = 0;
                var touchEndX = 0;
    
    
                // EVENTS
                SlideWidth();
                prev.on('click', prevSlide);
                next.on('click', nextSlide);
    
                slider.on('touchstart', handleTouchStart);
                slider.on('touchmove', handleTouchMove);
                slider.on('touchend', handleTouchEnd);
    
    
                // FUNCTIONS
                function SlideWidth(){
                    
                $('.slide.projet').css('width', sliderWidth);
                slideWidth = slide.outerWidth(true);
    
                if($(window).width() < 1200){
                    $('.slide.projet').css('width', sliderWidth);
                }
    
                if($(window).width() < 600){
                    slide.css('width', sliderWidth * 0.92);
                    $('.slide.projet').css('width', sliderWidth);
                    slideWidth = slide.outerWidth(true);
                }
    
                slide.first().addClass('active');
            }
    
            function prevSlide(){
                // console.log('prevSlide');
                // console.log(currentSlide);
                if(currentSlide > 0){
                    currentSlide--;
                    slider.animate({marginLeft:"-"+ slideWidth * currentSlide +"px"},200);
                    slide.eq(currentSlide).addClass('active');
                    slide.eq(currentSlide + 1).removeClass('active');
                }
                if(currentSlide == 0){
                    prev.addClass('disabled');
                }
                if(currentSlide == nbrOfSlides - 2){
                    next.removeClass('disabled');
                }
            }
            
            function nextSlide(){
                // console.log('nextSlide');
                if(currentSlide < nbrOfSlides - 1){
                    currentSlide++;
                    // console.log(slideWidth);
                    // console.log("-"+ slideWidth * currentSlide +"px");
                    slider.animate({marginLeft:"-"+ slideWidth * currentSlide +"px"},200);
                    slide.eq(currentSlide).addClass('active');
                    slide.eq(currentSlide - 1).removeClass('active');
                }
                if(currentSlide == nbrOfSlides - 1){
                    next.addClass('disabled');
                }
                if(currentSlide == 1){
                    prev.removeClass('disabled');
                }
            }
    
            function handleTouchStart(event) {
                touchStartX = event.originalEvent.touches[0].clientX;
            }
            function handleTouchMove(event) {
                touchEndX = event.originalEvent.touches[0].clientX;
            }
            function handleTouchEnd() {
                if (touchStartX - touchEndX > 50) {
                    // Swipe vers la gauche
                    nextSlide();
                } else if (touchEndX - touchStartX > 50) {
                    // Swipe vers la droite
                    prevSlide();
                }
            }
    
            })
        // }
    })
})(jQuery);
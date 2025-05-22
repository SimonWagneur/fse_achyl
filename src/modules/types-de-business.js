import $ from 'jquery';

function TypesDeBusiness(){
    // VARIABLES
    var divTypeDeBusiness = $('section.types-de-business .type-de-business');
    var divCanvas = $('section.types-de-business .canvas');
    var img = divCanvas.find('img');
    var bg;
    var animationInProgress = false;
    var animationDuration = 150;

    // EVENTS
    divTypeDeBusiness.on("mouseenter", changeCanvasBgImage);

    // FUNCTIONS
    function changeCanvasBgImage(){
        if(!$(this).hasClass('active')){
            divTypeDeBusiness.removeClass('active');
            $(this).addClass('active');
    
            bg = $(this).attr('data-bg');
    
            img.addClass('blurring');
            setTimeout(function() {
                img.attr('src', bg); // Change le src de l'image
                img.on('load', function() { // Attends que la nouvelle image soit chargée
                    img.removeClass('blurring'); // Supprime le flou une fois l'image changée
                });
            }, animationDuration); // Correspond à la durée du CSS `transition`
        }

    }
    function resetBg(){
        img.removeClass('visible');
    }
}

export default TypesDeBusiness;
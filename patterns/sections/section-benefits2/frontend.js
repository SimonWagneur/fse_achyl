(function($){
    $(document).ready(function(){
    
        var isEditor = document.body.classList.contains('block-editor-page');

        if (isEditor) {
            function checkEditorWrapper() {
                if ($('.editor-styles-wrapper section.section-benefits2').length === 0) {
                    console.log('Editor wrapper not found, retrying in 1s...');
                    setTimeout(checkEditorWrapper, 1000);
                    return;
                }
                console.log('Success: Editor wrapper found!');
                initSlider();
            }
            checkEditorWrapper();
            return;
        }else{
            initSlider();
        }

        function initSlider(){
            var sectionBenefits = $('section.section-benefits2');
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
                var preloadedImages = {}; // Pour stocker les images préchargées

    
                // EVENTS
                setSlidesPosition();
                setContent();
                preloadImages().then(() => {
                    // console.log('Images préchargées avec succès');
                    setContent();
                }).catch((error) => {
                    console.error('Erreur lors du préchargement des images:', error);
                });
                prev.on('click', prevSlide);
                next.on('click', nextSlide);
    
                // FUNCTIONS
                function setSlidesPosition(){
                    var position = 1;
                    slide.each(function(){
                        $(this).attr('data-position', position);
                        position++;
                    });
                }

                function preloadImages() {
                    return new Promise((resolve, reject) => {
                        try {
                            var promises = [];
                            
                            // Créer un div caché pour précharger les images
                            var preloadDiv = $('<div>').css({
                                position: 'absolute',
                                visibility: 'hidden',
                                width: 0,
                                height: 0,
                                overflow: 'hidden'
                            }).appendTo('body');
                
                            // Précharger chaque image
                            slide.each(function() {
                                var url = $(this).find('.img').text().trim();
                                // console.log('URL trouvée:', url); // Debug

                                if (url) {
                                    var promise = new Promise((resolveImg) => {
                                        var img = $('<img>')
                                            .attr('src', url) // Utiliser attr('src') au lieu de html()
                                            .on('load', function() {
                                                // console.log('Image chargée:', url); // Debug
                                                preloadedImages[url] = $(this);
                                                resolveImg();
                                            })
                                            .on('error', function() {
                                                // console.warn('Erreur de chargement pour:', url);
                                                resolveImg(); // Résoudre même en cas d'erreur
                                            });
                                        preloadDiv.append(img);
                                    });
                                    promises.push(promise);
                                }
                            });
                
                            if (promises.length === 0) {
                                // console.log('Aucune image à précharger');
                                preloadDiv.remove();
                                resolve();
                                return;
                            }
                
                            Promise.all(promises)
                                .then(() => {
                                    // console.log('Toutes les images sont préchargées');
                                    preloadDiv.remove();
                                    resolve();
                                })
                                .catch((error) => {
                                    // console.error('Erreur lors du préchargement:', error);
                                    preloadDiv.remove();
                                    reject(error);
                                });
                        } catch (error) {
                            // console.error('Erreur dans preloadImages:', error);
                            reject(error);
                        }
                    });
                }

                function setContent(){
                    // console.log(currentPosition);
                    currentSlide = t.find('.slides .slide[data-position="'+currentPosition+'"]');
                    stateContent = currentPosition + ' / ' + nbrOfSlides;
                    h2Content = currentSlide.find('.title').text();
                    pContent = currentSlide.find('.text').html();
                    imgContent = currentSlide.find('.img').text().trim();
    
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

    })
})(jQuery);
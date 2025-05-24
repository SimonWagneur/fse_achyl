(function($){
    $(document).ready(function(){
        // VARIABLES
        var sectionList = $('section.section-list');
        var cardList = sectionList.find('.card-list');
        var divCanvas = sectionList.find('.canvas');
        var dataUrl = cardList.first().data('url');
        var img;
        var bg;
        var animationInProgress = false;
        var animationDuration = 150;
        var preloadedImages = {}; // Pour stocker les images préchargées

        // EVENTS
        preloadImages().then(() => {
            setUp();
            cardList.on("mouseenter", changeCanvasBgImage);
        });

        // FUNCTIONS
        function preloadImages() {
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
            cardList.each(function() {
                var url = $(this).data('url');
                if (url) {
                    var promise = new Promise((resolve) => {
                        var img = $('<img>')
                            .attr('src', url)
                            .on('load', function() {
                                preloadedImages[url] = $(this);
                                resolve();
                            })
                            .appendTo(preloadDiv);
                    });
                    promises.push(promise);
                }
            });

            return Promise.all(promises);
        }

        function changeCanvasBgImage(){
            if(!$(this).hasClass('active')){
                cardList.removeClass('active');
                $(this).addClass('active');
        
                bg = $(this).data('url');
        
                img.addClass('blurring');
                setTimeout(function() {
                    img.attr('src', bg);
                    img.on('load', function() {
                        img.removeClass('blurring');
                    });
                }, animationDuration);
            }
        }

        function setUp(){
            img = $('<img>');
            img.attr('src', dataUrl);
            divCanvas.append(img);
            cardList.first().addClass('active');
        }

        function resetBg(){
            img.removeClass('visible');
        }
    });
})(jQuery);
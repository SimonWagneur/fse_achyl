// hero.js à la racine
(function($){
  $(document).ready(function(){

    const heroBackground = $('#heroBackground');
    const hero = $('.section-hero1');
    const canvas = $('.section-hero1 .visual-container');
    let heroWidth, heroHeight, canvasWidth, canvasHeight, imgWidth, imgHeight;


    $(window).on('load', defineDimensions);
    $(window).on('resize', updateDimensions);
    hero.on('mousemove', backgroundMovement);


    function defineDimensions(){
      canvasWidth = canvas.width();
      canvasHeight = canvas.height();
      heroBackground.css('height', canvasHeight * 1.2);
      heroBackground.css('width', canvasHeight * 1.2);
      heroBackground.css('opacity', 1);
    
      // Attendre que le DOM reflète le nouveau style
      setTimeout(() => {
        heroWidth = hero.outerWidth();
        heroHeight = hero.outerHeight();
        imgWidth = heroBackground.width();
        imgHeight = heroBackground.height();
      }, 800); // 0ms suffit souvent à forcer le reflow
    }

    function updateDimensions() {
      defineDimensions();
    }

    function backgroundMovement(e) {
      if ($(window).width() > 600) {
        let xMouse = e.pageX - hero.offset().left;
        let yMouse = e.pageY - hero.offset().top;
        let xPosition = (xMouse / heroWidth) - 0.5;
        let yPosition = (yMouse / heroHeight) - 0.5;
        let xDifference = xPosition * (imgWidth - canvasWidth);
        let yDifference = yPosition * (imgHeight - canvasHeight);
        heroBackground.css('transform', `translate(${-xDifference}px, ${-yDifference}px)`);
      }
    }


  });
})(jQuery);

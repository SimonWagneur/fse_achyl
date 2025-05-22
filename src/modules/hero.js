import $ from 'jquery';

function Hero() {
    //VARIABLES
    let heroBackground = $('#heroBackground');
    let hero = $('.hero');
    let canvas = $('.hero .visual-container');
    let heroWidth, heroHeight, canvasWidth, canvasHeight, imgWidth, imgHeight;

    //TRIGGERS
    
    $(window).on('load', defineDimensions);
    $(window).on('resize', updateDimensions);
    hero.on('mousemove', backgroundMovement);

    // FUNCTIONS
    function defineDimensions(){
        heroWidth = hero.outerWidth();
        heroHeight = hero.outerHeight();
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
        heroBackground.css('height', canvasHeight * 1.2);
        imgWidth = heroBackground.width();
        imgHeight = heroBackground.height();
    }
    function updateDimensions() {
        heroWidth = hero.outerWidth();
        heroHeight = hero.outerHeight();
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
        imgWidth = heroBackground.width();
        imgHeight = heroBackground.height();
    }

    function backgroundMovement(e) {
        if ($(window).width() > 600) {
            let xMouse = e.pageX - hero.offset().left;
            let yMouse = e.pageY - hero.offset().top;

            let xPosition = (xMouse / heroWidth) - 0.5;
            let yPosition = (yMouse / heroHeight)- 0.5;

            let xDifference = xPosition * (imgWidth - canvasWidth);
            let yDifference = yPosition * (imgHeight - canvasHeight);

            heroBackground.css('transform', `translate(${-xDifference}px, ${-yDifference}px)`);
        }
    }
}

export default Hero;

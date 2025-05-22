import $ from 'jquery';

function appareils(){

    // VARIABLES
    var canva = $('#appareils').find(".canvas");
    var img = $('#appareils').find('img');

    // EVENTS
    imageSliding();

    // FUNCTIONS
    function imageSliding(){
        console.log('appareils');

        gsap.fromTo(
            img,
            { x: "0%" },
            {
                x: "-60%",
                ease: "linear",
                scrollTrigger: {
                    trigger: "#appareils",
                    start: "top 50%", // quand le haut de #appareils arrive à 80% du viewport
                    end: "bottom center",
                    scrub: true, // l’animation suit le scroll
                    markers: true,
                }
            }
        );
    
    }
}

export default appareils;
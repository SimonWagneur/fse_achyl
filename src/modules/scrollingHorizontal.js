import { gsap } from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Attendre que jQuery soit chargé
jQuery(document).ready(function($) {
    // console.log('scrollingHorizontal');

    // VARIABLES
    var sections = $('section.section-benefits1.scrollingHorizontal');
    
    if(sections.length) {
        sections.each(function() {
            let section = $(this);
            let canva = section.find(".canvas");
            let canvaWidth = canva.width();
            console.log(canvaWidth);
            let img = canva.find('img');
            let imgWidth = img.width();
            
            if(img.length) {
                // Set initial position
                gsap.set(img, {
                    x: "0%",
                    left: "0",
                    right: "auto"
                });

                // FUNCTIONS
                function imageSliding(){
                    gsap.fromTo(
                        img,
                        { 
                            x: "0%" 
                        },
                        {
                            x: canvaWidth - imgWidth,
                            ease: "linear",
                            scrollTrigger: {
                                trigger: canva,
                                start: "top 70%", 
                                end: "bottom center",
                                scrub: true,
                                markers: false
                            }
                        }
                    );
                }

                // EVENTS
                imageSliding();
            }
        });
    }
});
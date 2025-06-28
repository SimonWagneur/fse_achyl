import { gsap } from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Attendre que jQuery soit chargé
jQuery(document).ready(function($) {
    // console.log('scrollingVertical');
    // VARIABLES
    var sections = $('section.section-benefits1.scrollingVertical');
    
    if(sections.length) {
        sections.each(function() {
            let section = $(this);
            let canva = section.find(".canvas");
            let canvaHeight = canva.height();
            let img = canva.find('img');
            let imgHeight = img.height();
            
            if(img.length) {
                // Set initial position
                gsap.set(img, {
                    y: "0%",
                    top: "0",
                    bottom: "auto"
                });

                // FUNCTIONS
                function imageSliding(){
                    gsap.fromTo(
                        img,
                        { 
                            y: "0%" 
                        },
                        {
                            y: canvaHeight - imgHeight,
                            ease: "linear",
                            scrollTrigger: {
                                trigger: canva,
                                start: "top 50%", 
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
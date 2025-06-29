import { gsap } from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import { SplitText } from 'https://cdn.skypack.dev/gsap/SplitText';

// Enregistrer les plugins nécessaires
gsap.registerPlugin(ScrollTrigger, SplitText);

// Désactiver l'avertissement d'essai
gsap.config({ trialWarn: false });

// Attendre que jQuery soit chargé
jQuery(document).ready(function($) {
    // console.log('scrollingTextTest');
    // VARIABLES
    let sections = $("section.section-benefits1.scrollingText");
    
    if(sections.length) {
        sections.each(function() {
            let section = $(this);
            let textElement = section.find('.canvas p.scrolling-text');
            
            if(textElement.length) {
                let textHeight = textElement.height();
                let windowHeight = $(window).height();
                let marginTopText = (windowHeight - textHeight) / 2;

                //FUNCTIONS
                function makeTextAppear(){
                    // console.log('test');
                    const split = new SplitText(textElement[0], { type: "words" });
                
                    var startAnimWord = $(window).width() > 600 ? 40 : 30;
                    var heightAnimWord = $(window).width() > 600 ? 35 : 20;
                    var delayPixels = $(window).width() > 600 ? 650 : 500;
                
                    split.words.forEach((target, index) => {
                        gsap.to(target, {
                            color: '#404040',
                            ease: "none",
                            scrollTrigger: {
                                trigger: target,
                                markers: false,
                                scrub: 0,
                                start: () => (startAnimWord * index) - delayPixels + " top",
                                end: () => "+=" + heightAnimWord + "px",
                            }
                        });
                    });
                }

                // EVENTS
                makeTextAppear();
            }
        });
    }
});
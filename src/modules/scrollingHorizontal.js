(function($){
    $(document).ready(function(){
        // console.log('scrollingHorizontal');

        // VARIABLES
        var sections = $('section.section-benefits1.scrollingHorizontal');
        
        if(sections.length) {
            sections.each(function() {
                let section = $(this);
                let canva = section.find(".canvas");
                let img = canva.find('img');
                
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
                                x: "-60%",
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
    })
})(jQuery);
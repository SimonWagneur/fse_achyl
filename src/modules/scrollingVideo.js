(function($){
    $(document).ready(function(){
        // VARIABLES
        var sections = $('section.section-benefits1.scrollingVideo');
        
        if(sections.length) {
            sections.each(function() {
                let section = $(this);
                let video = section.find('video');
                
                if(video.length) {
                    // Register GSAP plugins
                    gsap.registerPlugin(ScrollTrigger);

                    // Optimize video settings before loading
                    video.prop('muted', true);
                    video.prop('playsinline', true);
                    video[0].preload = 'auto';
                    video[0].playbackRate = 1;

                    // Désactiver explicitement l'autoplay
                    video[0].autoplay = false;
                    video.attr('autoplay', false);
                    video[0].pause();

                    // Make sure video is loaded
                    video.on('loadedmetadata', function() {
                        const videoDuration = video[0].duration;

                        // Désactiver les contrôles et forcer la pause
                        video[0].controls = false;
                        video[0].pause();

                        // Create the scrolling animation
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: section,
                                start: "top center",
                                end: "+=300%", // Augmente la zone de scroll pour plus de fluidité
                                scrub: 0.5, // Ajoute un léger lissage
                                markers: true,
                                fastScrollEnd: true, // Améliore la performance en scroll rapide
                                preventOverlaps: true,
                                onUpdate: self => {
                                    if(video[0].readyState >= 2) {
                                        // Utilise requestAnimationFrame pour une meilleure performance
                                        requestAnimationFrame(() => {
                                            const progress = Math.min(Math.max(self.progress, 0), 1);
                                            video[0].currentTime = progress * videoDuration;
                                            // S'assurer que la vidéo reste en pause
                                            if(!video[0].paused) {
                                                video[0].pause();
                                            }
                                        });
                                    }
                                }
                            }
                        });

                        // Optimise la timeline
                        tl.to(video, {
                            duration: 1,
                            ease: "none",
                            immediateRender: true
                        });

                        // Force le premier frame
                        video[0].currentTime = 0;
                        video[0].pause();
                    });

                    // Empêcher toute tentative de lecture automatique
                    video.on('play', function(e) {
                        e.preventDefault();
                        video[0].pause();
                    });

                    // Empêcher toute tentative de lecture via les contrôles natifs
                    video.on('seeking seeked', function(e) {
                        e.preventDefault();
                    });

                    // Précharge la vidéo
                    const preloadVideo = () => {
                        video[0].load();
                        video[0].currentTime = 0;
                        video[0].pause();
                        
                        // Précharge quelques frames
                        setTimeout(() => {
                            video[0].currentTime = videoDuration * 0.1;
                            setTimeout(() => {
                                video[0].currentTime = 0;
                                video[0].pause();
                            }, 100);
                        }, 100);
                    };

                    preloadVideo();
                }
            });
        }
    });
})(jQuery);
class ScrollVideo {
    constructor(videoElement, options = {}) {
        console.log('ScrollVideo: Instance créée', { element: videoElement, options });
        this.video = videoElement;
        this.options = {
            triggerStart: "top center",
            triggerEnd: "+=300%",
            scrub: 0.5,
            markers: false,
            ...options
        };
        
        this.init();
    }

    init() {
        console.log('ScrollVideo: Initialisation...');
        // Initialisation de la vidéo
        this.setupVideo();
        
        // Attendre que la vidéo soit chargée
        this.video.addEventListener('loadedmetadata', () => {
            console.log('ScrollVideo: Métadonnées vidéo chargées', {
                duration: this.video.duration,
                width: this.video.videoWidth,
                height: this.video.videoHeight
            });
            this.setupScrollTrigger();
        });
    }

    setupVideo() {
        console.log('ScrollVideo: Configuration de la vidéo');
        // Configuration de base de la vidéo
        this.video.muted = true;
        this.video.playsinline = true;
        this.video.preload = 'auto';
        this.video.autoplay = false;
        
        // Désactiver les contrôles natifs
        this.video.controls = false;
        
        // Forcer la pause initiale
        this.video.pause();
        
        // Précharger quelques frames
        this.preloadFrames();
    }

    setupScrollTrigger() {
        console.log('ScrollVideo: Configuration du ScrollTrigger');
        const duration = this.video.duration;

        gsap.registerPlugin(ScrollTrigger);

        // Créer l'animation ScrollTrigger
        this.scrollTrigger = ScrollTrigger.create({
            trigger: this.video.parentElement,
            start: this.options.triggerStart,
            end: this.options.triggerEnd,
            scrub: this.options.scrub,
            markers: this.options.markers,
            onUpdate: self => this.updateVideoTime(self, duration),
            onEnter: () => {
                console.log('ScrollVideo: Entrée dans la zone de déclenchement');
                this.video.currentTime = 0;
            },
            onLeave: () => {
                console.log('ScrollVideo: Sortie de la zone de déclenchement');
                this.video.currentTime = duration;
            },
            onEnterBack: () => {
                console.log('ScrollVideo: Retour dans la zone de déclenchement');
                this.video.currentTime = duration;
            },
            onLeaveBack: () => {
                console.log('ScrollVideo: Sortie arrière de la zone de déclenchement');
                this.video.currentTime = 0;
            }
        });
    }

    updateVideoTime(self, duration) {
        if (this.video.readyState >= 2) {
            requestAnimationFrame(() => {
                const progress = Math.min(Math.max(self.progress, 0), 1);
                this.video.currentTime = progress * duration;
                
                // S'assurer que la vidéo reste en pause
                if (!this.video.paused) {
                    this.video.pause();
                }
            });
        }
    }

    preloadFrames() {
        console.log('ScrollVideo: Préchargement des frames');
        // Charger la vidéo
        this.video.load();
        this.video.currentTime = 0;
        
        // Précharger quelques frames clés
        setTimeout(() => {
            this.video.currentTime = this.video.duration * 0.1;
            setTimeout(() => {
                this.video.currentTime = 0;
            }, 100);
        }, 100);
    }

    // Méthode pour détruire proprement l'instance
    destroy() {
        console.log("ScrollVideo: Destruction de l'instance");
        if (this.scrollTrigger) {
            this.scrollTrigger.kill();
        }
        this.video = null;
    }
}

// Initialisation avec WordPress
document.addEventListener('DOMContentLoaded', () => {
    console.log('ScrollVideo: DOM chargé, recherche des vidéos...');
    const videos = document.querySelectorAll('section.section-benefits1.has-video video');
    console.log('ScrollVideo: Vidéos trouvées:', videos.length);
    
    videos.forEach(video => {
        new ScrollVideo(video, {
            markers: window.location.hash === '#debug' // Active les marqueurs en mode debug
        });
    });
}); 
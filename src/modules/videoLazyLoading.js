/**
 * Module de lazy loading pour les vidéos
 * Optimise le chargement des vidéos avec Intersection Observer
 */

class VideoLazyLoader {
    constructor() {
        this.videoContainers = document.querySelectorAll('.video-lazy-container');
        this.observer = null;
        this.loadedVideos = new Set();
        this.init();
    }

    init() {
        if (this.videoContainers.length === 0) {
            return;
        }
        
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.loadedVideos.has(entry.target.id)) {
                        this.loadVideo(entry.target);
                    }
                });
            },
            { rootMargin: '50px', threshold: 0.1 }
        );

        this.videoContainers.forEach(container => {
            this.observer.observe(container);
        });
    }

    loadVideo(container) {
        const videoUrl = container.dataset.videoUrl;
        const videoElement = container.querySelector('.lazy-video');
        
        
        if (!videoUrl || !videoElement) {
            return;
        }

        // Vérifier le format de la vidéo
        const videoFormat = this.getVideoFormat(videoUrl);
        
        if (!this.isVideoFormatSupported(videoFormat)) {
            this.showErrorState(container);
            return;
        }

        // Marquer comme chargée
        this.loadedVideos.add(container.id);



        // Charger la vidéo
        videoElement.src = videoUrl;
        videoElement.style.display = 'block';
        videoElement.style.opacity = '0';
        
        
        // Masquer le placeholder
        const placeholder = container.querySelector('.video-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
        
        // Attendre que la vidéo soit entièrement chargée avant de la démarrer
        videoElement.addEventListener('loadeddata', () => {
            // La vidéo est maintenant entièrement chargée
            videoElement.play().then(() => {
                // Transition d'opacité quand la vidéo se lance
                videoElement.style.opacity = '1';
            }).catch(e => {
                this.addPlayButton(container, videoElement);
            });
        }, { once: true });
        
        // Gérer les erreurs
        videoElement.addEventListener('error', (e) => {
            this.showErrorState(container);
        });
        
        // Forcer le chargement
        videoElement.load();
    }

    getVideoFormat(url) {
        const extension = url.split('.').pop().toLowerCase();
        return extension;
    }

    isVideoFormatSupported(format) {
        const supportedFormats = ['mp4', 'webm', 'ogg', 'avi', 'mov'];
        return supportedFormats.includes(format);
    }

    showLoadingState(container) {
        const loadingText = container.querySelector('.video-loading-text span');
        if (loadingText) {
            loadingText.textContent = 'Optimisation en cours...';
        }
    }

    showVideo(container, videoElement) {
        const placeholder = container.querySelector('.video-placeholder');
        
        // Masquer le placeholder avec une transition
        if (placeholder) {
            placeholder.style.opacity = '0';
            setTimeout(() => {
                placeholder.style.display = 'none';
            }, 300);
        }

        // Afficher la vidéo
        videoElement.style.display = 'block';
        videoElement.style.opacity = '0';
        
        // Transition d'apparition
        setTimeout(() => {
            videoElement.style.opacity = '1';
        }, 50);
        
    }

    startVideoPlayback(videoElement) {
        // Démarrer la lecture automatique
        videoElement.play().then(() => {
        }).catch(error => {
            // Ajouter un bouton de lecture manuelle si nécessaire
            this.addPlayButton(videoElement);
        });
    }

    // addPlayButton(container, videoElement) {
    //     const playButton = document.createElement('button');
    //     playButton.innerHTML = '▶️ Lire la vidéo';
    //     playButton.className = 'video-play-button';
    //     playButton.style.cssText = `
    //         position: absolute;
    //         top: 50%;
    //         left: 50%;
    //         transform: translate(-50%, -50%);
    //         background: rgba(0,0,0,0.8);
    //         color: white;
    //         border: none;
    //         padding: 10px 20px;
    //         border-radius: 5px;
    //         cursor: pointer;
    //         z-index: 10;
    //     `;
        
    //     playButton.addEventListener('click', () => {
    //         videoElement.play().then(() => {
    //             playButton.remove();
    //         }).catch(e => {
    //         });
    //     });
        
    //     container.appendChild(playButton);
    // }

    showErrorState(container) {
        const loadingText = container.querySelector('.video-loading-text span');
        if (loadingText) {
            loadingText.textContent = 'Erreur de chargement';
            loadingText.style.color = '#ff4444';
        }
    }

    // Méthode pour nettoyer les ressources
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.loadedVideos.clear();
    }
}

// Initialiser le lazy loader quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {       
        new VideoLazyLoader();
    });
} else {
    new VideoLazyLoader();
}

// Exporter pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoLazyLoader;
} 
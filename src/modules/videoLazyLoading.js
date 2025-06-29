/**
 * Module de lazy loading pour les vidéos
 * Optimise le chargement des vidéos avec Intersection Observer
 * Ne charge pas les vidéos sur les connexions lentes
 */

class VideoLazyLoader {
    constructor() {
        this.videoContainers = document.querySelectorAll('.video-lazy-container');
        this.observer = null;
        this.loadedVideos = new Set();
        this.connectionSpeed = this.getConnectionSpeed();
        this.init();
    }

    init() {
        if (this.videoContainers.length === 0) {
            return;
        }

        // Vérifier si la connexion est trop lente
        if (this.isConnectionTooSlow()) {
            this.showPlaceholderOnly();
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
            { rootMargin: '200px', threshold: 0}
        );

        this.videoContainers.forEach(container => {
            this.observer.observe(container);
        });
    }

    getConnectionSpeed() {
        // Utiliser l'API Network Information si disponible
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType, // 'slow-2g', '2g', '3g', '4g'
                downlink: connection.downlink, // Mbps
                rtt: connection.rtt, // Round trip time en ms
                saveData: connection.saveData // Mode économie de données
            };
        }
        
        // Fallback : détection basique
        return {
            effectiveType: 'unknown',
            downlink: null,
            rtt: null,
            saveData: false
        };
    }

    isConnectionTooSlow() {
        const speed = this.connectionSpeed;
        
        // Mode économie de données activé
        if (speed.saveData) {
            console.log('🚫 Mode économie de données activé - Vidéos désactivées');
            return true;
        }
        
        // Connexion 2G ou plus lente
        if (speed.effectiveType && ['slow-2g', '2g'].includes(speed.effectiveType)) {
            console.log('🚫 Connexion trop lente (' + speed.effectiveType + ') - Vidéos désactivées');
            return true;
        }
        
        // Vitesse de téléchargement inférieure à 1 Mbps
        if (speed.downlink && speed.downlink < 1) {
            console.log('🚫 Vitesse de connexion trop lente (' + speed.downlink + ' Mbps) - Vidéos désactivées');
            return true;
        }
        
        // Latence trop élevée (RTT > 200ms)
        if (speed.rtt && speed.rtt > 200) {
            console.log('🚫 Latence trop élevée (' + speed.rtt + 'ms) - Vidéos désactivées');
            return true;
        }
        
        return false;
    }

    showPlaceholderOnly() {
        this.videoContainers.forEach(container => {
            const placeholder = container.querySelector('.video-placeholder');
            const videoElement = container.querySelector('.lazy-video');
            const loadingText = container.querySelector('.video-loading-text span');
            const placeholderContent = container.querySelector('.video-placeholder-content');
            
            // Masquer l'élément vidéo
            if (videoElement) {
                videoElement.style.display = 'none';
            }
            
            // S'assurer que le placeholder est visible
            if (placeholder) {
                placeholder.style.display = 'block';
            }
            
            // Gérer l'affichage dans le placeholder-content
            if (placeholderContent) {
                const backgroundImage = placeholderContent.querySelector('img');
                const loadingAnimation = placeholderContent.querySelector('.lds-ellipsis');
                
                // Connexion lente : afficher l'image de fond, masquer l'animation
                if (backgroundImage) {
                    backgroundImage.style.display = 'block';
                }
                if (loadingAnimation) {
                    loadingAnimation.style.display = 'none';
                }
            }
            
            // Modifier le texte de chargement si il existe
            if (loadingText) {
                loadingText.textContent = 'Vidéo non disponible (connexion lente)';
                loadingText.style.color = '#888';
                loadingText.style.fontSize = '0.9em';
            }
            
            // Ajouter une classe pour le styling CSS si nécessaire
            container.classList.add('connection-too-slow');
        });
        
        console.log('📱 Connexion lente détectée - Affichage des images de fond uniquement');
    }

    loadVideo(container) {
        const videoUrl = container.dataset.videoUrl;
        const videoElement = container.querySelector('.lazy-video');
        const placeholder = container.querySelector('.video-placeholder');
        const placeholderContent = container.querySelector('.video-placeholder-content');
        
        if (!videoUrl || !videoElement) {
            return;
        }

        // Gérer l'affichage dans le placeholder-content pour connexion rapide
        if (placeholderContent) {
            const backgroundImage = placeholderContent.querySelector('img');
            const loadingAnimation = placeholderContent.querySelector('.lds-ellipsis');
            
            // Connexion rapide : masquer l'image de fond, afficher l'animation
            if (backgroundImage) {
                backgroundImage.style.display = 'none';
            }
            if (loadingAnimation) {
                loadingAnimation.style.display = 'block';
            }
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
        
        // Attendre que la vidéo puisse être jouée
        videoElement.addEventListener('canplay', () => {
            // La vidéo peut maintenant être jouée
            // console.log('🎥 Vidéo complètement chargée:', videoUrl);
            videoElement.play().then(() => {
                // Transition d'opacité quand la vidéo se lance
                videoElement.style.opacity = '1';
                videoElement.style.display = 'block';
                // Délai de 0,5s avant de masquer le placeholder
                setTimeout(() => {
                    placeholder.style.opacity = '0';
                }, 500);
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
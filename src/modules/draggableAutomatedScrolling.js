document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM chargé, initialisation de la galerie');
    const galleries = document.querySelectorAll('.section-draggable[data-draggable="true"]');
    // console.log('Nombre de galeries trouvées:', galleries.length);

    galleries.forEach((gallery, index) => {
        // console.log(`Initialisation de la galerie ${index}`);
        
        // Variables pour le drag
        let isDragging = false;
        let startX;
        let scrollLeft;
        let animationFrameId;
        const autoScrollSpeed = 1;

        // Configuration initiale
        const totalWidth = gallery.scrollWidth;
        const visibleWidth = gallery.clientWidth;
        // console.log('Dimensions de la galerie:', {
        //     totalWidth,
        //     visibleWidth,
        //     scrollable: totalWidth > visibleWidth
        // });

        // Fonction pour le défilement automatique
        function autoScroll() {
            if (!isDragging) {
                gallery.scrollLeft += autoScrollSpeed;
                
                // Vérifier la position de défilement
                const maxScroll = gallery.scrollWidth - gallery.clientWidth;
                // console.log('Position de défilement:', {
                //     current: gallery.scrollLeft,
                //     max: maxScroll
                // });

                // Si on atteint la fin, revenir au début en douceur
                if (gallery.scrollLeft >= maxScroll) {
                    // console.log('Fin atteinte, retour au début');
                    // Créer une transition fluide
                    gallery.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        // Démarrer le défilement automatique si activé
        if (gallery.getAttribute('data-autoscroll') === 'true') {
            // console.log('Démarrage du défilement automatique');
            autoScroll();
        }

        // Gestionnaire mousedown
        gallery.addEventListener('mousedown', (e) => {
            isDragging = true;
            gallery.classList.add('dragging');
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
            // console.log('Début du drag:', { startX, scrollLeft });
        });

        // Gestionnaire mouseleave
        gallery.addEventListener('mouseleave', () => {
            if (isDragging) {
                // console.log('Souris a quitté pendant le drag');
            }
            isDragging = false;
            gallery.classList.remove('dragging');
        });

        // Gestionnaire mouseup
        gallery.addEventListener('mouseup', () => {
            // console.log('Fin du drag');
            isDragging = false;
            gallery.classList.remove('dragging');
        });

        // Gestionnaire mousemove
        gallery.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            const newScrollPosition = scrollLeft - walk;
            
            // console.log('Déplacement:', {
            //     currentX: x,
            //     walk,
            //     newScrollPosition
            // });

            gallery.scrollLeft = newScrollPosition;

            // Gérer le défilement infini pendant le drag
            const maxScroll = gallery.scrollWidth - gallery.clientWidth;
            if (newScrollPosition >= maxScroll) {
                // console.log('Retour au début pendant le drag');
                gallery.scrollLeft = 0;
                scrollLeft = 0;
                startX = e.pageX - gallery.offsetLeft;
            }
        });

        // Gestionnaire mouseenter - arrêter le défilement auto
        gallery.addEventListener('mouseenter', () => {
            // console.log('Souris entre dans la galerie, pause du défilement');
            cancelAnimationFrame(animationFrameId);
        });

        // Gestionnaire mouseleave - reprendre le défilement auto
        gallery.addEventListener('mouseleave', () => {
            // console.log('Souris quitte la galerie');
            if (gallery.getAttribute('data-autoscroll') === 'true') {
                // console.log('Reprise du défilement automatique');
                autoScroll();
            }
        });

        // Dupliquer les éléments pour un défilement infini
        function duplicateItems() {
            const items = Array.from(gallery.children);
            // console.log('Nombre d\'éléments dans la galerie:', items.length);
            
            items.forEach(item => {
                const clone = item.cloneNode(true);
                gallery.appendChild(clone);
                // console.log('Élément dupliqué');
            });
        }

        // Appeler la duplication initiale
        duplicateItems();
    });
});

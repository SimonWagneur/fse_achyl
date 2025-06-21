jQuery(function($) {
    // ========================================
    // VARIABLES
    // ========================================
    const $sections = $('.section-draggable');
    const scrollSpeed = 1;

    // ========================================
    // FONCTIONS
    // ========================================

    // Fonction pour attendre que tous les éléments soient chargés
    function waitForImages($section, callback) {
        const $images = $section.find('img');
        let loadedImages = 0;
        const totalImages = $images.length;

        if (totalImages === 0) {
            // Pas d'images, on peut continuer directement
            callback();
            return;
        }

        $images.each(function() {
            const $img = $(this);
            
            if ($img[0].complete) {
                // Image déjà chargée
                loadedImages++;
                if (loadedImages === totalImages) {
                    callback();
                }
            } else {
                // Attendre le chargement de l'image
                $img.on('load', function() {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        callback();
                    }
                }).on('error', function() {
                    // En cas d'erreur, on compte quand même
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        callback();
                    }
                });
            }
        });
    }

    // Fonction pour initialiser une section
    function initSection($section) {
        // Attendre que tous les éléments soient chargés
        waitForImages($section, function() {
            // 1. Définir la largeur de la section réelle une fois chargée
            const originalWidth = $section[0].scrollWidth;
            const visibleWidth = $section[0].clientWidth;
            const $children = $section.children();

            // 2. Dupliquer le contenu de la section
            $children.each(function() {
                $(this).clone(true).appendTo($section);
            });

            // Attendre que la duplication soit terminée
            setTimeout(() => {
                // 3. Activer le défilement automatique
                startAutoScroll($section, originalWidth);
            }, 100);
        });
    }

    // Fonction pour le défilement automatique
    function startAutoScroll($section, originalWidth) {
        // 4. Quand la section arrive à 1x sa largeur de défilement + 70px (ou 30px sur mobile), on réinitialise le scrollleft
        const isMobile = window.innerWidth < 600;
        const gap = isMobile ? 30 : 70;
        const returnThreshold = originalWidth + gap;

        function autoScroll() {
            const currentScroll = $section.scrollLeft();
            $section.scrollLeft(currentScroll + scrollSpeed);

            // Vérifier si on doit réinitialiser
            if (currentScroll >= returnThreshold) {
                $section.scrollLeft(0);
            }

            requestAnimationFrame(autoScroll);
        }

        autoScroll();
    }

    // ========================================
    // INITIALISATION
    // ========================================
    
    $sections.each(function(index) {
        const $section = $(this);
        initSection($section);
    });
});

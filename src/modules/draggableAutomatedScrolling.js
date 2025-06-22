jQuery(function($) {
    // ========================================
    // VARIABLES
    // ========================================
    const $sections = $('.section-draggable');
    const isMobile = window.innerWidth < 600;
    const scrollSpeed = isMobile ? 1 : 3;

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
            const $children = $section.children();
            
            // Calculer la largeur cumulée de tous les éléments enfants
            let totalWidth = 0;
            $children.each(function() {
                totalWidth += $(this).outerWidth(true); // outerWidth(true) inclut les marges
            });
            
            // Ajouter les gaps entre les éléments (nombre d'éléments - 1)
            const gap = isMobile ? 30 : 70;
            const gapsWidth = ($children.length - 1) * gap;
            const originalWidth = totalWidth + gapsWidth;
            
            // console.log('📐 Section:', {
            //     classes: $section.attr('class'),
            //     childrenCount: $children.length,
            //     totalElementsWidth: totalWidth,
            //     gapsWidth: gapsWidth,
            //     originalWidth: originalWidth,
            //     gap: gap
            // });

            // 2. Dupliquer le contenu de la section
            for (let i = 0; i < 2; i++) {
                $children.each(function() {
                    $(this).clone(true).appendTo($section);
                });
            }

            // Attendre que la duplication soit terminée
            setTimeout(() => {
                // 3. Activer le défilement automatique
                startAutoScroll($section, originalWidth, gap);
            }, 100);
        });
    }

    // Fonction pour le défilement automatique
    function startAutoScroll($section, originalWidth, gap) {
        // 4. Quand la section arrive à 1x sa largeur de défilement + gap, on réinitialise le scrollleft
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

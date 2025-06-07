jQuery(function($) {
    // Initialisation de la galerie
    const $galleries = $('.section-draggable[data-draggable="true"]');

    $galleries.each(function() {
        const $gallery = $(this);
        
        // Variables pour le drag
        let isDragging = false;
        let startX;
        let scrollLeft;
        let animationFrameId;
        const autoScrollSpeed = 1;

        // Configuration initiale
        const totalWidth = $gallery[0].scrollWidth;
        const visibleWidth = $gallery[0].clientWidth;

        // Fonction pour le défilement automatique
        function autoScroll() {
            if (!isDragging) {
                let currentScroll = $gallery.scrollLeft();
                $gallery.scrollLeft(currentScroll + autoScrollSpeed);
                
                // Vérifier la position de défilement
                const maxScroll = $gallery[0].scrollWidth - $gallery[0].clientWidth;

                // Si on atteint la fin, revenir au début en douceur
                if ($gallery.scrollLeft() >= maxScroll) {
                    $gallery.scrollLeft(0);
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        // Démarrer le défilement automatique si activé
        if ($gallery.data('autoscroll') === true) {
            autoScroll();
        }

        // Gestionnaires d'événements pour le drag
        $gallery
            .on('mousedown', function(e) {
                isDragging = true;
                $gallery.addClass('dragging');
                startX = e.pageX - $gallery.offset().left;
                scrollLeft = $gallery.scrollLeft();
            })
            .on('mouseleave', function() {
                isDragging = false;
                $gallery.removeClass('dragging');
            })
            .on('mouseup', function() {
                isDragging = false;
                $gallery.removeClass('dragging');
            })
            .on('mousemove', function(e) {
                if (!isDragging) return;
                e.preventDefault();
                
                const x = e.pageX - $gallery.offset().left;
                const walk = (x - startX) * 2;
                const newScrollPosition = scrollLeft - walk;
                
                $gallery.scrollLeft(newScrollPosition);

                // Gérer le défilement infini pendant le drag
                const maxScroll = $gallery[0].scrollWidth - $gallery[0].clientWidth;
                if (newScrollPosition >= maxScroll) {
                    $gallery.scrollLeft(0);
                    scrollLeft = 0;
                    startX = e.pageX - $gallery.offset().left;
                }
            })
            .on('mouseenter', function() {
                cancelAnimationFrame(animationFrameId);
            })
            .on('mouseleave', function() {
                if ($gallery.data('autoscroll') === true) {
                    autoScroll();
                }
            });

        // Fonction pour dupliquer les éléments
        function duplicateItems() {
            const $items = $gallery.children();
            $items.each(function() {
                $(this).clone(true).appendTo($gallery);
            });
        }

        // Dupliquer les éléments initialement
        duplicateItems();
    });
});

jQuery(document).ready(function($) {
    const videoQueue = [];
    const $queue = $('#video-queue');
    const $upload = $('#video-upload');
    const $startBtn = $('#start-optimization');

    // Gérer l'upload des fichiers
    $upload.on('change', function(e) {
        const files = e.target.files;
        
        Array.from(files).forEach(file => {
            if (file.type.startsWith('video/')) {
                videoQueue.push(file);
                addToQueueUI(file);
            }
        });

        updateStartButton();
    });

    // Ajouter un fichier à l'interface
    function addToQueueUI(file) {
        const $item = $(`
            <div class="queue-item" data-filename="${file.name}">
                <span class="filename">${file.name}</span>
                <span class="status">En attente</span>
                <button class="button remove-file">Retirer</button>
            </div>
        `);

        $item.find('.remove-file').on('click', function() {
            const index = videoQueue.findIndex(f => f.name === file.name);
            if (index > -1) {
                videoQueue.splice(index, 1);
                $item.remove();
                updateStartButton();
            }
        });

        $queue.append($item);
    }

    // Mettre à jour l'état du bouton de démarrage
    function updateStartButton() {
        $startBtn.prop('disabled', videoQueue.length === 0);
    }

    // Gérer le processus d'optimisation
    $startBtn.on('click', async function() {
        $startBtn.prop('disabled', true);
        
        for (const file of videoQueue) {
            const $item = $queue.find(`[data-filename="${file.name}"]`);
            $item.find('.status').text('En cours...');

            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch(videoOptimizerSettings.ajaxUrl, {
                    method: 'POST',
                    headers: {
                        'X-WP-Nonce': videoOptimizerSettings.nonce
                    },
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    $item.find('.status').text('Terminé').addClass('success');
                } else {
                    $item.find('.status').text('Échec').addClass('error');
                }
            } catch (error) {
                console.error('Erreur lors de la conversion:', error);
                $item.find('.status').text('Erreur').addClass('error');
            }
        }

        // Réinitialiser la file d'attente
        videoQueue.length = 0;
        updateStartButton();
    });
}); 
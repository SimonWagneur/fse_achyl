<?php
/**
 * Title: Form
 * Slug: blocktheme/form
 * Categories: components
 * Description: Formulaire avec titre et texte.
 */
$buttonText = $attributes['buttonText'] ?? 'Envoyer';
$destination = $attributes['destination'] ?? '';
$objet = $attributes['objet'] ?? '';
$endpoint = $attributes['endpoint'] ?? '';
// Générer un ID unique pour ce formulaire
$formId = 'form_' . uniqid();

// Stocker les valeurs sensibles dans un fichier temporaire
if (!empty($destination) || !empty($objet)) {
    $form_config = [
        'destination' => $destination,
        'objet' => $objet,
        'endpoint' => $endpoint
    ];
    
    // Créer le dossier cache s'il n'existe pas
    $cache_dir = dirname(__FILE__) . '/../../../assets/cache/';
    if (!file_exists($cache_dir)) {
        mkdir($cache_dir, 0755, true);
    }
    
    // Stocker dans un fichier JSON temporaire
    $cache_file = $cache_dir . $formId . '.json';
    file_put_contents($cache_file, json_encode($form_config));
    
    // Nettoyer les anciens fichiers (plus de 1 heure)
    $files = glob($cache_dir . '*.json');
    foreach ($files as $file) {
        if (filemtime($file) < time() - 3600) {
            unlink($file);
        }
    }
}
?>

<form class="form form-container" id="<?php echo esc_attr($formId); ?>">
    <?php echo $content; ?>
    <!-- <input type="text" id="destination" name="destination" value="<?php // echo esc_attr($destination); ?>">
    <input type="text" id="objet" name="objet" value="<?php // echo esc_attr($objet); ?>"> -->
    <input type="text" id="check" name="check">
    <button class="primary black">
        <div class="text">
            <div class="main">
                <span><?php echo esc_html($buttonText); ?></span>
            </div>
        </div>
        <div class="round-container">
            <div class="round">
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
    </button>
    <div class="responseMessage"></div>
</form>
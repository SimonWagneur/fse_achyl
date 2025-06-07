<?php
/**
 * Title: Card Feature
 * Slug: blocktheme/card-feature
 * Categories: components
 * Description: Carte de fonctionnalité avec icône et texte.
 */

$content = $attributes['content'] ?? 'Votre fonctionnalité';
?>

<div class="card-feature">
    <i class="fa-solid fa-check"></i>
    <?php echo $content; ?>
</div>
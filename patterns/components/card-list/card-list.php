<?php
/**
 * Title: Card List
 * Slug: blocktheme/card-list
 * Categories: components
 * Description: Carte de liste avec titre et texte.
 */

$background_image = $attributes['backgroundImage'] ?? '';
$title = $attributes['title'] ?? 'Votre titre ici';
$content = $attributes['content'] ?? 'Votre texte ici';
?>

<div class="card-list" data-url="<?php echo esc_attr($background_image); ?>">
    <h3 class="h3"><?php echo esc_html($title); ?></h3>
    <p class="p"><?php echo esc_html($content); ?></p>
</div>
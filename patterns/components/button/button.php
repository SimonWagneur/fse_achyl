<?php
/**
 * Title: Button
 * Slug: blocktheme/button
 * Categories: components
 * Description: Bouton avec texte et lien.
 */

$text = $attributes['text'] ?? '';
$link_object = $attributes['linkObject'] ?? null;
$color_name = $attributes['colorName'] ?? 'black';
$is_disabled = $attributes['disabled'] ?? false;
$button_style = $attributes['buttonStyle'] ?? 'primary';
$wrapper_attributes = get_block_wrapper_attributes();

// Extraire l'URL et les propriétés du lien depuis linkObject
$link_url = $link_object['url'] ?? '#';
$link_target = $link_object['opensInNewTab'] ?? false ? '_blank' : '';
$link_rel = $link_object['opensInNewTab'] ?? false ? 'noopener noreferrer' : '';

// Déterminer les classes CSS en fonction du style du bouton
$button_classes = "primary " . esc_attr($color_name);
if ($button_style === 'secondary') {
    $button_classes .= ' border';
}
?>


<a href="<?php echo esc_url($link_url); ?>" <?php echo $link_target ? 'target="' . esc_attr($link_target) . '"' : ''; ?> <?php echo $link_rel ? 'rel="' . esc_attr($link_rel) . '"' : ''; ?> style="display: contents;">
    <button class="<?php echo $button_classes; ?>" <?php echo $is_disabled ? 'disabled' : ''; ?>>
        <div class="text">
            <div class="main">
                <span><?php echo esc_html($text); ?></span>
            </div>
        </div>
        <div class="round-container">
            <div class="round">
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
    </button>
</a>

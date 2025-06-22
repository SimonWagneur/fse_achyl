<?php
/**
 * Title: Section Pricing
 * Slug: blocktheme/section-pricing
 * Categories: sections
 * Description: Section tarifs avec titre et contenu.
 */
$title = $attributes['title'] ?? 'Nos tarifs';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-pricing" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>
        <div class="content">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
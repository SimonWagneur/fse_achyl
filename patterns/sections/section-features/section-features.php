<?php
/**
 * Title: Section Fonctionnalités
 * Slug: blocktheme/section-features
 * Categories: sections
 * Description: Section listant les fonctionnalités principales.
 */

$title = $attributes['title'] ?? 'Nos fonctionnalités';
$content = $content ?? '';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-features" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>
        <div class="content">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
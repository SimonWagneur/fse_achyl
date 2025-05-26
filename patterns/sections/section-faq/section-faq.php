<?php
$title = $attributes['title'] ?? 'FAQ';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-faq" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container small-container">
        <h2 class="h2"><?php echo wp_kses_post($title); ?></h2>
        <?php echo wp_kses_post($content); // Contenu de InnerBlocks ?>
    </div>
</section>
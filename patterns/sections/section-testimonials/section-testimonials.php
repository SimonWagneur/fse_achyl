<?php

$title = $attributes['title'] ?? 'Nos avis clients';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-testimonials" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container slider-container">
        <div class="top">
            <h2 class="h2"><?php echo wp_kses_post($title); ?></h2>
            <div class="controls">
                <div class="control prev disabled"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></div>
                <div class="control next"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></div>
            </div>
        </div>
        <div class="slider bottom">
            <?php echo wp_kses_post($content); // Contenu de InnerBlocks ?>
        </div>
    </div>
</section>
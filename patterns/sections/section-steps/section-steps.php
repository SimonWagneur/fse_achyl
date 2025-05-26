<?php
$title = $attributes['title'] ?? 'Notre processus';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-steps" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container slider-container">
        <div class="top">
            <h2 class="h2"><?php echo esc_html($title); ?></h2>
            <div class="controls">
                <div class="control prev disabled"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></div>
                <div class="control next"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></div>
            </div>
        </div>
        <div class="slider bottom">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
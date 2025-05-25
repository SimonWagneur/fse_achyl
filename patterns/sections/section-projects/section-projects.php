<?php
$title = $attributes['title'] ?? 'Nos projets';
?>

<section class="section-projects">
    <div class="container medium-container slider-container">
        <div class="top">
            <h2 class="h2"><?php echo esc_html($title); ?></h2>
            <div class="controls">
                <div class="control prev disabled"><i class="fa-solid fa-arrow-left"></i></div>
                <div class="control next"><i class="fa-solid fa-arrow-right"></i></div>
            </div>
        </div>
        <div class="slider bottom">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
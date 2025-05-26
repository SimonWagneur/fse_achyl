<?php
$title = $attributes['title'] ?? 'Votre titre ici';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-list" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>
        <div class="content">
            <div class="left">
                <?php echo wp_kses_post($content); ?>
            </div>
            <div class="right">
                <div class="canvas">
                </div>
            </div>
        </div>
    </div>
</section>
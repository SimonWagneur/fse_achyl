<?php
$title = $attributes['title'] ?? 'Nos fonctionnalités';
$content = $content ?? '';
?>

<section class="section-features">
    <div class="container medium-container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>
        <div class="content">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
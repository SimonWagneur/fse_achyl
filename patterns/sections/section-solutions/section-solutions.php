<?php
$title = $attributes['title'] ?? 'Nos solutions';
?>

<section class="section-solutions">
    <div class="container medium-container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>
        <div class="solutions-container">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
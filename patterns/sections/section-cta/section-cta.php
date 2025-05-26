<?php

$title = $attributes['title'] ?? 'Titre de la section CTA';
$contentP = $attributes['content'] ?? 'Contenu de la section CTA';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-cta" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>
        <p class="p"><?php echo esc_html($contentP); ?></p>
        <div class="buttons">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
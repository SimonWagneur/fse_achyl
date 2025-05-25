<?php

$title = $attributes['title'] ?? 'Titre de la section CTA';
$contentP = $attributes['content'] ?? 'Contenu de la section CTA';

?>

<section class="section-cta">
    <div class="container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>
        <p class="p"><?php echo esc_html($contentP); ?></p>
        <div class="buttons">
            <?php echo wp_kses_post($content); ?>
        </div>
    </div>
</section>
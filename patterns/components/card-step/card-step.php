<?php
$title = $attributes['title'] ?? 'Titre de l\'étape';
$attrContent = $attributes['content'] ?? 'Description de l\'étape';
?>

<div class="slide card-step">
    <div class="step-number"></div>    
    <h3 class="h3"><?php echo esc_html($title); ?></h3>
    <p class="p"><?php echo esc_html($attrContent); ?></p>
    <?php echo wp_kses_post($content); ?>
</div>
<?php
$title = $attributes['title'] ?? 'Titre de la carte';
$text = $attributes['text'] ?? 'Texte de la carte';
$imageUrl = $attributes['imageUrl'] ?? '';
$position = $attributes['position'] ?? '';
?>

<div class="slide" data-position="<?php echo esc_attr($position); ?>">
    <div class="title"><?php echo esc_html($title); ?></div>
    <div class="text">
        <p>
            <?php echo esc_html($text); ?>
        </p>
    </div>
    <div class="img">
        <?php if ($imageUrl): echo esc_url($imageUrl); ?>
        <?php endif; ?>
    </div>
</div>
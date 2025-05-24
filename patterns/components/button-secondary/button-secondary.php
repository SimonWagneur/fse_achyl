<?php
$button_color = $attributes['buttonColor'] ?? 'black';
$button_text = $attributes['buttonText'] ?? 'Cliquez ici';
?>

<button class="secondary <?php echo esc_attr($button_color); ?>">
    <?php echo esc_html($button_text); ?>
</button>